import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

/** Small numbered pill that labels a section, e.g. "02 — Selected work". */
export function Eyebrow({
  index,
  children,
  className,
}: {
  index?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-card/60 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted backdrop-blur",
        className,
      )}
    >
      {index && <span className="text-primary">{index}</span>}
      {index && <span className="h-3 w-px bg-border-strong" aria-hidden />}
      <span className="text-foreground/80">{children}</span>
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  className,
}: {
  eyebrow: string;
  /** Editorial section number, e.g. "01". */
  index?: string;
  title: React.ReactNode;
  description?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16",
        className,
      )}
    >
      <div className="flex flex-col items-start gap-6">
        <Reveal>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="max-w-4xl text-[clamp(2.6rem,6.4vw,5.75rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
            {title}
          </h2>
        </Reveal>
      </div>
      {description && (
        <Reveal delay={0.12} className="lg:max-w-sm lg:pb-3">
          <p className="text-pretty text-base leading-relaxed text-muted sm:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
