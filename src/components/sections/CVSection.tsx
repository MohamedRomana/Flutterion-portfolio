import Image from "next/image";
import { ArrowUpRight, Download, FileText } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Magnetic } from "@/components/ui/Magnetic";
import { profile } from "@/data/profile";
import { storeCount } from "@/data/skills";

export function CVSection() {
  const highlights = [
    { k: `${storeCount}`, v: "Store-published apps, each with direct links" },
    { k: "2", v: "Pages — skills, experience & selected projects" },
    { k: "ATS", v: "Clean single-column layout recruiters can parse" },
  ];

  return (
    <Section id="cv" ariaLabel="Curriculum vitae">
      <Container>
        <div className="relative overflow-hidden rounded-[2rem] border border-border-strong bg-card">
          <div aria-hidden className="bg-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(80%_80%_at_80%_20%,#000,transparent_75%)]" />
          <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/25 blur-[120px]" />

          <div className="relative grid items-center gap-12 p-6 sm:p-10 lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:p-16">
            <div>
              <Reveal>
                <Eyebrow index="07">Résumé</Eyebrow>
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="mt-6 text-[clamp(2.4rem,5.4vw,4.8rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
                  The whole story, <span className="serif text-primary">on paper.</span>
                </h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-6 max-w-lg text-pretty text-lg leading-relaxed text-muted">
                  Everything a hiring team needs in one PDF — experience, technical skills, and the
                  apps I&apos;ve shipped to the App Store and Google Play, with links to every case
                  study on this site.
                </p>
              </Reveal>

              <Reveal delay={0.14}>
                <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-3">
                  {highlights.map((h) => (
                    <div key={h.v} className="bg-card p-5">
                      <dt className="text-3xl font-semibold tracking-[-0.04em]">{h.k}</dt>
                      <dd className="mt-1.5 text-sm leading-snug text-muted">{h.v}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <Magnetic className="inline-block">
                    <a
                      href={profile.cvUrl}
                      download
                      className="inline-flex h-14 items-center gap-2 rounded-full bg-lime px-7 text-[15px] font-medium text-on-lime shadow-[0_12px_40px_-14px_color-mix(in_srgb,var(--lime)_70%,transparent)] transition-transform duration-300 hover:scale-[1.03]"
                    >
                      <Download className="h-4 w-4" />
                      Download CV
                    </a>
                  </Magnetic>
                  <a
                    href={profile.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex h-14 items-center gap-2 rounded-full border border-border-strong px-7 text-[15px] font-medium transition-colors hover:border-foreground/40"
                  >
                    <FileText className="h-4 w-4" />
                    Open in browser
                    <ArrowUpRight className="h-4 w-4 text-muted" />
                  </a>
                </div>
              </Reveal>
            </div>

            {/* Paper preview */}
            <Reveal delay={0.1}>
              <a
                href={profile.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor-label="Open"
                aria-label="Open the CV PDF"
                className="group relative mx-auto block w-full max-w-[26rem]"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 translate-x-4 translate-y-4 rotate-[5deg] rounded-xl border border-border-strong bg-background-secondary transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6 group-hover:rotate-[8deg]"
                />
                <span className="relative block aspect-[1588/2246] -rotate-[3deg] overflow-hidden rounded-xl bg-white shadow-[0_50px_100px_-40px_rgba(0,0,0,0.7)] ring-1 ring-black/10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-0 group-hover:scale-[1.02]">
                  <Image
                    src="/cv-preview.png"
                    alt={`First page of ${profile.name}'s CV`}
                    fill
                    sizes="(max-width: 1024px) 90vw, 416px"
                    className="object-cover object-top"
                  />
                </span>
                <span className="absolute -bottom-4 -left-3 inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-background shadow-lg">
                  <FileText className="h-3.5 w-3.5" /> PDF · A4
                </span>
              </a>
            </Reveal>
          </div>
        </div>
      </Container>
    </Section>
  );
}
