"use client";

import { useState, useEffect } from "react";
import { getStreamsBySource } from "@/lib/api";
import { Stream, SourceReference } from "@/types/stream";

export const VideoPlayer = ({ initialSources = [] }: { initialSources: SourceReference[] }) => {
    const [activeSourceRef, setActiveSourceRef] = useState<SourceReference | null>(
        initialSources.length > 0 ? initialSources[0] : null
    );

    const [availableStreams, setAvailableStreams] = useState<Stream[]>([]);
    const [currentStream, setCurrentStream] = useState<Stream | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!activeSourceRef) return;

        const loadStreams = async () => {
            setLoading(true);
            try {
                const streams = await getStreamsBySource(activeSourceRef.source, activeSourceRef.id);
                setAvailableStreams(streams);
                if (streams.length > 0) {
                    setCurrentStream(streams[0]);
                }
            } catch (error) {
                console.error("Failed to fetch streams:", error);
            } finally {
                setLoading(false);
            }
        };

        loadStreams();
    }, [activeSourceRef]);

    if (!initialSources || initialSources.length === 0) {
        return (
            <div className="aspect-video w-full rounded-3xl bg-zinc-900 border border-white/5 flex items-center justify-center">
                <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">No Sources Available</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6">
            {/* Player Display */}
            <div className="relative aspect-video w-full rounded-3xl bg-black border border-white/5 overflow-hidden shadow-2xl shadow-sports-red/10">
                {loading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950">
                        <div className="w-10 h-10 border-2 border-sports-red border-t-transparent rounded-full animate-spin mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 italic">Initializing Tunnel...</p>
                    </div>
                ) : currentStream ? (
                    <iframe
                        src={currentStream.embedUrl}
                        className="absolute inset-0 w-full h-full"
                        allowFullScreen
                        scrolling="no"
                        allow="autoplay; encrypted-media"
                    />
                ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <p className="text-zinc-600 text-[10px] font-black uppercase tracking-widest">Select a source to begin</p>
                    </div>
                )}
            </div>

            {/* Control Panel */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Source Switcher */}
                <div className="space-y-3">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Primary Sources</h3>
                    <div className="flex flex-wrap gap-2">
                        {initialSources.map((s, idx) => (
                            <button
                                // FIX: Combined key ensures uniqueness even if IDs repeat
                                key={`source-${s.source}-${s.id}-${idx}`}
                                onClick={() => setActiveSourceRef(s)}
                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                    activeSourceRef?.id === s.id
                                        ? "bg-sports-red text-white shadow-glow"
                                        : "bg-white/5 text-zinc-500 hover:text-white"
                                }`}
                            >
                                {s.source}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Stream/Language Switcher */}
                <div className="space-y-3">
                    <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest px-1">Available Feeds</h3>
                    <div className="flex flex-wrap gap-2">
                        {availableStreams.length > 0 ? (
                            availableStreams.map((stream, idx) => (
                                <button
                                    // FIX: Combined key using streamNo and index to prevent duplicate key error
                                    key={`stream-${stream.id}-${stream.streamNo}-${idx}`}
                                    onClick={() => setCurrentStream(stream)}
                                    className={`px-4 py-2 rounded-xl text-[10px] font-bold transition-all flex items-center gap-2 ${
                                        currentStream?.id === stream.id
                                            ? "bg-white text-black"
                                            : "bg-zinc-900 text-zinc-400 hover:text-white"
                                    }`}
                                >
                                    <span>{stream.language}</span>
                                    {stream.hd && <span className="text-[8px] bg-sports-red text-white px-1 rounded-sm">HD</span>}
                                </button>
                            ))
                        ) : (
                            <span className="text-[10px] font-bold text-zinc-700 uppercase italic p-2">Waiting for source...</span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};