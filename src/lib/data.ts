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
    themeColor: "#4f46e5",
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
  }
];
