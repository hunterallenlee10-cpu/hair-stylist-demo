import type { ReactNode } from "react";

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
      {kicker && <p className="eyebrow text-muted">{kicker}</p>}
      <h2
        id={id}
        className="display mt-3 text-[2.25rem] font-[800] leading-[1] text-ink sm:text-[3rem] lg:text-[3.5rem]"
      >
        {title}
      </h2>
      {children && <div className="mt-5 text-lg leading-relaxed text-muted">{children}</div>}
    </div>
  );
}
