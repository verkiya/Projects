"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import type { Project } from "@/lib/data";
import { TechBadge } from "./tech-badge";
import { VideoPlayer } from "./video-player";
import { ArchitectureSection } from "./architecture-section";

interface ProjectCardProps {
  project: Project;
}

function StatusBadge({ status }: { status: Project["status"] }) {
  const config = {
    Live: { dot: "status-dot-live", text: "status-live" },
    Beta: { dot: "status-dot-beta", text: "status-beta" },
    "In Development": { dot: "status-dot-dev", text: "status-dev" },
    "Coming Soon": { dot: "status-dot-dev", text: "status-dev" },
  };

  const { dot, text } = config[status];

  return (
    <span className={`flex items-center text-xs ${text}`}>
      <span className={`status-dot ${dot}`} />
      {status}
    </span>
  );
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  const [showArchitecture, setShowArchitecture] = useState(false);

  return (
    <article className="premium-card animated-border overflow-hidden">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] overflow-hidden bg-surface">
        <Image
          src={project.thumbnail}
          alt={`${project.name} — ${project.tagline}`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
        />
        {/* Subtle gradient overlay at bottom */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-surface to-transparent" />
      </div>

      {/* Content */}
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-text-primary">
              {project.name}
            </h3>
            <p className="mt-0.5 font-mono text-sm text-text-tertiary">
              {project.tagline}
            </p>
          </div>
          <StatusBadge status={project.status} />
        </div>

        {/* Description */}
        <p className="mb-6 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        {/* Tech Stack */}
        <div className="mb-6 flex flex-wrap gap-1.5">
          {project.technologies.map((tech) => (
            <TechBadge key={tech} name={tech} />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {project.links.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center rounded-md bg-text-primary px-3 text-xs font-medium text-background transition-colors hover:bg-accent-dim"
            >
              Live Demo
            </a>
          )}

          {project.links.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-8 items-center gap-1.5 rounded-md border border-border px-3 text-xs text-text-secondary transition-colors hover:border-text-muted hover:text-text-primary"
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="currentColor"
              >
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              GitHub
            </a>
          )}

          <button
            onClick={() => setShowArchitecture(!showArchitecture)}
            className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs transition-colors ${
              showArchitecture
                ? "border-text-muted bg-surface-elevated text-text-primary"
                : "border-border text-text-secondary hover:border-text-muted hover:text-text-primary"
            }`}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <rect x="1" y="1" width="3.5" height="3.5" rx="0.5" />
              <rect x="7.5" y="1" width="3.5" height="3.5" rx="0.5" />
              <rect x="4.25" y="7.5" width="3.5" height="3.5" rx="0.5" />
              <path d="M2.75 4.5V6a.5.5 0 00.5.5h5.5a.5.5 0 00.5-.5V4.5M6 6.5V7.5" />
            </svg>
            Architecture
          </button>

          {project.video && (
            <button
              onClick={() => setShowVideo(!showVideo)}
              className={`inline-flex h-8 items-center gap-1.5 rounded-md border px-3 text-xs transition-colors ${
                showVideo
                  ? "border-text-muted bg-surface-elevated text-text-primary"
                  : "border-border text-text-secondary hover:border-text-muted hover:text-text-primary"
              }`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="currentColor"
              >
                <path d="M4.5 3v6l5-3z" />
              </svg>
              Watch Demo
            </button>
          )}
        </div>
      </div>

      {/* Expandable Video Section */}
      <AnimatePresence>
        {showVideo && project.video && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden border-t border-border"
          >
            <div className="p-6 md:p-8" id={`${project.id}-video`}>
              <VideoPlayer
                src={project.video.src}
                poster={project.video.poster}
                duration={project.video.duration}
                hasCaptions={project.video.hasCaptions}
                hasArchitectureWalkthrough={
                  project.video.hasArchitectureWalkthrough
                }
                title={project.name}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expandable Architecture Section */}
      <AnimatePresence>
        {showArchitecture && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden border-t border-border"
          >
            <div className="p-6 md:p-8">
              <ArchitectureSection
                architecture={project.architecture}
                projectName={project.name}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}
