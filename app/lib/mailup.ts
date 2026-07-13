import { appendFile, mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

import type { NewsletterSubscriber } from '@/app/lib/newsletter-validation';

type MailUpMode = 'demo' | 'live';

type MailUpFieldKey = Exclude<keyof NewsletterSubscriber, 'email'>;

type MailUpFieldDefinition = {
    id: number;
    description: string;
    aliases: string[];
};

type MailUpConfig = {
    mode: MailUpMode;
    listId: string;
    groupIds: number[];
    confirmEmail: boolean;
    clientId: string;
    clientSecret: string;
    tokenFilePath: string;
    fieldMap: Record<MailUpFieldKey, MailUpFieldDefinition>;
};

type MailUpTokenFile = {
    access_token?: unknown;
    refresh_token?: unknown;
    expires_in?: unknown;
    created_at?: unknown;
    expires_at?: unknown;
    list_id?: unknown;
    list_guid?: unknown;
    list_name?: unknown;
};

type MailUpTokenState = {
    accessToken: string;
    refreshToken: string;
    expiresIn?: number;
    createdAt?: string;
    expiresAt?: string;
    listId?: string;
    listGuid?: string;
    listName?: string;
    raw: MailUpTokenFile;
};

type MailUpDynamicField = {
    Id?: number;
    Description?: string;
};

type MailUpRecipientField = {
    Id: number;
    Description: string;
    Value: string;
};

type MailUpRequestResponse = {
    status: number;
    body: string;
};

type MailUpRequestOptions = {
    retryOnUnauthorized?: boolean;
};

export type MailUpSubscriptionResult = {
    mode: MailUpMode;
    recipientId: number | null;
};

const authEndpoint = 'https://services.mailup.com/Authorization/OAuth/Token';
const apiBase = 'https://services.mailup.com/API/v1.1/Rest/ConsoleService.svc';
const defaultTokenFilePath = path.join(process.cwd(), 'app', 'lib', 'mailup-token.json');
const requestTimeoutMs = 20000;
const tokenExpirySkewMs = 60000;

export class MailUpClientError extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'MailUpClientError';
    }
}

function getEnvBoolean(value: string | undefined) {
    return value === 'true' || value === '1' || value === 'yes';
}

function getEnvNumber(value: string | undefined, fallback: number) {
    if (!value) {
        return fallback;
    }

    const parsed = Number(value);

    return Number.isFinite(parsed) ? parsed : fallback;
}

function getEnvGroupIds(value: string | undefined) {
    if (!value) {
        return [];
    }

    return value
        .split(',')
        .map((groupId) => Number(groupId.trim()))
        .filter((groupId) => Number.isInteger(groupId) && groupId > 0);
}

function getMailUpConfig(): MailUpConfig {
    return {
        mode: process.env.MAILUP_MODE === 'demo' ? 'demo' : 'live',
        listId: process.env.MAILUP_LIST_ID?.trim() ?? '',
        groupIds: getEnvGroupIds(process.env.MAILUP_GROUP_IDS),
        confirmEmail: getEnvBoolean(process.env.MAILUP_CONFIRM_EMAIL),
        clientId: process.env.MAILUP_CLIENT_ID ?? '',
        clientSecret: process.env.MAILUP_CLIENT_SECRET ?? '',
        tokenFilePath: process.env.MAILUP_TOKEN_FILE_PATH ?? defaultTokenFilePath,
        fieldMap: {
            firstName: {
                id: getEnvNumber(process.env.MAILUP_FIELD_FIRST_NAME_ID, 1),
                description: 'FirstName',
                aliases: ['FirstName', 'Nome'],
            },
            lastName: {
                id: getEnvNumber(process.env.MAILUP_FIELD_LAST_NAME_ID, 2),
                description: 'LastName',
                aliases: ['LastName', 'Cognome', 'Surname'],
            },
            birthDate: {
                id: getEnvNumber(process.env.MAILUP_FIELD_BIRTH_DATE_ID, 0),
                description: 'DateOfBirth',
                aliases: ['DateOfBirth', 'Date of birth', 'Data di nascita', 'Birthday'],
            },
            city: {
                id: getEnvNumber(process.env.MAILUP_FIELD_CITY_ID, 4),
                description: 'City',
                aliases: ['City', 'Citta'],
            },
            phone: {
                id: getEnvNumber(process.env.MAILUP_FIELD_PHONE_ID, 11),
                description: 'phone',
                aliases: ['phone', 'Phone', 'Telefono', 'Cellulare'],
            },
        },
    };
}

function getStringTokenValue(value: unknown) {
    return typeof value === 'string' ? value.trim() : '';
}

function getOptionalStringTokenValue(value: unknown) {
    const normalizedValue = getStringTokenValue(value);

    return normalizedValue !== '' ? normalizedValue : undefined;
}

function getOptionalNumberTokenValue(value: unknown) {
    if (typeof value === 'number' && Number.isFinite(value)) {
        return value;
    }

    if (typeof value === 'string' && value.trim() !== '') {
        const parsed = Number(value);

        return Number.isFinite(parsed) ? parsed : undefined;
    }

    return undefined;
}

function normalizeTokenFile(data: MailUpTokenFile): MailUpTokenState {
    const accessToken = getStringTokenValue(data.access_token);
    const refreshToken = getStringTokenValue(data.refresh_token);

    if (accessToken === '' || refreshToken === '') {
        throw new MailUpClientError('File token MailUp incompleto: access_token e refresh_token sono obbligatori.');
    }

    return {
        accessToken,
        refreshToken,
        expiresIn: getOptionalNumberTokenValue(data.expires_in),
        createdAt: getOptionalStringTokenValue(data.created_at),
        expiresAt: getOptionalStringTokenValue(data.expires_at),
        listId: getOptionalStringTokenValue(data.list_id),
        listGuid: getOptionalStringTokenValue(data.list_guid),
        listName: getOptionalStringTokenValue(data.list_name),
        raw: data,
    };
}

function isTokenExpired(token: MailUpTokenState) {
    if (!token.expiresAt) {
        return false;
    }

    const expiresAt = Date.parse(token.expiresAt);
    if (!Number.isFinite(expiresAt)) {
        return false;
    }

    return expiresAt <= Date.now() + tokenExpirySkewMs;
}

function parseAccessToken(responseBody: string) {
    const decoded = JSON.parse(responseBody) as {
        access_token?: unknown;
        refresh_token?: unknown;
        expires_in?: unknown;
    };
    const accessToken = getStringTokenValue(decoded.access_token);
    const refreshToken = getStringTokenValue(decoded.refresh_token);

    if (accessToken === '' || refreshToken === '') {
        throw new MailUpClientError('Refresh token MailUp fallito: risposta OAuth non valida.');
    }

    return {
        accessToken,
        refreshToken,
        expiresIn: getOptionalNumberTokenValue(decoded.expires_in) ?? 3600,
    };
}

function normalizeLabel(value: string) {
    return value
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase();
}

function extractErrorMessage(responseBody: string) {
    try {
        const decoded = JSON.parse(responseBody) as Record<string, unknown>;

        for (const key of ['ErrorDescription', 'Message', 'error_description', 'error']) {
            const value = decoded[key];
            if (typeof value === 'string' && value.trim() !== '') {
                return value;
            }
        }
    } catch {
        return responseBody.trim();
    }

    return responseBody.trim();
}

function parseRecipientId(responseBody: string) {
    const trimmedBody = responseBody.trim();
    if (trimmedBody === '') {
        return null;
    }

    try {
        const decoded = JSON.parse(trimmedBody) as unknown;
        if (typeof decoded === 'number' && Number.isInteger(decoded)) {
            return decoded;
        }

        if (
            decoded !== null &&
            typeof decoded === 'object' &&
            'idRecipient' in decoded
        ) {
            const idRecipient = Number((decoded as { idRecipient: unknown }).idRecipient);

            return Number.isInteger(idRecipient) ? idRecipient : null;
        }
    } catch {
        const recipientId = Number(trimmedBody);

        return Number.isInteger(recipientId) ? recipientId : null;
    }

    return null;
}

async function storeDemoLead(subscriber: NewsletterSubscriber) {
    const storagePath = process.env.MAILUP_DEMO_LOG_PATH ??
        path.join(process.cwd(), 'storage', 'mailup-demo-submissions.log');

    await mkdir(path.dirname(storagePath), { recursive: true });
    await appendFile(
        storagePath,
        `${JSON.stringify({
            ...subscriber,
            created_at: new Date().toISOString(),
        })}\n`,
        'utf8',
    );
}

class MailUpClient {
    private tokenState: MailUpTokenState | null = null;

    constructor(private readonly config: MailUpConfig) {}

    async subscribe(subscriber: NewsletterSubscriber): Promise<MailUpSubscriptionResult> {
        if (this.config.mode !== 'live') {
            await storeDemoLead(subscriber);

            return {
                mode: 'demo',
                recipientId: null,
            };
        }

        this.assertReady();

        let token = await this.getAccessToken();
        const fields = await this.buildFields(subscriber, token);
        token = await this.getAccessToken();
        const endpoint = new URL(`${apiBase}/Console/List/${encodeURIComponent(await this.getListId())}/Recipient`);

        if (this.config.confirmEmail) {
            endpoint.searchParams.set('ConfirmEmail', 'true');
        }

        const payload = {
            Email: subscriber.email,
            Name: `${subscriber.firstName} ${subscriber.lastName}`.trim(),
            MobileNumber: '',
            MobilePrefix: '',
            Fields: fields,
        };

        const response = await this.request(
            'POST',
            endpoint.toString(),
            {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                Accept: 'application/json',
            },
            JSON.stringify(payload),
        );

        const recipientId = parseRecipientId(response.body);
        token = await this.getAccessToken();
        await this.assignRecipientToGroups(token, recipientId);

        return {
            mode: 'live',
            recipientId,
        };
    }

    private assertReady() {
        const requiredValues = [
            this.config.clientId,
            this.config.clientSecret,
            this.config.tokenFilePath,
        ];

        if (requiredValues.some((value) => value.trim() === '')) {
            throw new MailUpClientError('Configurazione MailUp incompleta: verifica client_id, client_secret e token file.');
        }
    }

    private async getListId() {
        if (this.config.listId !== '') {
            return this.config.listId;
        }

        const token = await this.readTokenFile();
        const listId = token.listId ?? token.listGuid;

        if (!listId) {
            throw new MailUpClientError('Configurazione MailUp incompleta: imposta MAILUP_LIST_ID o list_id nel file token.');
        }

        return listId;
    }

    private async readTokenFile() {
        if (this.tokenState !== null) {
            return this.tokenState;
        }

        try {
            const content = await readFile(this.config.tokenFilePath, 'utf8');
            const data = JSON.parse(content) as MailUpTokenFile;
            this.tokenState = normalizeTokenFile(data);

            return this.tokenState;
        } catch (error) {
            if (error instanceof MailUpClientError) {
                throw error;
            }

            throw new MailUpClientError('Impossibile leggere il file token MailUp.');
        }
    }

    private async getAccessToken() {
        const token = await this.readTokenFile();

        if (!isTokenExpired(token)) {
            return token.accessToken;
        }

        const refreshedToken = await this.refreshToken(token);

        return refreshedToken.accessToken;
    }

    private async refreshToken(token: MailUpTokenState) {
        const payload = new URLSearchParams({
            client_id: this.config.clientId,
            client_secret: this.config.clientSecret,
            refresh_token: token.refreshToken,
            grant_type: 'refresh_token',
        });

        const response = await this.request(
            'POST',
            authEndpoint,
            {
                'Content-Type': 'application/x-www-form-urlencoded',
                Accept: 'application/json',
            },
            payload.toString(),
            {
                retryOnUnauthorized: false,
            },
        );
        const refreshedToken = parseAccessToken(response.body);
        const now = new Date();
        const expiresAt = new Date(now.getTime() + refreshedToken.expiresIn * 1000);
        const nextToken: MailUpTokenState = {
            ...token,
            accessToken: refreshedToken.accessToken,
            refreshToken: refreshedToken.refreshToken,
            expiresIn: refreshedToken.expiresIn,
            createdAt: now.toISOString(),
            expiresAt: expiresAt.toISOString(),
            raw: {
                ...token.raw,
                access_token: refreshedToken.accessToken,
                refresh_token: refreshedToken.refreshToken,
                expires_in: refreshedToken.expiresIn,
                created_at: now.toISOString(),
                expires_at: expiresAt.toISOString(),
            },
        };

        await this.writeTokenFile(nextToken);
        this.tokenState = nextToken;

        return nextToken;
    }

    private async writeTokenFile(token: MailUpTokenState) {
        const tokenDirectory = path.dirname(this.config.tokenFilePath);
        const temporaryPath = path.join(
            tokenDirectory,
            `.mailup-token.${Date.now()}.${Math.random().toString(16).slice(2)}.tmp`,
        );
        const content = `${JSON.stringify(token.raw, null, 4)}\n`;

        await mkdir(tokenDirectory, { recursive: true });
        await writeFile(temporaryPath, content, 'utf8');
        await rename(temporaryPath, this.config.tokenFilePath);
    }

    private async assignRecipientToGroups(token: string, recipientId: number | null) {
        if (recipientId === null || recipientId <= 0) {
            return;
        }

        for (const groupId of this.config.groupIds) {
            await this.request(
                'POST',
                `${apiBase}/Console/Group/${groupId}/Subscribe/${recipientId}?confirmSubscription=false`,
                {
                    Authorization: `Bearer ${token}`,
                    Accept: 'application/json',
                },
            );
        }
    }

    private async buildFields(subscriber: NewsletterSubscriber, token: string) {
        let dynamicFields: MailUpDynamicField[] | null = null;
        const fields: MailUpRecipientField[] = [];

        for (const key of Object.keys(this.config.fieldMap) as MailUpFieldKey[]) {
            const value = subscriber[key].trim();
            if (value === '') {
                continue;
            }

            const definition = this.config.fieldMap[key];
            let fieldId = definition.id;
            let description = definition.description;

            if (fieldId <= 0) {
                dynamicFields ??= await this.fetchDynamicFields(token);
                [fieldId, description] = this.resolveDynamicField(dynamicFields, definition);
            }

            if (fieldId <= 0) {
                throw new MailUpClientError(`Impossibile mappare il campo MailUp "${key}". Imposta l'ID corretto nelle variabili ambiente.`);
            }

            fields.push({
                Id: fieldId,
                Description: description,
                Value: value,
            });
        }

        return fields;
    }

    private async fetchDynamicFields(token: string) {
        const response = await this.request(
            'GET',
            `${apiBase}/Console/Recipient/DynamicFields?PageNumber=0&PageSize=50&orderby="Id+asc"`,
            {
                Authorization: `Bearer ${token}`,
                Accept: 'application/json',
            },
        );
        const data = JSON.parse(response.body) as { Items?: unknown };

        if (!Array.isArray(data.Items)) {
            throw new MailUpClientError('Impossibile leggere i campi dinamici MailUp.');
        }

        return data.Items as MailUpDynamicField[];
    }

    private resolveDynamicField(
        dynamicFields: MailUpDynamicField[],
        definition: MailUpFieldDefinition,
    ): [number, string] {
        const aliases = definition.aliases.map(normalizeLabel);

        for (const field of dynamicFields) {
            const label = normalizeLabel(field.Description ?? '');
            if (label !== '' && aliases.includes(label)) {
                return [
                    typeof field.Id === 'number' ? field.Id : 0,
                    field.Description ?? '',
                ];
            }
        }

        return [0, definition.description];
    }

    private async request(
        method: string,
        url: string,
        headers: Record<string, string>,
        body?: string,
        options: MailUpRequestOptions = {},
    ): Promise<MailUpRequestResponse> {
        const response = await fetch(url, {
            method,
            headers,
            body,
            cache: 'no-store',
            signal: AbortSignal.timeout(requestTimeoutMs),
        });
        const responseBody = await response.text();

        if (!response.ok) {
            if (response.status === 401 && options.retryOnUnauthorized !== false) {
                const refreshedToken = await this.refreshToken(await this.readTokenFile());
                const retryHeaders = headers.Authorization
                    ? {
                        ...headers,
                        Authorization: `Bearer ${refreshedToken.accessToken}`,
                    }
                    : headers;

                return this.request(method, url, retryHeaders, body, {
                    retryOnUnauthorized: false,
                });
            }

            const message = extractErrorMessage(responseBody);
            throw new MailUpClientError(`MailUp ha rifiutato la richiesta: ${message !== '' ? message : `HTTP ${response.status}`}`);
        }

        return {
            status: response.status,
            body: responseBody,
        };
    }
}

export async function subscribeToMailUpNewsletter(subscriber: NewsletterSubscriber) {
    const mailUp = new MailUpClient(getMailUpConfig());

    return mailUp.subscribe(subscriber);
}
