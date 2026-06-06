/**
 * Lightweight className combiner. Avoids pulling in clsx/tailwind-merge
 * for a project of this size — falsy values are dropped, rest joined.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
