interface TechBadgeProps {
  name: string;
}

const brandIcons: Record<string, string> = {
  "Next.js": "/icons/Next.js.svg",
  "React": "/icons/React.svg",
  "TypeScript": "/icons/TypeScript.svg",
  "Tailwind CSS": "/icons/Tailwind-CSS.svg",
  "PostgreSQL": "/icons/PostgresSQL.svg",
  "FastAPI": "/icons/FastAPI.svg",
  "AWS S3": "/icons/AWS.svg",
  "Python": "/icons/Python.svg",
  "Redis": "/icons/Redis.svg",
  "Docker": "/icons/Docker.svg",
  "Node.js": "/icons/Node.js.svg",
};

const brandHexes: Record<string, string> = {
  "Next.js": "#ffffff",
  "TypeScript": "#5398E6",
  "Python": "#5299D6",
  "FastAPI": "#009688",
  "PostgreSQL": "#336791",
  "Redis": "#F25449",
  "OpenAI": "#00D19F",
  "LangChain": "#45B87D",
  "Docker": "#36A8FF",
  "WebSockets": "#ffffff",
  "Node.js": "#47C247",
  "Bull MQ": "#FF9D2E",
  "React Flow": "#FF338C",
  "Prisma": "#7E7BE2",
  "Stripe": "#635BFF",
  "Pinecone": "#ffffff",
  "Clerk": "#6C47FF",
  "Resend": "#ffffff",
  "WebRTC": "#ffffff",
  "Deepgram": "#ffffff",
  "ElevenLabs": "#ffffff",
  "React": "#61DBFB",
  "Tailwind CSS": "#38BDF8",
  "tRPC": "#2596be",
  "AWS S3": "#FF9900",
  "Polar SDK": "#ffffff",
  "Sentry": "#8270C4",
  "Zod": "#5C8EE6",
  "Convex": "#FF6B3D",
  "Inngest": "#2C9B63",
  "CodeMirror": "#A3A3A3",
  "Framer Motion": "#3377FF",
  "AI SDK": "#ffffff",
  "Trigger.dev": "#a8ff53",
  "Browserbase": "#FF4500",
  "Liveblocks": "#f44e6b",
  "Neon Postgres": "#34D59A",
};

export function TechBadge({ name }: TechBadgeProps) {
  const hex = brandHexes[name];
  
  if (!hex) {
    return (
      <span className="inline-flex items-center rounded-md border px-3 py-1 font-mono text-xs transition-colors hover:brightness-110 text-text-secondary border-border bg-surface">
        {name}
      </span>
    );
  }
  
  return (
    <span 
      className="inline-flex items-center gap-1.5 rounded-md border px-3 py-1 font-mono text-xs transition-colors hover:brightness-110"
      style={{
        color: hex,
        borderColor: 'rgba(255, 255, 255, 0.3)', // White border with 30% opacity
        backgroundColor: `${hex}1A` // 10% opacity
      }}
    >
      {brandIcons[name] && (
        <img src={brandIcons[name]} alt={`${name} logo`} className="w-3.5 h-3.5 object-contain" />
      )}
      {name}
    </span>
  );
}
