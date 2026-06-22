import { ArrowUpRight, Check, Lock, Star } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { featuredProjects } from "@/data/projects";
import type { Project } from "@/types";

function FeaturedRow({ project, index }: { project: Project; index: number }) {
  const flipped = index % 2 === 1;
  const second = Math.min(2, project.imageCount);
  const coverMain = project.cover ?? `/screens/${project.slug}/1.jpg`;
  const coverSecondary = project.coverAlt ?? `/screens/${project.slug}/${second}.jpg`;

  return (
    <Reveal>
      <article className="grid items-center gap-8 lg:grid-cols-2 lg:gap-14">
        {/* Media */}
        <div className={cn("relative", flipped && "lg:order-2")}>
          <div
            className="relative overflow-hidden rounded-3xl border border-border p-8 sm:p-12"
            style={{
              background: `radial-gradient(120% 100% at 50% 0%, ${project.accent}1f, var(--card) 70%)`,
            }}
          >
            <div className="bg-dot pointer-events-none absolute inset-0 opacity-40" />
            <div className="relative mx-auto flex max-w-sm items-center justify-center">
              <div className="w-[42%] translate-y-4 -rotate-6">
                <PhoneFrame
                  src={coverSecondary}
                  alt={`${project.name} secondary screen`}
                  sizes="160px"
                />
              </div>
              <div className="-ml-6 w-[48%] rotate-3">
                <PhoneFrame
                  src={coverMain}
                  alt={`${project.name} main screen`}
                  sizes="200px"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className={cn("flex flex-col gap-5", flipped && "lg:order-1")}>
          <div className="flex flex-wrap items-center gap-2">
            <span
              className="rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-white"
              style={{ background: project.accent }}
            >
              {project.category}
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border-strong bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-muted">
              <Star className="h-3 w-3 text-primary" /> Featured
            </span>
            {project.isPrivate && (
              <span className="inline-flex items-center gap-1 rounded-full border border-border-strong bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-muted">
                <Lock className="h-3 w-3" /> Private Project
              </span>
            )}
          </div>

          <h3 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {project.name}
          </h3>
          <p className="text-pretty leading-relaxed text-muted">
            {project.overview}
          </p>

          <ul className="grid gap-2 sm:grid-cols-2">
            {project.features.slice(0, 4).map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-foreground/90">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span>{f}</span>
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 5).map((t) => (
              <span
                key={t}
                className="rounded-md border border-border bg-background-secondary px-2 py-0.5 font-mono text-[11px] text-muted"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-1">
            <Button href={`/projects/${project.slug}`} variant="secondary" magnetic>
              View case study
              <ArrowUpRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

export function FeaturedProjects() {
  return (
    <Section id="work" ariaLabel="Featured projects">
      <Container>
        <SectionHeading
          eyebrow="Featured Work"
          title={
            <>
              Selected <span className="text-gradient">case studies</span>
            </>
          }
          description="A closer look at the projects where architecture, real-time behaviour, and polish mattered most."
        />
        <div className="mt-16 flex flex-col gap-20 sm:gap-24">
          {featuredProjects.map((p, i) => (
            <FeaturedRow key={p.slug} project={p} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  );
}
