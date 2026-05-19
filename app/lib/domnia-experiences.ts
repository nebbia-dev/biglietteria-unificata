import 'server-only';

import {
    DOMNIA_API_BASE_URL,
    ensureDomniaSession,
    getDomniaApiHeaders,
} from '@/app/lib/domnia-auth';
import mockProductGroupsResponse from '@/app/lib/mocks/domnia-product-groups.json';
import { getMockDomniaSalableProducts } from '@/app/lib/domnia-products';
import type {
    ExperienceCardData,
    ProductResponse,
} from '@/app/lib/domnia-types';

type ProductGroupResponse = {
    data: ExperienceCardData[];
};

const mockProductGroupLocations = [
    'Via Ugolani Dati, 4, Cremona',
    'Via San Lorenzo, 4, Cremona',
    'Via Ugolani Dati, 4, Cremona',
    'Via Castelleone, 51, Cremona',
    'Via Ugolani Dati, 4, Cremona',
    'Via Ugolani Dati, 4, Cremona',
    'Via San Lorenzo, 4, Cremona',
    'Via Ugolani Dati, 4, Cremona',
    'Via Castelleone, 51, Cremona',
];

async function fetchDomniaJson<T>(path: string, accessToken: string): Promise<T> {
    const response = await fetch(`${DOMNIA_API_BASE_URL}${path}`, {
        cache: 'no-store',
        headers: getDomniaApiHeaders(accessToken),
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`Domnia API request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
}

function getMockProductGroups() {
    const mockProductIds = getMockDomniaSalableProducts()
        .map((product) => product.base_price?.product_id)
        .filter((productId) => productId !== undefined);

    return (
        Array.isArray(mockProductGroupsResponse.data)
            ? mockProductGroupsResponse.data
            : []
    ).map((productGroup, index) => ({
        ...productGroup,
        connectedProducts:
            Array.isArray(productGroup.connectedProducts) &&
            productGroup.connectedProducts.length > 0
                ? productGroup.connectedProducts
                : mockProductIds[index % mockProductIds.length] !== undefined
                    ? [mockProductIds[index % mockProductIds.length]!]
                    : [],
        locations: Array.isArray(productGroup.locations) &&
            productGroup.locations.length > 0
            ? productGroup.locations.map((location, locationIndex) => ({
                ...location,
                label:
                    'label' in location && typeof location.label === 'string'
                        ? location.label
                        : mockProductGroupLocations[
                            (index + locationIndex) % mockProductGroupLocations.length
                        ],
            }))
            : [
                {
                    label:
                        mockProductGroupLocations[
                            index % mockProductGroupLocations.length
                        ],
                },
            ],
    })) as ExperienceCardData[];
}

function attachFallbackConnectedProducts(
    productGroups: ExperienceCardData[],
    products: ProductResponse[],
) {
    const availableProducts = products.filter(
        (product) => product.base_price?.product_id !== undefined,
    );

    if (availableProducts.length === 0) {
        return productGroups;
    }

    return productGroups.map((productGroup, index) => {
        if (
            Array.isArray(productGroup.connectedProducts) &&
            productGroup.connectedProducts.length > 0
        ) {
            return productGroup;
        }

        const fallbackProduct =
            availableProducts[index % availableProducts.length];
        const fallbackProductId = fallbackProduct.base_price?.product_id;
        const fallbackPrice = fallbackProduct.base_price?.value;

        return {
            ...productGroup,
            cheapest:
                fallbackPrice !== undefined
                    ? fallbackPrice
                    : productGroup.cheapest,
            connectedProducts:
                fallbackProductId !== undefined ? [fallbackProductId] : [],
        };
    });
}

async function fetchProductGroupsWithFallback(accessToken: string) {
    try {
        const response = await fetchDomniaJson<ProductGroupResponse>(
            '/api/shop/product-groups?tagIds=1',
            accessToken,
        );

        return {
            data: Array.isArray(response.data) ? response.data : [],
            isFallback: false,
        };
    } catch (error) {
        console.warn(
            'Domnia product groups unavailable, using local mock response',
            error,
        );

        return {
            data: getMockProductGroups(),
            isFallback: true,
        };
    }
}

async function fetchProductsWithFallback(accessToken: string) {
    try {
        const response = await fetchDomniaJson<ProductResponse[]>(
            '/api/bb/products/salable',
            accessToken,
        );

        return Array.isArray(response) ? response : [];
    } catch (error) {
        console.warn(
            'Domnia salable products unavailable, using local mock response',
            error,
        );

        return getMockDomniaSalableProducts();
    }
}

function enrichExperiences(
    productGroups: ExperienceCardData[],
    products: ProductResponse[],
) {
    return productGroups.map((productGroup) => {
        const connectedProducts = new Set(
            (Array.isArray(productGroup.connectedProducts)
                ? productGroup.connectedProducts
                : []
            ).map((productId) => productId.toString()),
        );

        const cheapest = products.reduce<number | undefined>((lowest, product) => {
            const productId = product.base_price?.product_id;
            const value = product.base_price?.value;

            if (
                productId === undefined ||
                value === undefined ||
                value === 0 ||
                !connectedProducts.has(productId.toString())
            ) {
                return lowest;
            }

            if (lowest === undefined || value < lowest) {
                return value;
            }

            return lowest;
        }, undefined);

        return {
            ...productGroup,
            cheapest,
        };
    });
}

export async function fetchExperiencesWithAccessToken(accessToken: string) {
    const [productGroupsResult, products] = await Promise.all([
        fetchProductGroupsWithFallback(accessToken),
        fetchProductsWithFallback(accessToken),
    ]);
    const productGroups = productGroupsResult.isFallback
        ? attachFallbackConnectedProducts(productGroupsResult.data, products)
        : productGroupsResult.data;

    return enrichExperiences(
        productGroups,
        products,
    );
}

export async function getExperiences(returnTo: string) {
    try {
        const { session } = await ensureDomniaSession();

        return fetchExperiencesWithAccessToken(session.accessToken);
    } catch (error) {
        console.warn(
            `Domnia session unavailable for ${returnTo}, using local mock response`,
            error,
        );

        return enrichExperiences(
            getMockProductGroups(),
            getMockDomniaSalableProducts(),
        );
    }
}
