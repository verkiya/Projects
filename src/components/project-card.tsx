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
      {(project.links.quickDemo || project.links.demo) && (
        <button
          onClick={() => setFlippedState(flippedState === 'demo' ? 'front' : 'demo')}
          className="absolute -left-4 md:-left-8 lg:-left-20 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 md:px-5 md:py-3 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] text-white transition-all hover:scale-105 hover:border-white/40 cursor-pointer group"
          style={{ background: project.themeColor ? `linear-gradient(135deg, ${project.themeColor}, ${project.themeColor}99)` : 'rgba(255,255,255,0.1)' }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {flippedState === 'demo' ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
            )}
          </svg>
          <span className="hidden md:inline font-semibold text-sm">{flippedState === 'demo' ? 'Close Demo' : 'Quick Demo'}</span>
        </button>
      )}

      {/* Right CTA: Project Walkthrough */}
      {project.links.video && (
        <button
          onClick={() => setFlippedState(flippedState === 'walkthrough' ? 'front' : 'walkthrough')}
          className="absolute -right-4 md:-right-8 lg:-right-20 top-1/2 -translate-y-1/2 z-50 flex items-center gap-2 rounded-full border border-white/20 px-3 py-2 md:px-5 md:py-3 shadow-[0_0_40px_-10px_rgba(0,0,0,0.5)] text-white transition-all hover:scale-105 hover:border-white/40 cursor-pointer group"
          style={{ background: project.themeColor ? `linear-gradient(135deg, ${project.themeColor}, ${project.themeColor}99)` : 'rgba(255,255,255,0.1)' }}
        >
          <span className="hidden md:inline font-semibold text-sm">{flippedState === 'walkthrough' ? 'Close Video' : 'Project Walkthrough'}</span>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {flippedState === 'walkthrough' ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            ) : (
              <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none" />
            )}
          </svg>
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
          <div className="z-10 text-center px-6 md:px-12 pt-10 pb-6 flex flex-col items-center">
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

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="flex flex-wrap items-center justify-center gap-3 mb-5"
            >
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
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-2 rounded-full bg-surface-elevated/80 backdrop-blur-md border border-white/10 px-4 text-sm font-semibold text-text-primary transition-all hover:scale-105 hover:bg-white/10 hover:border-white/20 shadow-lg cursor-pointer"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.379.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                  <span>Source Code</span>
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
            <div className="flex flex-wrap justify-center gap-2 w-auto max-w-[95%] md:max-w-[85%] px-5 py-3 bg-surface-elevated/40 backdrop-blur-md rounded-2xl border border-border/50 shadow-inner">
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
                src={flippedState === 'demo' ? (project.links.quickDemo || project.links.demo || "") : (project.links.video || "https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0")}
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
            {/* Close Button Outside */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 p-3 md:p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all duration-300 hover:scale-110 hover:rotate-90 cursor-pointer border border-white/20 shadow-2xl z-50"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-[95vw] md:w-[90vw] max-w-6xl aspect-[16/9] cursor-default rounded-2xl overflow-hidden ring-1 ring-white/20 shadow-2xl bg-surface-elevated/40"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Enlarged view"
                fill
                className="object-cover"
                sizes="100vw"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
