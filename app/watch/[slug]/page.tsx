import { getAllMatches, getMatchImage } from "@/lib/api";
import { VideoPlayer } from "@/components/VideoPlayer";
import { notFound } from "next/navigation";
import {SportsEventSchema} from "@/types/stream";
import {Metadata} from "next";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function WatchPage({ params }: PageProps) {
    // 1. Await params to get the slug from the URL
    const { slug } = await params;

    // 2. Fetch matches (slug is now mapped to ID in lib/api.ts)
    const matches = await getAllMatches();

    // 3. Find the match where the generated slug matches the URL
    const match = matches.find((m) => m.slug === slug);

    // 4. Handle 404
    if (!match) return notFound();

    const poster = getMatchImage('proxy', match.poster || "");


    // Inside your WatchPage component

    const jsonLd: SportsEventSchema = {
        "@context": "https://schema.org",
        "@type": "SportsEvent",
        name: match.title,
        description: `Watch ${match.title} live streaming in HD on Kicklive.`,
        startDate: new Date(match.date).toISOString(),
        eventStatus: match.popular
            ? "https://schema.org/EventLive"
            : "https://schema.org/EventScheduled",
        location: {
            "@type": "Place",
            "name": "Live Online",
            "url": `https://kicklive.st/watch/${slug}`
        }
    };

// Safely add teams if they exist
    if (match.teams?.home && match.teams?.away) {
        jsonLd.homeTeam = {
            "@type": "SportsTeam",
            name: match.teams.home.name,
            image: getMatchImage('badge', match.teams.home.badge)
        };
        jsonLd.awayTeam = {
            "@type": "SportsTeam",
            name: match.teams.away.name,
            image: getMatchImage('badge', match.teams.away.badge)
        };
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
        <main className="min-h-screen bg-[#050505] text-white">
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="mb-6">
          <span className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">
            {match.category} / <span className="text-white">{match.title}</span>
          </span>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white">
                            {match.title}
                        </h1>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1.5 bg-sports-red px-2 py-0.5 rounded text-[9px] font-black uppercase">
                                <div className="w-1 h-1 bg-white rounded-full animate-ping" />
                                Live
                            </div>
                            <span className="text-zinc-500 text-[10px] font-bold uppercase tracking-widest">
                {(match.sources || []).length} Sources Online
              </span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-3 space-y-6">
                        <VideoPlayer initialSources={match.sources || []} />

                        <div className="p-8 rounded-3xl bg-zinc-900/40 border border-white/5 backdrop-blur-sm">
                            <h2 className="text-xs font-black uppercase tracking-widest text-sports-red mb-4">Stream Information</h2>
                            <p className="text-zinc-400 text-sm leading-relaxed">
                                Now broadcasting <span className="text-white font-bold">{match.title}</span>.
                                If you experience buffering, switch between the available Echo or Alpha sources.
                            </p>
                        </div>
                    </div>

                    <aside className="space-y-4">
                        <div className="p-6 rounded-3xl bg-white/5 border border-white/10">
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-3">Server Status</h3>
                            <div className="flex justify-between items-center text-[10px] font-bold">
                                <span className="text-zinc-400">Latency</span>
                                <span className="text-green-500">24ms</span>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
            </>
    );
}


// app/watch/[slug]/page.tsx

interface PageProps {
    params: Promise<{ slug: string }>;
}

/**
 * SEO: Dynamic Metadata Generation
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const matches = await getAllMatches();
    const match = matches.find((m) => m.slug === slug);

    if (!match) {
        return {
            title: "Match Not Found | Kicklive",
        };
    }

    const title = `LIVE: ${match.title} | Football Live Streaming | Kicklive`;
    const description = `Watch ${match.title} live stream. High-quality HD coverage of ${match.category} on Kicklive. Zero latency and mobile friendly.`;
    const poster = getMatchImage('proxy', match.poster || "");

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [poster],
            type: "video.other",
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [poster],
        },
    };
}