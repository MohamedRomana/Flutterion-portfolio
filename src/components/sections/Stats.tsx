import { Container } from "@/components/ui/Section";
import { CountUp } from "@/components/ui/CountUp";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { stats } from "@/data/skills";

export function Stats() {
  return (
    <section aria-label="Key statistics" className="relative py-8">
      <Container>
        <StaggerGroup className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border bg-border lg:grid-cols-4">
          {stats.map((s) => (
            <StaggerItem key={s.label} className="bg-card">
              <div className="flex h-full flex-col items-center gap-2 px-5 py-9 text-center sm:px-8">
                <span className="text-4xl font-bold tracking-tight text-gradient sm:text-5xl">
                  {s.value !== null ? (
                    <CountUp to={s.value} suffix={s.suffix} />
                  ) : (
                    s.display
                  )}
                </span>
                <span className="text-pretty text-xs leading-relaxed text-muted sm:text-sm">
                  {s.label}
                </span>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </Container>
    </section>
  );
}
