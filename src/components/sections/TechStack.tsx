import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Marquee } from "@/components/ui/Marquee";
import { techStack } from "@/data/skills";

export function TechStack() {
  const half = Math.ceil(techStack.length / 2);
  return (
    <Section
      id="tech"
      ariaLabel="Tech stack"
      className="bg-background-secondary py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="Tech Stack"
          title={
            <>
              Tools I reach for <span className="text-gradient">every day</span>
            </>
          }
        />
      </Container>
      <Reveal className="mt-10 flex flex-col gap-4">
        <Marquee items={techStack.slice(0, half)} />
        <Marquee items={techStack.slice(half)} reverse />
      </Reveal>
    </Section>
  );
}
