import Link from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "lime" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative isolate inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-medium tracking-tight transition-[color,background-color,border-color,box-shadow,transform] duration-300 ease-out active:scale-[0.97] disabled:opacity-50 cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-foreground text-background hover:text-white before:absolute before:inset-0 before:-z-10 before:translate-y-full before:rounded-full before:bg-primary before:transition-transform before:duration-500 before:ease-[cubic-bezier(0.16,1,0.3,1)] hover:before:translate-y-0",
  lime:
    "bg-lime text-on-lime shadow-[0_12px_40px_-14px_color-mix(in_srgb,var(--lime)_70%,transparent)] hover:shadow-[0_18px_50px_-14px_color-mix(in_srgb,var(--lime)_90%,transparent)]",
  secondary:
    "border border-border-strong bg-card/60 text-foreground backdrop-blur hover:border-foreground/40 hover:bg-card-hover",
  ghost: "text-foreground hover:text-primary",
};

const sizes: Record<Size, string> = {
  md: "h-11 px-5 text-sm",
  lg: "h-14 px-7 text-[15px]",
};

interface CommonProps {
  variant?: Variant;
  size?: Size;
  className?: string;
  magnetic?: boolean;
  children: React.ReactNode;
}

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
  type?: never;
  onClick?: never;
};

type ButtonAsButton = CommonProps & {
  href?: never;
  external?: never;
  type?: "button" | "submit";
  onClick?: () => void;
};

export function Button(props: ButtonAsLink | ButtonAsButton) {
  const {
    variant = "primary",
    size = "md",
    className,
    magnetic = false,
    children,
  } = props;
  const classes = cn(base, variants[variant], sizes[size], className);

  const inner =
    "href" in props && props.href !== undefined ? (
      props.external ? (
        <a href={props.href} target="_blank" rel="noopener noreferrer" className={classes}>
          {children}
        </a>
      ) : (
        <Link href={props.href} className={classes}>
          {children}
        </Link>
      )
    ) : (
      <button
        type={(props as ButtonAsButton).type ?? "button"}
        onClick={(props as ButtonAsButton).onClick}
        className={classes}
      >
        {children}
      </button>
    );

  return magnetic ? <Magnetic className="inline-block">{inner}</Magnetic> : inner;
}
