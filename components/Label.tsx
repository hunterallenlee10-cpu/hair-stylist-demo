import type { ReactNode } from "react";
import { LemonMark } from "./LemonMark";

/**
 * Section label: sentence case, DM Sans 500 at the label step, muted, after
 * the small mirror-ball lemon. At most four per page.
 */
export function Label({ children, as: Tag = "p", className = "" }: { children: ReactNode; as?: "p" | "span"; className?: string }) {
  return (
    <Tag className={`flex items-center gap-2 font-sans text-label font-medium text-muted ${className}`}>
      <LemonMark className="h-5 w-5" />
      <span>{children}</span>
    </Tag>
  );
}
