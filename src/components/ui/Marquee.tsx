import { cn } from "@/lib/utils";

/**
 * CSS-animated marquee (pauses on hover; the global reduced-motion rule
 * neutralises it). Content is duplicated so the -50% translate loops
 * seamlessly. `variant="display"` renders huge editorial type.
 */
export function Marquee({
  items,
  reverse = false,
  variant = "chip",
  className,
}: {
  items: React.ReactNode[];
  reverse?: boolean;
  variant?: "chip" | "display";
  className?: string;
}) {
  const doubled = [...items, ...items];
  return (
    <div className={cn("mask-fade-x group relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max items-center group-hover:[animation-play-state:paused]",
          variant === "chip" ? "gap-3" : "gap-10 sm:gap-14",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {doubled.map((item, i) =>
          variant === "chip" ? (
            <span
              key={i}
              aria-hidden={i >= items.length || undefined}
              className="flex shrink-0 items-center gap-2.5 rounded-full border border-border-strong bg-card px-4 py-2 font-mono text-sm text-muted"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
              {item}
            </span>
          ) : (
            <span
              key={i}
              aria-hidden={i >= items.length || undefined}
              className="flex shrink-0 items-center gap-10 text-[clamp(2.5rem,7vw,6rem)] font-semibold leading-none tracking-[-0.04em] sm:gap-14"
            >
              {item}
              <span className="inline-block h-3 w-3 rotate-45 bg-lime sm:h-4 sm:w-4" aria-hidden />
            </span>
          ),
        )}
      </div>
    </div>
  );
}
