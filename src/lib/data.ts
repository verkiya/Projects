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
      video: "https://www.youtube.com/embed/dOfqpe-P-q0?si=lVOCRxK7BwRo-y92"
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
      github: "https://github.com/verkiya/curate",
      video: "https://www.youtube.com/embed/FOtoTX-3SSQ?si=0WF0aU5zBJqEud0C"
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
  }
];
