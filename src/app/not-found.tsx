import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { Container } from "@/components/ui/Section";

export default function NotFound() {
  return (
    <Container className="flex min-h-[70svh] flex-col items-center justify-center py-24 text-center">
      <span className="font-mono text-7xl font-bold text-gradient sm:text-8xl">
        404
      </span>
      <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
        This screen doesn&apos;t exist
      </h1>
      <p className="mt-3 max-w-md text-pretty text-muted">
        The page you&apos;re looking for may have been moved or never shipped.
        Let&apos;s get you back on track.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-cyan px-6 py-3 text-sm font-medium text-white transition-all hover:brightness-110"
        >
          <Home className="h-4 w-4" /> Back home
        </Link>
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-6 py-3 text-sm font-medium transition-colors hover:border-primary/50"
        >
          <ArrowLeft className="h-4 w-4" /> View projects
        </Link>
      </div>
    </Container>
  );
}
