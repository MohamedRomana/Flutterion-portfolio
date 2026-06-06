import { GraduationCap, Briefcase, MapPin, Languages } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/data/profile";

const facts = [
  { icon: Briefcase, label: "Now", value: "Flutter Developer @ Efadh For Web Solution" },
  { icon: GraduationCap, label: "Education", value: "B.Sc. Computer Science — Mansoura University" },
  { icon: MapPin, label: "Based in", value: profile.location },
  { icon: Languages, label: "Focus", value: "Mobile · Flutter & Dart" },
];

export function About() {
  return (
    <Section id="about" ariaLabel="About">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_0.85fr] lg:items-center">
          <div className="flex flex-col gap-6">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                About
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Flutter is my craft — <span className="text-gradient">not just a tool.</span>
              </h2>
            </Reveal>
            <div className="flex flex-col gap-4">
              {profile.longBio.map((para, i) => (
                <Reveal key={i} delay={0.1 + i * 0.06}>
                  <p className="text-pretty leading-relaxed text-muted">{para}</p>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Profile card (initials avatar — no stock photography) */}
          <Reveal delay={0.1}>
            <div className="glow-shadow relative overflow-hidden rounded-3xl border border-border bg-card p-7">
              <div className="bg-dot pointer-events-none absolute inset-0 opacity-50" />
              <div className="relative flex items-center gap-4">
                <div
                  className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-purple text-2xl font-bold text-white"
                  aria-hidden
                >
                  MR
                </div>
                <div>
                  <p className="text-lg font-semibold">{profile.name}</p>
                  <p className="font-mono text-sm text-primary">{profile.title}</p>
                </div>
              </div>

              <ul className="relative mt-7 flex flex-col divide-y divide-border">
                {facts.map((f) => (
                  <li key={f.label} className="flex items-start gap-3 py-3.5">
                    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-background-secondary text-primary">
                      <f.icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="flex flex-col">
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                        {f.label}
                      </span>
                      <span className="text-sm font-medium text-foreground">
                        {f.value}
                      </span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
