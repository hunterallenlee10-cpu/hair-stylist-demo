// Dev helper: screenshot pages. node scripts/shot.mjs <baseUrl> <outDir> <path> [path...]
// Env: WIDTHS=1440,375  FULL=1  DPR=1
import { createRequire } from "node:module";
const { chromium } = createRequire(import.meta.url)("playwright");
const [base, out, ...paths] = process.argv.slice(2);
const widths = (process.env.WIDTHS || "1440,375").split(",").map(Number);
const browser = await chromium.launch();
for (const w of widths) {
  const ctx = await browser.newContext({
    viewport: { width: w, height: w < 600 ? 812 : 900 },
    deviceScaleFactor: Number(process.env.DPR || 1),
    reducedMotion: process.env.REDUCED ? "reduce" : "no-preference",
  });
  const page = await ctx.newPage();
  for (const p of paths) {
    await page.goto(base + p, { waitUntil: "networkidle" });
    if (process.env.FULL) {
      // Scroll through so lazy images load, then return to the top.
      await page.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 500) {
          window.scrollTo(0, y);
          await new Promise((r) => setTimeout(r, 120));
        }
        window.scrollTo(0, 0);
      });
    }
    await page.waitForTimeout(Number(process.env.WAIT || 2200));
    const name = `${out}/${(p === "/" ? "home" : p.replace(/[/?=#]+/g, "_").replace(/^_/, ""))}-${w}.png`;
    await page.screenshot({ path: name, fullPage: !!process.env.FULL });
    console.log(name);
  }
  await ctx.close();
}
await browser.close();
