export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-xl">
      <div className="relative flex flex-col items-center justify-center">
        {/* Outer Ring */}
        <div className="w-16 h-16 rounded-full border-[3px] border-transparent border-t-accent border-r-[#f472b6] animate-spin shadow-[0_0_15px_rgba(168,255,83,0.3)]" />
        
        {/* Inner Ring (Reverse Spin) */}
        <div className="absolute top-0 w-16 h-16 rounded-full border-[3px] border-transparent border-b-purple-500 border-l-teal-500 animate-[spin_1.5s_linear_infinite_reverse] shadow-[0_0_15px_rgba(168,83,255,0.3)]" />
        
        {/* Pulsing Core */}
        <div className="absolute top-[22px] w-5 h-5 bg-white/20 rounded-full blur-[2px] animate-pulse" />

        <p className="absolute -bottom-8 text-transparent bg-clip-text bg-gradient-to-r from-accent via-[#f472b6] to-purple-500 font-semibold tracking-[0.2em] animate-pulse text-xs uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
