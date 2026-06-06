import Link from "next/link";
import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { Logo } from "@/components/ui/Logo";
import { Container } from "@/components/ui/Section";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "Services", href: "/#services" },
  { label: "Contact", href: "/#contact" },
];

export function Footer() {
  const year = 2026; // build-time constant; update on redeploy if needed
  const featured = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <footer className="relative border-t border-border bg-background-secondary">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-[0.35]" />
      <Container className="relative py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-sm text-pretty text-sm leading-relaxed text-muted">
              {profile.brand} — {profile.tagline}. Flutter developer crafting
              scalable, high-performance mobile applications with clean
              architecture and polished UX.
            </p>
            <div className="flex items-center gap-3">
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-card text-muted transition-colors hover:border-primary/50 hover:text-primary"
              >
                <GithubIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-card text-muted transition-colors hover:border-primary/50 hover:text-primary"
              >
                <LinkedinIcon className="h-[18px] w-[18px]" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border-strong bg-card text-muted transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Mail className="h-[18px] w-[18px]" />
              </a>
            </div>
          </div>

          <nav aria-label="Footer" className="flex flex-col gap-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
              Navigate
            </h3>
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
              >
                {link.label}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-3">
            <h3 className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
              Featured Work
            </h3>
            {featured.map((p) => (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group inline-flex w-fit items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
              >
                {p.name}
                <ArrowUpRight className="h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100" />
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-border pt-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {profile.name}. Built with Next.js & Flutter-grade care.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" /> {profile.location}
            </span>
            <a
              href={`tel:${profile.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-1.5 transition-colors hover:text-foreground"
            >
              <Phone className="h-4 w-4 text-primary" /> {profile.phone}
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}
