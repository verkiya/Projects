import { Navigation } from "@/components/navigation";
import { LearningsView } from "@/components/learnings-view";

export const metadata = {
  title: "What I'm Learning | Himanshu Verkiya",
  description: "Notes and resources from my continuous learning journey.",
};

export default function LearningsPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-background relative overflow-hidden pt-32 pb-24">
        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 blur-[120px] rounded-full mix-blend-screen" />
          <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-blue-500/20 blur-[120px] rounded-full mix-blend-screen" />
        </div>

        <div className="mx-auto max-w-7xl px-6 relative z-10 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-text-primary mb-6">
            What I'm Learning.
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
            A collection of notes, system design architectures, and algorithms from my continuous learning journey across various platforms.
          </p>
        </div>

        <LearningsView />
      </main>
    </>
  );
}
