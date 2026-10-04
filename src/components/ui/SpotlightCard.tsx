"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

/**
 * Card with a pointer-tracked glow on both its border and surface. The
 * pointer position is written to CSS variables, so there are no React
 * re-renders while the mouse moves.
 */
export function SpotlightCard({
  children,
  className,
  innerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  }
  function onLeave() {
    ref.current?.style.setProperty("--my", "-400px");
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn("spotlight-border group relative rounded-[1.75rem] p-px", className)}
    >
      <div
        className={cn(
          "spotlight relative h-full overflow-hidden rounded-[calc(1.75rem-1px)] bg-card",
          innerClassName,
        )}
      >
        {children}
      </div>
    </div>
  );
}
