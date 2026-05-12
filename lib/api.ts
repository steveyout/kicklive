// lib/api.ts
import { APIMatch, Stream } from "@/types/stream";

const BASE_URL = "https://streamed.st";

export async function getAllMatches(): Promise<APIMatch[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/matches/all`, {
            next: { revalidate: 60 },
        });

        if (!res.ok) return [];

        const data = await res.json();

        // Map the API's 'id' to our 'slug' property
        return data.map((match: any) => ({
            ...match,
            // Use the ID as the slug since that's what the API provides
            slug: match.id
        }));
    } catch (error) {
        console.error("Fetch Error:", error);
        return [];
    }
}

/**
 * Fetch specific streams for a given source and source-id
 */
export async function getStreamsBySource(source: string, id: string): Promise<Stream[]> {
    try {
        const res = await fetch(`${BASE_URL}/api/stream/${source}/${id}`);
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error("Stream Fetch Error:", error);
        return [];
    }
}

/**
 * Image Resolver (Keeping your existing logic)
 */
export function getMatchImage(type: 'badge' | 'poster' | 'proxy', value: string, secondaryValue?: string): string {
    if (!value) return "/placeholder.jpg";
    const cleanValue = value.startsWith('/') ? value.slice(1) : value;

    switch (type) {
        case 'badge':
            return `${BASE_URL}/api/images/badge/${cleanValue}.webp`;
        case 'poster':
            return `${BASE_URL}/api/images/poster/${cleanValue}/${secondaryValue || cleanValue}.webp`;
        case 'proxy':
            if (value.includes('api/images/proxy')) {
                const absolutePath = value.startsWith('/') ? value : `/${value}`;
                return `${BASE_URL}${absolutePath}`;
            }
            return `${BASE_URL}/api/images/proxy/${cleanValue}.webp`;
        default:
            return value;
    }
}