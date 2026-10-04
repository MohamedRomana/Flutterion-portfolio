import Link from "next/link";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { LocalTime } from "@/components/ui/LocalTime";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "CV", href: "/#cv" },
  { label: "Contact", href: "/#contact" },
];

const socials = [
  { label: "LinkedIn", href: profile.linkedinUrl },
  { label: "GitHub", href: profile.githubUrl },
  { label: "WhatsApp", href: `https://wa.me/${profile.phone.replace(/[^\d]/g, "")}` },
  { label: "Email", href: `mailto:${profile.email}` },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-border bg-background-secondary">
      <Container className="relative pt-16 sm:pt-20">
        <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-4">
            <p className="max-w-xs text-pretty text-lg leading-snug tracking-tight">
              Flutter developer crafting{" "}
              <span className="serif text-primary">scalable, high-performance</span> mobile apps
              for iOS &amp; Android.
            </p>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">
              {profile.location} · <LocalTime className="text-foreground" />
            </p>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-2.5">
            <h3 className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Navigate</h3>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="w-fit text-sm text-foreground/80 transition-colors hover:text-primary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-2.5">
            <h3 className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Featured</h3>
            {featuredProjects.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="w-fit text-sm text-foreground/80 transition-colors hover:text-primary"
              >
                {p.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-2.5">
            <h3 className="mb-1 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Elsewhere</h3>
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                {...(s.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group inline-flex w-fit items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-primary"
              >
                {s.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
              </a>
            ))}
            <a
              href={profile.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex w-fit items-center gap-1 text-sm text-foreground/80 transition-colors hover:text-primary"
            >
              CV (PDF)
              <ArrowUpRight className="h-3.5 w-3.5 opacity-50 transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:opacity-100" />
            </a>
          </div>
        </div>

        <div className="mt-16 flex flex-col-reverse gap-4 border-t border-border py-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
          <p suppressHydrationWarning>
            © {year} {profile.name}. All rights reserved.
          </p>
          <a
            href="#main"
            className="group inline-flex w-fit items-center gap-2 font-mono uppercase tracking-[0.16em] transition-colors hover:text-foreground"
          >
            Back to top
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border-strong transition-transform duration-300 group-hover:-translate-y-0.5">
              <ArrowUp className="h-3.5 w-3.5" />
            </span>
          </a>
        </div>
      </Container>

      {/* Oversized wordmark */}
      <div aria-hidden className="pointer-events-none select-none overflow-hidden">
        <p className="translate-y-[18%] whitespace-nowrap text-center text-[17.5vw] font-semibold leading-[0.8] tracking-[-0.07em] text-foreground/[0.07]">
          {profile.name}
        </p>
      </div>
    </footer>
  );
}
