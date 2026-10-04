"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Per-route entrance transition. template.tsx (unlike layout.tsx) remounts
 * on navigation, which is what drives the animation. Only opacity is
 * animated — a transform here would break `position: fixed` descendants
 * (e.g. the screenshot lightbox) while it runs.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
