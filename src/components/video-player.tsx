"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface VideoPlayerProps {
  src: string;
  poster: string;
  duration: string;
  hasCaptions: boolean;
  hasArchitectureWalkthrough: boolean;
  title: string;
}

export function VideoPlayer({
  src,
  poster,
  duration,
  hasCaptions,
  hasArchitectureWalkthrough,
  title,
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="video-container group">
      {/* Video Element */}
      <div className="relative aspect-video bg-surface">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          controls={isPlaying}
          playsInline
          onPause={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onEnded={() => setIsPlaying(false)}
          className="h-full w-full object-cover"
          aria-label={`Demo video for ${title}`}
        />

        {/* Play Overlay */}
        {!isPlaying && (
          <button
            onClick={handlePlay}
            className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors hover:bg-black/30"
            aria-label={`Play ${title} demo video`}
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm transition-transform hover:scale-105">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="white"
                className="ml-1"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </button>
        )}
      </div>

      {/* Metadata Bar */}
      <div className="flex flex-wrap items-center gap-3 border-t border-border px-4 py-3">
        {/* Duration */}
        <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.2"
          >
            <circle cx="6" cy="6" r="5" />
            <path d="M6 3v3l2 1" strokeLinecap="round" />
          </svg>
          {duration}
        </span>

        {/* Captions */}
        {hasCaptions && (
          <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <rect x="1" y="2.5" width="10" height="7" rx="1" />
              <path d="M3 6.5h2M7 6.5h2" strokeLinecap="round" />
            </svg>
            Captions
          </span>
        )}

        {/* Architecture Walkthrough */}
        {hasArchitectureWalkthrough && (
          <span className="flex items-center gap-1.5 text-xs text-text-tertiary">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.2"
            >
              <rect x="1" y="1" width="4" height="4" rx="0.5" />
              <rect x="7" y="1" width="4" height="4" rx="0.5" />
              <rect x="4" y="7" width="4" height="4" rx="0.5" />
              <path d="M3 5v2.5a.5.5 0 00.5.5H4M9 5v2.5a.5.5 0 01-.5.5H8" />
            </svg>
            Architecture
          </span>
        )}
      </div>
    </div>
  );
}
