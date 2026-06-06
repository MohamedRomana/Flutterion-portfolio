"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { projects, projectCategories } from "@/data/projects";
import { cn } from "@/lib/utils";

export function AllProjects() {
  const [active, setActive] = useState("All");
  const reduce = useReducedMotion();

  const filtered = useMemo(
    () => (active === "All" ? projects : projects.filter((p) => p.category === active)),
    [active],
  );

  return (
    <Section id="projects" ariaLabel="All projects" className="bg-background-secondary">
      <Container>
        <SectionHeading
          eyebrow="All Projects"
          title={
            <>
              Everything I&apos;ve <span className="text-gradient">built</span>
            </>
          }
          description="Ten production Flutter apps across marketplaces, e-commerce, delivery, government, and lifestyle. Filter by category."
        />

        {/* Filters */}
        <div
          role="tablist"
          aria-label="Filter projects by category"
          className="mt-10 flex flex-wrap items-center justify-center gap-2"
        >
          {projectCategories.map((cat) => {
            const isActive = active === cat;
            return (
              <button
                key={cat}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(cat)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-sm transition-colors duration-200",
                  isActive
                    ? "border-transparent text-white"
                    : "border-border-strong bg-card text-muted hover:border-primary/40 hover:text-foreground",
                )}
              >
                {isActive && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-primary to-cyan"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                {cat}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout={!reduce}
          className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.slug}
                layout={!reduce}
                initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, delay: reduce ? 0 : Math.min(i * 0.04, 0.3) }}
              >
                <ProjectCard project={p} priority={i < 3} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Container>
    </Section>
  );
}
