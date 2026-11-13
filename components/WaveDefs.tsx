import { WAVE_SHAPES, wavePath } from "@/lib/wave";

/** Defines every wavy-mirror clip-path once, so frames can use `clip-path: url(#wave-*)`. */
export function WaveDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
      <defs>
        {Object.entries(WAVE_SHAPES).map(([name, aspect]) => (
          <clipPath key={name} id={`wave-${name}`} clipPathUnits="objectBoundingBox">
            <path d={wavePath(aspect)} />
          </clipPath>
        ))}
      </defs>
    </svg>
  );
}
