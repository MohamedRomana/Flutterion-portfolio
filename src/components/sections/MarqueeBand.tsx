import { Marquee } from "@/components/ui/Marquee";
import { projects } from "@/data/projects";
import { techStack } from "@/data/skills";

/** Two crossing tilted ribbons — shipped app names over the core stack. */
export function MarqueeBand() {
  const names = projects.map((p) => p.name);
  const stack = techStack.slice(0, 10);

  return (
    <section
      id="marquee"
      aria-label="Shipped apps"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-28"
    >
      <div className="relative">
        <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.5deg] bg-foreground py-4 text-background sm:py-5">
          <Marquee
            items={stack.map((t) => (
              <span key={t} className="font-mono text-lg uppercase tracking-[0.14em] sm:text-xl">
                {t}
              </span>
            ))}
            reverse
          />
        </div>
        <div className="relative mx-[-5%] -rotate-[2deg] bg-lime py-5 text-on-lime shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)] sm:py-7">
          <Marquee variant="display" items={names} />
        </div>
      </div>
    </section>
  );
}
