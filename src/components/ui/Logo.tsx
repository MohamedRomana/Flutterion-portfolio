import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The horizontal Flutterion lockup (bird + wordmark), used as supplied.
 * It ships with a baked deep-navy background, so it sits inside a matching
 * brand chip with a soft rounded radius that reads cleanly in both themes.
 */
export function Logo({
  className,
  priority = false,
  size = "md",
}: {
  className?: string;
  priority?: boolean;
  size?: "sm" | "md";
}) {
  const h = size === "sm" ? "h-7" : "h-8 sm:h-9";
  return (
    <Link
      href="/"
      aria-label="Flutterion — home"
      className={cn(
        "group inline-flex items-center overflow-hidden rounded-xl bg-[#050b16] px-2.5 py-1 ring-1 ring-white/10 transition-shadow duration-300 hover:ring-primary/40",
        className,
      )}
    >
      <Image
        src="/logo-horizontal.png"
        alt="Flutterion — Performance in Motion"
        width={2508}
        height={627}
        priority={priority}
        className={cn("w-auto", h)}
        sizes="170px"
      />
    </Link>
  );
}
