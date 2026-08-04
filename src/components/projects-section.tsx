import { projects } from "@/lib/data";
import { ProjectCard } from "./project-card";

export function ProjectsSection() {
  return (
    <section className="h-screen w-full flex flex-col overflow-y-scroll snap-y snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" id="projects">
      {projects.map((project) => (
        <div 
          key={project.id} 
          className="h-screen min-h-screen w-full snap-start snap-always relative flex items-center justify-center p-6 shrink-0"
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </section>
  );
}
