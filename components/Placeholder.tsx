import { Camera } from "lucide-react";
import { LemonMark } from "./LemonMark";

/** Labelled stand-in for photos the studio has not supplied yet. Never a stock image. */
export function Placeholder({ label, compact = false }: { label: string; compact?: boolean }) {
  return (
    <div
      role="img"
      aria-label={`Placeholder. ${label}`}
      className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-surface p-6 text-center"
      style={{
        backgroundImage:
          "repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 14px)",
      }}
    >
      <LemonMark className={compact ? "h-8 w-8" : "h-12 w-12"} />
      <span className="flex items-center gap-2 font-semibold text-ink">
        <Camera className="h-4 w-4 text-muted" strokeWidth={2} aria-hidden="true" />
        {compact ? "Photo coming" : "Photo coming soon"}
      </span>
      <span className={`max-w-[18rem] text-muted ${compact ? "text-sm" : ""}`}>{label}</span>
    </div>
  );
}
