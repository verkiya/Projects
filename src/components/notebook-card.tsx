"use client";

import { Notebook } from "@/lib/data";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function NotebookCard({ notebook }: { notebook: Notebook }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface-elevated/40 backdrop-blur-3xl transition-all"
      initial={false}
      animate={{ height: "auto" }}
    >
      <div 
        className="p-8 cursor-pointer flex justify-between items-center group"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-text-primary group-hover:text-accent transition-colors">
            {notebook.title}
          </h2>
          <p className="mt-2 text-text-secondary max-w-2xl">
            {notebook.description}
          </p>
        </div>
        <div className="hidden sm:flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-text-primary border border-white/10 transition-transform group-hover:scale-110 shrink-0 ml-4">
           <svg
             width="24"
             height="24"
             viewBox="0 0 24 24"
             fill="none"
             stroke="currentColor"
             strokeWidth="2"
             className={`transition-transform duration-500 ease-in-out ${isOpen ? "rotate-180" : ""}`}
           >
             <path d="m6 9 6 6 6-6" />
           </svg>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="border-t border-white/10"
          >
            <div className="p-8 pt-6 flex flex-col gap-10">
              {notebook.channels.map((channel, cIdx) => (
                <div key={cIdx} className="flex flex-col gap-6">
                  <h3 className="text-xl font-semibold text-text-primary flex items-center gap-3">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-red-500"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z"/><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
                    {channel.name}
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {channel.videos.map((video, vIdx) => (
                      <a
                        key={vIdx}
                        href={video.url || "#"}
                        target={video.url ? "_blank" : "_self"}
                        rel="noopener noreferrer"
                        className="group flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-5 transition-all hover:border-white/20 hover:bg-white/10 hover:-translate-y-1 hover:shadow-lg hover:shadow-white/5"
                      >
                        <h4 className="font-medium text-text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
                          {video.title}
                        </h4>
                        {video.notes && (
                          <p className="text-sm text-text-secondary leading-relaxed line-clamp-4">
                            {video.notes}
                          </p>
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
