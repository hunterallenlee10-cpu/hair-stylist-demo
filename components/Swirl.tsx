import { SWIRL_ARMS, SWIRL_SEQUENCE, swirlArmPath } from "@/lib/swirl";

const d = swirlArmPath();

/**
 * Her swirl mural, drawn as an inline SVG disc. Decorative. Used in exactly
 * three places: behind the hero mirror, the holiday band's torn edge, and 404.
 * `id` must be unique on the page (it names the shared arm path).
 */
export function Swirl({
  id,
  halo = false,
  className = "",
  style,
}: {
  id: string;
  /** Darkens the middle so a photo placed on top stays the brightest thing. */
  halo?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const arm = `swirl-arm-${id}`;
  const clipId = `swirl-disc-${id}`;
  const haloId = `swirl-halo-${id}`;
  return (
    <svg viewBox="-100 -100 200 200" aria-hidden="true" focusable="false" className={className} style={style}>
      <defs>
        <path id={arm} d={d} />
        <clipPath id={clipId}>
          <circle r="100" />
        </clipPath>
        {halo && (
          <radialGradient id={haloId}>
            <stop offset="0.44" stopColor="#120E10" stopOpacity="0.86" />
            <stop offset="0.78" stopColor="#120E10" stopOpacity="0.12" />
            <stop offset="1" stopColor="#120E10" stopOpacity="0" />
          </radialGradient>
        )}
      </defs>
      <g clipPath={`url(#${clipId})`}>
        {Array.from({ length: SWIRL_ARMS }, (_, i) => (
          <use
            key={i}
            href={`#${arm}`}
            transform={i ? `rotate(${(360 / SWIRL_ARMS) * i})` : undefined}
            fill={`var(--color-swirl-${SWIRL_SEQUENCE[i % SWIRL_SEQUENCE.length]})`}
          />
        ))}
        <circle r="3.4" fill="var(--color-swirl-pink)" />
        {halo && <circle r="100" fill={`url(#${haloId})`} />}
      </g>
    </svg>
  );
}
