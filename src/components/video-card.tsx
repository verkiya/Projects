"use client";

import { VideoNote } from "@/lib/data";

export function VideoCard({ video }: { video: VideoNote }) {
  const thumbnailUrl = video.videoId 
    ? `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
    : null;

  return (
    <a
      href={video.url || "#"}
      target={video.url ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated/40 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 h-full"
    >
      {thumbnailUrl && (
        <div className="relative w-full aspect-video overflow-hidden border-b border-white/10 bg-black">
          <img 
            src={thumbnailUrl} 
            alt={video.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-lg transition-transform hover:scale-110">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="white"><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"/></svg>
            </div>
          </div>
        </div>
      )}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <h4 className="font-medium text-text-primary leading-snug group-hover:text-accent transition-colors line-clamp-2">
          {video.title}
        </h4>
        {video.notes && (
          <p className="text-sm text-text-secondary leading-relaxed line-clamp-3 mt-auto">
            {video.notes}
          </p>
        )}
      </div>
    </a>
  );
}
