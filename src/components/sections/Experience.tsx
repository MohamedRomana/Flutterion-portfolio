import { Briefcase, GraduationCap } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { timeline } from "@/data/services";

export function Experience() {
  return (
    <Section
      id="experience"
      ariaLabel="Experience timeline"
      className="bg-background-secondary"
    >
      <Container>
        <SectionHeading
          eyebrow="Journey"
          title={
            <>
              Experience &amp; <span className="text-gradient">education</span>
            </>
          }
          description="The dated milestones behind the work — no filler, just where I've studied and built."
        />

        <div className="relative mx-auto mt-16 max-w-3xl">
          {/* Vertical line */}
          <div
            aria-hidden
            className="absolute bottom-2 left-[19px] top-2 w-px bg-gradient-to-b from-primary/60 via-border-strong to-transparent sm:left-[27px]"
          />
          <ol className="flex flex-col gap-10">
            {timeline.map((entry, i) => {
              const Icon = entry.type === "work" ? Briefcase : GraduationCap;
              return (
                <li key={i}>
                  <Reveal delay={i * 0.05}>
                    <div className="flex gap-5 sm:gap-7">
                      <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border-strong bg-card text-primary sm:h-14 sm:w-14">
                        <Icon className="h-5 w-5 sm:h-6 sm:w-6" />
                      </div>
                      <div className="flex-1 rounded-2xl border border-border bg-card p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                          <span className="font-mono text-xs uppercase tracking-wider text-primary">
                            {entry.period}
                          </span>
                          {entry.current && (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wide text-primary">
                              <span className="relative flex h-1.5 w-1.5">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
                              </span>
                              Current
                            </span>
                          )}
                        </div>
                        <h3 className="mt-2 text-lg font-semibold tracking-tight">
                          {entry.title}
                        </h3>
                        <p className="text-sm font-medium text-foreground/80">
                          {entry.organization}
                        </p>
                        <p className="mt-3 text-sm leading-relaxed text-muted">
                          {entry.description}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
