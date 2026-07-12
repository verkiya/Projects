interface TechBadgeProps {
  name: string;
}

export function TechBadge({ name }: TechBadgeProps) {
  return (
    <span className="inline-flex items-center rounded-md border border-border px-2 py-0.5 font-mono text-xs text-text-tertiary transition-colors hover:border-text-muted hover:text-text-secondary">
      {name}
    </span>
  );
}
