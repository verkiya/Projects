import { personal } from "@/lib/data";
import { FadeIn } from "./motion-wrapper";

export function Footer() {
  return (
    <FadeIn>
      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-10 sm:flex-row">
          <p className="text-sm text-text-muted">
            © {new Date().getFullYear()} {personal.name}
          </p>

          <div className="flex items-center gap-6">
            <a
              href={personal.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
            >
              GitHub
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
            >
              Email
            </a>
            <a
              href={personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
            >
              Resume
            </a>
          </div>
        </div>
      </footer>
    </FadeIn>
  );
}
