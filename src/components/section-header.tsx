import { FadeIn } from "./motion-wrapper";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  id?: string;
}

export function SectionHeader({ title, subtitle, id }: SectionHeaderProps) {
  return (
    <FadeIn className="mb-16 md:mb-20">
      <div id={id} className="scroll-mt-24">
        <p className="mb-3 font-mono text-sm text-text-tertiary">{title}</p>
        {subtitle && (
          <p className="max-w-xl text-lg text-text-secondary">{subtitle}</p>
        )}
      </div>
    </FadeIn>
  );
}
