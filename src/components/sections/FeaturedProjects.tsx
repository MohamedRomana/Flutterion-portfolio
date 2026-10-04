"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PhoneFrame, coverOf, shotRatio } from "@/components/ui/PhoneFrame";
import { StoreLinks } from "@/components/ui/StoreLinks";
import { featuredProjects } from "@/data/projects";
import { useIsLarge } from "@/hooks/useMediaQuery";
import type { Project } from "@/types";

function platformLabel(platform: Project["platform"]) {
  return platform === "both" ? "iOS & Android" : platform === "ios" ? "iOS" : "Android";
}

function FeaturedCard({
  project,
  index,
  total,
  progress,
  stack,
}: {
  project: Project;
  index: number;
  total: number;
  progress: MotionValue<number>;
  /** Sticky-stack behaviour (large screens, motion allowed). */
  stack: boolean;
}) {
  const targetScale = 1 - (total - index - 1) * 0.04;
  const scale = useTransform(progress, [index / total, 1], [1, targetScale]);
  const ratio = shotRatio(project);
  const second = `/screens/${project.slug}/${Math.min(2, project.imageCount)}.jpg`;
  const third = `/screens/${project.slug}/${Math.min(3, project.imageCount)}.jpg`;

  return (
    <div className={stack ? "sticky top-0 flex h-svh items-center" : "mb-6 last:mb-0"}>
      <motion.article
        style={stack ? { scale, top: `calc(${index * 22}px)` } : undefined}
        className="relative w-full origin-top overflow-hidden rounded-[2rem] border border-border-strong bg-card lg:h-[min(80svh,46rem)]"
      >
        {/* Accent wash */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `radial-gradient(80% 90% at 100% 0%, ${project.accent}38, transparent 60%), radial-gradient(60% 60% at 0% 100%, ${project.accent}14, transparent 70%)`,
          }}
        />
        <div aria-hidden className="bg-dot pointer-events-none absolute inset-0 opacity-60" />

        <div className="relative grid h-full lg:grid-cols-[1fr_1.05fr]">
          {/* Copy */}
          <div className="flex flex-col p-6 sm:p-10 lg:p-12">
            <div className="flex items-center justify-between gap-4 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
              <span>
                <span className="text-foreground">{String(index + 1).padStart(2, "0")}</span> /{" "}
                {String(total).padStart(2, "0")}
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2 w-2 rounded-full" style={{ background: project.accent }} />
                {project.category}
              </span>
            </div>

            <div className="mt-8 lg:mt-auto">
              {project.nativeName && (
                <p lang="ar" dir="rtl" className="mb-2 w-fit font-arabic text-lg font-bold text-muted">
                  {project.nativeName}
                </p>
              )}
              <h3 className="text-[clamp(2.4rem,4.6vw,4.4rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                {project.name}
              </h3>
              <p className="mt-5 max-w-lg text-pretty leading-relaxed text-muted">
                {project.tagline}
              </p>

              <ul className="mt-6 grid gap-2.5">
                {project.features.slice(0, 3).map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-foreground/85">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-6 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-foreground px-2.5 py-1 font-mono text-[11px] text-background">
                  {platformLabel(project.platform)}
                </span>
                {project.stack.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border-strong px-2.5 py-1 font-mono text-[11px] text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href={`/projects/${project.slug}`}
                  className="group/cs inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform duration-300 hover:scale-[1.03]"
                >
                  Case study
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover/cs:-translate-y-0.5 group-hover/cs:translate-x-0.5" />
                </Link>
                <StoreLinks project={project} size="sm" />
              </div>
            </div>
          </div>

          {/* Screens */}
          <Link
            href={`/projects/${project.slug}`}
            data-cursor-label="View"
            aria-label={`Open the ${project.name} case study`}
            className="group/shots relative flex min-h-[24rem] items-center justify-center overflow-hidden border-t border-border p-6 sm:min-h-[30rem] lg:min-h-0 lg:border-l lg:border-t-0"
            style={{
              background: `linear-gradient(160deg, ${project.accent}26, transparent 70%)`,
            }}
          >
            <div className="relative flex w-full max-w-md items-center justify-center">
              <div className="w-[38%] translate-x-[18%] translate-y-6 -rotate-[7deg] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shots:-translate-x-[2%] group-hover/shots:-rotate-[10deg]">
                <PhoneFrame
                  src={second}
                  alt={`${project.name} secondary screen`}
                  ratio={ratio}
                  sizes="(max-width: 1024px) 34vw, 180px"
                  className="brightness-90"
                />
              </div>
              <div className="relative z-10 w-[44%] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shots:-translate-y-3 group-hover/shots:scale-[1.03]">
                <PhoneFrame
                  src={coverOf(project)}
                  alt={`${project.name} main screen`}
                  ratio={ratio}
                  sizes="(max-width: 1024px) 40vw, 220px"
                />
              </div>
              <div className="w-[38%] -translate-x-[18%] translate-y-6 rotate-[7deg] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover/shots:translate-x-[2%] group-hover/shots:rotate-[10deg]">
                <PhoneFrame
                  src={third}
                  alt={`${project.name} tertiary screen`}
                  ratio={ratio}
                  sizes="(max-width: 1024px) 34vw, 180px"
                  className="brightness-90"
                />
              </div>
            </div>
          </Link>
        </div>
      </motion.article>
    </div>
  );
}

export function FeaturedProjects() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const large = useIsLarge();
  const stack = large && !reduce;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  return (
    <Section id="work" ariaLabel="Selected work" className="pb-12 sm:pb-16">
      <Container>
        <SectionHeading
          index="01"
          eyebrow="Selected work"
          title={
            <>
              Live in the stores, <span className="serif text-primary">used daily.</span>
            </>
          }
          description="Featured case studies — every one of them shipped and available on the App Store and Google Play."
        />

        <div ref={ref} className="relative mt-14 sm:mt-20">
          {featuredProjects.map((p, i) => (
            <FeaturedCard
              key={p.slug}
              project={p}
              index={i}
              total={featuredProjects.length}
              progress={scrollYProgress}
              stack={stack}
            />
          ))}
        </div>
      </Container>
    </Section>
  );
}
