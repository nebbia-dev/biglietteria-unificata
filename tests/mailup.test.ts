import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import test from 'node:test';

import { subscribeToMailUpNewsletter } from '../app/lib/mailup';
import type { NewsletterSubscriber } from '../app/lib/newsletter-validation';

const authEndpoint = 'https://services.mailup.com/Authorization/OAuth/Token';
const apiBase = 'https://services.mailup.com/API/v1.1/Rest/ConsoleService.svc';
const originalFetch = globalThis.fetch;
const mailUpEnvKeys = [
    'MAILUP_MODE',
    'MAILUP_CLIENT_ID',
    'MAILUP_CLIENT_SECRET',
    'MAILUP_LIST_ID',
    'MAILUP_GROUP_IDS',
    'MAILUP_CONFIRM_EMAIL',
    'MAILUP_TOKEN_FILE_PATH',
    'MAILUP_FIELD_FIRST_NAME_ID',
    'MAILUP_FIELD_LAST_NAME_ID',
    'MAILUP_FIELD_BIRTH_DATE_ID',
    'MAILUP_FIELD_CITY_ID',
    'MAILUP_FIELD_PHONE_ID',
];
const originalEnv = Object.fromEntries(
    mailUpEnvKeys.map((key) => [key, process.env[key]]),
);

type FetchCall = {
    url: string;
    init: RequestInit;
};

const subscriber: NewsletterSubscriber = {
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: 'ada@example.com',
    birthDate: '1815-12-10',
    city: 'Cremona',
    phone: '+39 333 123 4567',
};

test.afterEach(async () => {
    globalThis.fetch = originalFetch;

    for (const key of mailUpEnvKeys) {
        const originalValue = originalEnv[key];

        if (originalValue === undefined) {
            delete process.env[key];
        } else {
            process.env[key] = originalValue;
        }
    }
});

test('subscribes a recipient with the current access token', async () => {
    const { tokenFilePath, cleanup } = await createTokenFile({
        access_token: 'active-access',
        refresh_token: 'active-refresh',
        expires_at: '2999-01-01T00:00:00.000Z',
        list_id: '77',
    });
    const calls: FetchCall[] = [];

    configureMailUpEnv(tokenFilePath, {
        MAILUP_GROUP_IDS: '10,20',
        MAILUP_CONFIRM_EMAIL: 'true',
    });
    mockFetch(async (url, init) => {
        calls.push({ url, init });

        if (url.includes('/Console/List/77/Recipient')) {
            return new Response('12345', { status: 201 });
        }

        if (
            url === `${apiBase}/Console/Group/10/Subscribe/12345?confirmSubscription=false` ||
            url === `${apiBase}/Console/Group/20/Subscribe/12345?confirmSubscription=false`
        ) {
            return new Response(null, { status: 204 });
        }

        return new Response('unexpected call', { status: 500 });
    });

    try {
        const result = await subscribeToMailUpNewsletter(subscriber);

        assert.deepEqual(result, { mode: 'live', recipientId: 12345 });
        assert.equal(calls.some((call) => call.url === authEndpoint), false);

        const recipientCall = findCall(calls, '/Console/List/77/Recipient');
        assert.equal(new URL(recipientCall.url).searchParams.get('ConfirmEmail'), 'true');
        assert.equal(getHeader(recipientCall.init, 'Authorization'), 'Bearer active-access');
        assert.equal(getHeader(recipientCall.init, 'Content-Type'), 'application/json');
        assert.deepEqual(JSON.parse(String(recipientCall.init.body)), {
            Email: 'ada@example.com',
            Name: 'Ada Lovelace',
            MobileNumber: '',
            MobilePrefix: '',
            Fields: [
                { Id: 1, Description: 'FirstName', Value: 'Ada' },
                { Id: 2, Description: 'LastName', Value: 'Lovelace' },
                { Id: 3, Description: 'DateOfBirth', Value: '1815-12-10' },
                { Id: 4, Description: 'City', Value: 'Cremona' },
                { Id: 11, Description: 'phone', Value: '+39 333 123 4567' },
            ],
        });

        const groupCalls = calls.filter((call) => call.url.includes('/Console/Group/'));
        assert.equal(groupCalls.length, 2);
        assert.deepEqual(
            groupCalls.map((call) => getHeader(call.init, 'Authorization')),
            ['Bearer active-access', 'Bearer active-access'],
        );
    } finally {
        await cleanup();
    }
});

test('refreshes an expired token before creating the recipient', async () => {
    const { tokenFilePath, cleanup } = await createTokenFile({
        access_token: 'expired-access',
        refresh_token: 'refresh-before-subscribe',
        expires_at: '2000-01-01T00:00:00.000Z',
        list_id: '77',
    });
    const calls: FetchCall[] = [];

    configureMailUpEnv(tokenFilePath, {
        MAILUP_GROUP_IDS: '10',
    });
    mockFetch(async (url, init) => {
        calls.push({ url, init });

        if (url === authEndpoint) {
            const body = new URLSearchParams(String(init.body));

            assert.equal(body.get('client_id'), 'client-id');
            assert.equal(body.get('client_secret'), 'client-secret');
            assert.equal(body.get('refresh_token'), 'refresh-before-subscribe');
            assert.equal(body.get('grant_type'), 'refresh_token');

            return new Response(JSON.stringify({
                access_token: 'fresh-access',
                refresh_token: 'fresh-refresh',
                expires_in: 7200,
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (url.includes('/Console/List/77/Recipient')) {
            assert.equal(getHeader(init, 'Authorization'), 'Bearer fresh-access');

            return new Response(JSON.stringify({ idRecipient: 6789 }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (url === `${apiBase}/Console/Group/10/Subscribe/6789?confirmSubscription=false`) {
            assert.equal(getHeader(init, 'Authorization'), 'Bearer fresh-access');

            return new Response(null, { status: 204 });
        }

        return new Response('unexpected call', { status: 500 });
    });

    try {
        const result = await subscribeToMailUpNewsletter(subscriber);
        const savedToken = JSON.parse(await readFile(tokenFilePath, 'utf8')) as Record<string, unknown>;

        assert.deepEqual(result, { mode: 'live', recipientId: 6789 });
        assert.equal(calls.filter((call) => call.url === authEndpoint).length, 1);
        assert.equal(savedToken.access_token, 'fresh-access');
        assert.equal(savedToken.refresh_token, 'fresh-refresh');
        assert.equal(savedToken.expires_in, 7200);
        assert.equal(typeof savedToken.created_at, 'string');
        assert.equal(typeof savedToken.expires_at, 'string');
        assert.ok(Date.parse(String(savedToken.expires_at)) > Date.now());
    } finally {
        await cleanup();
    }
});

test('refreshes after a 401 and uses the refreshed token for group subscription', async () => {
    const { tokenFilePath, cleanup } = await createTokenFile({
        access_token: 'stale-access',
        refresh_token: 'refresh-after-401',
        expires_at: '2999-01-01T00:00:00.000Z',
        list_id: '77',
    });
    const calls: FetchCall[] = [];
    let recipientAttempts = 0;

    configureMailUpEnv(tokenFilePath, {
        MAILUP_GROUP_IDS: '10',
    });
    mockFetch(async (url, init) => {
        calls.push({ url, init });

        if (url === authEndpoint) {
            return new Response(JSON.stringify({
                access_token: 'retry-access',
                refresh_token: 'retry-refresh',
                expires_in: 3600,
            }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        if (url.includes('/Console/List/77/Recipient')) {
            recipientAttempts += 1;

            if (recipientAttempts === 1) {
                assert.equal(getHeader(init, 'Authorization'), 'Bearer stale-access');

                return new Response(JSON.stringify({ error_description: 'expired' }), {
                    status: 401,
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            assert.equal(getHeader(init, 'Authorization'), 'Bearer retry-access');

            return new Response('2468', { status: 201 });
        }

        if (url === `${apiBase}/Console/Group/10/Subscribe/2468?confirmSubscription=false`) {
            return new Response(null, {
                status: getHeader(init, 'Authorization') === 'Bearer retry-access' ? 204 : 401,
            });
        }

        return new Response('unexpected call', { status: 500 });
    });

    try {
        const result = await subscribeToMailUpNewsletter(subscriber);
        const authCalls = calls.filter((call) => call.url === authEndpoint);
        const groupCalls = calls.filter((call) => call.url.includes('/Console/Group/'));

        assert.deepEqual(result, { mode: 'live', recipientId: 2468 });
        assert.equal(recipientAttempts, 2);
        assert.equal(authCalls.length, 1);
        assert.equal(groupCalls.length, 1);
        assert.equal(getHeader(groupCalls[0].init, 'Authorization'), 'Bearer retry-access');
    } finally {
        await cleanup();
    }
});

function configureMailUpEnv(tokenFilePath: string, overrides: Record<string, string> = {}) {
    process.env.MAILUP_MODE = 'live';
    process.env.MAILUP_CLIENT_ID = 'client-id';
    process.env.MAILUP_CLIENT_SECRET = 'client-secret';
    process.env.MAILUP_LIST_ID = '';
    process.env.MAILUP_GROUP_IDS = '';
    process.env.MAILUP_CONFIRM_EMAIL = 'false';
    process.env.MAILUP_TOKEN_FILE_PATH = tokenFilePath;
    process.env.MAILUP_FIELD_FIRST_NAME_ID = '1';
    process.env.MAILUP_FIELD_LAST_NAME_ID = '2';
    process.env.MAILUP_FIELD_BIRTH_DATE_ID = '3';
    process.env.MAILUP_FIELD_CITY_ID = '4';
    process.env.MAILUP_FIELD_PHONE_ID = '11';

    for (const [key, value] of Object.entries(overrides)) {
        process.env[key] = value;
    }
}

async function createTokenFile(token: Record<string, unknown>) {
    const directory = await mkdtemp(path.join(os.tmpdir(), 'mailup-test-'));
    const tokenFilePath = path.join(directory, 'mailup-token.json');

    await writeFile(tokenFilePath, `${JSON.stringify(token, null, 4)}\n`, 'utf8');

    return {
        tokenFilePath,
        cleanup: () => rm(directory, { recursive: true, force: true }),
    };
}

function mockFetch(handler: (url: string, init: RequestInit) => Promise<Response>) {
    globalThis.fetch = async (input, init = {}) => handler(String(input), init);
}

function findCall(calls: FetchCall[], urlPart: string) {
    const call = calls.find((candidate) => candidate.url.includes(urlPart));

    assert.ok(call, `Expected fetch call including ${urlPart}`);

    return call;
}

function getHeader(init: RequestInit, name: string) {
    const headers = init.headers as Record<string, string>;

    return headers[name];
}
