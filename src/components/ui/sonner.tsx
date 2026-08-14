"use client";

import { Toaster as Sonner, type ToasterProps } from "sonner";
import {
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      className="toaster group"
      icons={{
        success: <CircleCheckIcon className="size-4" />,
        info: <InfoIcon className="size-4" />,
        warning: <TriangleAlertIcon className="size-4" />,
        error: <OctagonXIcon className="size-4" />,
        loading: <Loader2Icon className="size-4 animate-spin" />,
      }}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-surface-elevated/90 group-[.toaster]:backdrop-blur-3xl group-[.toaster]:text-white group-[.toaster]:border-white/10 group-[.toaster]:shadow-lg group-[.toaster]:rounded-2xl",
          description: "group-[.toast]:text-text-secondary",
          actionButton:
            "group-[.toast]:bg-accent group-[.toast]:text-black",
          cancelButton:
            "group-[.toast]:bg-white/10 group-[.toast]:text-white",
          success: 
            "group-[.toaster]:!border-emerald-500/30 group-[.toaster]:!bg-emerald-500/10 group-[.toaster]:!text-emerald-400",
          error: 
            "group-[.toaster]:!border-rose-500/30 group-[.toaster]:!bg-rose-500/10 group-[.toaster]:!text-rose-400",
          warning: 
            "group-[.toaster]:!border-amber-500/30 group-[.toaster]:!bg-amber-500/10 group-[.toaster]:!text-amber-400",
          info: 
            "group-[.toaster]:!border-blue-500/30 group-[.toaster]:!bg-blue-500/10 group-[.toaster]:!text-blue-400",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
