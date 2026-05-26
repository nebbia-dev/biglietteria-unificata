export type StrapiMeta = {
    pagination?: {
        page: number;
        pageCount: number;
        pageSize: number;
        total: number;
    };
};

export type StrapiSingleResponse<T> = {
    data: T;
    meta?: StrapiMeta;
};

export type StrapiCollectionResponse<T> = {
    data: T[];
    meta?: StrapiMeta;
};

export type StrapiEntity = {
    createdAt?: string;
    documentId: string;
    id?: number;
    publishedAt?: string;
    updatedAt?: string;
};

export type StrapiImage = StrapiEntity & {
    alternativeText: string;
    caption?: string | null;
    ext?: string;
    formats?: Record<string, unknown> | null;
    hash?: string;
    height?: number;
    mime?: string;
    name: string;
    previewUrl?: string | null;
    provider?: string;
    provider_metadata?: Record<string, unknown> | null;
    size?: number;
    slug?: string;
    titolo?: string;
    url: string;
    width?: number;
};

export type StrapiHomepage = StrapiEntity & {
    descrizione: string;
    descrizione_mobile?: string | null;
    immagine?: StrapiImage;
    immagine_gruppi: StrapiImage;
    immagine_scuole: StrapiImage;
    titolo: string;
    titolo_mobile?: string | null;
};

export type StrapiMuseum = StrapiEntity & {
    accessibilita?: string | null;
    biglietteria_email?: string | null;
    biglietteria_telefono?: string | null;
    conservatore_email?: string | null;
    conservatore_nome?: string | null;
    conservatore_telefono?: string | null;
    descrizione?: string | null;
    descrizione_1?: string | null;
    descrizione_2?: string | null;
    gratuita?: string | null;
    gruppi_email?: string | null;
    immagine: StrapiImage;
    immagine_biglietti_esperienze?: StrapiImage;
    immagine_biglietti_gruppi: StrapiImage;
    immagine_biglietti_scuole: StrapiImage;
    immagine_biglietti_standard: StrapiImage;
    immagine_biglietto_cumulativo: StrapiImage;
    indirizzo?: string | null;
    intero?: number;
    note?: string | null;
    orari?: string | null;
    ordine?: number | string | null;
    ridotto?: number;
    riduzioni?: string | null;
    slug: string;
    slug_gruppi?: string | null;
    slug_scuole?: string | null;
    sottotitolo?: string | null;
    titolo: string;
};

export type StrapiEvent = StrapiEntity & {
    immagine: StrapiImage;
    slug: string;
};

export type StrapiInfoPage = StrapiEntity & {
    descrizione: string;
    immagine: StrapiImage;
    titolo: string;
};

export type StrapiNewsPage = StrapiEntity & {
    descrizione: string;
    immagine: StrapiImage;
    titolo: string;
};

export type StrapiFaq = StrapiEntity & {
    domanda: string;
    link?: string | null;
    risposta: string;
};

export type StrapiContacts = StrapiEntity & {
    archivi_email?: string | null;
    archivi_telefono?: string | null;
    comunicazione_email?: string | null;
    comunicazione_telefono?: string | null;
    didattica_email?: string | null;
    didattica_telefono?: string | null;
    indirizzo: string;
    registrar_email?: string | null;
    registrar_telefono?: string | null;
    segreteria_email?: string | null;
    segreteria_telefono?: string | null;
    uffici_email?: string | null;
    uffici_telefono?: string | null;
};

export type CarouselImage = StrapiImage & {
    slug: string;
    titolo: string;
};

export type TicketCardData = {
    descrizione?: string;
    immagine?: StrapiImage;
    infoPrezzo: string;
    nome?: string;
    pic?: string;
    prezzo?: number;
    slug?: string;
    titolo: string;
};
