import type { StaticImageData } from "next/image";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  name: string;
  tagline: string;
  description: string;
  thumbnail: string;
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
    description:
      "An intelligent development environment that augments the software engineering workflow with AI-powered code generation, context-aware suggestions, and automated refactoring. Built for teams that want to ship faster without sacrificing code quality.",
    thumbnail: "/thumbnails/curate.png",
    status: "In Development",
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "OpenAI",
      "LangChain",
      "Docker",
      "WebSockets",
    ],
    links: {
      github: "https://github.com/verkiya/Curate",
      video: "#curate-video",
    },
    video: {
      src: "/videos/curate-demo.mp4",
      duration: "3:42",
      hasCaptions: true,
      hasArchitectureWalkthrough: true,
      poster: "/thumbnails/curate.png",
    },
    architecture: {
      overview:
        "Curate uses a modular architecture with a Next.js frontend communicating with a FastAPI backend via WebSocket connections for real-time AI interactions. The AI pipeline leverages LangChain for orchestration with multiple LLM providers.",
      stack: [
        "Next.js App Router for the IDE frontend with Monaco Editor integration",
        "FastAPI backend with async request handling for AI operations",
        "PostgreSQL for project state, user data, and version history",
        "Redis for session caching, rate limiting, and pub/sub messaging",
        "LangChain orchestration layer with swappable LLM providers",
      ],
      decisions: [
        "Chose WebSockets over SSE for bidirectional communication during code generation, enabling cancel and refine mid-stream",
        "Implemented a custom AST-aware context window that intelligently selects relevant code for LLM prompts, reducing token usage by 40%",
        "Built a plugin architecture allowing custom AI agents per language/framework",
      ],
      scaling: [
        "Horizontal scaling via stateless API servers behind a load balancer",
        "Redis pub/sub for distributing real-time events across instances",
        "Background job queue for expensive AI operations",
      ],
      tradeoffs: [
        "WebSockets add operational complexity vs SSE, but bidirectional comms was essential for the interactive refactoring workflow",
        "Custom context windowing means more engineering effort upfront, but dramatically improves output quality",
      ],
      challenges: [
        "Managing LLM response streaming with error recovery and partial output handling",
        "Building a responsive Monaco Editor integration that doesn't block the UI during AI operations",
      ],
      lessons: [
        "AI-assisted dev tools need extremely low latency to feel useful — every 100ms matters",
        "Context quality matters more than model size for code generation tasks",
      ],
    },
  },
  {
    id: "automativ",
    name: "Automativ",
    tagline: "Workflow Automation Platform",
    description:
      "A visual workflow automation platform that lets teams build, deploy, and monitor complex business processes without writing code. Drag-and-drop workflow builder with 50+ integrations and real-time execution monitoring.",
    thumbnail: "/thumbnails/automativ.png",
    status: "In Development",
    technologies: [
      "Next.js",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "Redis",
      "Bull MQ",
      "React Flow",
      "Prisma",
      "Docker",
      "Stripe",
    ],
    links: {
      github: "https://github.com/verkiya/Automativ",
      video: "#automativ-video",
    },
    video: {
      src: "/videos/automativ-demo.mp4",
      duration: "4:15",
      hasCaptions: true,
      hasArchitectureWalkthrough: true,
      poster: "/thumbnails/automativ.png",
    },
    architecture: {
      overview:
        "Automativ employs an event-driven architecture with a visual DAG editor on the frontend and a distributed task execution engine on the backend. Workflows are compiled to executable graphs processed by BullMQ workers.",
      stack: [
        "Next.js with React Flow for the visual workflow builder",
        "Node.js backend with Express for API and webhook handling",
        "PostgreSQL with Prisma ORM for workflow definitions and execution logs",
        "BullMQ on Redis for distributed, fault-tolerant task execution",
        "Stripe for subscription billing and usage metering",
      ],
      decisions: [
        "Used a DAG-based execution model that supports parallel branches, conditional logic, and loops",
        "Built a custom node type system that allows third-party integration plugins",
        "Implemented optimistic UI updates with rollback for the workflow builder",
      ],
      scaling: [
        "Worker processes scale independently based on queue depth",
        "Workflow executions are stateless — all state lives in the database",
        "Connection pooling with PgBouncer for high-concurrency database access",
      ],
      tradeoffs: [
        "DAG model is more complex than linear workflows, but supports real-world business process complexity",
        "BullMQ adds Redis dependency, but provides reliable exactly-once execution guarantees",
      ],
      challenges: [
        "Building a responsive drag-and-drop canvas that handles 100+ nodes without performance degradation",
        "Implementing reliable webhook delivery with retry logic and dead letter queues",
      ],
      lessons: [
        "Visual programming tools live or die by their UX — invest heavily in the editor experience",
        "Workflow execution reliability is non-negotiable — use battle-tested queue systems",
      ],
    },
  },
  {
    id: "echo",
    name: "Echo",
    tagline: "Multi-Tenant AI Customer Support Platform",
    description:
      "An AI-powered customer support platform designed for SaaS companies. Features intelligent ticket routing, automated responses, knowledge base integration, and real-time analytics across isolated tenant environments.",
    thumbnail: "/thumbnails/echo.png",
    status: "In Development",
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "PostgreSQL",
      "Pinecone",
      "OpenAI",
      "Clerk",
      "Stripe",
      "Resend",
    ],
    links: {
      github: "https://github.com/verkiya/Echo",
      video: "#echo-video",
    },
    video: {
      src: "/videos/echo-demo.mp4",
      duration: "3:28",
      hasCaptions: true,
      hasArchitectureWalkthrough: true,
      poster: "/thumbnails/echo.png",
    },
    architecture: {
      overview:
        "Echo uses a multi-tenant architecture with row-level security in PostgreSQL and isolated vector stores per tenant in Pinecone. The AI layer uses RAG (Retrieval-Augmented Generation) to provide context-aware responses from each tenant's knowledge base.",
      stack: [
        "Next.js frontend with real-time chat via WebSockets",
        "FastAPI backend for AI processing and ticket management",
        "PostgreSQL with row-level security for tenant isolation",
        "Pinecone for per-tenant vector search on knowledge bases",
        "Clerk for authentication and organization-level access control",
      ],
      decisions: [
        "Row-level security over schema-per-tenant for simpler operational management at the cost of slightly more complex queries",
        "RAG over fine-tuning: allows knowledge base updates without model retraining",
        "Implemented a confidence scoring system that routes low-confidence AI responses to human agents",
      ],
      scaling: [
        "Tenant-aware connection pooling to prevent noisy neighbor issues",
        "Pinecone namespaces for cost-effective vector isolation per tenant",
        "Async AI processing with priority queuing for enterprise tenants",
      ],
      tradeoffs: [
        "RLS adds query overhead vs separate schemas, but simplifies migrations and maintenance",
        "RAG requires maintaining embedding pipelines, but provides better accuracy for domain-specific content",
      ],
      challenges: [
        "Ensuring sub-second AI response times while maintaining retrieval quality",
        "Building a reliable tenant onboarding pipeline that provisions all resources atomically",
      ],
      lessons: [
        "Multi-tenancy decisions cascade through every layer — choose your isolation model early",
        "AI support tools need graceful degradation — always have a human fallback path",
      ],
    },
  },
  {
    id: "resona",
    name: "Resona",
    tagline: "Voice AI Platform",
    description:
      "A real-time voice AI platform that enables natural, low-latency voice interactions for applications. Features voice-to-text, text-to-speech, voice cloning, and conversational AI with sub-200ms response times.",
    thumbnail: "/thumbnails/resona.png",
    status: "In Development",
    technologies: [
      "Next.js",
      "TypeScript",
      "Python",
      "FastAPI",
      "WebRTC",
      "Deepgram",
      "ElevenLabs",
      "Redis",
      "PostgreSQL",
      "Docker",
    ],
    links: {
      github: "https://github.com/verkiya/Resona",
      video: "#resona-video",
    },
    video: {
      src: "/videos/resona-demo.mp4",
      duration: "2:56",
      hasCaptions: true,
      hasArchitectureWalkthrough: true,
      poster: "/thumbnails/resona.png",
    },
    architecture: {
      overview:
        "Resona is built around a low-latency audio pipeline using WebRTC for browser-to-server audio streaming, with parallel ASR and TTS processing. The conversational AI uses a custom turn-taking model to handle natural conversation flow.",
      stack: [
        "Next.js frontend with WebRTC audio capture and playback",
        "FastAPI backend with async audio stream processing",
        "Deepgram for real-time speech-to-text transcription",
        "ElevenLabs for high-quality text-to-speech synthesis",
        "Redis for session state and audio buffer management",
      ],
      decisions: [
        "WebRTC over WebSocket for audio: provides built-in echo cancellation, noise suppression, and adaptive bitrate",
        "Parallel ASR pipeline processes audio in chunks for streaming transcription with minimal latency",
        "Custom VAD (Voice Activity Detection) model to handle conversation turn-taking naturally",
      ],
      scaling: [
        "Media server instances scale based on concurrent audio streams",
        "Audio processing is GPU-accelerated for TTS operations",
        "CDN-cached voice profiles reduce synthesis cold-start times",
      ],
      tradeoffs: [
        "WebRTC is complex to deploy but provides the lowest possible latency for real-time audio",
        "Using external APIs (Deepgram/ElevenLabs) adds cost but delivers production-quality voice processing",
      ],
      challenges: [
        "Achieving sub-200ms end-to-end latency from speech input to AI voice response",
        "Handling network jitter and packet loss gracefully in real-time audio streams",
      ],
      lessons: [
        "Real-time audio systems need aggressive latency budgeting at every pipeline stage",
        "Voice UX is fundamentally different from text — natural pauses and interruptions matter",
      ],
    },
  },
];
