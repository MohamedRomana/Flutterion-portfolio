import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <Section id="stack" ariaLabel="Engineering stack" className="bg-background-secondary pt-0 sm:pt-0">
      <Container>
        <div className="border-t border-border pt-24 sm:pt-32">
          <SectionHeading
            index="05"
            eyebrow="Stack"
            title={
              <>
                The engineering <span className="serif text-primary">toolkit.</span>
              </>
            }
            description="A capability map of the tools and patterns I use in production — every item comes from real, shipped work."
          />

          <dl className="mt-14 grid gap-px overflow-hidden rounded-[1.75rem] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {skillGroups.map((g, i) => (
              <Reveal key={g.title} delay={(i % 4) * 0.05} className="bg-background-secondary">
                <div className="group flex h-full flex-col gap-5 p-6 transition-colors duration-300 hover:bg-card sm:p-7">
                  <dt className="flex items-center justify-between gap-3">
                    <span className="font-semibold tracking-tight">{g.title}</span>
                    <span className="font-mono text-xs text-muted transition-colors group-hover:text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </dt>
                  <dd className="flex flex-wrap gap-1.5">
                    {g.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-border-strong bg-card px-2.5 py-1 text-xs text-foreground/80"
                      >
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </Container>
    </Section>
  );
}
