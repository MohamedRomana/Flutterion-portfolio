import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

/**
 * The supplied Flutterion logo, used exactly as provided (not redesigned).
 * Because the asset ships with a baked deep-navy background, it sits inside
 * a matching brand chip so it reads cleanly in both light and dark themes.
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
        "group inline-flex items-center rounded-xl bg-[#050b16] px-2.5 py-1.5 ring-1 ring-white/10 transition-shadow duration-300 hover:ring-primary/40",
        className,
      )}
    >
      <Image
        src="/logo.png"
        alt="Flutterion — Performance in Motion"
        width={1672}
        height={941}
        priority={priority}
        className={cn("w-auto", h)}
        sizes="120px"
      />
    </Link>
  );
}
