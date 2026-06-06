import {
  Code2,
  Workflow,
  Boxes,
  Server,
  MapPin,
  BellRing,
  GitBranch,
  type LucideIcon,
} from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { skillGroups } from "@/data/skills";
import { cn } from "@/lib/utils";

const iconMap: Record<string, LucideIcon> = {
  Code2,
  Workflow,
  Boxes,
  Server,
  MapPin,
  BellRing,
  GitBranch,
};

export function Skills() {
  return (
    <Section id="skills" ariaLabel="Flutter engineering skills">
      <Container>
        <SectionHeading
          eyebrow="Engineering"
          title={
            <>
              The Flutter <span className="text-gradient">engineering stack</span>
            </>
          }
          description="A capability dashboard of the tools and patterns I use in production — every item is drawn from real, shipped work."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = iconMap[group.icon] ?? Code2;
            // Make the first card a wider "core" tile on large screens.
            const isCore = i === 0;
            return (
              <StaggerItem
                key={group.title}
                className={cn(isCore && "sm:col-span-2 lg:col-span-1")}
              >
                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:border-primary/40">
                  {/* Dashboard-style header */}
                  <div className="mb-5 flex items-center justify-between">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background-secondary text-primary">
                      <Icon className="h-[22px] w-[22px]" />
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                      {String(i + 1).padStart(2, "0")} / {String(skillGroups.length).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-base font-semibold tracking-tight">
                    {group.title}
                  </h3>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg border border-border bg-background-secondary px-2.5 py-1 font-mono text-xs text-foreground/80 transition-colors duration-200 group-hover:border-border-strong"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </Container>
    </Section>
  );
}
