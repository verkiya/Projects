"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import type { Project } from "@/lib/data";
import { TechBadge } from "./tech-badge";

interface ProjectCardProps {
  project: Project;
}

const PLACEHOLDER_IMAGES = [
  "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
  "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
];

export function ProjectCard({ project }: ProjectCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Use available project images and fill the rest with placeholders
  const images = [...(project.images || []), ...PLACEHOLDER_IMAGES].slice(0, 6);
  const marqueeImages = [...images, ...images];

  return (
    <div className="relative w-full max-w-[95vw] xl:max-w-[1400px] mx-auto my-8 [perspective:2000px] group">
      
      {/* Subtle Background Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 via-purple-500/10 to-transparent blur-[80px] -z-10 rounded-[4rem] scale-95 opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Navigation Arrows for Flipping */}
      <button 
        onClick={() => setIsFlipped(!isFlipped)}
        className="absolute -left-2 md:-left-6 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 bg-surface-elevated/90 hover:bg-surface-elevated border border-border rounded-full backdrop-blur-xl shadow-2xl text-text-primary transition-all hover:scale-110"
        aria-label="Flip card"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      </button>
      
      <button 
        onClick={() => setIsFlipped(!isFlipped)}
        className="absolute -right-2 md:-right-6 top-1/2 -translate-y-1/2 z-50 p-3 md:p-4 bg-surface-elevated/90 hover:bg-surface-elevated border border-border rounded-full backdrop-blur-xl shadow-2xl text-text-primary transition-all hover:scale-110"
        aria-label="Flip card"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6" />
        </svg>
      </button>

      <motion.div
        className="w-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 20 }}
      >
        
        {/* FRONT FACE (Carousel) */}
        <article className="w-full bg-surface/30 backdrop-blur-2xl border border-border/40 rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col [backface-visibility:hidden]">
          {/* Top Details */}
          <div className="z-10 text-center px-6 md:px-12 pt-12 pb-8 flex flex-col items-center">
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-mono text-accent text-sm mb-3 tracking-wider uppercase"
            >
              {project.tagline}
            </motion.p>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary mb-4"
            >
              {project.name}
            </motion.h2>
          </div>

          {/* Infinite Marquee Carousel */}
          <div className="w-full relative flex items-center py-6 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-surface to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-surface to-transparent z-10 pointer-events-none" />
            
            <motion.div 
              className="flex gap-4 md:gap-6 w-max px-4"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ ease: "linear", duration: 30, repeat: Infinity }}
            >
              {marqueeImages.map((image, idx) => (
                <div 
                  key={idx} 
                  className="relative shrink-0 w-[320px] sm:w-[480px] md:w-[600px] xl:w-[720px] aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl bg-surface-elevated"
                >
                  <Image 
                    src={image} 
                    alt={`${project.name} preview ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 320px, (max-width: 1024px) 480px, (max-width: 1280px) 600px, 720px"
                  />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Tech & Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="z-10 flex flex-col items-center gap-6 px-6 pb-10 pt-4"
          >
            <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
              {project.technologies.map(tech => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
            
            <div className="flex items-center gap-4 mt-2">
              {project.links.demo && (
                 <a
                   href={project.links.demo}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex h-11 items-center rounded-full bg-text-primary px-8 text-sm font-semibold text-background transition-colors hover:bg-accent hover:text-white"
                 >
                   View Live Site
                 </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center gap-2 rounded-full border border-border px-8 text-sm font-medium text-text-primary transition-colors hover:border-text-muted hover:bg-surface-elevated"
                >
                  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                  </svg>
                  View Source
                </a>
              )}
            </div>
          </motion.div>
        </article>

        {/* BACK FACE (Video Iframe) */}
        <article className="absolute inset-0 w-full h-full bg-black/90 backdrop-blur-3xl border border-border/40 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="absolute top-0 inset-x-0 p-8 bg-gradient-to-b from-black/80 to-transparent pointer-events-none flex justify-between items-center z-10">
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">{project.name}</h3>
              <p className="text-zinc-400 text-sm font-mono uppercase tracking-wider">Video Walkthrough</p>
            </div>
          </div>
          <div className="flex-1 w-full h-full relative">
            {isFlipped && (
              <iframe 
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0" 
                title={`${project.name} Demo Video`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              />
            )}
          </div>
        </article>

      </motion.div>
    </div>
  );
}
