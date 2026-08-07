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
  "FastAPI": "#00B3A1",
  "PostgreSQL": "#5F85FF",
  "Redis": "#F25449",
  "OpenAI": "#00D19F",
  "LangChain": "#45B87D",
  "Docker": "#36A8FF",
  "WebSockets": "#ffffff",
  "Node.js": "#47C247",
  "Bull MQ": "#FF9D2E",
  "React Flow": "#FF338C",
  "Prisma": "#7B8CFF",
  "Stripe": "#8C86FF",
  "Pinecone": "#ffffff",
  "Clerk": "#9478FF",
  "Resend": "#ffffff",
  "WebRTC": "#ffffff",
  "Deepgram": "#ffffff",
  "ElevenLabs": "#ffffff",
  "React": "#61DAFB",
  "Tailwind CSS": "#38BDF8",
  "tRPC": "#3AB7DC",
  "AWS S3": "#6CBE3F",
  "Polar SDK": "#ffffff",
  "Sentry": "#8270C4",
  "Zod": "#5C8EE6",
  "Convex": "#FF6B3D",
  "Inngest": "#F25CA2",
  "CodeMirror": "#A3A3A3",
  "Framer Motion": "#3377FF",
  "AI SDK": "#ffffff",
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
