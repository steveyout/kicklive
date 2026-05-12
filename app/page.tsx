import { getAllMatches } from "@/lib/api";
import { LiveCard } from "@/components/LiveCard";
import { ScrollRow } from "@/components/ScrollRow";

export default async function Home() {
  const matches = await getAllMatches();

  // 1. Force "Live" to the top by checking flags or categories
  const categories = matches.reduce((acc, match) => {
    // Check for 'popular' or if the category string is literally 'live'
    const isLive = match.popular === true || match.category?.toLowerCase() === "live";
    const cat = isLive ? "Live Now" : (match.category || "Other");

    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(match);
    return acc;
  }, {} as Record<string, any[]>);

  const categoryNames = Object.keys(categories).sort((a, b) => {
    if (a === "Live Now") return -1;
    if (b === "Live Now") return 1;
    return a.localeCompare(b);
  });

  return (
      <main className="min-h-screen bg-[#050505] text-white p-4 md:p-8">
        <div className="max-w-[1600px] mx-auto">

          {/* Updated Kicklive Branding */}
          <header className="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-black italic tracking-tighter uppercase">
                Kick<span className="text-sports-red">live</span>
              </h1>
              <p className="text-zinc-600 text-[10px] font-bold uppercase tracking-[0.4em] mt-1">
                Football Live Streaming HD
              </p>
            </div>

            <nav className="flex bg-zinc-900/50 border border-white/5 p-1 rounded-xl backdrop-blur-sm no-scrollbar overflow-x-auto">
              {['All Events', 'Football', 'Basketball', 'UFC'].map((tab, i) => (
                  <button
                      key={tab}
                      className={`px-5 py-2 text-[10px] font-black uppercase tracking-widest rounded-lg transition-all whitespace-nowrap ${
                          i === 0 ? 'bg-sports-red text-white shadow-glow' : 'text-zinc-500 hover:text-white'
                      }`}
                  >
                    {tab}
                  </button>
              ))}
            </nav>
          </header>

          {/* Sections */}
          <div className="space-y-24">
            {categoryNames.map((catName) => {
              const isLiveSection = catName === "Live Now";

              return (
                  <ScrollRow
                      key={catName}
                      title={catName}
                      count={categories[catName].length}
                  >
                    {categories[catName].map((match) => (
                        <div
                            key={match.id}
                            className={`flex-none w-[85vw] sm:w-[45vw] lg:w-[30vw] xl:w-[22vw] snap-start transition-all duration-500 ${
                                isLiveSection ? "relative group" : ""
                            }`}
                        >
                          {isLiveSection && (
                              <>
                                {/* High-Attention Animations */}
                                <div className="absolute -inset-1 bg-gradient-to-r from-sports-red/40 to-transparent rounded-[2rem] blur-xl opacity-25 animate-broadcast pointer-events-none" />
                                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 bg-sports-red px-2 py-1 rounded text-[8px] font-black uppercase shadow-lg shadow-sports-red/50">
                                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping" />
                                  Live Now
                                </div>
                              </>
                          )}
                          <LiveCard match={match} />
                        </div>
                    ))}
                  </ScrollRow>
              );
            })}
          </div>
        </div>
      </main>
  );
}
