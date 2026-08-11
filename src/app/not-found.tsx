import Link from "next/link";
import { motion } from "motion/react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background px-4">
      {/* Background ambient glow */}
      <div 
        className="absolute inset-0 blur-[100px] -z-10 opacity-30" 
        style={{ 
          background: "radial-gradient(circle at 50% 50%, #f472b6, transparent 50%)"
        }}
      />
      
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center text-center p-8 md:p-12 rounded-[2.5rem] bg-surface-elevated/40 backdrop-blur-3xl border border-white/10 shadow-2xl">
        <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-white/40 tracking-tighter mb-4">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-text-primary mb-6">
          Lost in the void
        </h2>
        <p className="text-text-secondary mb-10 max-w-md mx-auto text-lg">
          The page you're looking for has drifted into deep space. Let's get you back to familiar territory.
        </p>
        
        <Link 
          href="/"
          className="group relative inline-flex h-12 items-center justify-center gap-2 rounded-full bg-white px-8 text-sm font-semibold text-black transition-all hover:scale-105 active:scale-95"
        >
          <span>Return Home</span>
          <svg 
            className="w-4 h-4 transition-transform group-hover:translate-x-1" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
