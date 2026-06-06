"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

/** Animated count-up that triggers once when scrolled into view. */
export function CountUp({
  to,
  duration = 1.6,
  className,
  suffix = "",
}: {
  to: number;
  duration?: number;
  className?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [value, setValue] = useState(0);

  useEffect(() => {
    // Reduced motion is handled in render (jumps straight to `to`); no
    // animation loop is needed, so this effect drives the rAF case only.
    if (!inView || reduce) return;

    let raf = 0;
    let start: number | null = null;
    const ms = duration * 1000;

    function tick(now: number) {
      if (start === null) start = now;
      const progress = Math.min((now - start) / ms, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress); // easeOutExpo
      setValue(Math.round(eased * to));
      if (progress < 1) raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to, duration, reduce]);

  return (
    <span ref={ref} className={className}>
      {reduce ? to : value}
      {suffix}
    </span>
  );
}
