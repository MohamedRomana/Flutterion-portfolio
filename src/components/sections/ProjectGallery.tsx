"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { ScreenshotGroup } from "@/types";

type Section = { label: string; srcs: string[]; offset: number };

export function ProjectGallery({
  slug,
  imageCount,
  groups,
  name,
  accent,
}: {
  slug: string;
  imageCount: number;
  /** When provided, screenshots render as labelled sections (by role/flow). */
  groups?: ScreenshotGroup[];
  name: string;
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();

  // Build labelled sections; each tracks its starting offset in the flat list.
  const sections: Section[] = [];
  let running = 0;
  if (groups && groups.length > 0) {
    for (const g of groups) {
      const srcs = Array.from(
        { length: g.count },
        (_, i) => `/screens/${slug}/${g.dir}/${i + 1}.jpg`,
      );
      sections.push({ label: g.label, srcs, offset: running });
      running += g.count;
    }
  } else {
    sections.push({
      label: "",
      srcs: Array.from({ length: imageCount }, (_, i) => `/screens/${slug}/${i + 1}.jpg`),
      offset: 0,
    });
    running = imageCount;
  }

  const flat = sections.flatMap((s) => s.srcs);
  const total = flat.length;

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + total) % total),
    [total],
  );

  const openAt = (i: number) => {
    setIndex(i);
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, go]);

  return (
    <>
      <div className="flex flex-col gap-10">
        {sections.map((section) => (
          <div key={section.label || "all"} className="flex flex-col gap-4">
            {section.label && (
              <div className="flex items-center gap-3">
                <span
                  className="h-2 w-2 shrink-0 rounded-full"
                  style={{ background: accent }}
                  aria-hidden
                />
                <h3 className="font-mono text-sm font-medium uppercase tracking-[0.15em] text-foreground">
                  {section.label}
                </h3>
                <span className="font-mono text-xs text-muted">
                  {section.srcs.length} screens
                </span>
                <span className="h-px flex-1 bg-border" aria-hidden />
              </div>
            )}
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {section.srcs.map((src, i) => {
                const flatIndex = section.offset + i;
                return (
                  <button
                    key={src}
                    type="button"
                    onClick={() => openAt(flatIndex)}
                    aria-label={`Open ${name} ${section.label ? section.label + " " : ""}screenshot ${i + 1}`}
                    data-cursor="hover"
                    className="group relative aspect-[9/19.5] overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
                  >
                    <Image
                      src={src}
                      alt={`${name} ${section.label} screenshot ${i + 1}`}
                      fill
                      sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    />
                    <span
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                      style={{ background: `linear-gradient(0deg, ${accent}33, transparent 60%)` }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${name} screenshot viewer`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[150] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
            onClick={() => setOpen(false)}
          >
            <button
              type="button"
              aria-label="Close viewer"
              onClick={() => setOpen(false)}
              className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20"
            >
              <X className="h-5 w-5" />
            </button>

            <button
              type="button"
              aria-label="Previous screenshot"
              onClick={(e) => {
                e.stopPropagation();
                go(-1);
              }}
              className="absolute left-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next screenshot"
              onClick={(e) => {
                e.stopPropagation();
                go(1);
              }}
              className="absolute right-3 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
            >
              <ChevronRight className="h-5 w-5" />
            </button>

            <motion.div
              key={index}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-[78vh] w-auto overflow-hidden rounded-3xl border-[6px] border-slate-800 shadow-2xl"
              style={{ aspectRatio: "9 / 19.5" }}
            >
              <Image
                src={flat[index]}
                alt={`${name} screenshot ${index + 1}`}
                fill
                sizes="40vh"
                className="object-cover object-top"
                priority
              />
            </motion.div>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white">
              {index + 1} / {total}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
