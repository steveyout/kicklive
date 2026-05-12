"use client";

import { useRef } from "react";

export function ScrollRow({ children, title, count }: { children: React.ReactNode, title: string, count: number }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const { scrollLeft, clientWidth } = scrollRef.current;
            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;
            scrollRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
        }
    };

    return (
        <section className="group">
            <div className="flex items-center justify-between mb-8 px-2">
                <div className="flex items-center gap-4">
                    <h2 className="text-2xl font-black italic uppercase tracking-tighter group-hover:text-sports-red transition-colors">
                        {title}
                    </h2>
                    <span className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em]">
            {count} Events
          </span>
                </div>

                <div className="hidden md:flex gap-3">
                    <button
                        onClick={() => scroll("left")}
                        className="w-10 h-10 rounded-full bg-zinc-900/50 border border-white/5 flex items-center justify-center hover:bg-zinc-800 hover:border-white/20 transition-all active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <button
                        onClick={() => scroll("right")}
                        className="w-10 h-10 rounded-full bg-zinc-900/50 border border-white/5 flex items-center justify-center hover:bg-zinc-800 hover:border-white/20 transition-all active:scale-95"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </div>

            <div className="relative">
                <div
                    ref={scrollRef}
                    className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
                >
                    {children}
                </div>
            </div>
        </section>
    );
}