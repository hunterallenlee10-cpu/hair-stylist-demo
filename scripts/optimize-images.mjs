// Converts the raw photos in public/images/raw to .webp in public/images,
// keeping the file names. Photo 08 is cropped so the "Oasis" wall sign at the
// bottom right is out of frame. Writes lib/image-dimensions.json so every
// <Image> gets its real width and height (no layout shift).
import sharp from "sharp";
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const RAW = "public/images/raw";
const OUT = "public/images";

// Crops in source pixels. Each one removes something that is not hers to show.
const CROPS = {
  // The "Oasis" wall sign sits at roughly x 1070 to 1285, y 1040 to 1160.
  "08-long-bright-barbie-blonde-waves": { left: 95, top: 0, width: 960, height: 1521 },
  // Another salon's station sign on the left edge ("Slayed...").
  "11-red-ribbons-through-dark-curls": { left: 170, top: 0, width: 910, height: 1350 },
  // Other business signs at both edges ("KA..." left, "Studio Serene" right).
  "12-nine-hour-magenta-melt-straight": { left: 58, top: 0, width: 528, height: 956 },
  // The client's face in profile on the right (glasses, nose, lips): no client faces.
  "14-first-color-rich-brunette-waves": { left: 348, top: 0, width: 1900, height: 3900 },
  // A seated person at the top right whose head is just in frame.
  "16-in-progress-pink-painting": { left: 0, top: 120, width: 1440, height: 1800 },
  // A salon sign at the bottom right ("Studio Se...").
  "17-hidden-rainbow-under-brown-veil": { left: 0, top: 0, width: 1440, height: 1490 },
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

