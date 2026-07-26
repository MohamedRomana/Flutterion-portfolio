import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";

export function Manifesto() {
  return (
    <Section id="manifesto" ariaLabel="Manifesto" className="py-24 sm:py-32">
      <Container>
        <Reveal>
          <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
            <span className="text-primary">00</span>
            <span className="h-px w-8 bg-border-strong" aria-hidden />
            <span className="text-foreground/80">Manifesto</span>
          </span>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-6xl md:text-7xl">
            Not just built.{" "}
            <span className="text-gradient">Engineered.</span>
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal delay={0.1}>
            <p className="font-mono text-sm uppercase tracking-[0.16em] text-primary">
              Performance in Motion
            </p>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex flex-col gap-5 text-pretty text-lg leading-relaxed text-foreground/85">
              <p>
                I build Flutter apps the way products should be built — clean
                architecture, real-time behaviour, and performance that holds
                at scale. Every screen is deliberate, every state is handled,
                every app ships.
              </p>
              <p className="text-muted">
                Over the last few years I&apos;ve shipped{" "}
                <span className="text-foreground">12 production apps</span>{" "}
                across marketplaces, government, e-commerce, and delivery —
                turning complex, multi-role systems into apps that feel simple.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
