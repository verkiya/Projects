"use client";

import { personal } from "@/lib/data";
import { FadeIn } from "./motion-wrapper";

export function Hero() {
  return (
    <section
      id="home"
      className="relative flex min-h-[100dvh] items-center justify-center px-6"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="max-w-3xl">
          {/* Name */}
          <FadeIn delay={0.1}>
            <p className="mb-4 font-mono text-sm text-text-tertiary">
              {personal.username}
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h1 className="text-4xl font-semibold tracking-tight text-text-primary sm:text-5xl md:text-6xl lg:text-7xl">
              {personal.name}
            </h1>
          </FadeIn>

          {/* Role */}
          <FadeIn delay={0.3}>
            <p className="mt-4 text-lg text-text-secondary sm:text-xl md:mt-6 md:text-2xl">
              {personal.role}
            </p>
          </FadeIn>

          {/* Tagline */}
          <FadeIn delay={0.4}>
            <p className="mt-3 max-w-lg text-base text-text-tertiary md:text-lg">
              {personal.tagline}
            </p>
          </FadeIn>

          {/* CTAs */}
          <FadeIn delay={0.5}>
            <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
              {/* Primary: View Projects */}
              <a
                href="#projects"
                className="inline-flex h-10 items-center rounded-lg bg-text-primary px-5 text-sm font-medium text-background transition-all hover:bg-accent-dim hover:text-background"
              >
                View Projects
              </a>

              {/* Secondary: Download Resume */}
              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center rounded-lg border border-border px-5 text-sm text-text-secondary transition-all hover:border-text-muted hover:text-text-primary"
              >
                Resume
              </a>

              {/* Tertiary: GitHub */}
              <a
                href={personal.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center gap-2 rounded-lg px-5 text-sm text-text-tertiary transition-all hover:text-text-secondary"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                >
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
                GitHub
              </a>
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Scroll indicator */}
      <FadeIn delay={0.8} className="absolute bottom-10 left-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 text-text-muted">
          <span className="text-xs">scroll</span>
          <div className="h-8 w-px bg-gradient-to-b from-text-muted to-transparent" />
        </div>
      </FadeIn>
    </section>
  );
}
