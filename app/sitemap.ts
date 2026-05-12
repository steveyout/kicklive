// app/sitemap.ts
import { getAllMatches } from "@/lib/api";

export default async function sitemap() {
    const matches = await getAllMatches();
    const matchEntries = matches.map((match) => ({
        url: `https://kicklive.st/watch/${match.slug}`,
        lastModified: new Date(),
        changeFrequency: 'hourly',
        priority: 1,
    }));

    return [
        { url: 'https://kicklive.st', lastModified: new Date(), priority: 1 },
        ...matchEntries,
    ];
}