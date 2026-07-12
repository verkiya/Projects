"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { Project } from "@/lib/data";

interface ArchitectureSectionProps {
  architecture: Project["architecture"];
  projectName: string;
}

interface ArchitectureCardProps {
  title: string;
  items: string[];
  icon: React.ReactNode;
  isOpen: boolean;
  onToggle: () => void;
}

function ArchitectureCard({
  title,
  items,
  icon,
  isOpen,
  onToggle,
}: ArchitectureCardProps) {
  if (items.length === 0) return null;

  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-surface-elevated/50"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-surface-elevated text-text-tertiary">
            {icon}
          </span>
          <span className="text-sm font-medium text-text-secondary">
            {title}
          </span>
        </div>
        <motion.svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          className="text-text-muted"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <path d="M3.5 5.25L7 8.75L10.5 5.25" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="overflow-hidden"
          >
            <ul className="space-y-2 px-5 pb-5 pl-15">
              {items.map((item, i) => (
                <li
                  key={i}
                  className="text-sm leading-relaxed text-text-tertiary"
                >
                  <span className="mr-2 text-text-muted">·</span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function ArchitectureSection({
  architecture,
  projectName,
}: ArchitectureSectionProps) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenSection(openSection === key ? null : key);
  };

  const sections = [
    {
      key: "overview",
      title: "System Overview",
      items: [architecture.overview],
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="7" cy="7" r="5.5" />
          <path d="M7 4v3l2 1.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "stack",
      title: "Tech Stack",
      items: architecture.stack,
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <rect x="2" y="2" width="10" height="3" rx="0.5" />
          <rect x="2" y="6.5" width="10" height="3" rx="0.5" />
          <path d="M4 3.5h1M4 8h1" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "decisions",
      title: "Engineering Decisions",
      items: architecture.decisions,
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M7 2v4M7 6L4 9M7 6l3 3" strokeLinecap="round" />
          <circle cx="4" cy="10" r="1.5" />
          <circle cx="10" cy="10" r="1.5" />
          <circle cx="7" cy="2" r="1.5" />
        </svg>
      ),
    },
    {
      key: "scaling",
      title: "Scaling Considerations",
      items: architecture.scaling,
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M2 11L5 6L8 8L12 3" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M9 3h3v3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      key: "tradeoffs",
      title: "Tradeoffs",
      items: architecture.tradeoffs,
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M2 7h10M5 4l-3 3 3 3M9 4l3 3-3 3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      key: "challenges",
      title: "Challenges",
      items: architecture.challenges,
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <path d="M7 1.5L12.5 11H1.5L7 1.5z" strokeLinejoin="round" />
          <path d="M7 5.5v2.5M7 9.5v.5" strokeLinecap="round" />
        </svg>
      ),
    },
    {
      key: "lessons",
      title: "Lessons Learned",
      items: architecture.lessons,
      icon: (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2">
          <circle cx="7" cy="5" r="3.5" />
          <path d="M5.5 8.5v2.5a1.5 1.5 0 003 0V8.5" strokeLinecap="round" />
          <path d="M5.5 10h3" strokeLinecap="round" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="overflow-hidden rounded-xl border border-border bg-surface"
      role="region"
      aria-label={`${projectName} architecture details`}
    >
      <div className="border-b border-border px-5 py-3">
        <p className="font-mono text-xs text-text-muted">Architecture</p>
      </div>
      {sections.map((section) => (
        <ArchitectureCard
          key={section.key}
          title={section.title}
          items={section.items}
          icon={section.icon}
          isOpen={openSection === section.key}
          onToggle={() => toggle(section.key)}
        />
      ))}
    </div>
  );
}
