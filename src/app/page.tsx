import { Navigation } from "@/components/navigation";
import { ProjectsSection } from "@/components/projects-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navigation />
      <main>
        <ProjectsSection />
      </main>
      <Footer />
    </>
  );
}
