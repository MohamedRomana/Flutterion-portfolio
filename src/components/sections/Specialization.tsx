import {
  Smartphone,
  Workflow,
  Radio,
  Plug,
  Boxes,
  Gauge,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

/**
 * Each capability maps to something demonstrated in the CV/projects —
 * no invented specialisations.
 */
const specializations = [
  {
    icon: Smartphone,
    title: "Cross-Platform Apps",
    description:
      "One Dart codebase shipping polished iOS and Android apps — responsive across every screen size with ScreenUtil.",
  },
  {
    icon: Workflow,
    title: "State Management",
    description:
      "Scalable, testable state with BLoC and Cubit — including a Finite State Machine for complex multi-role workflows.",
  },
  {
    icon: Radio,
    title: "Real-Time Features",
    description:
      "Live data synchronisation, order tracking, and Firebase push notifications that keep users instantly in sync.",
  },
  {
    icon: Plug,
    title: "API Integration",
    description:
      "Robust REST integration with Dio — typed models, interceptors, and structured error handling end to end.",
  },
  {
    icon: Boxes,
    title: "Clean Architecture",
    description:
      "SOLID principles, MVVM, and reusable modules that keep large apps maintainable as they grow.",
  },
  {
    icon: Gauge,
    title: "Performance",
    description:
      "Smooth, optimised UIs tuned for government-scale data and demanding, media-heavy real-world workloads.",
  },
];

export function Specialization() {
  return (
    <Section
      id="specialization"
      ariaLabel="Flutter specialization"
      className="bg-background-secondary"
    >
      <Container>
        <SectionHeading
          eyebrow="Specialization"
          title={
            <>
              Built for <span className="text-gradient">mobile excellence</span>
            </>
          }
          description="My work centres on the parts of mobile engineering that decide whether an app feels premium — architecture, real-time behaviour, and performance."
        />

        <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {specializations.map((s) => (
            <StaggerItem key={s.title}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <div
                  className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background-secondary text-primary transition-colors duration-300 group-hover:border-primary/40">
                  <s.icon className="h-6 w-6" />
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {s.description}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
