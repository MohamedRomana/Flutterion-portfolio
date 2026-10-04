"use client";

import { useCallback, useSyncExternalStore } from "react";

/**
 * SSR-safe media query hook. Returns false on the server and during
 * hydration, then the live value. Consumers only gate visual-only
 * behaviour on it, so there is no layout flash.
 */
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (cb: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", cb);
      return () => mql.removeEventListener("change", cb);
    },
    [query],
  );
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** True on pointer-fine (mouse) desktops — used to gate cursor/tilt effects. */
export function useIsDesktop(): boolean {
  return useMediaQuery("(min-width: 1024px) and (pointer: fine)");
}

/** True at the `lg` breakpoint and up, regardless of pointer type. */
export function useIsLarge(): boolean {
  return useMediaQuery("(min-width: 1024px)");
}
