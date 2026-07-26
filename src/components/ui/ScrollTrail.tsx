"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useMotionValue,
  useMotionValueEvent,
  useMotionTemplate,
  useReducedMotion,
} from "motion/react";

/**
 * A wavy vertical path spanning the viewport with a glowing ball that travels
 * along it as the page scrolls. The traversed part of the path lights up
 * behind the ball. Purely decorative, desktop-only, and disabled for users
 * who prefer reduced motion.
 *
 * The SVG uses a 0..100 x 0..100 viewBox with preserveAspectRatio="none", so
 * a point's (x, y) in user units maps directly to (x%, y%) of the container —
 * which is how the HTML ball is positioned in sync with the SVG path.
 */
const PATH =
  "M50 0 C 12 10, 88 20, 50 30 C 12 40, 88 50, 50 60 C 12 70, 88 80, 50 90 C 30 96, 60 98, 50 100";

export function ScrollTrail() {
  const reduce = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    mass: 0.5,
  });

  const x = useMotionValue(50);
  const y = useMotionValue(0);

  useMotionValueEvent(progress, "change", (v) => {
    const path = pathRef.current;
    if (!path) return;
    const clamped = Math.min(Math.max(v, 0), 1);
    const point = path.getPointAtLength(path.getTotalLength() * clamped);
    x.set(point.x);
    y.set(point.y);
  });

  const left = useMotionTemplate`${x}%`;
  const top = useMotionTemplate`${y}%`;

  if (reduce) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden lg:block"
    >
      <div className="absolute inset-y-0 left-1/2 w-[min(72vw,920px)] -translate-x-1/2">
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="trail-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primary)" />
              <stop offset="55%" stopColor="var(--cyan)" />
              <stop offset="100%" stopColor="var(--purple)" />
            </linearGradient>
          </defs>

          {/* Faint dashed "path ahead" */}
          <path
            d={PATH}
            stroke="var(--cyan)"
            strokeOpacity="0.22"
            strokeWidth="1"
            strokeDasharray="1.5 4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          {/* Soft wide glow under the lit beam */}
          <motion.path
            d={PATH}
            stroke="url(#trail-gradient)"
            strokeWidth="7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ pathLength: progress, filter: "blur(6px)", opacity: 0.5 }}
          />
          {/* Bright lit beam that grows behind the ball */}
          <motion.path
            ref={pathRef}
            d={PATH}
            stroke="url(#trail-gradient)"
            strokeWidth="2.4"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{
              pathLength: progress,
              filter: "drop-shadow(0 0 5px var(--cyan))",
            }}
          />
        </svg>
      </div>

      {/* Travelling comet head, positioned against the same box as the SVG */}
      <div className="absolute inset-y-0 left-1/2 w-[min(72vw,920px)] -translate-x-1/2">
        <motion.div
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
          style={{
            left,
            top,
            boxShadow:
              "0 0 0 3px color-mix(in srgb, var(--cyan) 35%, transparent), 0 0 16px 4px var(--cyan), 0 0 40px 12px var(--glow)",
          }}
        >
          <span className="absolute inset-0 animate-ping rounded-full bg-cyan/50" />
        </motion.div>
      </div>
    </div>
  );
}
