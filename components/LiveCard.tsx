// components/LiveCard.tsx
import Link from 'next/link';
import { APIMatch } from '@/types/stream';
import { getMatchImage } from '@/lib/api';

export const LiveCard = ({ match }: { match: APIMatch }) => {
    // 1. Get the main background using the proxy route
    const mainPoster = getMatchImage('proxy', match.poster || "");

    // 2. Get individual team badges for the vs overlay
    const homeBadge = match.teams?.home?.badge
        ? getMatchImage('badge', match.teams.home.badge)
        : null;
    const awayBadge = match.teams?.away?.badge
        ? getMatchImage('badge', match.teams.away.badge)
        : null;

    return (
        <Link href={`/watch/${match.id}`}>
            <div className="group relative aspect-video overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-all hover:border-sports-red/50 hover:shadow-glow hover:scale-[1.02]">

                {/* Main Proxied Poster */}
                <img
                    src={mainPoster}
                    className="h-full w-full object-cover opacity-40 group-hover:opacity-60 transition-all duration-700"
                    alt={match.title}
                    loading="lazy"
                />

                {/* VS Badge Overlay */}
                {homeBadge && awayBadge && (
                    <div className="absolute inset-0 flex items-center justify-center gap-8 group-hover:scale-105 transition-transform duration-500">
                        <img src={homeBadge} className="w-12 h-12 object-contain drop-shadow-2xl" alt="home" />
                        <span className="text-white/10 font-black italic text-2xl uppercase italic">vs</span>
                        <img src={awayBadge} className="w-12 h-12 object-contain drop-shadow-2xl" alt="away" />
                    </div>
                )}

                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                {/* Status Indicators */}
                <div className="absolute top-4 left-4 flex gap-2">
                    {match.date === 0 ? (
                        <div className="bg-sports-red px-2 py-1 rounded text-[8px] font-black uppercase tracking-[0.2em] text-white animate-pulse">
                            Live 24/7
                        </div>
                    ) : (
                        <div className="bg-white/10 backdrop-blur-md px-2 py-1 rounded text-[8px] font-black uppercase tracking-[0.2em] text-zinc-300">
                            Scheduled
                        </div>
                    )}
                </div>

                {/* Info Section */}
                <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-[9px] font-bold text-sports-red uppercase tracking-widest mb-1">
                        {match.category}
                    </p>
                    <h3 className="text-sm font-bold text-white truncate group-hover:text-sports-red transition-colors">
                        {match.title}
                    </h3>
                    <div className="flex justify-between items-center mt-3 pt-3 border-t border-white/5 text-[9px] font-bold text-zinc-500 uppercase">
                        <span>{match.sources.length} Sources</span>
                        <span>{match.date > 0 ? new Date(match.date).toLocaleTimeString() : 'Online'}</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};