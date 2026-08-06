<!-- BEGIN:project-design-system-rules -->
# Portfolio Design System & Architecture Memory

This document stores the perfected design system rules for this portfolio project. When adding new projects or expanding the site, adhere strictly to these architectural patterns:

## 1. Project Card Architecture (`ProjectCard` Component)
- **3D Flip Mechanism**: The card uses a `flippedState` ("front" | "demo" | "walkthrough") to flip 180 degrees using Framer Motion. 
- **Animated Border**: The card uses a hardware-accelerated CSS mask trick (`mask-composite: xor`) with a spinning `conic-gradient` (`#f472b6`) to create a thin, glowing border tracing the `rounded-[2.5rem]` edges without bleeding into the transparent glassmorphic background.
- **Side Tab Buttons**: Call-To-Action buttons (Quick Demo, Project Walkthrough) are positioned absolutely on the left and right edges. They use soft white hover borders (`border-white/20`) instead of solid hover backgrounds, and keep the `cursor-pointer` explicitly.
- **Image Carousel**: Images are displayed using a CSS Marquee animation that pauses on hover or when an image is clicked.
- **Full Screen Image Modal**: Images click to open in an edge-to-edge full-screen lightbox (`z-[9999]`). The backdrop has `onClick={close}` and the image has `onClick={stopPropagation}` to behave like standard lightboxes.

## 2. Aesthetics & Styling
- **Theme**: Pure Dark Mode. Use glassmorphism (`backdrop-blur-3xl`, `bg-surface-elevated/40`), subtle borders (`border-white/10`), and deep ambient glowing backgrounds (`mix-blend-screen`).
- **Typography**: Inter/Roboto for body, monospace for small taglines (`verkiya` branding).
- **Navigation**: Uses pill-shaped links with icons. Hover states use brand-specific hex codes (e.g., `#2dba4e` for GitHub).

## 3. Data Structure (`data.ts`)
- Projects require:
  - `links.demo` (used for the Quick Demo iframe and Live Site link)
  - `links.video` (used for the Project Walkthrough YouTube iframe)
  - `icon` (rendered in buttons)
  - `images` (array of UI screenshots)

When asked to add a new project, populate `data.ts` according to this interface, and the existing perfected `ProjectCard` will seamlessly ingest it and render the complex UI automatically.
<!-- END:project-design-system-rules -->
