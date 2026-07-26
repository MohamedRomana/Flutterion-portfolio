import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export type EditorialItem = {
  /** Row number, e.g. "01". */
  n: string;
  title: string;
  description: string;
  /** Optional trailing chips (features, skills…). */
  tags?: string[];
};

/**
 * The reference's signature editorial block: a sticky display heading on one
 * side and a numbered list of divider-separated rows on the other.
 */
export function EditorialList({
  id,
  ariaLabel,
  index,
  eyebrow,
  title,
  description,
  items,
  className,
}: {
  id?: string;
  ariaLabel?: string;
  index: string;
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  items: EditorialItem[];
  className?: string;
}) {
  return (
    <Section id={id} ariaLabel={ariaLabel} className={className}>
      <Container>
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Heading column */}
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Reveal>
              <span className="inline-flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.28em] text-muted">
                <span className="text-primary">{index}</span>
                <span className="h-px w-8 bg-border-strong" aria-hidden />
                <span className="text-foreground/80">{eyebrow}</span>
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 text-balance text-4xl font-bold leading-[1.02] tracking-tight sm:text-5xl md:text-6xl">
                {title}
              </h2>
            </Reveal>
            {description && (
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-pretty leading-relaxed text-muted">
                  {description}
                </p>
              </Reveal>
            )}
          </div>

          {/* Numbered list column */}
          <ol className="flex flex-col">
            {items.map((item, i) => (
              <li key={item.title}>
                <Reveal delay={i * 0.05}>
                  <div
                    className={cn(
                      "group grid grid-cols-[auto_1fr] gap-5 border-t border-border py-7 last:border-b sm:gap-8",
                    )}
                  >
                    <span className="font-mono text-sm text-primary">{item.n}</span>
                    <div>
                      <h3 className="text-xl font-semibold tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-2xl">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="mt-2.5 max-w-xl leading-relaxed text-muted">
                          {item.description}
                        </p>
                      )}
                      {item.tags && item.tags.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {item.tags.map((t) => (
                            <span
                              key={t}
                              className="rounded-md border border-border bg-card px-2.5 py-1 font-mono text-[11px] text-muted"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
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
