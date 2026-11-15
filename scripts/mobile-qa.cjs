/* eslint-disable @typescript-eslint/no-require-imports */
// Dev helper: mobile QA against a running production build.
//   node scripts/mobile-qa.cjs http://localhost:3000 <shotDir>
// Phones emulated in Chromium (touch, mobile viewport, device pixel ratio).
// Checks every route on each phone: layout viewport, console and network
// errors, broken images, layout shift while scrolling, tap targets, and the
// interactive features by touch. Saves screenshots for a human look.
const { chromium, devices } = require("playwright");
const [base, out] = process.argv.slice(2);
const routes = ["/", "/work", "/services", "/services/vivid-hair-color", "/services/lived-in-color-balayage", "/services/blonding-and-silver", "/services/color-correction", "/new-here", "/studio", "/contact", "/no-such-page"];
const phones = [
  ["iPhone SE", { ...devices["iPhone SE"], defaultBrowserType: undefined }],
  ["iPhone 13", { ...devices["iPhone 13"], defaultBrowserType: undefined }],
  ["Pixel 7", { ...devices["Pixel 7"], defaultBrowserType: undefined }],
];
const problems = [];
const bad = (m) => problems.push(m);
const slug = (r) => (r === "/" ? "home" : r.slice(1).replace(/\//g, "_"));

(async () => {
  const b = await chromium.launch();

  for (const [name, dev] of phones) {
    const ctx = await b.newContext({ ...dev, deviceScaleFactor: 1 });
    const p = await ctx.newPage();
    const errs = [];
    p.on("pageerror", (e) => errs.push(`pageerror ${e.message}`));
    p.on("console", (m) => m.type() === "error" && errs.push(`console ${m.text().slice(0, 140)}`));
    p.on("response", (r) => {
      const u = r.url();
      if (r.status() >= 400 && !u.includes("no-such-page") && u.startsWith(base)) errs.push(`HTTP ${r.status()} ${u.replace(base, "")}`);
    });

    for (const r of routes) {
      errs.length = 0;
      await p.goto(base + r, { waitUntil: "networkidle" });
      await p.evaluate(() => {
        window.__cls = 0;
        new PerformanceObserver((l) => l.getEntries().forEach((e) => !e.hadRecentInput && (window.__cls += e.value))).observe({ type: "layout-shift", buffered: true });
      });
      // Scroll the whole page like a thumb, so lazy images load and reveals run.
      await p.evaluate(async () => {
        for (let y = 0; y < document.body.scrollHeight; y += 300) {
          window.scrollTo(0, y);
          await new Promise((res) => setTimeout(res, 70));
        }
      });
      await p.waitForTimeout(700);
      const info = await p.evaluate(() => {
        const vw = window.innerWidth;
        const broken = [...document.images].filter((i) => i.complete && i.naturalWidth === 0 && i.loading !== "lazy").map((i) => i.currentSrc || i.src);
        const notLoaded = [...document.images].filter((i) => !i.complete).length;
        // Tap targets: interactive elements smaller than 24px that are not inline text links.
        const small = [...document.querySelectorAll("a[href],button,input,summary,[role=button]")]
          .filter((el) => {
            const rc = el.getBoundingClientRect();
            if (!rc.width || !rc.height || getComputedStyle(el).visibility === "hidden") return false;
            if (el.closest(".sr-only") || el.classList.contains("sr-only")) return false;
            const inlineText = el.tagName === "A" && getComputedStyle(el).display === "inline";
            const hiddenInput = el.tagName === "INPUT" && rc.width <= 2;
            return !inlineText && !hiddenInput && (rc.width < 24 || rc.height < 24);
          })
          .map((el) => `${el.tagName} "${(el.textContent || el.getAttribute("aria-label") || "").trim().slice(0, 30)}" ${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`);
        // Text that is cut off sideways.
        const clipped = [...document.querySelectorAll("h1,h2,h3,p,a,button,li,span")]
          .filter((el) => !el.closest(".sr-only") && !el.matches(".sr-only,.focus\\:not-sr-only"))
          .filter((el) => el.children.length === 0 && el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== "visible" && el.clientWidth > 0)
          .map((el) => `${el.tagName} "${el.textContent.trim().slice(0, 30)}"`);
        return { vw, scrollW: document.documentElement.scrollWidth, broken, notLoaded, small: [...new Set(small)], clipped, cls: window.__cls, h1: document.querySelectorAll("h1").length };
      });
      const label = `${name} ${r}`;
      if (info.vw !== dev.viewport.width) bad(`${label}: layout viewport ${info.vw}px (page zooms out)`);
      if (info.scrollW > info.vw) bad(`${label}: page scrolls sideways (${info.scrollW}px)`);
      if (info.broken.length) bad(`${label}: broken images ${info.broken.join(", ")}`);
      if (info.cls > 0.1) bad(`${label}: layout shift ${info.cls.toFixed(3)} while scrolling`);
      if (info.small.length) bad(`${label}: small tap targets ${info.small.join("; ")}`);
      if (info.clipped.length) bad(`${label}: clipped text ${info.clipped.slice(0, 3).join("; ")}`);
      if (info.h1 !== 1) bad(`${label}: ${info.h1} h1`);
      // The 404 page's own "404 (Not Found)" console line is expected.
      const realErrs = r === "/no-such-page" ? errs.filter((e) => !/404 \(Not Found\)/.test(e)) : errs;
      if (realErrs.length) bad(`${label}: ${[...new Set(realErrs)].join(" | ")}`);
      console.log(`${label.padEnd(44)} vw=${info.vw} cls=${info.cls.toFixed(3)} pendingImgs=${info.notLoaded}`);
    }

    // First screen and a few scroll positions of the main pages, for a human look.
    for (const r of ["/", "/services/vivid-hair-color", "/work", "/studio", "/contact"]) {
      await p.goto(base + r, { waitUntil: "networkidle" });
      await p.waitForTimeout(1800);
      await p.screenshot({ path: `${out}/${name.replace(/ /g, "")}-${slug(r)}-0.png` });
      const h = await p.evaluate(() => document.body.scrollHeight);
      for (const f of [0.33, 0.66]) {
        await p.evaluate((y) => window.scrollTo(0, y), Math.round(h * f));
        await p.waitForTimeout(500);
        await p.screenshot({ path: `${out}/${name.replace(/ /g, "")}-${slug(r)}-${Math.round(f * 100)}.png` });
      }
    }
    await ctx.close();
  }

  // Interactions by touch on a mid-size phone.
  const ctx = await b.newContext({ ...devices["iPhone 13"], defaultBrowserType: undefined, deviceScaleFactor: 1 });
  const p = await ctx.newPage();
  const errs = [];
  p.on("pageerror", (e) => errs.push(e.message));
  const step = async (title, fn) => {
    try {
      const r = await fn();
      console.log(`ok   ${title}${r ? ": " + r : ""}`);
    } catch (e) {
      bad(`interaction "${title}": ${e.message.split("\n")[0]}`);
      console.log(`FAIL ${title}`);
    }
  };
  await p.goto(base + "/", { waitUntil: "networkidle" });

  await step("menu opens, shows services, closes", async () => {
    await p.tap('button[aria-label="Open menu"]');
    await p.waitForSelector("#mobile-menu");
    const links = await p.$$eval("#mobile-menu a", (a) => a.map((x) => x.textContent.trim()));
    if (!links.includes("Vivid hair color")) throw new Error("no service links in menu: " + links.join(","));
    const locked = await p.evaluate(() => document.body.style.overflow);
    await p.tap('button[aria-label="Close menu"]');
    await p.waitForSelector("#mobile-menu", { state: "detached" });
    return `${links.length} links, scroll lock "${locked}"`;
  });
  await step("menu link navigates", async () => {
    await p.tap('button[aria-label="Open menu"]');
    await p.tap('#mobile-menu a[href="/services/blonding-and-silver"]');
    await p.waitForURL("**/services/blonding-and-silver");
    await p.waitForSelector("#mobile-menu", { state: "detached" });
    return p.url().replace(base, "");
  });
  await step("swirl pause button", async () => {
    await p.goto(base + "/", { waitUntil: "networkidle" });
    const btn = p.locator("button", { hasText: "Pause swirl" });
    await btn.tap();
    const paused = await p.evaluate(() => document.querySelector(".swirl-turn")?.getAttribute("data-paused"));
    if (paused !== "true") throw new Error("swirl did not pause");
    return "paused";
  });
  await step("sticky bar appears after scrolling and stays clear of the footer text", async () => {
    await p.evaluate(() => window.scrollTo(0, 1500));
    await p.waitForTimeout(500);
    const shown = await p.evaluate(() => !document.querySelector(".fixed.inset-x-0.bottom-0")?.hasAttribute("inert"));
    if (!shown) throw new Error("bar not shown");
    await p.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await p.waitForTimeout(500);
    const overlap = await p.evaluate(() => {
      const bar = document.querySelector(".fixed.inset-x-0.bottom-0").getBoundingClientRect();
      const last = [...document.querySelectorAll("footer p")].pop().getBoundingClientRect();
      return last.bottom > bar.top;
    });
    if (overlap) throw new Error("bar covers the last footer line at the bottom of the page");
    return "ok";
  });
  await step("Flavor Dial by tapping stop labels and dragging", async () => {
    await p.goto(base + "/#find-your-flavor", { waitUntil: "networkidle" });
    await p.waitForTimeout(3000); // let the one-time sweep finish
    await p.locator("#flavor-dial").scrollIntoViewIfNeeded();
    const box = await p.locator("#flavor-dial").boundingBox();
    await p.touchscreen.tap(box.x + 30, box.y + box.height / 2);
    await p.waitForTimeout(300);
    const v1 = await p.inputValue("#flavor-dial");
    await p.touchscreen.tap(box.x + box.width - 30, box.y + box.height / 2);
    await p.waitForTimeout(300);
    const v2 = await p.inputValue("#flavor-dial");
    if (v1 === v2) throw new Error(`taps did not move the dial (${v1} -> ${v2})`);
    const name = await p.textContent("#find-your-flavor p.display");
    return `${v1} -> ${v2} (${name})`;
  });
  await step("More like this opens the lightbox, swipe moves it, close returns", async () => {
    const thumb = p.locator('#find-your-flavor button[aria-haspopup="dialog"]').first();
    await thumb.tap();
    await p.waitForSelector('[role="dialog"]');
    const a = await p.getAttribute('[role="dialog"]', "aria-label");
    const d = await p.locator('[role="dialog"]').boundingBox();
    await p.mouse.move(d.x + d.width * 0.8, d.y + d.height / 2);
    await p.mouse.down();
    await p.mouse.move(d.x + d.width * 0.2, d.y + d.height / 2, { steps: 5 });
    await p.mouse.up();
    await p.waitForTimeout(300);
    const b2 = await p.getAttribute('[role="dialog"]', "aria-label");
    if (a === b2) throw new Error("swipe did not change the photo");
    await p.tap('button[aria-label="Close photo"]');
    await p.waitForSelector('[role="dialog"]', { state: "detached" });
    return `${a.slice(0, 22)}... -> ${b2.slice(0, 22)}...`;
  });
  await step("gallery filter, lightbox Plan this look opens the planner with the look", async () => {
    await p.goto(base + "/work", { waitUntil: "networkidle" });
    await p.locator("button", { hasText: "Lived-in" }).first().tap();
    const n = await p.$$eval("ul.masonry > li", (l) => l.length);
    await p.locator("ul.masonry li button").first().tap();
    await p.waitForSelector('[role="dialog"]');
    await p.locator('[role="dialog"] button', { hasText: "Plan this look" }).tap();
    await p.waitForSelector('[role="dialog"] form');
    const picked = await p.$$eval('[role="dialog"] input:checked', (els) => els.map((e) => e.closest("label").textContent.trim()));
    await p.tap('button[aria-label="Close the planner"]');
    await p.waitForSelector('[role="dialog"]', { state: "detached" });
    return `${n} lived-in photos, planner opened with ${picked.join(", ")}`;
  });
  await step("planner end to end by touch, on-screen keyboard field in view", async () => {
    await p.goto(base + "/", { waitUntil: "networkidle" });
    await p.locator("main button", { hasText: "Plan My Dream Hair" }).first().tap();
    await p.waitForSelector('[role="dialog"] form');
    const sheet = await p.locator('[role="dialog"]').boundingBox();
    await p.locator('[role="dialog"] label', { hasText: "Panels" }).tap();
    await p.locator('[role="dialog"] button[type="submit"]').tap();
    await p.locator('[role="dialog"] label', { hasText: "Never colored" }).tap();
    await p.locator('[role="dialog"] button[type="submit"]').tap();
    await p.locator('[role="dialog"] input[autocomplete="given-name"]').tap();
    await p.keyboard.type("Sam");
    await p.locator('[role="dialog"] button[type="submit"]').tap();
    await p.waitForSelector("#consult-message");
    const msg = await p.textContent("#consult-message");
    const first = await p.locator('[role="dialog"] .grid.gap-3 > a, [role="dialog"] .grid.gap-3 > button').first().textContent();
    const scrolls = await p.evaluate(() => { const s = document.querySelector("[data-scroll]"); return s.scrollHeight > s.clientHeight; });
    const bodyLocked = await p.evaluate(() => document.documentElement.style.overflow);
    await p.screenshot({ path: `${out}/interaction-planner-last.png` });
    await p.tap('button[aria-label="Close the planner"]');
    if (!msg.startsWith("CONSULTATION.")) throw new Error(msg);
    return `sheet ${Math.round(sheet.width)}x${Math.round(sheet.height)}, first button "${first.trim()}", inner scroll ${scrolls}, page lock "${bodyLocked}"`;
  });
  await step("FAQ opens by tap", async () => {
    await p.goto(base + "/new-here", { waitUntil: "networkidle" });
    await p.locator("details summary").first().tap();
    const open = await p.evaluate(() => document.querySelector("details").open);
    if (!open) throw new Error("did not open");
    return "open";
  });
  await step("map card loads the map only on tap", async () => {
    await p.goto(base + "/contact", { waitUntil: "networkidle" });
    const before = await p.locator("iframe").count();
    await p.locator("button", { hasText: "Show the map" }).tap();
    await p.waitForSelector("iframe");
    return `iframes before ${before}, after 1`;
  });
  await step("services hub tile navigates (with view transition)", async () => {
    await p.goto(base + "/services", { waitUntil: "networkidle" });
    await p.locator('a[href="/services/vivid-hair-color"]').first().tap();
    await p.waitForURL("**/vivid-hair-color");
    await p.waitForTimeout(600);
    const h1 = await p.textContent("h1");
    return h1.slice(0, 40);
  });
  await step("reels of photos swipe sideways inside their row only", async () => {
    const row = p.locator("ul.snap-x").first();
    await row.scrollIntoViewIfNeeded();
    const moved = await row.evaluate((el) => { el.scrollBy({ left: 200 }); return el.scrollLeft > 0 || el.scrollWidth <= el.clientWidth; });
    const pageX = await p.evaluate(() => window.scrollX);
    if (!moved || pageX !== 0) throw new Error(`row ${moved}, page x ${pageX}`);
    return "row scrolls, page does not";
  });
  if (errs.length) bad(`interactions: page errors ${errs.join(" | ")}`);

  // Landscape phone.
  const land = await b.newContext({ ...devices["iPhone 13 landscape"], defaultBrowserType: undefined, deviceScaleFactor: 1 });
  const lp = await land.newPage();
  for (const r of ["/", "/work", "/contact"]) {
    await lp.goto(base + r, { waitUntil: "networkidle" });
    await lp.waitForTimeout(1500);
    const vw = await lp.evaluate(() => window.innerWidth);
    if (vw !== devices["iPhone 13 landscape"].viewport.width) bad(`landscape ${r}: viewport ${vw}`);
    await lp.screenshot({ path: `${out}/landscape-${slug(r)}.png` });
  }
  await lp.goto(base + "/", { waitUntil: "networkidle" });
  await lp.locator("main button", { hasText: "Plan My Dream Hair" }).first().tap();
  await lp.waitForSelector('[role="dialog"] form');
  await lp.waitForTimeout(400);
  await lp.screenshot({ path: `${out}/landscape-planner.png` });
  const submitVisible = await lp.locator('[role="dialog"] button[type="submit"]').isVisible();
  if (!submitVisible) bad("landscape: planner Next button not visible");

  await b.close();
  console.log(problems.length ? `\nPROBLEMS (${problems.length}):\n  ${problems.join("\n  ")}` : "\nNo problems found.");
})();
