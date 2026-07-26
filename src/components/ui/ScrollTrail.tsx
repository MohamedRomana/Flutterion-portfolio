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
 * A glowing "light road" that recedes into the distance in 3D perspective,
 * with a comet head that travels from the far vanishing point toward the
 * viewer as the page scrolls — weaving left/right along the eye-line.
 *
 * The path lives on a flat plane (viewBox 0..100 on both axes) that is tilted
 * back with rotateX, so the top of the path (y≈0) sits far away and the bottom
 * (y≈100) comes toward the camera. The comet is billboarded (counter-rotated)
 * so it stays a round glow. Desktop-only and disabled for reduced motion.
 */
const PATH =
  "M50 0 C 24 18, 76 30, 50 46 C 24 62, 76 76, 50 92 C 44 96, 56 98, 50 100";

const TILT = 62; // degrees the road-plane leans back

export function ScrollTrail() {
  const reduce = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
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
      style={{ perspective: "1100px", perspectiveOrigin: "50% 42%" }}
    >
      {/* The tilted road-plane. Sized larger than the viewport and pushed down
          so the near end runs off the bottom edge toward the viewer. */}
      <div
        className="absolute left-1/2 top-[38%] h-[150%] w-[min(150vw,1700px)] -translate-x-1/2"
        style={{
          transform: `rotateX(${TILT}deg)`,
          transformOrigin: "50% 0%",
        }}
      >
        <svg
          className="h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient
              id="trail-depth"
              x1="0"
              y1="0"
              x2="0"
              y2="100"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0%" stopColor="var(--purple)" stopOpacity="0" />
              <stop offset="35%" stopColor="var(--primary)" stopOpacity="0.5" />
              <stop offset="100%" stopColor="var(--cyan)" stopOpacity="1" />
            </linearGradient>
          </defs>

          {/* Faint dashed "road ahead" */}
          <path
            d={PATH}
            stroke="var(--cyan)"
            strokeOpacity="0.18"
            strokeWidth="0.6"
            strokeDasharray="1.4 3.5"
            strokeLinecap="round"
          />
          {/* Soft wide bloom under the lit beam */}
          <motion.path
            d={PATH}
            stroke="url(#trail-depth)"
            strokeWidth="4"
            strokeLinecap="round"
            style={{ pathLength: progress, filter: "blur(4px)", opacity: 0.55 }}
          />
          {/* Bright lit beam that grows behind the comet */}
          <motion.path
            ref={pathRef}
            d={PATH}
            stroke="url(#trail-depth)"
            strokeWidth="1.1"
            strokeLinecap="round"
            style={{
              pathLength: progress,
              filter: "drop-shadow(0 0 3px var(--cyan))",
            }}
          />
        </svg>

        {/* Comet head, billboarded so it stays a round glow despite the tilt */}
        <motion.div
          className="absolute h-4 w-4 rounded-full bg-white"
          style={{
            left,
            top,
            translateX: "-50%",
            translateY: "-50%",
            rotateX: -TILT,
            boxShadow:
              "0 0 0 3px color-mix(in srgb, var(--cyan) 35%, transparent), 0 0 18px 5px var(--cyan), 0 0 46px 14px var(--glow)",
          }}
        />
      </div>
    </div>
  );
}
