import { ArrowUpRight, Download, Lock } from "lucide-react";
import { AppleIcon, GooglePlayIcon } from "./BrandIcons";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";

/** App Store / Google Play / APK buttons for a project. */
export function StoreLinks({
  project,
  size = "md",
  className,
}: {
  project: Project;
  size?: "sm" | "md";
  className?: string;
}) {
  if (project.isPrivate) {
    return (
      <span className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-card px-4 py-2.5 text-sm font-medium text-muted">
        <Lock className="h-4 w-4" /> Private project — government / NDA
      </span>
    );
  }

  const { appStore, playStore, drive } = project.links;
  const items = [
    appStore && { href: appStore, label: "App Store", sub: "Download on the", Icon: AppleIcon },
    playStore && { href: playStore, label: "Google Play", sub: "Get it on", Icon: GooglePlayIcon },
    drive && { href: drive, label: "Android APK", sub: "Download the", Icon: Download },
  ].filter(Boolean) as {
    href: string;
    label: string;
    sub: string;
    Icon: React.ComponentType<{ className?: string }>;
  }[];

  if (items.length === 0) return null;

  return (
    <div className={cn("flex flex-wrap gap-2.5", className)}>
      {items.map(({ href, label, sub, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${project.name} on ${label}`}
          className={cn(
            "group/store inline-flex items-center gap-3 rounded-2xl border border-border-strong bg-card/70 text-foreground backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-foreground/40 hover:bg-card-hover",
            size === "md" ? "py-2.5 pl-3.5 pr-4" : "py-2 pl-3 pr-3.5",
          )}
        >
          <Icon className={size === "md" ? "h-6 w-6" : "h-5 w-5"} />
          <span className="flex flex-col leading-tight">
            <span className="text-[10px] uppercase tracking-[0.12em] text-muted">{sub}</span>
            <span className={cn("font-semibold tracking-tight", size === "md" ? "text-[15px]" : "text-sm")}>
              {label}
            </span>
          </span>
          <ArrowUpRight className="h-3.5 w-3.5 text-muted transition-transform duration-300 group-hover/store:-translate-y-0.5 group-hover/store:translate-x-0.5" />
        </a>
      ))}
    </div>
  );
}
