"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { processSteps } from "@/data/skills";

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.6"] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24 });

  return (
    <Section id="process" ariaLabel="Development process">
      <Container>
        <SectionHeading
          index="06"
          eyebrow="Process"
          title={
            <>
              From idea <span className="serif text-primary">to store.</span>
            </>
          }
          description="A pragmatic, repeatable flow that keeps quality high from the first widget to the release build."
        />

        <div ref={ref} className="relative mt-16">
          {/* Track */}
          <div aria-hidden className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px bg-border-strong lg:left-0 lg:top-[11px] lg:h-px lg:w-full" />
          <motion.div
            aria-hidden
            style={reduce ? undefined : { scaleY: progress }}
            className="absolute left-[11px] top-2 h-[calc(100%-1rem)] w-px origin-top bg-lime light:bg-primary lg:hidden"
          />
          <motion.div
            aria-hidden
            style={reduce ? undefined : { scaleX: progress }}
            className="absolute left-0 top-[11px] hidden h-px w-full origin-left bg-lime light:bg-primary lg:block"
          />

          <ol className="relative grid gap-10 lg:grid-cols-4 lg:gap-6">
          {processSteps.map((s, i) => (
            <li key={s.step} className="relative pl-12 lg:pl-0 lg:pt-14">
              <span
                aria-hidden
                className="absolute left-0 top-0 flex h-6 w-6 items-center justify-center rounded-full border border-border-strong bg-background"
              >
                <span className="h-2 w-2 rounded-full bg-lime light:bg-primary" />
              </span>
              <Reveal delay={i * 0.08}>
                <span className="font-mono text-sm text-primary">{s.step}</span>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">{s.title}</h3>
                <p className="mt-3 text-pretty leading-relaxed text-muted">{s.description}</p>
              </Reveal>
            </li>
          ))}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
