import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  index,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow: string;
  /** Editorial section number, e.g. "01". */
  index?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      <Reveal>
        <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
          {index && <span className="text-primary">{index}</span>}
          <span className="h-px w-8 bg-border-strong" aria-hidden />
          <span className="text-foreground/80">{eyebrow}</span>
        </span>
      </Reveal>
      <Reveal delay={0.05}>
        <h2 className="max-w-4xl text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {description && (
        <Reveal delay={0.1}>
          <p
            className={cn(
              "max-w-2xl text-pretty text-base leading-relaxed text-muted sm:text-lg",
              align === "center" && "mx-auto",
            )}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
