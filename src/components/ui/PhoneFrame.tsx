import Image from "next/image";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/** Default ratio of the store/marketing screenshots (9:16). */
export const DEFAULT_SHOT_RATIO = 9 / 16;

export function shotRatio(project: Pick<Project, "shotRatio">): number {
  return project.shotRatio ?? DEFAULT_SHOT_RATIO;
}

export function coverOf(project: Pick<Project, "slug" | "cover">): string {
  return project.cover ?? `/screens/${project.slug}/1.jpg`;
}

/**
 * Renders a pre-composed store screenshot (it already contains its own
 * device frame and background) inside a soft rounded card at its native
 * aspect ratio, so nothing gets cropped.
 */
export function PhoneFrame({
  src,
  alt,
  ratio = DEFAULT_SHOT_RATIO,
  priority = false,
  sizes = "(max-width: 768px) 60vw, 280px",
  className,
}: {
  src: string;
  alt: string;
  /** width / height of the image. */
  ratio?: number;
  priority?: boolean;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-[1.6rem] border border-border-strong bg-card shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]",
        className,
      )}
      style={{ aspectRatio: String(ratio) }}
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
