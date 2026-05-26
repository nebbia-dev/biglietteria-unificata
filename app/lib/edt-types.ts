export type EdtTranslation = {
    description?: string;
    title?: string;
};

export type EdtEvent = {
    address?: {
        addressLocality?: string;
        addressPlace?: string;
        streetAddress?: string;
    };
    contacts?: {
        telephone?: string;
    };
    dates?: {
        endDate?: string;
        startDate?: string;
    };
    identifier?: string;
    translations?: {
        it?: EdtTranslation;
    };
};

export type EdtEventsResponse = {
    events: EdtEvent[];
};
