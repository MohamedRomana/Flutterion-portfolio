import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { PhoneFrame, coverOf, shotRatio } from "@/components/ui/PhoneFrame";
import { StoreLinks } from "@/components/ui/StoreLinks";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { projects, getProject, getAdjacentProjects, isOnStore } from "@/data/projects";
import type { Project } from "@/types";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project Not Found" };

  const cover = coverOf(project);
  return {
    title: `${project.name} — ${project.category}`,
    description: project.overview.slice(0, 160),
    openGraph: {
      title: `${project.name} | Mohamed Romana`,
      description: project.tagline,
      images: [{ url: cover }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Mohamed Romana`,
      description: project.tagline,
      images: [cover],
    },
  };
}

function platformLabel(platform: Project["platform"]) {
  return platform === "both" ? "iOS & Android" : platform === "ios" ? "iOS" : "Android";
}

function SideLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <Reveal>
      <Eyebrow index={index}>{children}</Eyebrow>
    </Reveal>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { next } = getAdjacentProjects(slug);
  const ratio = shotRatio(project);
  const showcase = Array.from(
    { length: Math.min(4, project.imageCount) },
    (_, i) => `/screens/${project.slug}/${i + 1}.jpg`,
  );

  const facts = [
    { label: "Category", value: project.category },
    { label: "Platform", value: platformLabel(project.platform) },
    { label: "Role", value: "Flutter Developer" },
    { label: "Availability", value: isOnStore(project) ? "Live on the stores" : "Android APK" },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden pb-16 pt-28 sm:pt-36"
        aria-label={`${project.name} overview`}
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(90%_60%_at_50%_0%,#000,transparent_75%)]" />
          <div
            className="absolute left-1/2 top-[-15%] h-[36rem] w-[60rem] -translate-x-1/2 rounded-full blur-[140px]"
            style={{ background: `${project.accent}40` }}
          />
        </div>

        <Container>
          <Reveal>
            <Link
              href="/#projects"
              className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.16em] text-muted transition-colors hover:text-foreground"
            >
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-strong transition-transform duration-300 group-hover:-translate-x-0.5">
                <ArrowLeft className="h-3.5 w-3.5" />
              </span>
              All projects
            </Link>
          </Reveal>

          <div className="mt-10 grid gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div>
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-white"
                    style={{ background: project.accent }}
                  >
                    {project.category}
                  </span>
                  <span className="rounded-full border border-border-strong px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-muted">
                    {platformLabel(project.platform)}
                  </span>
                  {isOnStore(project) && (
                    <span className="rounded-full bg-lime px-3 py-1 font-mono text-[11px] uppercase tracking-[0.12em] text-on-lime">
                      Live
                    </span>
                  )}
                </div>
              </Reveal>
              {project.nativeName && (
                <Reveal delay={0.04}>
                  <p lang="ar" dir="rtl" className="mt-8 w-fit font-arabic text-2xl font-bold text-muted">
                    {project.nativeName}
                  </p>
                </Reveal>
              )}
              <Reveal delay={0.06}>
                <h1 className="mt-3 text-[clamp(3rem,9vw,8rem)] font-semibold leading-[0.9] tracking-[-0.055em]">
                  {project.name}
                </h1>
              </Reveal>
            </div>
            <div className="flex flex-col gap-6">
              <Reveal delay={0.1}>
                <p className="text-pretty text-lg leading-relaxed text-muted">{project.tagline}</p>
              </Reveal>
              <Reveal delay={0.14}>
                <StoreLinks project={project} />
              </Reveal>
            </div>
          </div>

          {/* Showcase strip */}
          <Reveal delay={0.12}>
            <div
              className="relative mt-14 overflow-hidden rounded-[2rem] border border-border-strong"
              style={{
                background: `radial-gradient(100% 120% at 50% 0%, ${project.accent}33, var(--card) 70%)`,
              }}
            >
              <div aria-hidden className="bg-dot absolute inset-0 opacity-60" />
              <div className="no-scrollbar relative flex snap-x snap-mandatory gap-4 overflow-x-auto p-6 sm:gap-6 lg:justify-center sm:p-12">
                {showcase.map((src, i) => (
                  <div
                    key={src}
                    className={
                      "w-[62%] shrink-0 snap-center sm:w-[13rem] lg:w-[15rem] " +
                      (i % 2 === 1 ? "sm:translate-y-8" : "")
                    }
                  >
                    <PhoneFrame
                      src={src}
                      alt={`${project.name} screen ${i + 1}`}
                      ratio={ratio}
                      priority={i < 2}
                      sizes="(max-width: 640px) 62vw, 240px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Quick facts */}
          <Reveal delay={0.1}>
            <dl className="mt-6 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="bg-card px-5 py-5">
                  <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 font-semibold tracking-tight">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Overview */}
      <Section className="py-16 sm:py-20" ariaLabel="Project overview">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.3fr_1fr] lg:gap-16">
            <SideLabel index="01">Overview</SideLabel>
            <Reveal delay={0.05}>
              <p className="text-pretty text-[clamp(1.35rem,2.4vw,2rem)] font-medium leading-[1.3] tracking-[-0.02em]">
                {project.overview}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Problem & Solution */}
      <Section className="py-16 sm:py-20" ariaLabel="Problem and solution">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.3fr_1fr] lg:gap-16">
            <SideLabel index="02">Challenge</SideLabel>
            <div className="grid gap-4 md:grid-cols-2">
              <Reveal>
                <div className="h-full rounded-[1.75rem] border border-border-strong bg-card p-7 sm:p-8">
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                    The problem
                  </span>
                  <p className="mt-4 text-pretty leading-relaxed text-foreground/85">{project.problem}</p>
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <div
                  className="h-full rounded-[1.75rem] border border-border-strong p-7 sm:p-8"
                  style={{ background: `linear-gradient(160deg, ${project.accent}22, var(--card) 70%)` }}
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                    The solution
                  </span>
                  <p className="mt-4 text-pretty leading-relaxed text-foreground/85">{project.solution}</p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Features */}
      <Section className="py-16 sm:py-20" ariaLabel="Key features">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.3fr_1fr] lg:gap-16">
            <SideLabel index="03">Features</SideLabel>
            <ul className="grid gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border sm:grid-cols-2">
              {project.features.map((f, i) => (
                <li key={f} className="flex gap-4 bg-card p-6">
                  <span className="font-mono text-xs text-primary">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-pretty leading-relaxed text-foreground/90">{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </Section>

      {/* Role & stack */}
      <Section className="py-16 sm:py-20" ariaLabel="Role and stack">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.3fr_1fr] lg:gap-16">
            <SideLabel index="04">Role &amp; stack</SideLabel>
            <div className="grid gap-10 md:grid-cols-2">
              <Reveal>
                <p className="text-pretty text-lg leading-relaxed text-foreground/85">{project.role}</p>
              </Reveal>
              <Reveal delay={0.06}>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-border-strong bg-card px-3.5 py-1.5 text-sm text-foreground/85"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Engineering decisions + challenges */}
      <Section className="py-16 sm:py-20" ariaLabel="Engineering decisions">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[0.3fr_1fr] lg:gap-16">
            <SideLabel index="05">Engineering</SideLabel>
            <div className="flex flex-col gap-12">
              <ol className="flex flex-col border-t border-border">
                {project.decisions.map((d, i) => (
                  <li key={i} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-border py-6">
                    <span className="font-mono text-sm text-primary">{String(i + 1).padStart(2, "0")}</span>
                    <Reveal>
                      <p className="text-pretty text-lg leading-relaxed text-foreground/85">{d}</p>
                    </Reveal>
                  </li>
                ))}
              </ol>

              <div className="grid gap-4">
                {project.challenges.map((c, i) => (
                  <Reveal key={i} delay={i * 0.05}>
                    <div className="grid gap-6 rounded-[1.75rem] border border-border-strong bg-card p-7 sm:p-8 md:grid-cols-2">
                      <div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
                          Challenge
                        </span>
                        <p className="mt-3 text-pretty leading-relaxed text-foreground/90">{c.challenge}</p>
                      </div>
                      <div className="md:border-l md:border-border md:pl-6">
                        <span className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                          <Check className="h-3.5 w-3.5" /> Solution
                        </span>
                        <p className="mt-3 text-pretty leading-relaxed text-muted">{c.solution}</p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <Section className="py-16 sm:py-20" ariaLabel="Screenshot gallery">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SideLabel index="06">Gallery</SideLabel>
            <span className="font-mono text-xs text-muted">Tap any screen to enlarge</span>
          </div>
          <div className="mt-8">
            <ProjectGallery
              slug={project.slug}
              imageCount={project.imageCount}
              groups={project.screenshotGroups}
              ratio={ratio}
              name={project.name}
              accent={project.accent}
            />
          </div>
        </Container>
      </Section>

      {/* Next project */}
      <section aria-label="Next project" className="border-t border-border">
        <Link
          href={`/projects/${next.slug}`}
          data-cursor-label="Next"
          className="group relative block overflow-hidden"
        >
          <div
            aria-hidden
            className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
            style={{ background: `radial-gradient(80% 120% at 50% 100%, ${next.accent}33, transparent 70%)` }}
          />
          <Container className="relative flex items-center justify-between gap-8 py-16 sm:py-24">
            <div className="min-w-0">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
                Next project
              </span>
              <p className="mt-4 truncate text-[clamp(2.6rem,8vw,7rem)] font-semibold leading-[0.95] tracking-[-0.05em] transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3">
                {next.name}
              </p>
              <p className="mt-3 text-muted">{next.category}</p>
            </div>
            <div className="relative hidden w-36 shrink-0 rotate-6 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:scale-105 sm:block lg:w-44">
              <div
                className="relative overflow-hidden rounded-2xl border border-border-strong"
                style={{ aspectRatio: String(shotRatio(next)) }}
              >
                <Image src={coverOf(next)} alt="" fill sizes="176px" className="object-cover" />
              </div>
              <span className="absolute -left-5 top-1/2 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-lime text-on-lime">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </div>
          </Container>
        </Link>
      </section>

      <ContactCTA />
    </>
  );
}
