import type { StaticImageData } from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  thumbnail: string;
  images: string[];
  status: "Live" | "Beta" | "In Development" | "Coming Soon";
  technologies: string[];
  links: {
    demo?: string;
    github?: string;
    architecture?: string;
    video?: string;
  };
  video?: {
    src: string;
    duration: string;
    hasCaptions: boolean;
    hasArchitectureWalkthrough: boolean;
    poster: string;
  };
  architecture: {
    overview: string;
    stack: string[];
    decisions: string[];
    scaling: string[];
    tradeoffs: string[];
    challenges: string[];
    lessons: string[];
  };
}

export interface NavLink {
  label: string;
  href: string;
  external?: boolean;
}

// ─── Navigation ──────────────────────────────────────────────────────────────

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Resume", href: "/resume.pdf", external: true },
  { label: "GitHub", href: "https://github.com/verkiya", external: true },
  { label: "Contact", href: "mailto:contact@verkiya.tech" },
];

// ─── Personal ────────────────────────────────────────────────────────────────

export const personal = {
  name: "Himanshu Verkiya",
  username: "verkiya",
  domain: "verkiya.tech",
  role: "Full Stack Software Engineer",
  tagline: "Building AI systems, developer tools, and SaaS platforms.",
  github: "https://github.com/verkiya",
  email: "contact@verkiya.tech",
  resumeUrl: "/resume.pdf",
};

// ─── Projects ────────────────────────────────────────────────────────────────

export const projects: Project[] = [
  {
    id: "curate",
    name: "Curate",
    tagline: "AI Development Environment",
    description: "An AI-native browser IDE for building software without leaving the web. Combines a real code editor, AI coding assistant, live preview environment, and GitHub integration.",
    thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072&auto=format&fit=crop",
    ],
    status: "Live",
    technologies: ["Next.js", "Convex", "Inngest", "TypeScript"],
    links: {
      demo: "https://curate-ecru-eight.vercel.app",
      github: "https://github.com/hiverkiya/Curate",
    },
    architecture: {
      overview: "Coordinates durable cloud state, ephemeral browser state, background AI workflows, and browser-local Node.js runtime.",
      stack: ["Next.js", "Convex", "Inngest", "AgentKit", "CodeMirror"],
      decisions: ["State Lifecycle Separation", "Weighted random model selection", "WebContainers for preview"],
      scaling: [],
      tradeoffs: [],
      challenges: [],
      lessons: [],
    }
  },
  {
    id: "resona",
    name: "Resona",
    tagline: "AI Voice SaaS",
    description: "Full-stack AI voice generation platform with self-hosted inference, multi-tenant organization workspaces, metered subscription billing, and private media delivery.",
    thumbnail: "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1589254065878-42c9da997008?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop",
    ],
    status: "Live",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "tRPC", "FastAPI", "Clerk"],
    links: {
      demo: "https://resonapro.vercel.app",
    },
    architecture: {
      overview: "Combines self-hosted inference with robust multi-tenant capabilities, metered billing, and secure media delivery.",
      stack: ["Next.js", "Modal TTS", "AWS S3", "tRPC", "Prisma"],
      decisions: ["Self-hosted Chatterbox TTS", "Multi-tenant architecture", "Signed URL delivery"],
      scaling: [],
      tradeoffs: [],
      challenges: [],
      lessons: [],
    }
  },
  {
    id: "automativ",
    name: "Automativ",
    tagline: "Workflow Engine",
    description: "A visual workflow automation application built with Next.js, React Flow, and Inngest. Build directed workflow graphs in a browser canvas.",
    thumbnail: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop",
    ],
    status: "Live",
    technologies: ["Next.js", "React Flow", "Inngest", "Prisma", "PostgreSQL", "tRPC"],
    links: {
      demo: "https://automativ.vercel.app",
    },
    architecture: {
      overview: "Authenticated workflow builder with paid creation gates, external trigger endpoints, and executable nodes.",
      stack: ["Next.js", "React Flow", "Inngest", "Prisma"],
      decisions: ["Topological graph sort", "Replace-all transaction for saves"],
      scaling: [],
      tradeoffs: [],
      challenges: [],
      lessons: [],
    }
  },
  {
    id: "vocali",
    name: "Vocali",
    tagline: "AI Support Platform",
    description: "A multi-tenant AI support platform with an embeddable chat and voice widget. Configure AI agents with organization documents.",
    thumbnail: "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596524430615-b46475ddff6e?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=2070&auto=format&fit=crop",
    ],
    status: "Live",
    technologies: ["Next.js", "Convex", "Clerk", "OpenAI", "TypeScript"],
    links: {
    },
    architecture: {
      overview: "Dashboard and embeddable widget powered by a realtime Convex backend.",
      stack: ["Next.js", "Convex", "OpenAI Agent", "Vapi"],
      decisions: ["Dashboard separated from visitor widget", "Provider security with AES-256-GCM"],
      scaling: [],
      tradeoffs: [],
      challenges: [],
      lessons: [],
    }
  },
  {
    id: "forgeflow",
    name: "ForgeFlow",
    tagline: "Browser Automation",
    description: "A collaborative visual workflow builder for browser automation. Compose steps on a shared canvas and run in durable background tasks.",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=2070&auto=format&fit=crop",
    ],
    status: "Live",
    technologies: ["Next.js", "React", "TypeScript", "Trigger.dev", "Liveblocks", "Neon", "Clerk"],
    links: {
    },
    architecture: {
      overview: "Visual workflow engine executing on Trigger.dev driving Stagehand browser sessions.",
      stack: ["Next.js", "Trigger.dev", "Browserbase", "Liveblocks"],
      decisions: ["Topological sort execution", "Liveblocks for canvas, Postgres for snapshots"],
      scaling: [],
      tradeoffs: [],
      challenges: [],
      lessons: [],
    }
  }
];
