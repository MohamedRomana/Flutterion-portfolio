"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Lock } from "lucide-react";
import { motion } from "motion/react";
import type { Project } from "@/types";
import { TiltCard } from "./TiltCard";

function PlatformPills({ platform }: { platform: Project["platform"] }) {
  const labels =
    platform === "both" ? ["iOS", "Android"] : platform === "ios" ? ["iOS"] : ["Android"];
  return (
    <div className="flex gap-1.5">
      {labels.map((l) => (
        <span
          key={l}
          className="rounded-full bg-black/40 px-2 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wide text-white/90 backdrop-blur"
        >
          {l}
        </span>
      ))}
    </div>
  );
}

export function ProjectCard({
  project,
  priority = false,
}: {
  project: Project;
  priority?: boolean;
}) {
  return (
    <TiltCard className="h-full [transform-style:preserve-3d]">
      <Link
        href={`/projects/${project.slug}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_24px_60px_-30px_var(--glow)]"
        aria-label={`View ${project.name} case study`}
      >
        <div className="relative aspect-[4/5] overflow-hidden">
          <div
            className="absolute inset-0 z-10 opacity-70 transition-opacity duration-300 group-hover:opacity-40"
            style={{
              background: `linear-gradient(180deg, transparent 35%, var(--card) 98%), radial-gradient(120% 80% at 50% 0%, ${project.accent}22, transparent 70%)`,
            }}
          />
          <motion.div
            className="absolute inset-0"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Image
              src={project.cover ?? `/screens/${project.slug}/1.jpg`}
              alt={`${project.name} app screenshot`}
              fill
              priority={priority}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
              className="object-cover object-top"
            />
          </motion.div>

          <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-2 p-3">
            <span
              className="rounded-full px-2.5 py-1 font-mono text-[10px] font-medium uppercase tracking-wide text-white backdrop-blur"
              style={{ background: `${project.accent}cc` }}
            >
              {project.category}
            </span>
            {project.isPrivate ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 font-mono text-[10px] uppercase tracking-wide text-white/90 backdrop-blur">
                <Lock className="h-3 w-3" /> Private
              </span>
            ) : (
              <PlatformPills platform={project.platform} />
            )}
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-lg font-semibold tracking-tight">{project.name}</h3>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
          </div>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted">
            {project.tagline}
          </p>
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.stack.slice(0, 3).map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-background-secondary px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
            {project.stack.length > 3 && (
              <span className="rounded-md border border-border bg-background-secondary px-2 py-0.5 font-mono text-[11px] text-muted">
                +{project.stack.length - 3}
              </span>
            )}
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}
