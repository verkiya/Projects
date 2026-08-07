"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
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
  const [flippedState, setFlippedState] = useState<"front" | "demo" | "walkthrough">("front");
  const isFlipped = flippedState !== "front";
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Use available project images and fill the rest with placeholders
  const imageCount = Math.max(6, (project.images || []).length);
  const images = [...(project.images || []), ...PLACEHOLDER_IMAGES].slice(0, imageCount);
  const marqueeImages = [...images, ...images];

  return (
    <div className="relative w-full max-w-[95vw] xl:max-w-[1400px] mx-auto my-8 [perspective:2000px] group">

      {/* Vibrant Ambient Glow */}
      <div 
        className="absolute inset-0 blur-[80px] -z-10 rounded-[4rem] scale-95 opacity-40 group-hover:opacity-60 transition-opacity duration-700 mix-blend-screen" 
        style={{ 
          background: project.glowGradient || `radial-gradient(circle at 50% 50%, ${project.themeColor || '#f472b6'}66, transparent 70%)`
        }}
      />



      {/* Left CTA: Quick Demo */}
      {project.links.demo && (
        <button
          onClick={() => setFlippedState(flippedState === 'demo' ? 'front' : 'demo')}
          className="absolute -left-4 md:-left-8 lg:-left-20 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 rounded-full bg-surface-elevated/95 backdrop-blur-xl border border-border/60 px-3 py-2 md:px-5 md:py-3 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] text-text-primary transition-all hover:scale-105 hover:border-white/20 cursor-pointer group"
        >
          {project.icon && (
            <Image src={project.icon} alt="Icon" width={18} height={18} className="rounded-[4px] bg-white/10 p-0.5" />
          )}
          <span className="hidden md:inline font-semibold text-sm">{flippedState === 'demo' ? 'Close Demo' : 'Quick Demo'}</span>
        </button>
      )}

      {/* Right CTA: Project Walkthrough */}
      {project.links.video && (
        <button
          onClick={() => setFlippedState(flippedState === 'walkthrough' ? 'front' : 'walkthrough')}
          className="absolute -right-4 md:-right-8 lg:-right-20 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 rounded-full bg-surface-elevated/95 backdrop-blur-xl border border-border/60 px-3 py-2 md:px-5 md:py-3 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] text-text-primary transition-all hover:scale-105 hover:border-white/20 cursor-pointer group"
        >
          <span className="hidden md:inline font-semibold text-sm">{flippedState === 'walkthrough' ? 'Close Video' : 'Project Walkthrough'}</span>
          {project.icon ? (
            <Image src={project.icon} alt="Icon" width={18} height={18} className="rounded-[4px] bg-white/10 p-0.5" />
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {flippedState === 'walkthrough' ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              ) : (
                <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" />
              )}
            </svg>
          )}
        </button>
      )}

      <motion.div
        className="w-full relative [transform-style:preserve-3d]"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 20 }}
      >

        {/* FRONT FACE (Carousel) */}
        <article 
          className="w-full backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col [backface-visibility:hidden] transition-transform duration-500"
          style={{ backgroundColor: project.themeColor ? `${project.themeColor}10` : 'rgba(255,255,255,0.02)' }}
        >
          {/* Animated Rotating Border */}
          <div 
            className="absolute inset-0 z-50 pointer-events-none rounded-[2.5rem] p-[2px]"
            style={{
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          >
            <div 
              className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] opacity-80" 
              style={{ background: project.borderGradient || `conic-gradient(from 0deg, transparent 0 75%, ${project.themeColor || '#f472b6'} 100%)` }} 
            />
          </div>

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
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-4 mb-4"
            >
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-text-primary">
                {project.name}
              </h2>
              {project.links.demo && (
                 <a
                   href={project.links.demo}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-flex h-9 items-center rounded-full bg-surface-elevated border border-white/20 px-4 text-sm font-semibold text-text-primary transition-all hover:scale-105 shadow-md hover:border-white/40 cursor-pointer"
                 >
                   {project.icon && (
                     <Image
                       src={project.icon}
                       alt="Icon"
                       width={18}
                       height={18}
                       className="mr-2 rounded-[4px] p-0.5"
                     />
                   )}
                   View Live Site
                 </a>
              )}
            </motion.div>
          </div>



          {/* Infinite Marquee Carousel */}
          <div className="w-full relative flex items-center py-6 overflow-hidden">
            <div 
              className={`flex gap-4 md:gap-6 w-max px-4 animate-marquee ${selectedImage ? '[animation-play-state:paused]' : 'hover:[animation-play-state:paused]'}`}
            >
              {marqueeImages.map((image, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedImage(image)}
                  className="relative shrink-0 w-[320px] sm:w-[480px] md:w-[600px] xl:w-[720px] aspect-[16/9] rounded-2xl overflow-hidden ring-1 ring-white/10 shadow-xl bg-surface-elevated transition-transform duration-500 hover:scale-[1.03] cursor-pointer"
                >
                  <Image
                    src={image}
                    alt={`${project.name} preview ${idx + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 640px, (max-width: 1024px) 960px, (max-width: 1280px) 1200px, 1440px"
                    quality={95}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Tech & Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="relative z-10 flex flex-col items-center gap-6 px-6 pb-10 pt-16 -mt-8 bg-gradient-to-t from-background via-background/95 to-transparent"
          >
            <div className="flex flex-nowrap overflow-x-auto justify-start md:justify-center gap-2 w-auto max-w-full px-5 py-2.5 bg-surface-elevated/40 backdrop-blur-md rounded-full border border-border/50 shadow-inner [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {project.technologies.map(tech => (
                <TechBadge key={tech} name={tech} />
              ))}
            </div>
          </motion.div>
        </article>

        {/* BACK FACE (Video Iframe) */}
        <article className="absolute inset-0 w-full h-full bg-black/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {/* Animated Rotating Border */}
          <div 
            className="absolute inset-0 z-50 pointer-events-none rounded-[2.5rem] p-[2px]"
            style={{
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
            }}
          >
            <div 
              className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] opacity-80" 
              style={{ background: project.borderGradient || `conic-gradient(from 0deg, transparent 0 75%, ${project.themeColor || '#f472b6'} 100%)` }} 
            />
          </div>

          <div className="flex-1 w-full h-full relative">
            {isFlipped && (
              <iframe
                className="absolute inset-0 w-full h-full rounded-[2.5rem]"
                src={flippedState === 'demo' ? (project.links.video || "https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0") : (project.links.demo || "")}
                title={flippedState === 'demo' ? `${project.name} Quick Demo Video` : `${project.name} Interactive Walkthrough`}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </article>

      </motion.div>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-lg cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full h-full cursor-default flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-contain"
                sizes="100vw"
                quality={100}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-6 right-6 md:top-8 md:right-8 p-3 md:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors cursor-pointer border border-white/20 shadow-2xl z-50"
                aria-label="Close modal"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
