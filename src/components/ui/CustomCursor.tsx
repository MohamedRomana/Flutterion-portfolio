"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useIsDesktop } from "@/hooks/useMediaQuery";

/**
 * Subtle desktop-only custom cursor: a small dot plus a lagging ring that
 * grows over interactive elements. Disabled on touch devices entirely.
 */
export function CustomCursor() {
  const isDesktop = useIsDesktop();
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    if (!isDesktop) return;

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement;
      setHovering(
        Boolean(
          target.closest("a, button, [role='button'], input, textarea, [data-cursor='hover']"),
        ),
      );
    }
    function leave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", move);
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseleave", leave);
    };
  }, [isDesktop, x, y]);

  if (!isDesktop) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      <motion.div
        style={{ x, y }}
        className="absolute -ml-1 -mt-1 h-2 w-2 rounded-full bg-primary"
        animate={{ opacity: visible ? 1 : 0, scale: hovering ? 0.4 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        style={{ x: ringX, y: ringY }}
        className="absolute h-8 w-8 rounded-full border border-primary/60"
        animate={{
          opacity: visible ? 1 : 0,
          scale: hovering ? 1.8 : 1,
          marginLeft: -16,
          marginTop: -16,
        }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
