import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <Section id="services" ariaLabel="Services">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Heading column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
                <span className="text-primary">08</span>
                <span className="h-px w-8 bg-border-strong" aria-hidden />
                <span className="text-foreground/80">Services</span>
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
                How I can <span className="text-gradient">help you ship.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
                From a single screen to a full multi-role product — capabilities
                drawn directly from work I&apos;ve already delivered.
              </p>
            </Reveal>
          </div>

          {/* Numbered list column */}
          <ol className="flex flex-col">
            {services.map((service, i) => (
              <li key={service.title}>
                <Reveal delay={i * 0.05}>
                  <div className="group grid grid-cols-[auto_1fr] gap-5 border-t border-border py-7 last:border-b sm:gap-8">
                    <span className="font-mono text-sm text-primary">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                        {service.title}
                      </h3>
                      <p className="mt-2.5 max-w-xl leading-relaxed text-muted">
                        {service.description}
                      </p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {service.features.map((f) => (
                          <span
                            key={f}
                            className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] text-muted"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
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
