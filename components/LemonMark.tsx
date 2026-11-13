import { LEMON_PATH, lemonTiles } from "@/lib/lemon";

const tiles = lemonTiles();

/** The mirror-ball lemon. Decorative: always aria-hidden. */
export function LemonMark({ className = "h-7 w-7", rotate = -24 }: { className?: string; rotate?: number }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true" focusable="false">
      <g transform={`rotate(${rotate} 32 32)`}>
        <path d={LEMON_PATH} fill="#3A1424" />
        <g clipPath="url(#lemon-clip)">
          {tiles.map((t, i) => (
            <rect key={i} x={t.x} y={t.y} width={t.s} height={t.s} rx={1} fill={t.fill} fillOpacity={t.o} />
          ))}
        </g>
        <path d={LEMON_PATH} fill="none" stroke="#FF3D8B" strokeWidth={1.6} />
      </g>
    </svg>
  );
}
