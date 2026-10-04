"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { ArrowDownRight, ArrowRight, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PhoneFrame, coverOf, shotRatio } from "@/components/ui/PhoneFrame";
import { Container } from "@/components/ui/Section";
import { CountUp } from "@/components/ui/CountUp";
import { AppleIcon, GooglePlayIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import { getProject } from "@/data/projects";
import { stats } from "@/data/skills";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const WORDS = ["effortless", "native", "alive", "premium"];

/** Five screens fanned out like a hand of cards; centre one is on top. */
const FAN = [
  { slug: "alaswak", rotate: -16, x: -88, y: 46, z: 1, depth: 0.5 },
  { slug: "almustarih", rotate: -8, x: -46, y: 14, z: 2, depth: 0.75 },
  { slug: "elsdo", rotate: 0, x: 0, y: 0, z: 5, depth: 1.2 },
  { slug: "adec-request", rotate: 8, x: 46, y: 14, z: 2, depth: 0.75 },
  { slug: "makhdom", rotate: 16, x: 88, y: 46, z: 1, depth: 0.5 },
];

function RotatingWord() {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((v) => (v + 1) % WORDS.length), 2600);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <span className="relative inline-grid overflow-hidden pb-[0.12em] align-bottom">
      {/* Invisible longest word reserves the width so the line never jumps. */}
      <span className="serif invisible col-start-1 row-start-1 pr-[0.08em]" aria-hidden>
        effortless
      </span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={WORDS[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="serif text-gradient col-start-1 row-start-1 pr-[0.08em]"
        >
          {WORDS[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function PhoneFan() {
  const reduce = useReducedMotion();
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 80, damping: 20 });
  const sy = useSpring(my, { stiffness: 80, damping: 20 });

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduce || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }

  return (
    <div
      onPointerMove={onMove}
      onPointerLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="relative mx-auto h-[25rem] w-full max-w-[34rem] sm:h-[33rem] lg:h-[38rem]"
    >
      {/* Halo */}
      <div
        aria-hidden
        className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[90px]"
      />
      {!reduce && (
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-border-strong"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
      )}

      {FAN.map((f, i) => {
        const project = getProject(f.slug);
        if (!project) return null;
        return (
          <FanCard
            key={f.slug}
            index={i}
            fan={f}
            src={coverOf(project)}
            alt={`${project.name} app screen`}
            ratio={shotRatio(project)}
            sx={sx}
            sy={sy}
            reduce={Boolean(reduce)}
          />
        );
      })}
    </div>
  );
}

function FanCard({
  index,
  fan,
  src,
  alt,
  ratio,
  sx,
  sy,
  reduce,
}: {
  index: number;
  fan: (typeof FAN)[number];
  src: string;
  alt: string;
  ratio: number;
  sx: MotionValue<number>;
  sy: MotionValue<number>;
  reduce: boolean;
}) {
  const px = useTransform(sx, (v) => v * 40 * fan.depth);
  const py = useTransform(sy, (v) => v * 30 * fan.depth);
  const isCenter = fan.z === 5;

  return (
    <motion.div
      className="absolute left-1/2 top-1/2"
      style={{ zIndex: fan.z, x: reduce ? 0 : px, y: reduce ? 0 : py }}
    >
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 160, rotate: 0, x: 0 }}
        animate={{ opacity: 1, y: fan.y, rotate: fan.rotate, x: `${fan.x}%` }}
        transition={{ duration: 1.3, ease: EASE, delay: 0.25 + Math.abs(index - 2) * 0.09 }}
        className={
          isCenter
            ? "-ml-[5.75rem] -mt-[12.5rem] w-[11.5rem] sm:-ml-[7rem] sm:-mt-[15.25rem] sm:w-[14rem] lg:-ml-[8rem] lg:-mt-[17.25rem] lg:w-[16rem]"
            : "-ml-[5rem] -mt-[9rem] w-[10rem] sm:-ml-[6.25rem] sm:-mt-[11rem] sm:w-[12.5rem] lg:-ml-[7rem] lg:-mt-[12.5rem] lg:w-[14rem]"
        }
      >
        <PhoneFrame
          src={src}
          alt={alt}
          ratio={ratio}
          priority={isCenter}
          sizes="(max-width: 640px) 184px, 256px"
          className={isCenter ? "ring-1 ring-white/10" : "brightness-[0.82]"}
        />
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yCopy = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : -80]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const line = {
    hidden: { y: "105%" },
    show: (i: number) => ({
      y: 0,
      transition: { duration: 1, ease: EASE, delay: 0.1 + i * 0.09 },
    }),
  };

  return (
    <section
      ref={ref}
      aria-label="Introduction"
      className="relative overflow-hidden pt-28 sm:pt-32"
    >
      {/* Background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="bg-grid absolute inset-0 [mask-image:radial-gradient(90%_70%_at_50%_0%,#000_20%,transparent_75%)]" />
        <div className="animate-aurora absolute -left-[10%] top-[-20%] h-[38rem] w-[38rem] rounded-full bg-primary/25 blur-[140px]" />
        <div className="animate-aurora absolute right-[-15%] top-[10%] h-[30rem] w-[30rem] rounded-full bg-lime/10 blur-[140px] [animation-delay:-6s]" />
      </div>

      <Container>
        {/* Status row */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
          className="flex flex-wrap items-center justify-between gap-3"
        >
          <span className="inline-flex items-center gap-2.5 rounded-full border border-border-strong bg-card/60 py-1.5 pl-2 pr-3.5 text-xs text-muted backdrop-blur">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
            </span>
            Available for new projects
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.2em] text-muted sm:block">
            {profile.title} — {profile.location}
          </span>
        </motion.div>

        <div className="mt-10 grid items-center gap-10 lg:mt-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
          <motion.div style={{ y: yCopy }} className="relative z-10">
            <h1 className="text-[clamp(3rem,8.2vw,7.6rem)] font-semibold leading-[0.92] tracking-[-0.055em]">
              <span className="sr-only">
                {profile.name}, Flutter developer — Flutter apps that feel effortless.
              </span>
              <span aria-hidden className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  variants={line}
                  custom={0}
                  initial={reduce ? false : "hidden"}
                  animate="show"
                >
                  Flutter apps
                </motion.span>
              </span>
              <span aria-hidden className="block overflow-hidden pb-[0.04em]">
                <motion.span
                  className="block"
                  variants={line}
                  custom={1}
                  initial={reduce ? false : "hidden"}
                  animate="show"
                >
                  that feel
                </motion.span>
              </span>
              <span aria-hidden className="block overflow-hidden">
                <motion.span
                  className="block"
                  variants={line}
                  custom={2}
                  initial={reduce ? false : "hidden"}
                  animate="show"
                >
                  <RotatingWord />
                </motion.span>
              </span>
            </h1>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.55 }}
            >
              <p className="mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                I&apos;m <span className="font-medium text-foreground">{profile.name}</span>, a
                Flutter developer shipping scalable iOS &amp; Android apps — real-time
                features, clean BLoC architecture, and Arabic-first interfaces that are a
                pleasure to use.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-3">
                <Button href="/#work" size="lg" magnetic>
                  See selected work
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
                <Button href={profile.cvUrl} external size="lg" variant="secondary" magnetic>
                  <FileText className="h-4 w-4" />
                  Download CV
                </Button>
              </div>

              <div className="mt-9 flex items-center gap-3 text-sm text-muted">
                <span className="flex -space-x-1.5">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-card text-foreground">
                    <AppleIcon className="h-4 w-4" />
                  </span>
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-strong bg-card text-foreground">
                    <GooglePlayIcon className="h-3.5 w-3.5" />
                  </span>
                </span>
                <span>
                  <span className="font-semibold text-foreground">{stats[1].value} apps</span>{" "}
                  live on the App Store &amp; Google Play
                </span>
              </div>
            </motion.div>
          </motion.div>

          <PhoneFan />
        </div>

        {/* Stats strip */}
        <motion.dl
          initial={reduce ? false : { opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.8 }}
          className="mt-14 grid grid-cols-2 border-t border-border lg:mt-10 lg:grid-cols-4"
        >
          {stats.map((s, i) => (
            <div
              key={s.label}
              className={cn(
                "flex flex-col gap-2 py-7 pr-4",
                i % 2 === 1 && "border-l border-border pl-5",
                i >= 2 && "border-t border-border lg:border-t-0",
                i > 0 && "lg:border-l lg:pl-8",
              )}
            >
              <dd className="text-5xl font-semibold tracking-[-0.05em] sm:text-6xl">
                {s.value !== null ? <CountUp to={s.value} suffix={s.suffix} /> : s.display}
              </dd>
              <dt className="max-w-[14rem] text-sm leading-snug text-muted">{s.label}</dt>
            </div>
          ))}
        </motion.dl>
      </Container>

      <motion.a
        href="#marquee"
        aria-label="Scroll down"
        style={{ opacity: fade }}
        className="absolute bottom-8 right-8 hidden h-14 w-14 items-center justify-center rounded-full border border-border-strong text-muted transition-colors hover:border-foreground hover:text-foreground xl:inline-flex"
      >
        <ArrowDownRight className="h-5 w-5" />
      </motion.a>
    </section>
  );
}
