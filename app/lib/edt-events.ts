import 'server-only';

import {
    EDT_API_BASE_URL,
    getEdtApiHeaders,
    requireEdtAccessToken,
} from '@/app/lib/edt-auth';
import type { EdtEvent, EdtEventsResponse } from '@/app/lib/edt-types';

export type { EdtEvent, EdtEventsResponse } from '@/app/lib/edt-types';

const DEFAULT_LOCATION = process.env.EDT_DEFAULT_LOCATION ?? '27177';
const DEFAULT_TAG = process.env.EDT_DEFAULT_TAG ?? '';

async function fetchEdtJson<T>(path: string, accessToken: string): Promise<T> {
    const response = await fetch(`${EDT_API_BASE_URL}${path}`, {
        cache: 'no-store',
        headers: getEdtApiHeaders(accessToken),
        method: 'GET',
    });

    if (!response.ok) {
        throw new Error(`EDT API request failed with status ${response.status}`);
    }

    return response.json() as Promise<T>;
}

function getEventStartTimestamp(event: EdtEvent) {
    const timestamp = Date.parse(event.dates?.startDate ?? '');

    return Number.isNaN(timestamp) ? Number.POSITIVE_INFINITY : timestamp;
}

export function sortEventsByStartDate(events: EdtEvent[]) {
    return [...events].sort(
        (firstEvent, secondEvent) =>
            getEventStartTimestamp(firstEvent) -
            getEventStartTimestamp(secondEvent),
    );
}

export async function getEvents(returnTo: string, tag:string = DEFAULT_TAG, location:string = DEFAULT_LOCATION) {
    const accessToken = await requireEdtAccessToken(returnTo);

    return fetchEdtJson<EdtEventsResponse>(
        `/event?locations=${encodeURIComponent(location)}&tags=${encodeURIComponent(tag)}`,
        accessToken,
    );
}

export default getEvents;
