"use client";

import { AnimatePresence, motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/providers/ThemeProvider";

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`relative inline-flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-border-strong bg-card text-foreground transition-colors duration-300 hover:border-primary/50 hover:text-primary ${className ?? ""}`}
    >
      {/* Render static icon until mounted to avoid hydration mismatch */}
      {!mounted ? (
        <Moon className="h-[18px] w-[18px]" aria-hidden />
      ) : (
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={theme}
            initial={{ y: 14, opacity: 0, rotate: -30 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -14, opacity: 0, rotate: 30 }}
            transition={{ duration: 0.25 }}
            className="flex items-center justify-center"
          >
            {theme === "dark" ? (
              <Moon className="h-[18px] w-[18px]" aria-hidden />
            ) : (
              <Sun className="h-[18px] w-[18px]" aria-hidden />
            )}
          </motion.span>
        </AnimatePresence>
      )}
    </button>
  );
}
