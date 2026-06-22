import Link from "next/link";
import { cn } from "@/lib/utils";
import { FlutterLogo } from "./FlutterLogo";
import { profile } from "@/data/profile";

/**
 * Brand lockup — the Flutter logo mark paired with the "Mohamed Romana"
 * wordmark. Renders cleanly in both light and dark themes.
 */
export function Logo({
  className,
  size = "md",
}: {
  className?: string;
  /** `priority` is accepted for call-site compatibility; the SVG needs none. */
  priority?: boolean;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-6" : "h-7 sm:h-8";
  return (
    <Link
      href="/"
      aria-label={`${profile.name} — home`}
      className={cn(
        "group inline-flex items-center gap-2.5 rounded-xl py-1 pr-1 transition-opacity duration-300 hover:opacity-90",
        className,
      )}
    >
      <FlutterLogo className={cn("w-auto", h)} />
      <span className="flex flex-col leading-none">
        <span className="text-sm font-semibold tracking-tight text-foreground sm:text-base">
          {profile.name}
        </span>
        <span className="mt-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
          {profile.title}
        </span>
      </span>
    </Link>
  );
}
