import { Navigation } from "@/components/navigation";
import { LearningsView } from "@/components/learnings-view";
import { AnimatedWord } from "@/components/animated-heading";

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

        <div className="mx-auto max-w-[1600px] px-6 xl:px-12 relative z-10 mb-12">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 flex flex-wrap gap-x-4 gap-y-2">
            <AnimatedWord delay={0} className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">
              What
            </AnimatedWord>
            <AnimatedWord delay={1.5} className="text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-blue-500">
              I'm
            </AnimatedWord>
            <AnimatedWord delay={3} className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-[#f472b6]">
              Learning.
            </AnimatedWord>
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl leading-relaxed">
            A living archive of my continuous growth—spanning software engineering, AI, financial literacy, and personal development.
          </p>
        </div>

        <LearningsView />
      </main>
    </>
  );
}
