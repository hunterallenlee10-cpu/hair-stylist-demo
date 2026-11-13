// Scalloped "wavy mirror" outline in objectBoundingBox units (0 to 1).
// Rounded bumps point outward with soft cusps between them, like the edge of
// Mickayla's pink wavy mirror. About 10 waves on the long side; the short side
// gets proportionally fewer so every wave is the same physical size.

export function wavePath(aspect: number, { waves = 10, amp = 0.014, samples = 6 } = {}) {
  // Work in a box W x H where the longer side is 1.
  const W = aspect >= 1 ? 1 : aspect;
  const H = aspect >= 1 ? 1 / aspect : 1;
  const long = Math.max(W, H);
  const wavelength = long / waves;
  const nW = Math.max(3, Math.round(W / wavelength));
  const nH = Math.max(3, Math.round(H / wavelength));

  const pts: Array<[number, number]> = [];
  const inset = (t: number, n: number) => amp * (1 - Math.abs(Math.sin(Math.PI * n * t)));

  const edge = (n: number, map: (t: number, d: number) => [number, number]) => {
    const steps = n * samples;
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      pts.push(map(t, inset(t, n)));
    }
  };
  edge(nW, (t, d) => [t * W, d]); // top, left to right
  edge(nH, (t, d) => [W - d, t * H]); // right, top to bottom
  edge(nW, (t, d) => [W - t * W, H - d]); // bottom, right to left
  edge(nH, (t, d) => [d, H - t * H]); // left, bottom to top

  const f = (v: number) => Number(v.toFixed(3));
  return "M" + pts.map(([x, y]) => `${f(x / W)} ${f(y / H)}`).join("L") + "Z";
}

export const WAVE_SHAPES = {
  portrait: 1357 / 1721,
  tall: 0.66,
  square: 1,
  landscape: 4 / 3,
  wide: 16 / 9,
} as const;
