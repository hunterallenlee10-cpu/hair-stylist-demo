import type { ReactNode } from "react";

/**
 * Wraps anything not yet confirmed by the owner. Renders a `data-draft`
 * attribute so the live-mode launch guard and `npm run check` can find every
 * unconfirmed fact in the rendered HTML. Invisible to visitors.
 */
export function Draft({ note, children }: { note: string; children: ReactNode }) {
  return <span data-draft={note}>{children}</span>;
}
