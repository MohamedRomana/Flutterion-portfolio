"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { ArrowUpRight, Download } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppleIcon, GooglePlayIcon } from "@/components/ui/BrandIcons";
import { coverOf, shotRatio } from "@/components/ui/PhoneFrame";
import { projects, isOnStore } from "@/data/projects";
import { useIsDesktop } from "@/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

const FILTERS = [
  { id: "all", label: "All apps", test: () => true },
  { id: "store", label: "On the stores", test: isOnStore },
  { id: "apk", label: "APK builds", test: (p: Project) => !isOnStore(p) },
] as const;

type FilterId = (typeof FILTERS)[number]["id"];

function Availability({ project }: { project: Project }) {
  const { appStore, playStore } = project.links;
  if (!isOnStore(project)) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-border-strong px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
        <Download className="h-3 w-3" /> APK
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-lime/90 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-on-lime">
      {appStore && <AppleIcon className="h-3 w-3" />}
      {playStore && <GooglePlayIcon className="h-2.5 w-2.5" />}
      Live
    </span>
  );
}

export function AllProjects() {
  const [filter, setFilter] = useState<FilterId>("all");
  const [hovered, setHovered] = useState<Project | null>(null);
  const desktop = useIsDesktop();
  const reduce = useReducedMotion();
  const showPreview = desktop && !reduce;

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });

  const list = useMemo(() => {
    const f = FILTERS.find((v) => v.id === filter) ?? FILTERS[0];
    return projects.filter((p) => f.test(p));
  }, [filter]);

  const counts = useMemo(
    () => Object.fromEntries(FILTERS.map((f) => [f.id, projects.filter((p) => f.test(p)).length])),
    [],
  );

  return (
    <Section id="projects" ariaLabel="All projects" className="pt-16 sm:pt-24">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Index"
          title={
            <>
              Every app, <span className="serif text-primary">one list.</span>
            </>
          }
          description="Store-published apps first, followed by Android builds shared as APKs. Open any row for the full case study."
        />

        <div
          role="tablist"
          aria-label="Filter projects by availability"
          className="mt-12 flex flex-wrap gap-2"
        >
          {FILTERS.map((f) => {
            const active = filter === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setFilter(f.id)}
                className={cn(
                  "relative isolate inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-300",
                  active
                    ? "border-transparent text-background"
                    : "border-border-strong text-muted hover:text-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-foreground"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
                {f.label}
                <span className="font-mono text-[11px] opacity-60">{counts[f.id]}</span>
              </button>
            );
          })}
        </div>

        <ul
          className="mt-8 border-t border-border"
          onPointerMove={(e) => {
            x.set(e.clientX);
            y.set(e.clientY);
          }}
          onPointerLeave={() => setHovered(null)}
        >
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((p) => {
              const index = projects.indexOf(p);
              return (
                <motion.li
                  key={p.slug}
                  layout={!reduce}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="border-b border-border"
                >
                  <Link
                    href={`/projects/${p.slug}`}
                    onPointerEnter={() => setHovered(p)}
                    data-cursor-label="Open"
                    className="group relative isolate grid grid-cols-[auto_1fr_auto] items-center gap-4 py-5 sm:gap-6 sm:py-7 lg:grid-cols-[4rem_1.3fr_1fr_auto_auto]"
                  >
                    <span
                      aria-hidden
                      className="absolute inset-0 -z-10 origin-bottom scale-y-0 bg-card transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100"
                    />
                    {/* Thumb (mobile) / number (desktop) */}
                    <span className="relative h-16 w-12 overflow-hidden rounded-lg border border-border lg:hidden">
                      <Image
                        src={coverOf(p)}
                        alt=""
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </span>
                    <span className="hidden font-mono text-xs text-muted transition-colors group-hover:text-primary lg:block lg:pl-4">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="min-w-0">
                      <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <span className="text-2xl font-semibold tracking-[-0.035em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2 sm:text-4xl">
                          {p.name}
                        </span>
                        {p.nativeName && (
                          <span lang="ar" dir="rtl" className="font-arabic text-sm font-medium text-muted sm:text-base">
                            {p.nativeName}
                          </span>
                        )}
                      </span>
                      <span className="mt-1 block truncate text-sm text-muted lg:hidden">
                        {p.category}
                      </span>
                    </span>

                    <span className="hidden truncate text-sm text-muted lg:block">{p.category}</span>
                    <span className="hidden sm:block">
                      <Availability project={p} />
                    </span>
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong text-muted transition-all duration-300 group-hover:rotate-45 group-hover:border-foreground group-hover:bg-foreground group-hover:text-background lg:mr-4">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </Link>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </Container>

      {/* Floating preview (desktop) */}
      {showPreview && (
        <motion.div
          aria-hidden
          className="pointer-events-none fixed left-0 top-0 z-[70]"
          style={{ x: sx, y: sy }}
        >
          <AnimatePresence>
            {hovered && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.6, rotate: -8 }}
                animate={{ opacity: 1, scale: 1, rotate: -4 }}
                exit={{ opacity: 0, scale: 0.6, rotate: -8 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="relative -translate-x-1/2 -translate-y-[115%] overflow-hidden rounded-2xl border border-border-strong shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)]"
                style={{ width: 200, aspectRatio: String(shotRatio(hovered)) }}
              >
                {projects.map((p) => (
                  <Image
                    key={p.slug}
                    src={coverOf(p)}
                    alt=""
                    fill
                    sizes="200px"
                    className={cn(
                      "object-cover transition-opacity duration-300",
                      p.slug === hovered.slug ? "opacity-100" : "opacity-0",
                    )}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </Section>
  );
}
