"use client";

import { motion, useScroll, useSpring } from "motion/react";

/** Thin gradient progress bar pinned to the top of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      aria-hidden
      className="fixed left-0 top-0 z-[90] h-0.5 w-full origin-left bg-gradient-to-r from-primary via-cyan to-purple"
    />
  );
}
