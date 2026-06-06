import {
  Compass,
  LayoutTemplate,
  Cable,
  Rocket,
  type LucideIcon,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { processSteps } from "@/data/skills";

const iconMap: Record<string, LucideIcon> = {
  Compass,
  LayoutTemplate,
  Cable,
  Rocket,
};

export function Process() {
  return (
    <Section id="process" ariaLabel="Development process">
      <Container>
        <SectionHeading
          eyebrow="Process"
          title={
            <>
              How an app goes from <span className="text-gradient">idea to store</span>
            </>
          }
          description="A pragmatic, repeatable flow that keeps quality high from the first widget to the release build."
        />

        <div className="relative mt-16">
          {/* Connecting line (desktop) */}
          <div
            aria-hidden
            className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent lg:block"
          />
          <StaggerGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {processSteps.map((step) => {
              const Icon = iconMap[step.icon] ?? Compass;
              return (
                <StaggerItem key={step.step} className="relative">
                  <div className="flex flex-col items-start gap-4">
                    <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-primary">
                      <Icon className="h-6 w-6" />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple font-mono text-[11px] font-bold text-white">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted">
                      {step.description}
                    </p>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerGroup>
        </div>
      </Container>
    </Section>
  );
}
