import React from "react";

export function AnimatedWord({ children, className, delay = 0 }: { children: React.ReactNode, className?: string, delay?: number }) {
  return (
    <span
      className={`animate-gradient ${className || ""}`}
      style={{
        animationDelay: `${delay}s`
      }}
    >
      {children}
    </span>
  );
}
