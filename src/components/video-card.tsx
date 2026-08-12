"use client";

import { VideoNote } from "@/lib/data";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog";
import { XIcon } from "lucide-react";

export function VideoCard({ video }: { video: VideoNote }) {
  const thumbnailUrl = video.videoId 
    ? `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`
    : null;

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger 
        className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated/40 backdrop-blur-xl transition-all hover:border-white/20 hover:bg-white/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-white/5 h-full text-left outline-none cursor-pointer w-full"
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
              <div className="flex items-center justify-center shadow-2xl transition-transform hover:scale-110">
                <svg viewBox="0 0 24 24" fill="currentColor" className="text-[#FF0000] w-14 h-14">
                  <path d="M21.582,6.186c-0.23-0.86-0.908-1.538-1.768-1.768C18.254,4,12,4,12,4s-6.254,0-7.814,0.418 c-0.86,0.23-1.538,0.908-1.768,1.768C2,7.746,2,12,2,12s0,4.254,0.418,5.814c0.23,0.86,0.908,1.538,1.768,1.768 C5.746,20,12,20,12,20s6.254,0,7.814-0.418c0.86-0.23,1.538-0.908,1.768-1.768C22,16.254,22,12,22,12S22,7.746,21.582,6.186z M9.75,15.02V8.48L15.5,11.75L9.75,15.02z"/>
                </svg>
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
      </DialogTrigger>
      
      <DialogContent 
        className="w-full max-w-5xl p-0 bg-transparent border-none shadow-none ring-0 sm:max-w-5xl overflow-visible" 
        showCloseButton={false}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{video.title}</DialogTitle>
        </DialogHeader>
        
        <DialogClose className="absolute -top-12 right-0 md:-right-12 flex items-center justify-center p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors backdrop-blur-md border border-white/10 z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent cursor-pointer">
          <XIcon className="w-6 h-6" />
        </DialogClose>

        {isOpen && video.videoId ? (
           <div className="w-full aspect-video rounded-xl overflow-hidden bg-black shadow-2xl relative">
             <iframe 
               width="100%" 
               height="100%" 
               src={`https://www.youtube.com/embed/${video.videoId}`} 
               title={video.title} 
               frameBorder="0" 
               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
               referrerPolicy="strict-origin-when-cross-origin" 
               allowFullScreen
               className="absolute inset-0"
             ></iframe>
           </div>
        ) : (
           <div className="w-full aspect-video rounded-xl bg-surface-elevated/40 border border-white/10 flex items-center justify-center text-text-secondary">
             No video available
           </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
