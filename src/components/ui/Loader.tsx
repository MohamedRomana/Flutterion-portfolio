"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Monogram } from "./Logo";
import { profile } from "@/data/profile";

const SEEN_KEY = "mr-intro-seen";

/** Stable across SSR (false) and client (true) without set-state-in-effect. */
function useHasMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * Intro curtain: a 0→100 counter with the name, then the panel slides up.
 * Shows once per browser session, locks scroll while visible, and is
 * shortened for reduced-motion users.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const mounted = useHasMounted();
  const [dismissed, setDismissed] = useState(false);
  const [count, setCount] = useState(0);
  const [alreadySeen] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      return false;
    }
  });

  const show = mounted && !alreadySeen && !dismissed;
  const duration = reduce ? 400 : 1600;

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const timer = setTimeout(() => {
      setDismissed(true);
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }, duration + 250);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [show, duration]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[300] flex flex-col justify-between bg-[#08080a] p-6 text-[#f3f2ee] sm:p-10"
        >
          <div className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              <Monogram className="bg-[#f3f2ee] text-[#08080a]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                Portfolio — {new Date().getFullYear()}
              </span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
              {profile.location}
            </span>
          </div>

          <div className="overflow-hidden">
            <motion.h1
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="text-[clamp(2.75rem,10vw,9rem)] font-semibold leading-[0.9] tracking-[-0.05em]"
            >
              {profile.name.split(" ")[0]}{" "}
              <span className="serif text-[#b3a9ff]">{profile.name.split(" ").slice(1).join(" ")}</span>
            </motion.h1>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="h-px flex-1 overflow-hidden bg-white/10">
              <div
                className="h-full origin-left bg-[#d4ff3a]"
                style={{ transform: `scaleX(${count / 100})` }}
              />
            </div>
            <span className="font-mono text-5xl tabular-nums leading-none tracking-tight sm:text-7xl">
              {String(count).padStart(3, "0")}
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
