interface TechBadgeProps {
  name: string;
}

const getBrandColor = (name: string) => {
  const brandColors: Record<string, string> = {
    "Next.js": "text-zinc-100 border-zinc-100/30 bg-zinc-100/10",
    "TypeScript": "text-blue-400 border-blue-400/30 bg-blue-400/10",
    "Python": "text-yellow-300 border-yellow-300/30 bg-yellow-300/10",
    "FastAPI": "text-teal-400 border-teal-400/30 bg-teal-400/10",
    "PostgreSQL": "text-indigo-400 border-indigo-400/30 bg-indigo-400/10",
    "Redis": "text-red-500 border-red-500/30 bg-red-500/10",
    "OpenAI": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
    "LangChain": "text-green-500 border-green-500/30 bg-green-500/10",
    "Docker": "text-sky-500 border-sky-500/30 bg-sky-500/10",
    "WebSockets": "text-purple-400 border-purple-400/30 bg-purple-400/10",
    "Node.js": "text-green-500 border-green-500/30 bg-green-500/10",
    "Bull MQ": "text-orange-500 border-orange-500/30 bg-orange-500/10",
    "React Flow": "text-pink-400 border-pink-400/30 bg-pink-400/10",
    "Prisma": "text-teal-200 border-teal-200/30 bg-teal-200/10",
    "Stripe": "text-indigo-500 border-indigo-500/30 bg-indigo-500/10",
    "Pinecone": "text-blue-300 border-blue-300/30 bg-blue-300/10",
    "Clerk": "text-violet-500 border-violet-500/30 bg-violet-500/10",
    "Resend": "text-red-400 border-red-400/30 bg-red-400/10",
    "WebRTC": "text-sky-400 border-sky-400/30 bg-sky-400/10",
    "Deepgram": "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    "ElevenLabs": "text-neutral-300 border-neutral-300/30 bg-neutral-300/10",
  };
  return brandColors[name] || "text-text-secondary border-border bg-surface";
};

export function TechBadge({ name }: TechBadgeProps) {
  const brandClasses = getBrandColor(name);
  return (
    <span className={`inline-flex items-center rounded-md border px-3 py-1 font-mono text-xs transition-colors hover:brightness-110 ${brandClasses}`}>
      {name}
    </span>
  );
}
