"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { LocalTime } from "@/components/ui/LocalTime";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { label: "Work", id: "work" },
  { label: "Projects", id: "projects" },
  { label: "About", id: "about" },
  { label: "Services", id: "services" },
  { label: "Process", id: "process" },
  { label: "CV", id: "cv" },
];

/** Tracks which home-page section is currently in the middle of the viewport. */
function useActiveSection(enabled: boolean): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!enabled) return;
    const els = NAV_LINKS.map((l) => document.getElementById(l.id)).filter(
      (el): el is HTMLElement => Boolean(el),
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [enabled]);

  return enabled ? active : null;
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const active = useActiveSection(isHome);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 16);
    setHidden(y > 480 && y > prev + 4);
    if (y < prev - 4) setHidden(false);
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-[80]">
      <motion.div
        animate={{ y: hidden && !open ? "-120%" : 0 }}
        transition={{ duration: reduce ? 0 : 0.45, ease: [0.16, 1, 0.3, 1] }}
        className="px-3 pt-3 sm:px-5 sm:pt-4"
      >
        <nav
          aria-label="Primary"
          className={cn(
            "mx-auto flex w-full max-w-[84rem] items-center justify-between gap-4 rounded-full border px-3 py-2 transition-[background-color,border-color,box-shadow] duration-500 sm:px-4",
            scrolled || open
              ? "glass border-border shadow-[0_20px_50px_-30px_rgba(0,0,0,0.6)]"
              : "border-transparent",
          )}
        >
          <Logo />

          <ul className="hidden items-center gap-0.5 rounded-full border border-border bg-background/40 p-1 lg:flex">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.id;
              return (
                <li key={link.id}>
                  <Link
                    href={`/#${link.id}`}
                    className={cn(
                      "relative isolate block rounded-full px-4 py-1.5 text-sm transition-colors duration-200",
                      isActive ? "text-background" : "text-muted hover:text-foreground",
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 -z-10 rounded-full bg-foreground"
                        transition={{ type: "spring", stiffness: 420, damping: 34 }}
                      />
                    )}
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              href="/#contact"
              className="hidden h-10 items-center gap-1.5 rounded-full bg-lime px-5 text-sm font-medium text-on-lime transition-transform duration-300 hover:scale-[1.03] sm:inline-flex"
            >
              Let&apos;s talk
              <ArrowUpRight className="h-4 w-4" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-card text-foreground lg:hidden"
            >
              <span className="sr-only">Menu</span>
              <span
                aria-hidden
                className={cn(
                  "absolute h-[1.5px] w-4 bg-current transition-transform duration-300",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                aria-hidden
                className={cn(
                  "absolute h-[1.5px] w-4 bg-current transition-transform duration-300",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </nav>
      </motion.div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            animate={reduce ? { opacity: 1 } : { clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? { opacity: 0 } : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[-1] flex flex-col bg-background lg:hidden"
          >
            <div className="flex flex-1 flex-col justify-between overflow-y-auto px-6 pb-8 pt-28">
              <ul className="flex flex-col">
                {[...NAV_LINKS, { label: "Contact", id: "contact" }].map((link, i) => (
                  <motion.li
                    key={link.id}
                    initial={reduce ? false : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + 0.05 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <Link
                      href={`/#${link.id}`}
                      onClick={() => setOpen(false)}
                      className="group flex items-baseline gap-4 border-b border-border py-3.5"
                    >
                      <span className="font-mono text-xs text-primary">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-4xl font-semibold tracking-[-0.04em] transition-transform duration-300 group-active:translate-x-1">
                        {link.label}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <motion.div
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-10 flex items-end justify-between gap-4"
              >
                <div className="flex flex-col gap-1 font-mono text-xs uppercase tracking-[0.16em] text-muted">
                  <span>{profile.location}</span>
                  <span>
                    Local time <LocalTime className="text-foreground" />
                  </span>
                </div>
                <div className="flex gap-2">
                  {[
                    { href: profile.githubUrl, label: "GitHub", Icon: GithubIcon },
                    { href: profile.linkedinUrl, label: "LinkedIn", Icon: LinkedinIcon },
                    {
                      href: `https://wa.me/${profile.phone.replace(/[^\d]/g, "")}`,
                      label: "WhatsApp",
                      Icon: WhatsappIcon,
                    },
                  ].map(({ href, label, Icon }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-muted"
                    >
                      <Icon className="h-[18px] w-[18px]" />
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
