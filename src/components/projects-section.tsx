"use client";

import { projects } from "@/lib/data";
import { ProjectCard } from "./project-card";
import { useState, useEffect, useRef } from "react";

export function ProjectsSection() {
  const [activeProjectId, setActiveProjectId] = useState<string>(projects[0]?.id || "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const projectId = entry.target.getAttribute("data-project-id");
            if (projectId) setActiveProjectId(projectId);
          }
        });
      },
      {
        root: document.getElementById("projects-scroll-container"),
        threshold: 0.5,
      }
    );

    const elements = document.querySelectorAll(".project-container");
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden bg-background" id="projects">
      {/* Dynamic Backgrounds */}
      {projects.map((p) => (
        <div
          key={`bg-${p.id}`}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out pointer-events-none"
          style={{
            background: `radial-gradient(100% 100% at 50% 50%, ${p.themeColor}25 0%, ${p.themeColor}05 50%, transparent 100%)`,
            opacity: activeProjectId === p.id ? 1 : 0,
          }}
        />
      ))}

      {/* Scrollable Container */}
      <div
        id="projects-scroll-container"
        className="relative h-full w-full flex flex-col overflow-y-scroll scroll-smooth snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
      >
        {projects.map((project) => (
          <div
            key={project.id}
            data-project-id={project.id}
            className="project-container h-screen min-h-screen w-full snap-start snap-always relative flex items-center justify-center p-6 pt-24 shrink-0"
          >
            <ProjectCard project={project} />
          </div>
        ))}
      </div>
    </section>
  );
}
