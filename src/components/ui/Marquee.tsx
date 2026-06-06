"use client";

import { cn } from "@/lib/utils";

/**
 * CSS-animated marquee (pauses on hover, respects reduced-motion via the
 * global media query that neutralises animations). Content is duplicated
 * so the -50% translate loops seamlessly.
 */
export function Marquee({
  items,
  reverse = false,
  className,
}: {
  items: string[];
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("mask-fade-x group relative overflow-hidden", className)}>
      <div
        className={cn(
          "flex w-max gap-3 group-hover:[animation-play-state:paused]",
          reverse ? "animate-marquee-reverse" : "animate-marquee",
        )}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-border-strong bg-card px-4 py-2 font-mono text-sm text-muted"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
