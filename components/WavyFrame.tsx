import type { CSSProperties, ReactNode } from "react";

type Shape = "portrait" | "tall" | "square" | "landscape" | "wide";

const ratio: Record<Shape, string> = {
  portrait: "1357 / 1721",
  tall: "0.66",
  square: "1",
  landscape: "4 / 3",
  wide: "16 / 9",
};

/**
 * The wavy mirror. Every photo on the site sits inside one of these.
 * The outer edge is a soft scalloped wave (SVG clip-path from <WaveDefs />).
 */
export function WavyFrame({
  shape = "portrait",
  children,
  className = "",
  style,
}: {
  shape?: Shape;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  return (
    <div
      className={`relative overflow-hidden bg-surface wave-${shape} ${className}`}
      style={{ aspectRatio: ratio[shape], ...style }}
    >
      {children}
    </div>
  );
}
