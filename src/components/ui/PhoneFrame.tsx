import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Renders an app screenshot inside a clean phone bezel. Screenshots already
 * include their own status bar, so no fake notch is overlaid (avoids clashing
 * with the real iOS/Android chrome in the captures).
 */
export function PhoneFrame({
  src,
  alt,
  priority = false,
  sizes = "(max-width: 768px) 60vw, 280px",
  className,
  store = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** Store/marketing graphic that already includes its own frame (9:16). */
  store?: boolean;
}) {
  if (store) {
    return (
      <div
        className={cn(
          "relative aspect-[9/16] w-full overflow-hidden rounded-3xl border border-border-strong bg-card shadow-[0_30px_60px_-22px_rgba(0,0,0,0.5)] ring-1 ring-white/5",
          className,
        )}
      >
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div
      className={cn(
        "relative aspect-[9/19.5] w-full overflow-hidden rounded-[1.8rem] border-[5px] border-slate-800 bg-slate-950 shadow-[0_30px_60px_-22px_rgba(0,0,0,0.6)] ring-1 ring-white/5",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className="object-cover object-top"
      />
    </div>
  );
}
