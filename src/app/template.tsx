"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Wraps page content so each route change gets a subtle entrance transition.
 * template.tsx (unlike layout.tsx) remounts on navigation, which is exactly
 * what drives the per-page animation.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();
  if (reduce) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}
