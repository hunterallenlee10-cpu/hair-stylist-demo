import type { CSSProperties, ReactNode } from "react";

export type Shape = "portrait" | "tall" | "square" | "landscape" | "wide";

const ratio: Record<Shape, string> = {
  portrait: "1357 / 1721",
  tall: "0.66",
  square: "1",
  landscape: "4 / 3",
  wide: "16 / 9",
};

const clip: Record<Shape, string> = {
  portrait: "wave-portrait",
  tall: "wave-tall",
  square: "wave-square",
  landscape: "wave-landscape",
  wide: "wave-wide",
};

/**
 * Her hot pink wavy sequin mirror. The scalloped clip-path (from <WaveDefs />)
 * cuts both the sequin band and the glass, so the photo sits inside a pink
 * scalloped rim. `band` sets the rim: "lg" 12px, "md" 10px, "sm" 6px for
 * thumbnails, "none" for a plain wavy frame.
 *
 * For a shape that changes with the breakpoint, pass `clipClass` (e.g.
 * "wave-square lg:wave-portrait") and an aspect class in `className`.
 */
export function WavyFrame({
  shape = "portrait",
  band = "lg",
  clipClass,
  children,
  className = "",
  style,
}: {
  shape?: Shape;
  band?: "lg" | "md" | "sm" | "none";
  clipClass?: string;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const c = clipClass ?? clip[shape];
  const aspect = clipClass ? undefined : ratio[shape];
  if (band === "none") {
    return (
      <div className={`relative overflow-hidden bg-surface ${c} ${className}`} style={{ aspectRatio: aspect, ...style }}>
        {children}
      </div>
    );
  }
  const size = band === "sm" ? "mirror-sm" : band === "md" ? "mirror-md" : "";
  return (
    <div className={`mirror relative ${size} ${c} ${className}`} style={{ aspectRatio: aspect, ...style }}>
      <div className={`mirror-glass ${c}`}>{children}</div>
    </div>
  );
}
