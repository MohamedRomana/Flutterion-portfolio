"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container, Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Marquee } from "@/components/ui/Marquee";
import { techStack } from "@/data/skills";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

export function TechStack() {
  const half = Math.ceil(techStack.length / 2);
  const reduce = useReducedMotion();

  const row = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24, scale: 0.96, filter: "blur(8px)" },
          whileInView: { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" },
          viewport: { once: true, margin: "-70px" },
          transition: { duration: 0.7, ease: EASE, delay },
        };

  return (
    <Section
      id="tech"
      ariaLabel="Tech stack"
      className="bg-background-secondary py-16 sm:py-20"
    >
      <Container>
        <SectionHeading
          eyebrow="Tech Stack"
          index="05"
          title={
            <>
              Tools I reach for <span className="text-gradient">every day</span>
            </>
          }
        />
      </Container>
      <div className="mt-10 flex flex-col gap-4">
        <motion.div {...row(0)}>
          <Marquee items={techStack.slice(0, half)} />
        </motion.div>
        <motion.div {...row(0.12)}>
          <Marquee items={techStack.slice(half)} reverse />
        </motion.div>
      </div>
    </Section>
  );
}
