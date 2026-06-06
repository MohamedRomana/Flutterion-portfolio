import { Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";
import { Container, Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

export function ContactCTA() {
  // Same number used for calling (tel:) and WhatsApp (wa.me needs digits only).
  const phoneDigits = profile.phone.replace(/[^\d]/g, "");

  const contactMethods: {
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string;
    href?: string;
    external?: boolean;
    iconClass: string;
  }[] = [
    {
      icon: Mail,
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      iconClass: "text-primary",
    },
    {
      icon: Phone,
      label: "Call",
      value: profile.phone,
      href: `tel:${profile.phone.replace(/\s/g, "")}`,
      iconClass: "text-primary",
    },
    {
      icon: WhatsappIcon,
      label: "WhatsApp",
      value: profile.phone,
      href: `https://wa.me/${phoneDigits}`,
      external: true,
      iconClass: "text-[#25D366]",
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile.location,
      iconClass: "text-primary",
    },
  ];

  return (
    <Section id="contact" ariaLabel="Contact">
      <Container>
        <Reveal>
          <div className="glow-shadow relative overflow-hidden rounded-3xl border border-border bg-card px-6 py-14 sm:px-12 sm:py-20">
            {/* Background flourish */}
            <div className="pointer-events-none absolute inset-0" aria-hidden>
              <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(80%_80%_at_50%_0%,#000,transparent_75%)]" />
              <div className="absolute left-1/2 top-[-30%] h-80 w-80 -translate-x-1/2 rounded-full bg-primary/20 blur-[100px]" />
            </div>

            <div className="relative mx-auto flex max-w-2xl flex-col items-center text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-background-secondary px-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-primary">
                <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                Let&apos;s talk
              </span>
              <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Have a Flutter project <span className="text-gradient">in mind?</span>
              </h2>
              <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted">
                I&apos;m always open to building scalable, high-performance mobile
                apps. Tell me about your idea and let&apos;s make it move.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <Button href={`mailto:${profile.email}`} external size="lg" magnetic>
                  <Mail className="h-4 w-4" />
                  Send me an email
                </Button>
                <Button
                  href={profile.githubUrl}
                  external
                  size="lg"
                  variant="secondary"
                  magnetic
                >
                  <GithubIcon className="h-4 w-4" />
                  GitHub
                </Button>
              </div>

              {/* Contact methods */}
              <div className="mt-12 grid w-full gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {contactMethods.map((m) => {
                  const content = (
                    <div className="flex h-full flex-col items-center gap-1.5 rounded-2xl border border-border bg-background-secondary px-4 py-5 transition-colors duration-200 hover:border-primary/40">
                      <m.icon className={`h-5 w-5 ${m.iconClass}`} />
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted">
                        {m.label}
                      </span>
                      <span className="break-all text-sm font-medium text-foreground">
                        {m.value}
                      </span>
                    </div>
                  );
                  return m.href ? (
                    <a
                      key={m.label}
                      href={m.href}
                      className="block"
                      {...(m.external
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={m.label}>{content}</div>
                  );
                })}
              </div>

              <div className="mt-8 flex items-center gap-3">
                <a
                  href={`https://wa.me/${phoneDigits}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-background-secondary text-muted transition-colors hover:border-[#25D366]/60 hover:text-[#25D366]"
                >
                  <WhatsappIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-background-secondary text-muted transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <LinkedinIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-background-secondary text-muted transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <GithubIcon className="h-[18px] w-[18px]" />
                </a>
                <a
                  href={`mailto:${profile.email}`}
                  aria-label="Email"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong bg-background-secondary text-muted transition-colors hover:border-primary/50 hover:text-primary"
                >
                  <Mail className="h-[18px] w-[18px]" />
                </a>
              </div>
              <p className="mt-6 inline-flex items-center gap-1 font-mono text-xs text-muted">
                Usually replies within a day
                <ArrowUpRight className="h-3.5 w-3.5 text-primary" />
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </Section>
  );
}
