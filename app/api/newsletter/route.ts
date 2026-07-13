import { NextRequest, NextResponse } from 'next/server';

import { MailUpClientError, subscribeToMailUpNewsletter } from '@/app/lib/mailup';
import {
    normalizeNewsletterPayload,
    validateNewsletterPayload,
} from '@/app/lib/newsletter-validation';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

function isSameOrigin(request: NextRequest) {
    const origin = request.headers.get('origin');
    const host = request.headers.get('host');

    if (!origin || !host) {
        return true;
    }

    try {
        return new URL(origin).host === host;
    } catch {
        return false;
    }
}

export async function POST(request: NextRequest) {
    if (!isSameOrigin(request)) {
        return NextResponse.json(
            {
                ok: false,
                message: 'Origine della richiesta non consentita.',
            },
            { status: 403 },
        );
    }

    let body: unknown;

    try {
        body = await request.json();
    } catch {
        return NextResponse.json(
            {
                ok: false,
                message: 'Richiesta non valida.',
            },
            { status: 400 },
        );
    }

    const payload = normalizeNewsletterPayload(body);
    const validation = validateNewsletterPayload(payload);

    if (validation.subscriber === null) {
        return NextResponse.json(
            {
                ok: false,
                message: 'Controlla i dati inseriti.',
                errors: validation.errors,
            },
            { status: 400 },
        );
    }

    try {
        const result = await subscribeToMailUpNewsletter(validation.subscriber);

        return NextResponse.json({
            ok: true,
            mode: result.mode,
            recipientId: result.recipientId,
        });
    } catch (error) {
        console.error('Newsletter subscription failed', error);

        if (error instanceof MailUpClientError) {
            return NextResponse.json(
                {
                    ok: false,
                    message: error.message,
                },
                { status: 502 },
            );
        }

        return NextResponse.json(
            {
                ok: false,
                message: 'Non e stato possibile completare l\'iscrizione. Riprova piu tardi.',
            },
            { status: 500 },
        );
    }
}
