"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span
      style={{ opacity }}
      className={cn("mr-[0.25em] inline-block", accent && "serif text-primary")}
    >
      {children}
    </motion.span>
  );
}

/**
 * Paragraph whose words light up one by one as it scrolls through the
 * viewport. Wrap words in *asterisks* to render them as accent serif.
 */
export function TextReveal({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.45"],
  });

  const words = text.split(" ");

  if (reduce) {
    return (
      <p ref={ref} className={className}>
        {words.map((w, i) => {
          const accent = w.startsWith("*");
          return (
            <span key={i} className={cn("mr-[0.25em] inline-block", accent && "serif text-primary")}>
              {w.replace(/\*/g, "")}
            </span>
          );
        })}
      </p>
    );
  }

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word
            key={i}
            progress={scrollYProgress}
            range={[start, end]}
            accent={w.startsWith("*")}
          >
            {w.replace(/\*/g, "")}
          </Word>
        );
      })}
    </p>
  );
}
