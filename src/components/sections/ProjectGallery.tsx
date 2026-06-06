"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export function ProjectGallery({
  slug,
  imageCount,
  name,
  accent,
}: {
  slug: string;
  imageCount: number;
  name: string;
  accent: string;
}) {
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const reduce = useReducedMotion();
  const images = Array.from({ length: imageCount }, (_, i) => i + 1);

  const go = useCallback(
    (dir: number) => setIndex((i) => (i + dir + imageCount) % imageCount),
    [imageCount],
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
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((n, i) => (
          <button
            key={n}
            type="button"
            onClick={() => openAt(i)}
            aria-label={`Open ${name} screenshot ${n} of ${imageCount}`}
            data-cursor="hover"
            className="group relative aspect-[9/19.5] overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40"
          >
            <Image
              src={`/screens/${slug}/${n}.jpg`}
              alt={`${name} screenshot ${n}`}
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1024px) 30vw, 22vw"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            />
            <span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              style={{ background: `linear-gradient(0deg, ${accent}33, transparent 60%)` }}
            />
          </button>
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
                src={`/screens/${slug}/${index + 1}.jpg`}
                alt={`${name} screenshot ${index + 1}`}
                fill
                sizes="40vh"
                className="object-cover object-top"
                priority
              />
            </motion.div>

            <span className="absolute bottom-5 left-1/2 -translate-x-1/2 rounded-full bg-white/10 px-3 py-1 font-mono text-xs text-white">
              {index + 1} / {imageCount}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
