import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { TextReveal } from "@/components/ui/TextReveal";
import { shippedCount } from "@/data/skills";

export function Manifesto() {
  return (
    <Section id="manifesto" ariaLabel="Manifesto" className="py-20 sm:py-28">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[0.3fr_1fr] lg:gap-16">
          <Reveal>
            <Eyebrow index="00">Manifesto</Eyebrow>
          </Reveal>
          <TextReveal
            className="text-[clamp(1.85rem,4.2vw,3.6rem)] font-medium leading-[1.12] tracking-[-0.035em]"
            text={`I don't just build screens — I *engineer* products. Clean architecture, real-time behaviour, and performance that holds at scale. ${shippedCount} apps shipped across government, marketplaces, e-commerce, delivery, and heritage — each one turning a *complex* system into something that feels *simple*.`}
          />
        </div>
      </Container>
    </Section>
  );
}
