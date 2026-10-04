import { ArrowUpRight, Mail, Phone } from "lucide-react";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Magnetic } from "@/components/ui/Magnetic";
import { CopyEmail } from "@/components/ui/CopyEmail";
import { GithubIcon, LinkedinIcon, WhatsappIcon } from "@/components/ui/BrandIcons";
import { profile } from "@/data/profile";

export function ContactCTA() {
  // Same number for calling (tel:) and WhatsApp (wa.me needs digits only).
  const phoneDigits = profile.phone.replace(/[^\d]/g, "");

  const channels = [
    { label: "WhatsApp", value: profile.phone, href: `https://wa.me/${phoneDigits}`, Icon: WhatsappIcon, external: true },
    { label: "Call", value: profile.phone, href: `tel:+${phoneDigits}`, Icon: Phone, external: false },
    { label: "LinkedIn", value: profile.linkedin, href: profile.linkedinUrl, Icon: LinkedinIcon, external: true },
    { label: "GitHub", value: `@${profile.github}`, href: profile.githubUrl, Icon: GithubIcon, external: true },
  ];

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="relative scroll-mt-20 overflow-hidden py-24 sm:py-36"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="animate-aurora absolute left-1/2 top-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full bg-primary/25 blur-[150px]" />
      </div>

      <Container>
        <Reveal>
          <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-lime" />
            </span>
            Open to freelance &amp; full-time roles
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <h2 className="mt-8 text-[clamp(3.2rem,11vw,10.5rem)] font-semibold leading-[0.88] tracking-[-0.06em]">
            Let&apos;s build
            <br />
            <span className="serif text-primary">something</span> great.
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col gap-10 border-t border-border pt-10 lg:flex-row lg:items-end lg:justify-between">
          <Reveal delay={0.1}>
            <a
              href={`mailto:${profile.email}`}
              className="group inline-flex flex-wrap items-center gap-x-4 gap-y-2 text-[clamp(1.35rem,3.4vw,2.6rem)] font-medium tracking-[-0.03em]"
            >
              <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_2px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:bg-[length:100%_2px]">
                {profile.email}
              </span>
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background transition-transform duration-500 group-hover:rotate-45">
                <ArrowUpRight className="h-5 w-5" />
              </span>
            </a>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <Magnetic className="inline-block">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-lime px-5 text-sm font-medium text-on-lime"
                >
                  <Mail className="h-4 w-4" /> Send an email
                </a>
              </Magnetic>
              <CopyEmail email={profile.email} />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <ul className="grid gap-2 sm:grid-cols-2 lg:w-[34rem]">
              {channels.map(({ label, value, href, Icon, external }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    className="group flex items-center gap-3 rounded-2xl border border-border-strong bg-card/60 p-4 backdrop-blur transition-colors hover:border-foreground/40"
                  >
                    <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-background text-foreground">
                      <Icon className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
                        {label}
                      </span>
                      <span className="block truncate text-sm font-medium">{value}</span>
                    </span>
                    <ArrowUpRight className="h-4 w-4 shrink-0 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
