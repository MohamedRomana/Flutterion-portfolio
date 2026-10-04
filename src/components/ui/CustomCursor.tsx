"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useIsDesktop } from "@/hooks/useMediaQuery";

/**
 * Desktop-only cursor: a blend-mode dot that swells over links, and grows
 * into a labelled disc over any element with `data-cursor-label="View"`.
 * Touch devices and reduced-motion users keep the native cursor.
 */
export function CustomCursor() {
  const isDesktop = useIsDesktop();
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    if (!isDesktop) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    document.documentElement.classList.add("has-custom-cursor");

    function move(e: MouseEvent) {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const target = e.target as HTMLElement | null;
      const labelled = target?.closest<HTMLElement>("[data-cursor-label]");
      setLabel(labelled?.dataset.cursorLabel ?? null);
      setHovering(
        Boolean(target?.closest("a, button, [role='button'], input, textarea, label, [data-cursor='hover']")),
      );
    }
    function leave() {
      setVisible(false);
    }

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      document.documentElement.classList.remove("has-custom-cursor");
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [isDesktop, x, y]);

  if (!isDesktop) return null;

  const size = label ? 88 : hovering ? 44 : 12;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[250]">
      <motion.div
        style={{ x: sx, y: sy }}
        className="absolute left-0 top-0"
      >
        <motion.div
          className={
            label
              ? "flex items-center justify-center rounded-full bg-lime text-on-lime"
              : "rounded-full bg-white mix-blend-difference"
          }
          animate={{
            width: size,
            height: size,
            x: -size / 2,
            y: -size / 2,
            opacity: visible ? 1 : 0,
          }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <AnimatePresence>
            {label && (
              <motion.span
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.6 }}
                className="font-mono text-[11px] font-medium uppercase tracking-[0.14em]"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
}
