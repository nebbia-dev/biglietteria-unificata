import 'server-only';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import { decrypt, encrypt } from '@/app/lib/session';

const ACCESS_TOKEN_COOKIE = 'access_token';
const REFRESH_TOKEN_COOKIE = 'refresh_token';

export const DOMNIA_API_BASE_URL =
    process.env.DOMNIA_API_BASE_URL ?? 'https://api-cremona.domniapass.com';
const DOMNIA_API_USERNAME =
    process.env.DOMNIA_API_USERNAME ?? 'info@nebbialab.it';
const DOMNIA_API_PASSWORD =
    process.env.DOMNIA_API_PASSWORD ?? 'lbr2i8U4W4Gxfv';
const DOMNIA_API_REALM = process.env.DOMNIA_API_REALM ?? 'production';
const DOMNIA_API_RESOURCE = process.env.DOMNIA_API_RESOURCE ?? 'desk';
const DOMNIA_API_SECRET =
    process.env.DOMNIA_API_SECRET ?? 'kpiKdvEM6oRc2DHWDUDB6zRMShOiopSm';

const DOMNIA_ORGANIZATION_CODE = process.env.DOMNIA_ORGANIZATION_CODE ?? 'CR';
const DOMNIA_PARTNER_CODE = process.env.DOMNIA_PARTNER_CODE ?? 'MCC';
const DOMNIA_ROLE_CODE = process.env.DOMNIA_ROLE_CODE ?? 'SELL_WEB_API';

type TokenCookiePayload = {
    accessToken?: string;
    expiresAt?: number;
    refreshToken?: string;
    token?: string;
};

type DomniaTokenResponse = {
    access_token: string;
    expires_at: number;
    refresh_expires_in: number;
    refresh_token: string;
};

type StoredDomniaSession = {
    accessExpiresAt?: number;
    accessToken?: string;
    refreshExpiresAt?: number;
    refreshToken?: string;
};

export type DomniaSession = {
    accessExpiresAt: number;
    accessToken: string;
    refreshExpiresAt?: number;
    refreshToken?: string;
};

export type PersistableDomniaSession = DomniaSession & {
    refreshExpiresAt: number;
    refreshToken: string;
};

function getJwtExpiration(token?: string) {
    if (!token) {
        return undefined;
    }

    try {
        const [, payload] = token.split('.');

        if (!payload) {
            return undefined;
        }

        const decoded = JSON.parse(
            Buffer.from(payload, 'base64url').toString('utf8'),
        ) as { exp?: number };

        return typeof decoded.exp === 'number'
            ? decoded.exp * 1000
            : undefined;
    } catch {
        return undefined;
    }
}

function normalizeCookiePayload(
    payload: TokenCookiePayload | undefined,
    legacyKey: 'accessToken' | 'refreshToken',
) {
    const token = payload?.token ?? payload?.[legacyKey];

    return {
        expiresAt: payload?.expiresAt ?? getJwtExpiration(token),
        token,
    };
}

function isValidToken(token?: string, expiresAt?: number) {
    return Boolean(token && expiresAt && expiresAt > Date.now());
}

function normalizeReturnTo(returnTo?: string | null) {
    if (!returnTo || !returnTo.startsWith('/') || returnTo.startsWith('//')) {
        return '/';
    }

    return returnTo;
}

function buildCookieOptions(expiresAt: number) {
    return {
        expires: new Date(expiresAt),
        httpOnly: true,
        path: '/',
        sameSite: 'lax' as const,
        secure: process.env.NODE_ENV === 'production',
    };
}

async function readStoredSession(): Promise<StoredDomniaSession> {
    const cookieStore = await cookies();

    const accessPayload = normalizeCookiePayload(
        await decrypt<TokenCookiePayload>(
            cookieStore.get(ACCESS_TOKEN_COOKIE)?.value,
        ),
        'accessToken',
    );

    const refreshPayload = normalizeCookiePayload(
        await decrypt<TokenCookiePayload>(
            cookieStore.get(REFRESH_TOKEN_COOKIE)?.value,
        ),
        'refreshToken',
    );

    return {
        accessExpiresAt: accessPayload.expiresAt,
        accessToken: accessPayload.token,
        refreshExpiresAt: refreshPayload.expiresAt,
        refreshToken: refreshPayload.token,
    };
}

async function requestSession(
    path: '/api/auth/refresh' | '/api/auth/token',
    body: Record<string, string>,
): Promise<PersistableDomniaSession> {
    const response = await fetch(`${DOMNIA_API_BASE_URL}${path}`, {
        body: JSON.stringify(body),
        cache: 'no-store',
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
    });

    if (!response.ok) {
        throw new Error(`Domnia auth request failed with status ${response.status}`);
    }

    const content = (await response.json()) as DomniaTokenResponse;

    return {
        accessExpiresAt: content.expires_at * 1000,
        accessToken: content.access_token,
        refreshExpiresAt:
            content.expires_at * 1000 + content.refresh_expires_in * 1000,
        refreshToken: content.refresh_token,
    };
}

async function createSession() {
    return requestSession('/api/auth/token', {
        password: DOMNIA_API_PASSWORD,
        realm: DOMNIA_API_REALM,
        resource: DOMNIA_API_RESOURCE,
        secret: DOMNIA_API_SECRET,
        username: DOMNIA_API_USERNAME,
    });
}

async function refreshSession(refreshToken: string) {
    return requestSession('/api/auth/refresh', {
        realm: DOMNIA_API_REALM,
        refreshToken,
        resource: DOMNIA_API_RESOURCE,
        secret: DOMNIA_API_SECRET,
    });
}

export function getDomniaApiHeaders(accessToken: string) {
    return {
        Authorization: `Bearer ${accessToken}`,
        'x-organization-code': DOMNIA_ORGANIZATION_CODE,
        'x-partner-code': DOMNIA_PARTNER_CODE,
        'x-role-code': DOMNIA_ROLE_CODE,
    };
}

export async function ensureDomniaSession(): Promise<{
    session: DomniaSession;
    shouldPersist: boolean;
}> {
    const storedSession = await readStoredSession();

    if (
        isValidToken(storedSession.accessToken, storedSession.accessExpiresAt)
    ) {
        return {
            session: {
                accessExpiresAt: storedSession.accessExpiresAt!,
                accessToken: storedSession.accessToken!,
                refreshExpiresAt: storedSession.refreshExpiresAt,
                refreshToken: storedSession.refreshToken,
            },
            shouldPersist: false,
        };
    }

    if (
        isValidToken(storedSession.refreshToken, storedSession.refreshExpiresAt)
    ) {
        try {
            return {
                session: await refreshSession(storedSession.refreshToken!),
                shouldPersist: true,
            };
        } catch (error) {
            console.warn(
                'Failed to refresh Domnia session, creating a new session instead',
                error,
            );
        }
    }

    return {
        session: await createSession(),
        shouldPersist: true,
    };
}

export async function getDomniaSessionCookies(
    session: PersistableDomniaSession,
) {
    const accessTokenValue = await encrypt({
        expiresAt: session.accessExpiresAt,
        token: session.accessToken,
    });
    const refreshTokenValue = await encrypt({
        expiresAt: session.refreshExpiresAt,
        token: session.refreshToken,
    });

    return [
        {
            name: ACCESS_TOKEN_COOKIE,
            options: buildCookieOptions(session.accessExpiresAt),
            value: accessTokenValue,
        },
        {
            name: REFRESH_TOKEN_COOKIE,
            options: buildCookieOptions(session.refreshExpiresAt),
            value: refreshTokenValue,
        },
    ];
}

export async function requireDomniaAccessToken(returnTo: string) {
    const storedSession = await readStoredSession();

    if (
        isValidToken(storedSession.accessToken, storedSession.accessExpiresAt)
    ) {
        return storedSession.accessToken!;
    }

    if (
        isValidToken(storedSession.refreshToken, storedSession.refreshExpiresAt)
    ) {
        try {
            const session = await refreshSession(storedSession.refreshToken!);

            return session.accessToken;
        } catch (error) {
            console.warn(
                'Inline Domnia refresh failed, falling back to session bootstrap route',
                error,
            );
        }
    }

    redirect(
        `/api/auth/session?returnTo=${encodeURIComponent(
            normalizeReturnTo(returnTo),
        )}`,
    );
}
