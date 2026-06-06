import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Lock,
  Check,
  Target,
  Lightbulb,
  UserCog,
  Layers,
  Apple,
  Play,
  Download,
  AlertTriangle,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { ProjectGallery } from "@/components/sections/ProjectGallery";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { projects, getProject, getAdjacentProjects } from "@/data/projects";
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

  const title = `${project.name} — ${project.category}`;
  return {
    title,
    description: project.overview.slice(0, 160),
    openGraph: {
      title: `${project.name} | Flutterion`,
      description: project.tagline,
      images: [{ url: `/screens/${project.slug}/1.jpg` }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} | Flutterion`,
      description: project.tagline,
      images: [`/screens/${project.slug}/1.jpg`],
    },
  };
}

function platformLabel(platform: Project["platform"]) {
  return platform === "both" ? "iOS & Android" : platform === "ios" ? "iOS" : "Android";
}

function StoreLinks({ project }: { project: Project }) {
  if (project.isPrivate) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-4 py-2.5 text-sm font-medium text-muted">
        <Lock className="h-4 w-4" /> Private Project — government / NDA
      </span>
    );
  }
  const { appStore, playStore, drive, github } = project.links;
  const hasAny = appStore || playStore || drive || github;
  if (!hasAny) return null;

  const linkClass =
    "inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-4 py-2.5 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary";

  return (
    <div className="flex flex-wrap gap-3">
      {appStore && (
        <a href={appStore} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Apple className="h-4 w-4" /> App Store
          <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
        </a>
      )}
      {playStore && (
        <a href={playStore} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Play className="h-4 w-4" /> Google Play
          <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
        </a>
      )}
      {drive && (
        <a href={drive} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <Download className="h-4 w-4" /> Download APK
          <ArrowUpRight className="h-3.5 w-3.5 text-muted" />
        </a>
      )}
    </div>
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

  const { prev, next } = getAdjacentProjects(slug);
  const second = Math.min(2, project.imageCount);

  const facts = [
    { label: "Category", value: project.category },
    { label: "Platform", value: platformLabel(project.platform) },
    { label: "My Role", value: "Flutter Developer" },
    { label: "Tech", value: `${project.stack.length} technologies` },
  ];

  return (
    <>
      {/* Hero */}
      <section
        className="relative overflow-hidden pb-12 pt-28 sm:pt-36"
        aria-label={`${project.name} overview`}
      >
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(100%_70%_at_50%_0%,#000,transparent_75%)]" />
          <div
            className="absolute left-1/2 top-[-10%] h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-[120px]"
            style={{ background: `${project.accent}22` }}
          />
        </div>

        <Container>
          <Reveal>
            <Link
              href="/#projects"
              className="inline-flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" /> All projects
            </Link>
          </Reveal>

          <div className="mt-8 grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col gap-5">
              <Reveal>
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-full px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-white"
                    style={{ background: project.accent }}
                  >
                    {project.category}
                  </span>
                  <span className="rounded-full border border-border-strong bg-card px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-muted">
                    {platformLabel(project.platform)}
                  </span>
                  {project.needsContentReview && (
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/40 bg-amber-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-amber-500">
                      <AlertTriangle className="h-3 w-3" /> Draft content
                    </span>
                  )}
                </div>
              </Reveal>
              <Reveal delay={0.05}>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                  {project.name}
                </h1>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="max-w-xl text-pretty text-lg leading-relaxed text-muted">
                  {project.tagline}
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <StoreLinks project={project} />
              </Reveal>
            </div>

            <Reveal delay={0.1}>
              <div
                className="relative overflow-hidden rounded-3xl border border-border p-8 sm:p-10"
                style={{
                  background: `radial-gradient(120% 100% at 50% 0%, ${project.accent}1f, var(--card) 70%)`,
                }}
              >
                <div className="bg-dot pointer-events-none absolute inset-0 opacity-40" />
                <div className="relative mx-auto flex max-w-xs items-center justify-center">
                  <div className="w-[42%] translate-y-4 -rotate-6">
                    <PhoneFrame
                      src={`/screens/${project.slug}/${second}.jpg`}
                      alt={`${project.name} secondary screen`}
                      sizes="160px"
                    />
                  </div>
                  <div className="-ml-6 w-[50%] rotate-3">
                    <PhoneFrame
                      src={`/screens/${project.slug}/1.jpg`}
                      alt={`${project.name} main screen`}
                      priority
                      sizes="200px"
                    />
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Quick facts */}
          <Reveal delay={0.1}>
            <dl className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
              {facts.map((f) => (
                <div key={f.label} className="bg-card px-5 py-5">
                  <dt className="font-mono text-[11px] uppercase tracking-wider text-muted">
                    {f.label}
                  </dt>
                  <dd className="mt-1.5 text-sm font-semibold text-foreground">
                    {f.value}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </Container>
      </section>

      {/* Overview */}
      <Section className="pt-8" ariaLabel="Project overview">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[0.35fr_0.65fr]">
            <Reveal>
              <h2 className="text-sm font-mono uppercase tracking-[0.2em] text-primary">
                Overview
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-pretty text-lg leading-relaxed text-foreground/90">
                {project.overview}
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Problem & Solution */}
      <Section className="py-12" ariaLabel="Problem and solution">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-border bg-card p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background-secondary text-amber-500">
                  <Target className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">The Problem</h3>
                <p className="mt-3 leading-relaxed text-muted">{project.problem}</p>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="h-full rounded-3xl border border-border bg-card p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background-secondary text-primary">
                  <Lightbulb className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-xl font-semibold">The Solution</h3>
                <p className="mt-3 leading-relaxed text-muted">{project.solution}</p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Role + Features */}
      <Section className="py-12" ariaLabel="Role and features">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <Reveal>
              <div>
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <UserCog className="h-5 w-5 text-primary" /> My Role
                </h3>
                <p className="mt-4 leading-relaxed text-muted">{project.role}</p>

                <h3 className="mt-10 flex items-center gap-2 text-xl font-semibold">
                  <Layers className="h-5 w-5 text-primary" /> Technical Stack
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((t) => (
                    <span
                      key={t}
                      className="rounded-lg border border-border bg-card px-3 py-1.5 font-mono text-xs text-foreground/80"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div>
                <h3 className="flex items-center gap-2 text-xl font-semibold">
                  <Check className="h-5 w-5 text-primary" /> Key Features
                </h3>
                <ul className="mt-4 grid gap-3">
                  {project.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm text-foreground/90"
                    >
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Engineering decisions */}
      <Section className="py-12" ariaLabel="Engineering decisions">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Engineering <span className="text-gradient">decisions</span>
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {project.decisions.map((d, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="flex h-full gap-3 rounded-2xl border border-border bg-card p-5">
                  <span className="font-mono text-sm font-bold text-primary">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-muted">{d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Challenges & solutions */}
      <Section className="py-12" ariaLabel="Challenges and solutions">
        <Container>
          <Reveal>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Challenges &amp; <span className="text-gradient">solutions</span>
            </h2>
          </Reveal>
          <div className="mt-8 flex flex-col gap-4">
            {project.challenges.map((c, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="grid gap-5 rounded-3xl border border-border bg-card p-6 sm:p-7 md:grid-cols-2">
                  <div className="md:border-r md:border-border md:pr-6">
                    <span className="font-mono text-[11px] uppercase tracking-wider text-amber-500">
                      Challenge
                    </span>
                    <p className="mt-2 leading-relaxed text-foreground/90">
                      {c.challenge}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-primary">
                      Solution
                    </span>
                    <p className="mt-2 leading-relaxed text-muted">{c.solution}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Gallery */}
      <Section className="py-12" ariaLabel="Screenshot gallery">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Screenshot <span className="text-gradient">gallery</span>
              </h2>
              <span className="font-mono text-xs text-muted">
                Tap any image to enlarge
              </span>
            </div>
          </Reveal>
          <div className="mt-8">
            <ProjectGallery
              slug={project.slug}
              imageCount={project.imageCount}
              name={project.name}
              accent={project.accent}
            />
          </div>
        </Container>
      </Section>

      {/* Prev / Next */}
      <Section className="py-12" ariaLabel="Project navigation">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href={`/projects/${prev.slug}`}
              className="group flex flex-col gap-2 rounded-2xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted">
                <ArrowLeft className="h-3.5 w-3.5" /> Previous
              </span>
              <span className="text-lg font-semibold transition-colors group-hover:text-primary">
                {prev.name}
              </span>
              <span className="text-sm text-muted">{prev.category}</span>
            </Link>
            <Link
              href={`/projects/${next.slug}`}
              className="group flex flex-col items-end gap-2 rounded-2xl border border-border bg-card p-6 text-right transition-colors hover:border-primary/40"
            >
              <span className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-muted">
                Next <ArrowRight className="h-3.5 w-3.5" />
              </span>
              <span className="text-lg font-semibold transition-colors group-hover:text-primary">
                {next.name}
              </span>
              <span className="text-sm text-muted">{next.category}</span>
            </Link>
          </div>
        </Container>
      </Section>

      <ContactCTA />
    </>
  );
}
