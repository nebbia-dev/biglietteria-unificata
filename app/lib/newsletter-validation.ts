export type NewsletterFormPayload = {
    firstName: string;
    lastName: string;
    email: string;
    birthDate: string;
    city: string;
    phone: string;
    privacy: boolean;
};

export type NewsletterSubscriber = Omit<NewsletterFormPayload, 'privacy'>;

export type NewsletterFieldErrors = Partial<Record<keyof NewsletterFormPayload, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[0-9+\s().-]{6,25}$/;

function normalizeText(value: unknown) {
    return typeof value === 'string' ? value.trim() : '';
}

function getBoolean(value: unknown) {
    return value === true || value === 'true' || value === '1' || value === 'on';
}

function parseDateParts(value: string) {
    const slashMatch = value.match(/^(\d{2})[/-](\d{2})[/-](\d{4})$/);
    if (slashMatch) {
        return {
            day: Number(slashMatch[1]),
            month: Number(slashMatch[2]),
            year: Number(slashMatch[3]),
        };
    }

    const isoMatch = value.match(/^(\d{4})-(\d{2})-(\d{2})$/);
    if (isoMatch) {
        return {
            day: Number(isoMatch[3]),
            month: Number(isoMatch[2]),
            year: Number(isoMatch[1]),
        };
    }

    return null;
}

function padDatePart(value: number) {
    return value.toString().padStart(2, '0');
}

export function normalizeBirthDate(value: string) {
    const parts = parseDateParts(value.trim());
    if (!parts) {
        return null;
    }

    const date = new Date(Date.UTC(parts.year, parts.month - 1, parts.day));
    const isValidDate =
        date.getUTCFullYear() === parts.year &&
        date.getUTCMonth() === parts.month - 1 &&
        date.getUTCDate() === parts.day;

    if (!isValidDate) {
        return null;
    }

    return `${parts.year}-${padDatePart(parts.month)}-${padDatePart(parts.day)}`;
}

export function isValidNewsletterEmail(value: string) {
    return emailPattern.test(value);
}

export function isValidNewsletterPhone(value: string) {
    return phonePattern.test(value);
}

export function normalizeNewsletterPayload(input: unknown): NewsletterFormPayload {
    const data = input !== null && typeof input === 'object'
        ? input as Record<string, unknown>
        : {};

    return {
        firstName: normalizeText(data.firstName),
        lastName: normalizeText(data.lastName),
        email: normalizeText(data.email).toLowerCase(),
        birthDate: normalizeText(data.birthDate),
        city: normalizeText(data.city),
        phone: normalizeText(data.phone),
        privacy: getBoolean(data.privacy),
    };
}

export function validateNewsletterPayload(payload: NewsletterFormPayload) {
    const errors: NewsletterFieldErrors = {};
    const normalizedBirthDate = normalizeBirthDate(payload.birthDate);

    if (payload.firstName === '') {
        errors.firstName = 'Inserisci il nome.';
    }

    if (payload.lastName === '') {
        errors.lastName = 'Inserisci il cognome.';
    }

    if (payload.email === '' || !isValidNewsletterEmail(payload.email)) {
        errors.email = 'Inserisci un indirizzo email valido.';
    }

    if (normalizedBirthDate === null) {
        errors.birthDate = 'Inserisci la data di nascita in formato GG/MM/AAAA.';
    }

    if (payload.city === '') {
        errors.city = 'Inserisci la citta.';
    }

    if (payload.phone === '') {
        errors.phone = 'Inserisci il numero di telefono.';
    } else if (!isValidNewsletterPhone(payload.phone)) {
        errors.phone = 'Inserisci un numero di telefono valido.';
    }

    if (!payload.privacy) {
        errors.privacy = 'Devi accettare l\'informativa privacy per continuare.';
    }

    if (Object.keys(errors).length > 0 || normalizedBirthDate === null) {
        return {
            errors,
            subscriber: null,
        };
    }

    return {
        errors,
        subscriber: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            email: payload.email,
            birthDate: normalizedBirthDate,
            city: payload.city,
            phone: payload.phone,
        } satisfies NewsletterSubscriber,
    };
}
