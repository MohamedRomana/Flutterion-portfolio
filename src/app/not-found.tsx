import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Container className="relative flex min-h-[85svh] flex-col items-start justify-center pb-16 pt-32">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-96 w-96 -translate-x-1/2 rounded-full bg-primary/25 blur-[130px]" />
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">Error 404</span>
      <h1 className="mt-6 text-[clamp(3.5rem,12vw,10rem)] font-semibold leading-[0.88] tracking-[-0.06em]">
        Lost in the
        <br />
        <span className="serif text-primary">widget tree.</span>
      </h1>
      <p className="mt-8 max-w-md text-pretty text-lg text-muted">
        The page you&apos;re looking for was moved or never shipped. Let&apos;s get you back on track.
      </p>
      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex h-12 items-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-transform hover:scale-[1.03]"
        >
          <Home className="h-4 w-4" /> Back home
        </Link>
        <Link
          href="/#projects"
          className="inline-flex h-12 items-center gap-2 rounded-full border border-border-strong px-6 text-sm font-medium transition-colors hover:border-foreground/40"
        >
          <ArrowLeft className="h-4 w-4" /> View projects
        </Link>
      </div>
    </Container>
  );
}
