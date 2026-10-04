import {
  BellRing,
  MapPin,
  Plug,
  Smartphone,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { services } from "@/data/services";

const ICONS: Record<string, LucideIcon> = {
  Smartphone,
  Workflow,
  Plug,
  BellRing,
  MapPin,
  Sparkles,
};

export function Services() {
  return (
    <Section id="services" ariaLabel="Services" className="bg-background-secondary">
      <Container>
        <SectionHeading
          index="04"
          eyebrow="Services"
          title={
            <>
              How I help <span className="serif text-primary">you ship.</span>
            </>
          }
          description="From a single screen to a full multi-role product — capabilities drawn directly from apps I've already delivered."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => {
            const Icon = ICONS[s.icon] ?? Sparkles;
            return (
              <Reveal key={s.title} delay={(i % 3) * 0.06}>
                <SpotlightCard className="h-full" innerClassName="flex h-full flex-col p-7 sm:p-8">
                  <div className="flex items-start justify-between">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-foreground text-background transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-rotate-6 group-hover:scale-110">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-10 text-2xl font-semibold tracking-[-0.03em]">{s.title}</h3>
                  <p className="mt-3 text-pretty leading-relaxed text-muted">{s.description}</p>
                  <div className="mt-auto flex flex-wrap gap-1.5 pt-6">
                    {s.features.map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-border-strong px-2.5 py-1 font-mono text-[11px] text-muted"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
