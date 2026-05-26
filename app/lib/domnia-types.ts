import type { StrapiImage } from '@/app/lib/strapi-types';

export type DomniaId = number | string;

export type ExperienceDescriptionBlock = {
    children?: Array<{
        text?: string;
        [key: string]: unknown;
    }>;
    [key: string]: unknown;
};

export type ExperienceDescription = string | ExperienceDescriptionBlock[];

export type ExperienceLocation = {
    label: string;
    lat?: number;
    lng?: number;
    [key: string]: unknown;
};

export type DomniaProductGroupResponse = {
    cheapest?: number;
    connectedProducts?: DomniaId[];
    description?: ExperienceDescription;
    documentId?: string;
    heroImage?: StrapiImage;
    immagine?: StrapiImage;
    locations?: Array<Partial<ExperienceLocation>>;
    ordine?: number | string;
    slug?: string;
    tagIds?: number[];
    ticketImage?: StrapiImage;
    title?: string;
    tipo?: string;
    [key: string]: unknown;
};

export type ExperienceCardData = {
    cheapest?: number;
    connectedProducts: DomniaId[];
    description?: string;
    documentId: string;
    heroImage?: StrapiImage;
    immagine?: StrapiImage;
    locations: ExperienceLocation[];
    ordine?: number | string;
    slug: string;
    tagIds: number[];
    ticketImage?: StrapiImage;
    title: string;
    tipo?: string;
    [key: string]: unknown;
};

export type ProductBasePrice = {
    end_date?: string;
    product_id?: DomniaId;
    start_date?: string;
    value?: number;
};

export type ProductResponse = {
    base_price?: ProductBasePrice;
    id?: DomniaId;
    slug?: string;
    title?: string;
    [key: string]: unknown;
};

export type ProductGroupResponse = {
    data: DomniaProductGroupResponse[];
};
