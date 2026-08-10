import type { StaticImageData } from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  thumbnail: string;
  icon?: string;
  images: string[];
  status: "Live" | "Beta" | "In Development" | "Coming Soon";
  technologies: string[];
  themeColor?: string;
  glowGradient?: string;
  borderGradient?: string;
  links: {
    demo?: string;
    quickDemo?: string;
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
    id: "resona",
    name: "Resona",
    tagline: "AI Voice SaaS — Multi-tenant voice generation with metered billing",
    description: "Full-stack AI voice generation platform with self-hosted inference, multi-tenant organization workspaces, metered subscription billing, and private media delivery.",
    thumbnail: "/resona/introduction.png",
    icon: "/resona/icon.svg",
    images: [
      "/resona/introduction.png",
      "/resona/1.png",
      "/resona/2.png",
      "/resona/3.png",
      "/resona/4.png",
      "/resona/5.png",
      "/resona/6.png",
      "/resona/7.png",
      "/resona/8.png",
      "/resona/9.png",
    ],
    status: "Live",
    themeColor: "#f472b6",
    glowGradient: "radial-gradient(circle at 50% 50%, oklch(0.72 0.13 25 / 0.4), transparent 70%)",
    borderGradient: "conic-gradient(from 0deg, transparent 0 60%, oklch(0.72 0.13 25) 80%, oklch(0.75 0.15 300) 100%)",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL", "tRPC", "FastAPI", "Clerk", "AWS S3", "Polar SDK", "Sentry", "Zod"],
    links: {
      demo: "https://resonapro.vercel.app",
      quickDemo: "https://www.youtube.com/embed/h0urRp9gXrU?si=eY8z6rQy2tBrORlw",
      video: "https://www.youtube.com/embed/Bt2X_5rsFO0?si=xr5tfJzCoooIWq1J"
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
    id: "curate",
    name: "Curate",
    tagline: "AI-Native Web IDE",
    description: "A comprehensive AI-powered web IDE. Features real-time state synchronization, robust background job processing, and in-browser terminal execution for a seamless development experience.",
    thumbnail: "/curate/introduction.png",
    icon: "/curate/icon.png",
    images: [
      "/curate/introduction.png",
      "/curate/1.png",
      "/curate/2.png",
      "/curate/3.png",
      "/curate/4.png",
      "/curate/5.png",
      "/curate/6.png",
    ],
    status: "In Development",
    themeColor: "#7c3aed",
    glowGradient: "radial-gradient(circle at 50% 50%, oklch(0.62 0.18 262 / 0.5), transparent 70%)",
    borderGradient: "conic-gradient(from 0deg, transparent 0 60%, oklch(0.65 0.18 262) 80%, oklch(0.74 0.16 85) 100%)",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Convex",
      "Inngest",
      "Clerk",
      "CodeMirror",
      "Framer Motion",
      "AI SDK"
    ],
    links: {
      demo: "https://idecurate.vercel.app/",
      quickDemo: "https://www.youtube.com/embed/6FlmVEi6KOQ?si=LzyRg_7G0Ae9hDGl",
      github: "https://github.com/verkiya/curate",
      video: "https://www.youtube.com/embed/kqRMQaGJtqk?si=x7ENHF_Oy3eQ0cXe"
    },
    architecture: {
      overview: "An AI-first web IDE built for real-time collaboration and reliable background processing.",
      stack: ["Next.js", "Convex", "Inngest", "CodeMirror"],
      decisions: ["Convex for real-time data sync", "Inngest for agent workflows", "CodeMirror for custom editor extensions"],
      scaling: [],
      tradeoffs: [],
      challenges: [],
      lessons: [],
    }
  },
  {
    id: "forgeflow",
    name: "ForgeFlow",
    tagline: "Collaborative visual workflow builder for browser automation",
    description: "ForgeFlow lets an organization compose browser-automation steps on a shared canvas, run the saved graph in a durable background task, inspect per-step results, and replay the browser session when available.",
    thumbnail: "/forgeflow/introduction.png",
    icon: "/forgeflow/icon.svg",
    images: [
      "/forgeflow/introduction.png",
      "/forgeflow/1.png",
      "/forgeflow/2.png",
      "/forgeflow/3.png",
      "/forgeflow/4.png",
      "/forgeflow/5.png",
    ],
    status: "Live",
    themeColor: "#a8ff53",
    glowGradient: "radial-gradient(circle at 50% 50%, oklch(0.85 0.15 140 / 0.5), transparent 70%)",
    borderGradient: "conic-gradient(from 0deg, transparent 0 60%, oklch(0.85 0.15 140) 80%, oklch(0.7 0.15 160) 100%)",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Trigger.dev",
      "Browserbase",
      "Liveblocks",
      "Neon Postgres",
      "Clerk"
    ],
    links: {
      quickDemo: "https://www.youtube.com/embed/EFfD9IRcx30?si=qyj0SXRrbn5Nb5bk",
      video: "https://www.youtube.com/embed/DDk5bC6xqmQ",
      github: "https://github.com/verkiya/Forgeflow"
    },
    architecture: {
      overview: "A collaborative visual workflow builder that runs scalable background browser automation tasks.",
      stack: ["Next.js", "Trigger.dev", "Browserbase", "Liveblocks", "Neon Postgres"],
      decisions: ["Server-side state validation", "Real-time canvas with Liveblocks", "Durable execution via Trigger.dev"],
      scaling: [],
      tradeoffs: [],
      challenges: [],
      lessons: [],
    }
  },
  {
    id: "automativ",
    name: "Automativ",
    tagline: "Visual workflow automation engine",
    description: "Build directed workflow graphs in a browser canvas, configure trigger and action nodes, save provider credentials, and run workflows through a durable background worker.",
    thumbnail: "/automativ/introduction.png",
    icon: "/automativ/icon.svg",
    images: [
      "/automativ/introduction.png",
      "/automativ/1.png",
      "/automativ/2.png",
      "/automativ/3.png",
      "/automativ/4.png",
      "/automativ/5.png",
      "/automativ/6.png",
      "/automativ/7.png",
      "/automativ/8.png",
      "/automativ/9.png",
    ],
    status: "Live",
    themeColor: "#2563eb",
    glowGradient: "radial-gradient(circle at 50% 50%, oklch(0.5 0.2 250 / 0.5), transparent 70%)",
    borderGradient: "conic-gradient(from 0deg, transparent 0 60%, #2563eb 80%, #4f46e5 100%)",
    technologies: ["Next.js", "React Flow", "Inngest", "Better Auth", "Prisma", "PostgreSQL", "tRPC", "Tailwind CSS"],
    links: {
      demo: "https://automativ.vercel.app",
      github: "https://github.com/verkiya/Automativ",
      quickDemo: "https://www.youtube.com/embed/tliORA7tyzk",
      video: "https://www.youtube.com/embed/21iRAKUv2gA"
    },
    architecture: {
      overview: "A visual workflow automation application built with Next.js, React Flow, and Inngest.",
      stack: ["Next.js", "React Flow", "Inngest", "Better Auth", "PostgreSQL"],
      decisions: ["Inngest for background execution", "React Flow for visual graph building", "Postgres for durable execution state"],
      scaling: [],
      tradeoffs: [],
      challenges: [],
      lessons: [],
    }
  },
  {
    id: "vocali",
    name: "Vocali",
    tagline: "Multi-tenant AI support platform",
    description: "A multi-tenant AI support platform with an embeddable chat and voice widget. Lets organizations configure an AI support agent, load it with their own documents, and deploy it through a branded website widget.",
    thumbnail: "/vocali/introduction.png",
    icon: "/vocali/icon.svg",
    images: [
      "/vocali/introduction.png",
      "/vocali/1.png",
      "/vocali/2.png",
      "/vocali/3.png",
      "/vocali/4.png",
      "/vocali/5.png",
      "/vocali/6.png",
      "/vocali/7.png",
      "/vocali/8.png",
      "/vocali/9.png",
      "/vocali/10.png",
      "/vocali/11.png",
      "/vocali/12.png",
    ],
    status: "Live",
    themeColor: "#7266ff",
    glowGradient: "radial-gradient(circle at 50% 50%, oklch(0.6 0.2 280 / 0.5), transparent 70%)",
    borderGradient: "conic-gradient(from 0deg, transparent 0 60%, #7266ff 80%, #a29bfe 100%)",
    technologies: ["Next.js", "Convex", "Clerk", "OpenAI", "Vapi", "Jotai", "Tailwind CSS"],
    links: {
      github: "https://github.com/verkiya/Vocali",
      quickDemo: "https://www.youtube.com/embed/x9oOgbulqtw",
      video: "https://www.youtube.com/embed/Kzj0nWjRPZs"
    },
    architecture: {
      overview: "A multi-tenant AI support platform with a separate dashboard for operators and an embeddable widget for visitors.",
      stack: ["Next.js", "Convex", "Clerk", "Vapi"],
      decisions: ["Convex for realtime agent RAG and sync", "Clerk for multi-tenant organizations", "Vapi for browser voice calls"],
      scaling: [],
      tradeoffs: [],
      challenges: [],
      lessons: [],
    }
  }
];
