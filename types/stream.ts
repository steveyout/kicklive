// types/schema.ts or top of page file
export interface SportsEventSchema {
    "@context": "https://schema.org";
    "@type": "SportsEvent";
    name: string;
    description: string;
    startDate: string;
    eventStatus: "https://schema.org/EventLive" | "https://schema.org/EventScheduled" | "https://schema.org/EventPostponed";
    location: {
        "@type": "Place";
        name: string;
        url: string;
    };
    homeTeam?: {
        "@type": "SportsTeam";
        name: string;
        image: string;
    };
    awayTeam?: {
        "@type": "SportsTeam";
        name: string;
        image: string;
    };
}

// types/stream.ts
export interface APIMatch {
    id: string;
    slug: string;
    title: string;
    category: string;
    date: number; // Unix timestamp in ms
    poster?: string;
    popular: boolean;
    teams?: {
        home?: {
            name: string;
            badge: string;
        },
        away?: {
            name: string;
            badge: string;
        }
    };
    sources: {
        source: string;
        id: string;
    }[];
}

export interface Stream {
    id: string;        // Unique identifier for the stream
    streamNo: number;  // Stream number/index
    language: string;  // Stream language (e.g., "English")
    hd: boolean;       // Quality indicator
    embedUrl: string;  // The actual URL for the iframe
    source: string;    // Source identifier (e.g., "alpha")
}


export interface SourceReference {
    source: string;
    id: string;
}