// The mirror-ball lemon mark. One source for the inline mark, the favicon,
// the Apple touch icon, the Flavor Dial thumb and the OG image.
// A lemon silhouette whose skin is a grid of mirror tiles in the accent pink,
// with two lemon glints and one white sparkle.

export const LEMON_PATH =
  "M6 32C6 30.5 7.5 29.5 9.5 29C12 19 21 14 32 14C43 14 52 19 54.5 29C56.5 29.5 58 30.5 58 32C58 33.5 56.5 34.5 54.5 35C52 45 43 50 32 50C21 50 12 45 9.5 35C7.5 34.5 6 33.5 6 32Z";

const ACCENT = "#FF3D8B";
const LEMON = "#F2D13C";
const INK = "#FBF6EE";
const GROUT = "#3A1424";

export type Tile = { x: number; y: number; s: number; fill: string; o: number };

export function lemonTiles(): Tile[] {
  const tiles: Tile[] = [];
  const step = 6.4;
  const size = 5.4;
  let seed = 7;
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 10; col++) {
      const x = 0.4 + col * step;
      const y = 10.6 + row * step;
      const cx = (x + size / 2 - 32) / 28;
      const cy = (y + size / 2 - 32) / 20;
      const d = Math.min(1, cx * cx + cy * cy);
      let fill = ACCENT;
      let o = Math.max(0.5, 1 - 0.42 * d - rand() * 0.22);
      if ((row === 1 && col === 3) || (row === 2 && col === 6)) {
        fill = LEMON;
        o = 1;
      }
      if (row === 2 && col === 2) {
        fill = INK;
        o = 0.95;
      }
      tiles.push({ x, y, s: size, fill, o: Number(o.toFixed(2)) });
    }
  }
  return tiles;
}

/** Standalone SVG markup (used to write public files and the OG image). */
export function lemonSvg({ size = 64, rotate = -24, background }: { size?: number; rotate?: number; background?: string } = {}) {
  const tiles = lemonTiles()
    .map((t) => `<rect x="${t.x}" y="${t.y}" width="${t.s}" height="${t.s}" rx="1" fill="${t.fill}" fill-opacity="${t.o}"/>`)
    .join("");
  const bg = background ? `<rect width="64" height="64" rx="14" fill="${background}"/>` : "";
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 64 64">${bg}<defs><clipPath id="l"><path d="${LEMON_PATH}"/></clipPath></defs><g transform="rotate(${rotate} 32 32)"><path d="${LEMON_PATH}" fill="${GROUT}"/><g clip-path="url(#l)">${tiles}</g><path d="${LEMON_PATH}" fill="none" stroke="${ACCENT}" stroke-width="1.6"/></g></svg>`;
}
