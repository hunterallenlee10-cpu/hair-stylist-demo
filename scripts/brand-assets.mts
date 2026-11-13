// Writes the lemon favicon, Apple touch icon, Flavor Dial thumb and the Melt mask.
// Run: node scripts/brand-assets.mts
import sharp from "sharp";
import { writeFile } from "node:fs/promises";
import { lemonSvg } from "../lib/lemon.ts";

await writeFile("app/icon.svg", lemonSvg({ size: 64, background: "#120E10" }));
await sharp(Buffer.from(lemonSvg({ size: 180, background: "#120E10", rotate: -24 })), { density: 300 })
  .resize(180, 180)
  .flatten({ background: "#120E10" })
  .png()
  .toFile("app/apple-icon.png");
// favicon.ico fallback (32px PNG inside an ICO container is overkill; a PNG icon is fine).
await sharp(Buffer.from(lemonSvg({ size: 32, background: "#120E10" })), { density: 300 })
  .resize(48, 48)
  .png()
  .toFile("public/favicon-48.png");
await writeFile("public/lemon-mark.svg", lemonSvg({ size: 64 }));
await writeFile("public/lemon-thumb.svg", lemonSvg({ size: 56, rotate: 0 }).replace("#3A1424", "#120E10"));

// The Melt mask: opaque top, a soft wavy edge, transparent below.
// Stretched to 100% x 300% of the photo and slid down by the animation.
const melt = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 300" preserveAspectRatio="none" width="100" height="300">
<defs><filter id="f" x="-5%" y="-20%" width="110%" height="140%"><feGaussianBlur stdDeviation="0 2.6"/></filter></defs>
<path filter="url(#f)" fill="#fff" d="M-2 -40H102V148Q93.75 139 87.5 148T75 148T62.5 148T50 148T37.5 148T25 148T12.5 148T0 148T-2 148Z"/>
</svg>`;
await writeFile("public/melt-mask.svg", melt);
console.log("brand assets written");
