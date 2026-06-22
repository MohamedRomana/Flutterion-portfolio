"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowDown, ArrowRight, Sparkles, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Container } from "@/components/ui/Section";
import { profile } from "@/data/profile";

const EASE = [0.21, 0.47, 0.32, 0.98] as const;

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

const floatingChips = [
  { label: "BLoC", x: "6%", y: "18%", delay: 0 },
  { label: "Realtime", x: "84%", y: "12%", delay: 0.4 },
  { label: "Dio · REST", x: "2%", y: "68%", delay: 0.8 },
  { label: "Google Maps", x: "82%", y: "72%", delay: 1.2 },
];

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const yFront = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -70]);
  const yBack = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -30]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32"
    >
      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(110%_90%_at_50%_0%,#000_30%,transparent_75%)]" />
        <div className="absolute left-1/2 top-[-12%] h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
        <div className="absolute right-[-8%] top-[20%] h-[28rem] w-[28rem] rounded-full bg-purple/20 blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-6%] h-[26rem] w-[26rem] rounded-full bg-cyan/10 blur-[120px]" />
      </div>

      {/* Floating Flutter-inspired chips (desktop) */}
      {!reduce &&
        floatingChips.map((c) => (
          <motion.span
            key={c.label}
            aria-hidden
            className="absolute z-0 hidden select-none rounded-full border border-border-strong bg-card/80 px-3 py-1.5 font-mono text-xs text-muted backdrop-blur lg:block"
            style={{ left: c.x, top: c.y }}
            animate={{ y: [0, -14, 0] }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: c.delay,
            }}
          >
            <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary align-middle" />
            {c.label}
          </motion.span>
        ))}

      <Container className="relative">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left — copy */}
          <motion.div
            variants={reduce ? undefined : container}
            initial={reduce ? false : "hidden"}
            animate={reduce ? undefined : "show"}
            className="flex flex-col items-start text-left"
          >
            <motion.span
              variants={reduce ? undefined : item}
              className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.16em] text-primary"
            >
              <Sparkles className="h-3.5 w-3.5" />
              {profile.tagline}
            </motion.span>

            <motion.h1
              variants={reduce ? undefined : item}
              className="mt-6 text-balance text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl xl:text-7xl"
            >
              Crafting <span className="text-gradient">high-performance</span>{" "}
              mobile apps with Flutter.
            </motion.h1>

            <motion.p
              variants={reduce ? undefined : item}
              className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-muted sm:text-lg"
            >
              I&apos;m{" "}
              <span className="font-medium text-foreground">{profile.name}</span>{" "}
              — a Flutter developer building scalable, responsive, and
              high-performance mobile applications with clean architecture,
              real-time features, and seamless API integrations.
            </motion.p>

            <motion.div
              variants={reduce ? undefined : item}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <Button href="/#projects" size="lg" magnetic>
                Explore My Work
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
              </Button>
              <Button href="/#contact" size="lg" variant="secondary" magnetic>
                Contact Me
              </Button>
            </motion.div>

            <motion.div
              variants={reduce ? undefined : item}
              className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted"
            >
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="h-4 w-4 text-primary" /> {profile.location}
              </span>
              <span className="hidden h-4 w-px bg-border sm:block" />
              <span>12 apps shipped · iOS &amp; Android · BLoC-first</span>
            </motion.div>
          </motion.div>

          {/* Right — floating phone cluster */}
          <motion.div
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
            className="relative mx-auto hidden h-[34rem] w-full max-w-md sm:block"
          >
            {/* Rotating diamond accent */}
            {!reduce && (
              <motion.div
                aria-hidden
                className="absolute left-1/2 top-1/2 -z-10 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              />
            )}

            <motion.div
              style={{ y: yBack }}
              className="absolute left-2 top-10 w-[44%] rotate-[-8deg]"
            >
              <PhoneFrame
                src="/screens/alaswak/1.jpg"
                alt="Alaswak e-commerce app"
                sizes="180px"
              />
            </motion.div>
            <motion.div
              style={{ y: yBack }}
              className="absolute right-1 top-16 w-[44%] rotate-[9deg]"
            >
              <PhoneFrame
                src="/screens/almustarih/1.jpg"
                alt="Almustarih marketplace app"
                sizes="180px"
              />
            </motion.div>
            <motion.div
              style={{ y: yFront }}
              className="absolute left-1/2 top-2 w-[50%] -translate-x-1/2"
            >
              <PhoneFrame
                src="/screens/adec-request/2.jpg"
                alt="AdEC Request enterprise app"
                priority
                sizes="220px"
              />
            </motion.div>
          </motion.div>

          {/* Mobile phone preview */}
          <div className="mx-auto w-40 sm:hidden">
            <PhoneFrame
              src="/screens/adec-request/2.jpg"
              alt="AdEC Request enterprise app"
              priority
              sizes="160px"
            />
          </div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        style={{ opacity: fade }}
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-muted transition-colors hover:text-primary sm:flex"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-border-strong p-1">
          <motion.span
            className="h-1.5 w-1 rounded-full bg-primary"
            animate={reduce ? undefined : { y: [0, 10, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
        <ArrowDown className="h-3.5 w-3.5" />
      </motion.a>
    </section>
  );
}
