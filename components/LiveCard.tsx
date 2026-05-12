// components/LiveCard.tsx
import Link from 'next/link';
import { StreamEmbed } from '@/types/stream';

export const LiveCard = ({ stream }: { stream: StreamEmbed }) => {
    return (
        <Link href={`/watch/${stream.id}`}>
    <div className="group relative aspect-video overflow-hidden rounded-2xl bg-zinc-900 border border-white/5 transition-all hover:border-red-600/50 hover:scale-[1.02]">
        {/* Poster Image */}
        <img
    src={stream.poster}
    className="h-full w-full object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500"
    alt={stream.title || "Match Poster"}
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

        {/* Status Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
    <div className="flex items-center gap-1.5 bg-red-600 px-2.5 py-1 rounded-md text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-red-900/50 animate-pulse">
    <span className="w-1.5 h-1.5 bg-white rounded-full" />
        Live
        </div>
    {stream.hd && (
        <div className="bg-white/10 backdrop-blur-md border border-white/10 px-2 py-1 rounded-md text-[10px] font-bold text-zinc-300 uppercase">
            HD
            </div>
    )}
    </div>

    {/* Info Area */}
    <div className="absolute bottom-4 left-4 right-4">
    <span className="text-[10px] font-bold text-red-500 uppercase tracking-widest">{stream.category}</span>
        <h3 className="text-lg font-bold text-white truncate leading-tight mt-1">
        {stream.title}
        </h3>
        <div className="flex items-center justify-between mt-2 text-[11px] text-zinc-400 font-medium">
        <span>{stream.language}</span>
        <span>{stream.viewers.toLocaleString()} Viewers</span>
    </div>
    </div>
    </div>
    </Link>
);
};