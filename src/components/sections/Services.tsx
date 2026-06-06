import {
  Smartphone,
  Workflow,
  Plug,
  BellRing,
  MapPin,
  Sparkles,
  Check,
  type LucideIcon,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { services } from "@/data/services";

const iconMap: Record<string, LucideIcon> = {
  Smartphone,
  Workflow,
  Plug,
  BellRing,
  MapPin,
  Sparkles,
};

export function Services() {
  return (
    <Section id="services" ariaLabel="Services">
      <Container>
        <SectionHeading
          eyebrow="Services"
          title={
            <>
              How I can <span className="text-gradient">help you ship</span>
            </>
          }
          description="From a single screen to a full multi-role product — capabilities drawn directly from work I've already delivered."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Smartphone;
            return (
              <StaggerItem key={service.title}>
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <div
                    className="pointer-events-none absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    aria-hidden
                  />
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary/15 to-purple/15 text-primary">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <ul className="mt-5 flex flex-col gap-2 border-t border-border pt-4">
                    {service.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-center gap-2 text-sm text-foreground/85"
                      >
                        <Check className="h-4 w-4 shrink-0 text-primary" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
