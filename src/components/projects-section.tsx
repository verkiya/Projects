import { projects } from "@/lib/data";
import { SectionHeader } from "./section-header";
import { ProjectCard } from "./project-card";
import { Stagger, StaggerItem } from "./motion-wrapper";

export function ProjectsSection() {
  return (
    <section className="px-6 py-24 md:py-32" id="projects">
      <div className="mx-auto max-w-6xl">
        <SectionHeader
          title="Projects"
          subtitle="Flagship products I've designed and engineered — each built to solve real problems with production-grade architecture."
        />

        <Stagger className="space-y-8 md:space-y-12" staggerDelay={0.15}>
          {projects.map((project) => (
            <StaggerItem key={project.id}>
              <ProjectCard project={project} />
            </StaggerItem>
          ))}
        </Stagger>
      </div>
    </section>
  );
}
