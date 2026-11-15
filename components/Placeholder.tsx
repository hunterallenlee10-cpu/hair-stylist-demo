import { Camera } from "lucide-react";
import { LemonMark } from "./LemonMark";
import { Draft } from "./Draft";

/**
 * A labelled, empty frame for a photo the studio has not supplied yet (her
 * portrait). Never a stock or generated image. Marked as a draft so the
 * live-mode guard asks for the real photo before launch.
 */
export function Placeholder({ label }: { label: string }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder. ${label}`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface p-6 text-center"
      style={{ backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 14px)" }}
    >
      <LemonMark className="h-10 w-10" />
      <Draft note="supply a photo of Mickayla">
        <span className="flex items-center gap-2 text-[0.9375rem] text-muted">
          <Camera className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
          {label}
        </span>
      </Draft>
    </div>
  );
}
