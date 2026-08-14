"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion, AnimatePresence } from "motion/react";
import { VideoCard } from "./video-card";
import Loading from "@/app/loading";

const GRADIENT_POOL = [
  // RED
  "from-red-500 via-red-400 to-red-500",
  "from-rose-500 via-red-400 to-orange-500",
  
  // ORANGE
  "from-orange-500 via-orange-400 to-orange-500",
  "from-red-400 via-orange-500 to-amber-500",

  // AMBER
  "from-amber-500 via-amber-400 to-amber-500",
  "from-orange-400 via-amber-400 to-yellow-500",

  // YELLOW
  "from-yellow-500 via-yellow-400 to-yellow-500",
  
  // LIME
  "from-lime-500 via-lime-400 to-lime-500",
  "from-yellow-400 via-lime-500 to-green-500",

  // GREEN
  "from-green-500 via-green-400 to-green-500",
  "from-lime-400 via-green-500 to-emerald-500",

  // EMERALD
  "from-emerald-500 via-emerald-400 to-emerald-500",
  "from-green-400 via-emerald-500 to-teal-500",

  // TEAL
  "from-teal-500 via-teal-400 to-teal-500",
  "from-emerald-400 via-teal-500 to-cyan-500",

  // CYAN
  "from-cyan-500 via-cyan-400 to-cyan-500",
  "from-teal-400 via-cyan-500 to-sky-500",

  // SKY
  "from-sky-500 via-sky-400 to-sky-500",
  "from-cyan-400 via-sky-500 to-blue-500",

  // BLUE
  "from-blue-500 via-blue-400 to-blue-500",
  "from-sky-400 via-blue-500 to-indigo-500",

  // INDIGO
  "from-indigo-500 via-indigo-400 to-indigo-500",
  "from-blue-400 via-indigo-500 to-violet-500",

  // VIOLET
  "from-violet-500 via-violet-400 to-violet-500",
  "from-indigo-400 via-violet-500 to-purple-500",

  // PURPLE
  "from-purple-500 via-purple-400 to-purple-500",
  "from-violet-400 via-purple-500 to-fuchsia-500",

  // FUCHSIA
  "from-fuchsia-500 via-fuchsia-400 to-fuchsia-500",
  "from-purple-400 via-fuchsia-500 to-pink-500",

  // PINK
  "from-pink-500 via-pink-400 to-pink-500",
  "from-fuchsia-400 via-pink-500 to-rose-500",

  // ROSE
  "from-rose-500 via-rose-400 to-rose-500",
];

// Stable hash for a channel name → number
function stableHash(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return Math.abs(hash);
}

// Build a unique channel→gradient mapping across ALL channels at once.
// Each channel gets a unique gradient until the pool is exhausted,
// then it wraps around with an offset to stay visually distinct.
function buildChannelGradientMap(allChannelNames: string[]): Map<string, string> {
  const map = new Map<string, string>();
  const used = new Set<number>();

  // Sort by hash for determinism regardless of render order
  const sorted = [...allChannelNames].sort((a, b) => stableHash(a) - stableHash(b));

  for (const name of sorted) {
    let idx = stableHash(name) % GRADIENT_POOL.length;

    // Walk forward until we find an unused slot
    let attempts = 0;
    while (used.has(idx) && attempts < GRADIENT_POOL.length) {
      idx = (idx + 1) % GRADIENT_POOL.length;
      attempts++;
    }

    map.set(name, GRADIENT_POOL[idx]);
    used.add(idx);

    // If pool is fully used, reset so next batch can reuse
    if (used.size >= GRADIENT_POOL.length) {
      used.clear();
    }
  }

  return map;
}

export function LearningsView() {
  const learnings = useQuery(api.learnings.getAllLearnings);
  const [activeNotebookId, setActiveNotebookId] = useState<string | null>(null);
  const [activeChannelName, setActiveChannelName] = useState<string | null>(null);

  const gradientMap = useMemo(() => {
    if (!learnings) return new Map<string, string>();
    const allChannels = Array.from(new Set(learnings.flatMap(n => n.channels.map(c => c.name))));
    return buildChannelGradientMap(allChannels);
  }, [learnings]);

  // Initialize state once data loads
  useEffect(() => {
    if (learnings && learnings.length > 0 && !activeNotebookId) {
      setActiveNotebookId(learnings[0].id);
      if (learnings[0].channels.length > 0) {
        setActiveChannelName(learnings[0].channels[0].name);
      }
    }
  }, [learnings, activeNotebookId]);

  if (learnings === undefined) {
    return <Loading />;
  }

  if (learnings.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-64 w-full gap-4 opacity-50">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>
        <p>No notebooks found in the database. Add some from the Admin Dashboard!</p>
      </div>
    );
  }

  const activeNotebook = learnings.find(n => n.id === activeNotebookId);
  const activeChannel = activeNotebook?.channels.find(c => c.name === activeChannelName);

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-[1600px] mx-auto px-6 xl:px-12 relative z-10 w-full">
      {/* Sidebar */}
      <aside className="w-full lg:w-80 shrink-0">
        <div className="sticky top-24 rounded-3xl border border-white/10 bg-surface-elevated/40 backdrop-blur-3xl p-6 flex flex-col gap-6">
          {learnings.map(notebook => (
            <div key={notebook.id} className="flex flex-col gap-3">
              <button 
                onClick={() => {
                  setActiveNotebookId(notebook.id);
                  setActiveChannelName(notebook.channels[0].name);
                }}
                className={`text-lg font-bold text-left cursor-pointer transition-colors ${activeNotebookId === notebook.id ? "text-accent" : "text-text-primary hover:text-text-primary/80"}`}
              >
                {notebook.title}
              </button>
              <AnimatePresence>
                {activeNotebookId === notebook.id && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="flex flex-col gap-1 overflow-hidden"
                  >
                    <div className="flex flex-col gap-1 pl-4 border-l-2 border-white/10 ml-2 py-2">
                      {notebook.channels.map(channel => (
                        <button
                          key={channel.name}
                          onClick={() => setActiveChannelName(channel.name)}
                          className={`text-sm text-left cursor-pointer transition-all py-1.5 px-3 rounded-lg flex items-center justify-between ${activeChannelName === channel.name ? "bg-white/10 font-medium" : "text-text-secondary hover:bg-white/5"}`}
                        >
                          <span className={`uppercase ${activeChannelName === channel.name ? `text-transparent bg-clip-text bg-gradient-to-r ${gradientMap.get(channel.name) || GRADIENT_POOL[0]}` : ""}`}>
                            {channel.name}
                          </span>
                          <span className="opacity-50 text-xs ml-2 text-text-secondary">({channel.videos.length})</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-[500px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeChannelName}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col gap-8"
          >
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-4">
               <h2 className={`uppercase text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${gradientMap.get(activeChannelName!) || GRADIENT_POOL[0]}`}>
                 {activeChannelName}
               </h2>
               <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-text-secondary shrink-0">
                 {activeChannel?.videos.length} Videos
               </span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {activeChannel?.videos.map((video, idx) => (
                <VideoCard key={idx} video={video} />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
