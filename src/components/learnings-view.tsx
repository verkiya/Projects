"use client";

import { useState } from "react";
import { learnings } from "@/lib/data";
import { motion, AnimatePresence } from "motion/react";
import { VideoCard } from "./video-card";

export function LearningsView() {
  const [activeNotebookId, setActiveNotebookId] = useState(learnings[0].id);
  const [activeChannelName, setActiveChannelName] = useState(learnings[0].channels[0].name);

  const activeNotebook = learnings.find(n => n.id === activeNotebookId);
  const activeChannel = activeNotebook?.channels.find(c => c.name === activeChannelName);

  return (
    <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-6 relative z-10 w-full">
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
                className={`text-lg font-bold text-left transition-colors ${activeNotebookId === notebook.id ? "text-accent" : "text-text-primary hover:text-text-primary/80"}`}
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
                          className={`text-sm text-left transition-colors py-1.5 px-3 rounded-lg ${activeChannelName === channel.name ? "bg-white/10 text-text-primary font-medium" : "text-text-secondary hover:bg-white/5 hover:text-text-primary/80"}`}
                        >
                          {channel.name} <span className="opacity-50 text-xs ml-1">({channel.videos.length})</span>
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
               <h2 className="text-3xl font-bold text-text-primary">{activeChannelName}</h2>
               <span className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-text-secondary shrink-0">
                 {activeChannel?.videos.length} Videos
               </span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
