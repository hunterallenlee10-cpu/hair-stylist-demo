/**
 * The mirror-ball lemon. Decorative, so it has an empty alt. Served as one
 * cached SVG file (public/lemon-mark.svg, generated from lib/lemon.ts) instead
 * of 70 inline tiles per use, which keeps the HTML small.
 */
export function LemonMark({ className = "h-7 w-7" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return <img src="/lemon-mark.svg" alt="" width={64} height={64} className={`shrink-0 ${className}`} decoding="async" />;
}
