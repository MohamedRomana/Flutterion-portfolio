/**
 * The official Flutter logo mark (origami "F"), as an inline SVG so it scales
 * crisply and reads in both light and dark themes. Size via className height.
 */
export function FlutterLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 317"
      className={className}
      role="img"
      aria-label="Flutter"
      preserveAspectRatio="xMidYMid"
    >
      <path
        fill="#47C5FB"
        d="M157.666 0L0 157.667l48.8 48.8L255.267 0zM156.567 145.5L72.5 229.567l48.984 49.75 48.4-48.45L255.267 145.5z"
      />
      <path fill="#00569E" d="M121.484 279.317l37.6 37.6h96.183l-85.55-85.55z" />
      <path fill="#00B5F8" d="M71.95 230.05l48.4-48.4 49.534 49.617-48.4 48.4z" />
    </svg>
  );
}
