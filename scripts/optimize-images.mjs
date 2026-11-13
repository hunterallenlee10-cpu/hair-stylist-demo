// Converts the raw photos in public/images/raw to .webp in public/images,
// keeping the file names. Photo 08 is cropped so the "Oasis" wall sign at the
// bottom right is out of frame. Writes lib/image-dimensions.json so every
// <Image> gets its real width and height (no layout shift).
import sharp from "sharp";
import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const RAW = "public/images/raw";
const OUT = "public/images";

// Crops in source pixels. 08: the sign sits at roughly x 1070 to 1285,
// y 1040 to 1160, so the frame stops at x 1055.
const CROPS = {
  "08-long-bright-barbie-blonde-waves": { left: 95, top: 0, width: 960, height: 1521 },
};

const files = (await readdir(RAW)).filter((f) => /\.(jpe?g|png)$/i.test(f)).sort();
const dims = {};
for (const file of files) {
  const name = file.replace(/\.(jpe?g|png)$/i, "");
  let img = sharp(path.join(RAW, file)).rotate();
  if (CROPS[name]) img = img.extract(CROPS[name]);
  const out = path.join(OUT, `${name}.webp`);
  const info = await img.webp({ quality: 82, effort: 6 }).toFile(out);
  dims[name] = { width: info.width, height: info.height };
  console.log(`${name}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
await writeFile("lib/image-dimensions.json", JSON.stringify(dims, null, 2) + "\n");

// Static responsive sizes for the hero (the LCP image), so it never waits on
// the on-demand image optimizer. Never upscaled past the native 1357px.
const HERO = "01-hot-pink-violet-blue-melt-back-BEST";
await mkdir(path.join(OUT, "hero"), { recursive: true });
for (const w of [480, 720, 960, 1200]) {
  const info = await sharp(path.join(RAW, `${HERO}.jpg`))
    .resize({ width: w, withoutEnlargement: true })
    .webp({ quality: w <= 720 ? 62 : 70, effort: 6 })
    .toFile(path.join(OUT, "hero", `${HERO}-${w}.webp`));
  console.log(`hero/${HERO}-${w}.webp  ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`);
}
