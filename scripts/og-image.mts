// Builds the Open Graph images and the logo:
//   public/og-image.png  (home)    the wordmark, the line, photo 01 in her sequin mirror over the swirl
//   public/og-studio.png (/studio) the studio line and photo 09, her mural and sequin lemon, in the mirror
//   public/logo.png      512x512 mirror-ball lemon
// Real photos only. Run: node scripts/og-image.mts
import satori from "satori";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { lemonSvg } from "../lib/lemon.ts";
import { wavePath } from "../lib/wave.ts";
import { SWIRL_ARMS, SWIRL_SEQUENCE, swirlArmPath } from "../lib/swirl.ts";

const font = (p: string) => readFile(`node_modules/@fontsource/${p}`);
const fonts = [
  { name: "Fraunces", data: await font("fraunces/files/fraunces-latin-800-italic.woff"), weight: 800 as const, style: "italic" as const },
  { name: "Fraunces", data: await font("fraunces/files/fraunces-latin-800-normal.woff"), weight: 800 as const, style: "normal" as const },
  { name: "DM Sans", data: await font("dm-sans/files/dm-sans-latin-500-normal.woff"), weight: 500 as const, style: "normal" as const },
  { name: "DM Sans", data: await font("dm-sans/files/dm-sans-latin-700-normal.woff"), weight: 700 as const, style: "normal" as const },
];

const W = 1200;
const H = 630;
const BG = "#120E10";
const PINK = "#FF3D8B";
const swirlHex: Record<string, string> = { pink: "#E82553", yellow: "#E3DB16", green: "#3E9B3A", orange: "#F75513" };
const lemonUri = `data:image/svg+xml;base64,${Buffer.from(lemonSvg({ size: 96 })).toString("base64")}`;
const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

/** The swirl as a standalone SVG, with the dark halo the site uses behind a mirror. */
function swirlSvg(size: number) {
  const d = swirlArmPath();
  const arms = Array.from({ length: SWIRL_ARMS }, (_, i) => `<use href="#a" transform="rotate(${(360 / SWIRL_ARMS) * i})" fill="${swirlHex[SWIRL_SEQUENCE[i % SWIRL_SEQUENCE.length]]}"/>`).join("");
  return Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="-100 -100 200 200"><defs><path id="a" d="${d}"/><clipPath id="c"><circle r="100"/></clipPath><radialGradient id="g"><stop offset="0.44" stop-color="${BG}" stop-opacity="0.86"/><stop offset="0.78" stop-color="${BG}" stop-opacity="0.12"/><stop offset="1" stop-color="${BG}" stop-opacity="0"/></radialGradient></defs><g clip-path="url(#c)" opacity="0.9">${arms}<circle r="100" fill="url(#g)"/></g></svg>`,
  );
}

/** A photo in her sequin mirror: scalloped pink rim with sequins, tilted. */
async function mirror(file: string, pw: number, ph: number, band: number, rotate: number) {
  const wave = (w: number, hh: number, fill: string) =>
    Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${hh}" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="${wavePath(w / hh)}" fill="${fill}"/></svg>`);
  const ow = pw + band * 2;
  const oh = ph + band * 2;
  const sequins = Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${ow}" height="${oh}"><defs><pattern id="s" width="9" height="9" patternUnits="userSpaceOnUse"><rect width="9" height="9" fill="${PINK}"/><circle cx="2.2" cy="2.2" r="1.8" fill="#FF7FB2"/><circle cx="6.7" cy="6.7" r="1.8" fill="#D9286F"/><circle cx="1.8" cy="1.8" r=".5" fill="#FFE3EE"/></pattern></defs><rect width="${ow}" height="${oh}" fill="url(#s)"/></svg>`,
  );
  const rim = await sharp(sequins).composite([{ input: wave(ow, oh, "#fff"), blend: "dest-in" }]).png().toBuffer();
  const photo = await sharp(file)
    .resize(pw, ph, { fit: "cover", position: "north" })
    .composite([{ input: wave(pw, ph, "#fff"), blend: "dest-in" }])
    .png()
    .toBuffer();
  const framed = await sharp({ create: { width: ow, height: oh, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
    .composite([{ input: rim }, { input: photo, left: band, top: band }])
    .png()
    .toBuffer();
  return sharp(framed).rotate(rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
}

async function card(out: string, textTree: unknown, photoFile: string, pw: number, ph: number, rotate: number, withSwirl = true) {
  const text = await satori(textTree as Parameters<typeof satori>[0], { width: W, height: H, fonts });
  const framed = await mirror(photoFile, pw, ph, 14, rotate);
  const m = await sharp(framed).metadata();
  const fx = W - (m.width ?? 0) - 70;
  const fy = Math.round((H - (m.height ?? 0)) / 2);
  const sw = 600;
  const swirl = await sharp(swirlSvg(sw)).png().toBuffer();
  await sharp({ create: { width: W, height: H, channels: 3, background: BG } })
    .composite([
      ...(withSwirl ? [{ input: swirl, left: fx + Math.round((m.width ?? 0) / 2) - sw / 2 + 90, top: Math.round(H / 2 - sw / 2) }] : []),
      { input: Buffer.from(text) },
      { input: framed, left: fx, top: fy },
    ])
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(out);
}

const wordmark = h("div", { display: "flex", alignItems: "center", gap: 18 }, [
  { type: "img", props: { src: lemonUri, width: 72, height: 72 } },
  h("div", { display: "flex", alignItems: "baseline", gap: 14 }, [
    h("span", { fontFamily: "Fraunces", fontStyle: "italic", fontWeight: 800, fontSize: 54, letterSpacing: -1 }, "Disco Lemonade"),
    h("span", { fontFamily: "DM Sans", fontWeight: 700, fontSize: 17, letterSpacing: 6, color: "#B9ABA9" }, "STUDIO"),
  ]),
]);
const shell = (lines: unknown[], sub: string) =>
  h("div", { width: W, height: H, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 72px", color: "#FBF6EE" }, [
    wordmark,
    h("div", { display: "flex", flexDirection: "column", marginTop: 40, fontFamily: "Fraunces", fontWeight: 800, fontSize: 60, lineHeight: 1.04, letterSpacing: -1.5, width: 600 }, lines),
    h("div", { display: "flex", marginTop: 28, fontFamily: "DM Sans", fontWeight: 500, fontSize: 27, color: "#B9ABA9" }, sub),
  ]);

await card(
  "public/og-image.png",
  shell([h("span", {}, "Your dream hair."), h("span", { fontStyle: "italic", color: PINK }, "Vanilla or otherwise.")], "Hair color studio in Leonardtown, MD"),
  "public/images/raw/01-hot-pink-violet-blue-melt-back-BEST.jpg",
  330,
  Math.round((330 * 1721) / 1357),
  2,
);

await card(
  "public/og-studio.png",
  shell(
    [h("span", {}, "Black walls. Pink mirror."), h("span", { fontStyle: "italic", color: PINK }, "A swirl she painted.")],
    "26011 Point Lookout Rd #3, Leonardtown, MD",
  ),
  "public/images/raw/09-studio-swirl-mural-sequin-lemon.jpg",
  380,
  380,
  -2,
  false, // the photo is the real swirl; no drawn one behind it
);

await sharp(Buffer.from(lemonSvg({ size: 512, background: BG })), { density: 300 }).resize(512, 512).png().toFile("public/logo.png");
console.log("public/logo.png");
