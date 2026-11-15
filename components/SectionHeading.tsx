import type { ReactNode } from "react";
import { Label } from "./Label";

/** Section heading: an optional sentence-case label with the lemon, then the h2. */
export function SectionHeading({
  id,
  kicker,
  title,
  children,
  align = "left",
  className = "",
}: {
  id: string;
  kicker?: ReactNode;
  title: ReactNode;
  children?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-[44rem] ${className}`}>
      {kicker && <Label className={center ? "justify-center" : ""}>{kicker}</Label>}
      <h2 id={id} className="display mt-3 text-h2 font-[800] text-ink">
        {title}
      </h2>
      {children && <div className="mt-5 max-w-[40rem] text-lead text-muted">{children}</div>}
    </div>
  );
}
