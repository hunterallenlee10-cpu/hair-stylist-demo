// The swirl: a vortex of stripes like the mural on her studio wall (photo 09).
// One arm is drawn as a path; the other 23 are rotated copies, so the inline
// SVG stays small. Each arm follows phi(r) = TWIST * ln(R / r): tight at the
// centre, opening out to the rim, which is how the painted stripes behave.

export const SWIRL_ARMS = 24;
const R = 100;
const R0 = 2.6;
const TWIST = 1.62;
const SAMPLES = 30;

// Pink shows most on her wall, so it repeats; all four mural colours alternate.
export const SWIRL_SEQUENCE = ["pink", "yellow", "pink", "orange", "yellow", "green"] as const;

function point(r: number, offset: number): [number, number] {
  const phi = TWIST * Math.log(R / r) + offset;
  return [r * Math.cos(phi), r * Math.sin(phi)];
}

const f = (n: number) => Number(n.toFixed(1));

/** Path for one arm, in a -100..100 viewBox, overshooting the rim so rotation never shows a gap. */
export function swirlArmPath() {
  // 8% wider than its slot so neighbours overlap and no hairline seams show.
  const width = ((2 * Math.PI) / SWIRL_ARMS) * 1.08;
  const radii = Array.from({ length: SAMPLES }, (_, i) => R0 * Math.pow((R * 1.45) / R0, i / (SAMPLES - 1)));
  const a = radii.map((r) => point(r, 0));
  const b = radii.map((r) => point(r, width)).reverse();
  const pts = [...a, ...b].map(([x, y]) => `${f(x)} ${f(y)}`);
  return `M${pts.join("L")}Z`;
}
