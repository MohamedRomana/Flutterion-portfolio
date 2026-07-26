"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useReducedMotion,
} from "motion/react";

/**
 * A persistent glowing "light beam" fixed to the viewport (not travelling down
 * the page). It rises from the bottom-centre — wide, bright and close — then
 * hooks toward the eye-line where a comet head sits, with a faint dashed
 * "path ahead" continuing to the right. This mirrors the reference: the beam
 * stays anchored at eye-level while the content scrolls past it.
 *
 * viewBox is 0..100 on both axes with preserveAspectRatio="none", so all
 * coordinates are percentages of the viewport. The round comet head is a
 * separate HTML element so the non-uniform scale never turns it into an
 * ellipse. Desktop-only; idle motion is dropped for reduced-motion users.
 */

// Bottom-centre → up → hook to the comet head at the eye-line (~55%, 52%).
const BEAM =
  "M47 101 C 48 84, 48.5 68, 50.5 60 C 51.6 55.6, 53.2 53.2, 55 52.2";
// Faint dashed path continuing past the head, to the right.
const AHEAD = "M55 52.2 C 59 51.2, 63 51, 69.5 51.9";

const BALL_X = 55; // % of viewport width  (eye-line anchor)
const BALL_Y = 52; // % of viewport height

export function ScrollTrail() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.5,
  });

  // Gentle scroll-linked drift so the guide feels alive as you move.
  const driftX = useTransform(progress, [0, 0.5, 1], [-10, 14, -6]);
  const aheadDrift = useTransform(progress, [0, 0.5, 1], [0, 3, -2]);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 hidden overflow-hidden lg:block"
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient
            id="beam-fade"
            x1="0"
            y1="0"
            x2="0"
            y2="100"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0%" stopColor="var(--cyan)" stopOpacity="0" />
            <stop offset="28%" stopColor="var(--cyan)" stopOpacity="0.7" />
            <stop offset="100%" stopColor="var(--cyan)" stopOpacity="1" />
          </linearGradient>
        </defs>

        {/* Outer bloom */}
        <path
          d={BEAM}
          stroke="url(#beam-fade)"
          strokeWidth="16"
          strokeLinecap="round"
          style={{ filter: "blur(12px)", opacity: 0.35 }}
        />
        {/* Wide blurred plume — the light rising toward the viewer */}
        <path
          d={BEAM}
          stroke="url(#beam-fade)"
          strokeWidth="7"
          strokeLinecap="round"
          style={{ filter: "blur(4px)", opacity: 0.8 }}
        />
        {/* Bright crisp core */}
        <path
          d={BEAM}
          stroke="url(#beam-fade)"
          strokeWidth="0.9"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ filter: "drop-shadow(0 0 5px var(--cyan))" }}
        />
        {/* Dashed "path ahead" — drifts a touch with scroll */}
        <motion.path
          d={AHEAD}
          stroke="var(--cyan)"
          strokeOpacity="0.5"
          strokeWidth="0.6"
          strokeDasharray="1.2 3"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={{ x: reduce ? 0 : aheadDrift }}
        />
      </svg>

      {/* Comet head — fixed at the eye-line, with a soft scroll drift + idle bob.
          Centred via negative margins so its transform stays free for motion. */}
      <motion.div
        className="absolute"
        style={{
          left: `${BALL_X}%`,
          top: `${BALL_Y}%`,
          marginLeft: -7,
          marginTop: -7,
          x: reduce ? 0 : driftX,
        }}
      >
        <motion.div
          className="h-3.5 w-3.5 rounded-full bg-white"
          style={{
            boxShadow:
              "0 0 0 3px color-mix(in srgb, var(--cyan) 35%, transparent), 0 0 16px 5px var(--cyan), 0 0 46px 14px var(--glow)",
          }}
          animate={reduce ? undefined : { y: [0, -6, 0], x: [0, 4, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
