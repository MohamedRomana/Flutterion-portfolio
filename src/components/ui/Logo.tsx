import Link from "next/link";
import { cn } from "@/lib/utils";
import { profile } from "@/data/profile";

/** Monogram mark — reused by the navbar, loader, and footer. */
export function Monogram({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground text-background",
        className,
      )}
    >
      <span className="serif text-[1.15rem] leading-none">mr</span>
      <span className="absolute -right-0.5 -top-0.5 h-2.5 w-2.5 rounded-full border-2 border-background bg-lime" />
    </span>
  );
}

/** Brand lockup — monogram paired with the name and title. */
export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label={`${profile.name} — home`}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full py-1 pr-1 transition-opacity duration-300 hover:opacity-90",
        className,
      )}
    >
      <Monogram className="transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:rotate-[-12deg]" />
      <span className="flex flex-col leading-none">
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          {profile.name}
        </span>
        <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
          {profile.title}
        </span>
      </span>
    </Link>
  );
}
