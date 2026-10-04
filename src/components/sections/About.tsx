import Image from "next/image";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { LocalTime } from "@/components/ui/LocalTime";
import { FlutterLogo } from "@/components/ui/FlutterLogo";
import { Marquee } from "@/components/ui/Marquee";
import { profile } from "@/data/profile";
import { timeline } from "@/data/services";
import { techStack } from "@/data/skills";

export function About() {
  const work = timeline.find((t) => t.type === "work");
  const edu = timeline.find((t) => t.type === "education");

  return (
    <Section id="about" ariaLabel="About">
      <Container>
        <div className="grid grid-cols-1 gap-4 lg:auto-rows-[minmax(15rem,auto)] lg:grid-cols-4">
          {/* Photo */}
          <Reveal className="lg:row-span-2">
            <div className="group relative h-full min-h-[26rem] overflow-hidden rounded-[1.75rem] border border-border-strong">
              <Image
                src="/about-me.jpg"
                alt={`Portrait of ${profile.name}`}
                fill
                sizes="(max-width: 1024px) 100vw, 25vw"
                className="object-cover object-[50%_30%] transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                <p className="text-2xl font-semibold tracking-[-0.03em]">{profile.name}</p>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">
                  {profile.title}
                </p>
              </div>
            </div>
          </Reveal>

          {/* Bio */}
          <Reveal delay={0.05} className="lg:col-span-2">
            <SpotlightCard className="h-full" innerClassName="flex flex-col justify-between gap-8 p-7 sm:p-9">
              <Eyebrow index="03">About</Eyebrow>
              <div>
                <h2 className="text-[clamp(2rem,3.6vw,3.25rem)] font-semibold leading-[1] tracking-[-0.045em]">
                  Flutter is my craft — <span className="serif text-primary">not just a tool.</span>
                </h2>
                <p className="mt-5 max-w-2xl text-pretty leading-relaxed text-muted">
                  {profile.longBio[0]}
                </p>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Location + time */}
          <Reveal delay={0.1}>
            <SpotlightCard className="h-full" innerClassName="flex flex-col justify-between gap-8 p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong">
                <MapPin className="h-5 w-5 text-primary" />
              </span>
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  Based in
                </p>
                <p className="mt-1 text-xl font-semibold tracking-tight">{profile.location}</p>
                <p className="mt-4 font-mono text-4xl tabular-nums tracking-tight">
                  <LocalTime />
                </p>
                <p className="mt-1 text-xs text-muted">Local time · GMT+2/3 · works with KSA &amp; Gulf</p>
              </div>
            </SpotlightCard>
          </Reveal>

          {/* Now */}
          {work && (
            <Reveal delay={0.12}>
              <SpotlightCard className="h-full" innerClassName="flex flex-col justify-between gap-8 p-7">
                <div className="flex items-center justify-between">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong">
                    <Briefcase className="h-5 w-5 text-primary" />
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-lime px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-on-lime">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-on-lime" /> Now
                  </span>
                </div>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {work.period}
                  </p>
                  <p className="mt-1 text-xl font-semibold tracking-tight">{work.title}</p>
                  <p className="text-sm text-muted">{work.organization}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          )}

          {/* Education */}
          {edu && (
            <Reveal delay={0.14}>
              <SpotlightCard className="h-full" innerClassName="flex flex-col justify-between gap-8 p-7">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong">
                  <GraduationCap className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                    {edu.period}
                  </p>
                  <p className="mt-1 text-xl font-semibold tracking-tight">{edu.title}</p>
                  <p className="text-sm text-muted">{edu.organization}</p>
                </div>
              </SpotlightCard>
            </Reveal>
          )}

          {/* Flutter */}
          <Reveal delay={0.16}>
            <SpotlightCard className="h-full" innerClassName="flex flex-col justify-between gap-6 py-7">
              <div className="flex items-center gap-3 px-7">
                <FlutterLogo className="h-9 w-auto" />
                <p className="text-sm leading-snug text-muted">
                  Dart &amp; Flutter,
                  <br />
                  <span className="text-foreground">BLoC-first, always.</span>
                </p>
              </div>
              <Marquee items={techStack.slice(0, 9)} />
            </SpotlightCard>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
