import {unstable_rethrow} from "next/navigation";
import type {
    StrapiCollectionResponse,
    StrapiContacts,
    StrapiMuseum,
    StrapiSingleResponse,
} from "@/app/lib/strapi-types";

export const dynamic = 'force-dynamic';

const emptyContacts: StrapiContacts = {
    documentId: 'empty-contacts',
    indirizzo: '',
};

function getMuseumOrder(museum: StrapiMuseum) {
    const order = Number(museum.ordine ?? Number.MAX_SAFE_INTEGER);

    return Number.isFinite(order) ? order : Number.MAX_SAFE_INTEGER;
}

function sortMuseumsByOrder(museums: StrapiMuseum[]) {
    return [...museums].sort((a, b) => getMuseumOrder(a) - getMuseumOrder(b));
}

async function fetchCmsJson<T>(path: string, fallback: T): Promise<T> {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

    if (!baseUrl) {
        console.warn(`CMS base URL unavailable for ${path}`);
        return fallback;
    }

    const response = await fetch(`${baseUrl}${path}`, {
        cache: 'no-store',
    });

    if (!response.ok) {
        console.warn(`CMS request failed for ${path} with status ${response.status}`);
        return fallback;
    }

    return response.json() as Promise<T>;
}

export default async function Contatti() {

    let content: StrapiCollectionResponse<StrapiMuseum> = { data: [] };
    let contentContacts: StrapiSingleResponse<StrapiContacts> = {
        data: emptyContacts,
    };

    try {
        content = await fetchCmsJson<StrapiCollectionResponse<StrapiMuseum>>(
            '/api/museums?locale=en',
            { data: [] },
        );
        content = {
            ...content,
            data: sortMuseumsByOrder(content.data),
        };

        contentContacts = await fetchCmsJson<StrapiSingleResponse<StrapiContacts>>(
            '/api/contatti',
            { data: emptyContacts },
        );
    } catch(e) {
        unstable_rethrow(e);
        console.log(e)
    }

    return(
        <section className="w-[90%] md:w-[85%] mx-auto pt-[128px] md:pt-[148px]">
            <div className="mb-8">
                <p className="text-sm mb-8 font-light">Home / Contacts</p>
                <h1 className="text-4xl mb-4 font-semibold">Contacts</h1>
            </div>

            <div className="flex flex-col gap-4">
                {content.data &&
                    content.data.map((el) => {
                        return (
                            <div key={el.documentId}>
                                <h2 className="text-2xl font-semibold">{el.titolo}</h2>
                                <p className="mb-4 lato">{el.indirizzo}</p>

                                <h3 className="font-medium mt-2 mb-1">Ticket office:</h3>
                                <ul className="lato">
                                    <li>{el.biglietteria_telefono}</li>
                                    <li className="break-all underline"><a href={`mailto:${el.biglietteria_email}`}>{el.biglietteria_email}</a></li>
                                </ul>

                                <h3 className="font-medium mt-2 mb-1">Group reservation:</h3>
                                <p className="break-all underline lato"><a href={`mailto:${el.gruppi_email}`}>{el.gruppi_email}</a>
                                </p>

                                <h3 className="font-medium mt-2 mb-1">Curator:</h3>
                                <p className="pb-8 lato">{el.conservatore_nome} {el.conservatore_telefono} – <a className="break-all underline" href={`mailto:${el.conservatore_email}`}>{el.conservatore_email}</a></p>
                            </div>
                        )
                    })}


                {contentContacts.data.indirizzo && <div>
                    <h2 className="text-2xl font-semibold">Uffici del Sistema Museale</h2>
                    <p className="mb-4">{contentContacts.data.indirizzo}</p>

                    <h3 className="font-medium mt-2 mb-1">Uffici:</h3>
                    <ul>
                        <li>{contentContacts.data.uffici_telefono}</li>
                        <li className="break-all underline"><a href={`mailto:${contentContacts.data.uffici_email}`}>{contentContacts.data.uffici_email}</a></li>
                    </ul>
                    <h3 className="font-medium mt-2 mb-1">Uffici sezione didattica:</h3>
                    <ul>
                        <li>{contentContacts.data.didattica_telefono}</li>
                        <li className="break-all underline"><a href={`mailto:${contentContacts.data.didattica_email}`}>{contentContacts.data.didattica_email}</a></li>
                    </ul>
                    <h3 className="font-medium mt-2 mb-1">Registrar:</h3>
                    <ul>
                        <li>{contentContacts.data.registrar_telefono}</li>
                        <li className="break-all underline"><a href={`mailto:${contentContacts.data.registrar_email}`}>{contentContacts.data.registrar_email}</a></li>
                    </ul>
                    <h3 className="font-medium mt-2 mb-1">Richiesta immagini e consultazione archivi:</h3>
                    <ul>
                        <li>{contentContacts.data.archivi_telefono}</li>
                        <li className="break-all underline"><a href={`mailto:${contentContacts.data.archivi_email}`}>{contentContacts.data.archivi_email}</a></li>
                    </ul>
                    <h3 className="font-medium mt-2 mb-1">Segreteria del Sistema Museale:</h3>
                    <ul>
                        <li>{contentContacts.data.segreteria_telefono}</li>
                        <li className="break-all underline"><a href={`mailto:${contentContacts.data.segreteria_email}`}>{contentContacts.data.segreteria_email}</a></li>
                    </ul>
                    <h3 className="font-medium mt-2 mb-1">Comunicazione:</h3>
                    <ul>
                        <li>{contentContacts.data.comunicazione_telefono}</li>
                        <li className="break-all underline"><a href={`mailto:${contentContacts.data.comunicazione_email}`}>{contentContacts.data.comunicazione_email}</a></li>
                    </ul>
                </div>}
            </div>
        </section>
    )
}
