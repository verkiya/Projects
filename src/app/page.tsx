import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { ProjectsSection } from "@/components/projects-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
