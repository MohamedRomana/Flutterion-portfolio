import Link from "next/link";
import { cn } from "@/lib/utils";
import { Magnetic } from "./Magnetic";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 cursor-pointer";

const variants: Record<Variant, string> = {
  primary:
    "bg-gradient-to-r from-primary to-cyan text-white shadow-[0_10px_30px_-10px_var(--glow)] hover:shadow-[0_16px_40px_-12px_var(--glow)] hover:brightness-110",
  secondary:
    "border border-border-strong bg-card text-foreground hover:border-primary/50 hover:bg-card-hover",
  ghost: "text-foreground hover:text-primary",
};

const sizes: Record<Size, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
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
