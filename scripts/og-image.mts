// Builds public/og-image.png (1200x630) and public/logo.png (512x512).
// Studio black, the wordmark with its mirror-ball lemon, the line, and photo 01
// in a wavy mirror frame on the right. Run: node scripts/og-image.mts
import satori from "satori";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { lemonSvg } from "../lib/lemon.ts";
import { wavePath } from "../lib/wave.ts";

const font = (p: string) => readFile(`node_modules/@fontsource/${p}`);
const fonts = [
  { name: "Fraunces", data: await font("fraunces/files/fraunces-latin-800-italic.woff"), weight: 800 as const, style: "italic" as const },
  { name: "Fraunces", data: await font("fraunces/files/fraunces-latin-800-normal.woff"), weight: 800 as const, style: "normal" as const },
  { name: "DM Sans", data: await font("dm-sans/files/dm-sans-latin-500-normal.woff"), weight: 500 as const, style: "normal" as const },
  { name: "DM Sans", data: await font("dm-sans/files/dm-sans-latin-700-normal.woff"), weight: 700 as const, style: "normal" as const },
];

const W = 1200;
const H = 630;
const lemonUri = `data:image/svg+xml;base64,${Buffer.from(lemonSvg({ size: 96 })).toString("base64")}`;

const h = (type: string, style: Record<string, unknown>, children?: unknown) => ({ type, props: { style, children } });

const text = await satori(
  h("div", { width: W, height: H, display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 0 0 72px", color: "#FBF6EE" }, [
    h("div", { display: "flex", alignItems: "center", gap: 18 }, [
      { type: "img", props: { src: lemonUri, width: 76, height: 76 } },
      h("div", { display: "flex", alignItems: "baseline", gap: 14 }, [
        h("span", { fontFamily: "Fraunces", fontStyle: "italic", fontWeight: 800, fontSize: 58, letterSpacing: -1 }, "Disco Lemonade"),
        h("span", { fontFamily: "DM Sans", fontWeight: 700, fontSize: 18, letterSpacing: 6, color: "#B9ABA9" }, "STUDIO"),
      ]),
    ]),
    h("div", { display: "flex", flexDirection: "column", marginTop: 44, fontFamily: "Fraunces", fontWeight: 800, fontSize: 60, lineHeight: 1.04, letterSpacing: -1.5, width: 640 }, [
      h("span", {}, "Vivids, rainbows,"),
      h("span", { fontStyle: "italic", color: "#FF3D8B" }, "vanilla or otherwise."),
    ]),
    h("div", { display: "flex", marginTop: 30, fontFamily: "DM Sans", fontWeight: 500, fontSize: 28, color: "#B9ABA9" }, "Leonardtown, MD"),
  ]),
  { width: W, height: H, fonts },
);

// Photo 01 in a wavy frame, with a rim, tilted 2 degrees.
const pw = 356;
const ph = Math.round((pw * 1721) / 1357);
const wave = (w: number, hh: number, fill: string) =>
  Buffer.from(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${hh}" viewBox="0 0 1 1" preserveAspectRatio="none"><path d="${wavePath(w / hh)}" fill="${fill}"/></svg>`,
  );
const photo = await sharp("public/images/raw/01-hot-pink-violet-blue-melt-back-BEST.jpg")
  .resize(pw, ph, { fit: "cover" })
  .composite([{ input: wave(pw, ph, "#fff"), blend: "dest-in" }])
  .png()
  .toBuffer();
const rim = await sharp(wave(pw + 20, ph + 20, "#33272B")).png().toBuffer();
const framed = await sharp({ create: { width: pw + 20, height: ph + 20, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: rim }, { input: photo, left: 10, top: 10 }])
  .png()
  .toBuffer();
const tilted = await sharp(framed).rotate(2, { background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toBuffer();
const tm = await sharp(tilted).metadata();

const glow = Buffer.from(
  `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}"><defs><radialGradient id="g" cx="0.5" cy="0.5" r="0.5"><stop offset="0" stop-color="#FF3D8B" stop-opacity="0.22"/><stop offset="1" stop-color="#FF3D8B" stop-opacity="0"/></radialGradient></defs><circle cx="${W - 230}" cy="${H / 2}" r="360" fill="url(#g)"/></svg>`,
);

await sharp({ create: { width: W, height: H, channels: 3, background: "#120E10" } })
  .composite([
    { input: glow },
    { input: Buffer.from(text) },
    { input: tilted, left: W - (tm.width ?? 0) - 56, top: Math.round((H - (tm.height ?? 0)) / 2) },
  ])
  .png({ compressionLevel: 9 })
  .toFile("public/og-image.png");

await sharp(Buffer.from(lemonSvg({ size: 512, background: "#120E10" })), { density: 300 })
  .resize(512, 512)
  .png()
  .toFile("public/logo.png");
console.log("og-image.png and logo.png written");
