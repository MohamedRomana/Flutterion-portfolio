import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/skills";

export function Process() {
  return (
    <Section id="process" ariaLabel="Development process">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Heading column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
                <span className="text-primary">06</span>
                <span className="h-px w-8 bg-border-strong" aria-hidden />
                <span className="text-foreground/80">Process</span>
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
                From idea to <span className="text-gradient">store.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
                A pragmatic, repeatable flow that keeps quality high from the
                first widget to the release build.
              </p>
            </Reveal>
          </div>

          {/* Numbered list column */}
          <ol className="flex flex-col">
            {processSteps.map((step, i) => (
              <li key={step.step}>
                <Reveal delay={i * 0.06}>
                  <div className="group grid grid-cols-[auto_1fr] gap-5 border-t border-border py-7 transition-colors duration-300 last:border-b sm:gap-8">
                    <span className="font-mono text-sm text-primary">
                      {step.step}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                        {step.title}
                      </h3>
                      <p className="mt-2.5 max-w-xl leading-relaxed text-muted">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
