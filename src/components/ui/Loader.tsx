"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

/** Stable across SSR (false) and client (true) without set-state-in-effect. */
function useHasMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

/**
 * Short, premium intro loader with a Flutterion logo reveal. Shows once per
 * browser session, locks scroll while visible, and respects reduced motion.
 */
export function Loader() {
  const reduce = useReducedMotion();
  const mounted = useHasMounted();
  const [dismissed, setDismissed] = useState(false);
  // Read once on the client; false during SSR/hydration render so there is
  // no mismatch (mounted is still false then).
  const [alreadySeen] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return sessionStorage.getItem("flutterion-loaded") === "1";
    } catch {
      return false;
    }
  });

  const show = mounted && !alreadySeen && !dismissed;
  const duration = reduce ? 500 : 1500;

  useEffect(() => {
    if (!show) return;
    document.body.style.overflow = "hidden";
    const timer = setTimeout(() => {
      setDismissed(true);
      document.body.style.overflow = "";
      try {
        sessionStorage.setItem("flutterion-loaded", "1");
      } catch {
        /* ignore */
      }
    }, duration);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [show, duration]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="loader"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="fixed inset-0 z-[300] flex flex-col items-center justify-center bg-[#050b16]"
        >
          <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="relative z-10 flex flex-col items-center gap-6"
          >
            <Image
              src="/logo.png"
              alt="Flutterion"
              width={1672}
              height={941}
              priority
              className="h-20 w-auto sm:h-24"
            />
            <div className="h-0.5 w-44 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "0%" }}
                transition={{ duration: reduce ? 0.4 : 1.2, ease: "easeInOut" }}
                className="h-full w-full bg-gradient-to-r from-sky-500 via-cyan-300 to-violet-500"
              />
            </div>
            <p className="font-mono text-[11px] uppercase tracking-[0.4em] text-slate-400">
              Performance in Motion
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
