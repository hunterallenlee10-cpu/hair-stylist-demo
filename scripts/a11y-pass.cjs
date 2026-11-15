/* eslint-disable @typescript-eslint/no-require-imports */
// Dev helper: keyboard, reflow (200% and 400% zoom) and builder-flow pass.
// node scripts/a11y-pass.cjs http://localhost:3100 <shotDir>
const { chromium } = require("playwright");
const [base, out] = process.argv.slice(2);
const routes = ["/", "/work", "/services", "/services/vivid-hair-color", "/services/lived-in-color-balayage", "/services/blonding-and-silver", "/services/color-correction", "/new-here", "/studio", "/contact"];
const problems = [];
(async () => {
  const b = await chromium.launch();

  // Reflow: 640px is 1280 at 200% zoom, 320px is 1280 at 400%.
  for (const w of [640, 320]) {
    const p = await b.newPage({ viewport: { width: w, height: 800 } });
    for (const r of routes) {
      await p.goto(base + r, { waitUntil: "networkidle" });
      const over = await p.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (over > 0) problems.push(`reflow ${w}px ${r}: ${over}px horizontal scroll`);
    }
    await p.close();
  }
  console.log("reflow at 640px (200%) and 320px (400%): checked", routes.length, "routes each");

  // Phone emulation: the layout viewport must stay at the device width on every route
  // (overflowing content makes a phone browser zoom the whole page out).
  {
    const p = await b.newPage({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
    for (const r of routes) {
      await p.goto(base + r, { waitUntil: "networkidle" });
      const iw = await p.evaluate(() => innerWidth);
      if (iw !== 375) problems.push(`phone ${r}: layout viewport ${iw}px wide, page zooms out`);
    }
    await p.close();
    console.log("phone layout viewport: checked", routes.length, "routes");
  }

  // Keyboard on a phone: focus is visible and never under the sticky bar.
  const m = await b.newPage({ viewport: { width: 375, height: 812 }, hasTouch: true, isMobile: true });
  for (const r of ["/", "/services/vivid-hair-color", "/contact"]) {
    await m.goto(base + r, { waitUntil: "networkidle" });
    for (let i = 0; i < 70; i++) {
      await m.keyboard.press("Tab");
      await m.waitForTimeout(350);
      const info = await m.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body || el.tagName === "NEXTJS-PORTAL") return null;
        const rect = el.getBoundingClientRect();
        const bar = document.querySelector(".fixed.inset-x-0.bottom-0:not([inert])");
        const barTop = bar && !bar.hasAttribute("inert") ? innerHeight - bar.offsetHeight : innerHeight;
        const cs = getComputedStyle(el);
        const inBar = bar?.contains(el);
        return { tag: el.tagName, text: (el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30), covered: !inBar && rect.top < innerHeight && rect.bottom > barTop + 1, outline: cs.outlineStyle !== "none" || cs.boxShadow !== "none", w: rect.width, h: rect.height };
      });
      if (!info) continue;
      if (info.covered) problems.push(`${r}: focused ${info.tag} "${info.text}" is under the sticky bar`);
      if (!info.outline) problems.push(`${r}: focused ${info.tag} "${info.text}" has no visible focus style`);
      if (info.h < 24 || info.w < 24) problems.push(`${r}: ${info.tag} "${info.text}" target ${Math.round(info.w)}x${Math.round(info.h)}`);
    }
  }
  console.log("keyboard pass on phone: 70 tabs on 3 routes");

  // The Flavor Dial with arrow keys.
  await m.goto(base + "/", { waitUntil: "networkidle" });
  await m.focus("#flavor-dial");
  const v0 = await m.inputValue("#flavor-dial");
  await m.keyboard.press("ArrowRight");
  await m.keyboard.press("ArrowRight");
  const v1 = await m.inputValue("#flavor-dial");
  console.log(`flavor dial arrow keys: ${v0} -> ${v1}`);
  if (v0 === v1) problems.push("flavor dial did not move with arrow keys");

  // The builder, end to end, on a phone and on a desktop.
  for (const [label, page] of [["375", m], ["1440", await b.newPage({ viewport: { width: 1440, height: 900 } })]]) {
    await page.goto(base + "/services/color-correction", { waitUntil: "networkidle" });
    const trigger = page.locator("main button", { hasText: "Plan my correction" }).first();
    await trigger.click();
    await page.waitForSelector('[role="dialog"] form');
    const pre = await page.$$eval('[role="dialog"] input:checked', (els) => els.map((e) => e.closest("label")?.textContent?.trim()));
    console.log(`${label} correction pre-selects:`, pre);
    await page.click('[role="dialog"] button[type="submit"]');
    await page.waitForTimeout(250);
    const step2 = await page.$$eval('[role="dialog"] input:checked', (els) => els.map((e) => e.closest("label")?.textContent?.trim()));
    console.log(`${label} step 2 already answered:`, step2);
    await page.click('[role="dialog"] button[type="submit"]');
    await page.waitForTimeout(250);
    await page.fill('[role="dialog"] input[autocomplete="given-name"]', "Jess");
    await page.click('[role="dialog"] button[type="submit"]');
    await page.waitForTimeout(400);
    const msg = await page.textContent("#consult-message");
    console.log(`${label} message:`, msg);
    if (!msg.startsWith("CONSULTATION.")) problems.push("message does not start with CONSULTATION");
    const href = await page.getAttribute('[role="dialog"] a[href^="sms:"]', "href");
    if (!href.startsWith("sms:+12405618519?&body=CONSULTATION")) problems.push(`sms href ${href}`);
    const before = await page.locator("text=Sent? She will reply").count();
    await page.screenshot({ path: `${out}/builder-last-${label}.png` });
    await page.evaluate(() => document.addEventListener("click", (e) => e.target.closest('a[href^="sms:"]') && e.preventDefault(), true));
    await page.click('[role="dialog"] a[href^="sms:"]');
    const after = await page.locator("text=Sent? She will reply").count();
    console.log(`${label} success line before tap: ${before}, after tap: ${after}`);
    if (before !== 0 || after !== 1) problems.push(`${label}: success message timing wrong`);
    const order = await page.$$eval('[role="dialog"] .grid.gap-3 > a, [role="dialog"] .grid.gap-3 > button', (els) => els.map((e) => e.textContent.trim()));
    console.log(`${label} send buttons in order:`, order);
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);
    const back = await page.evaluate(() => document.activeElement?.textContent?.trim());
    console.log(`${label} focus after Escape:`, back);
    if (!/Plan my correction/.test(back || "")) problems.push(`${label}: focus did not return to the trigger`);
  }

  await b.close();
  console.log(problems.length ? `\nPROBLEMS (${problems.length}):\n  ${[...new Set(problems)].join("\n  ")}` : "\nNo problems found.");
})();
