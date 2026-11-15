// npm run check: site checks against a production build.
//   CHECK_URL=http://localhost:3000 npm run check   (use a running server)
//   npm run check                                    (starts `next start` on a spare port; run `npm run build` first)
// Checks every route for: one h1, working internal links and anchors, leftover
// blanks, em dashes and double hyphens in rendered text, alt and dimensions on
// every image, phone numbers and addresses matching lib/business.ts, and the
// demo or live safety rules (headers, robots, sitemap, llms.txt, DRAFT markers).
import { spawn, type ChildProcess } from "node:child_process";
import { business } from "../lib/business.ts";
import { pages } from "../lib/site.ts";

const routes = pages.map((p) => p.path);
let base = process.env.CHECK_URL?.replace(/\/+$/, "");
let server: ChildProcess | undefined;

if (!base) {
  const port = 3000 + Math.floor(Math.random() * 900) + 50;
  base = `http://localhost:${port}`;
  // Own process group, so the whole tree (npx and next-server) can be stopped at the end.
  server = spawn("npx", ["next", "start", "-p", String(port)], { stdio: "ignore", detached: true });
  for (let i = 0; i < 60; i++) {
    try {
      await fetch(base);
      break;
    } catch {
      await new Promise((r) => setTimeout(r, 500));
    }
  }
}

const failures: string[] = [];
const notes: string[] = [];
const fail = (route: string, msg: string) => failures.push(`${route}: ${msg}`);

const cache = new Map<string, { status: number; html: string; headers: Headers }>();
async function get(path: string) {
  if (!cache.has(path)) {
    const res = await fetch(base + path, { redirect: "manual" });
    const html = res.headers.get("content-type")?.includes("text") ? await res.text() : "";
    cache.set(path, { status: res.status, html, headers: res.headers });
  }
  return cache.get(path)!;
}

const decode = (s: string) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&mdash;|&#8212;|&#x2014;/g, "\u2014");

function visibleText(html: string) {
  const body = html.slice(html.indexOf("<body"));
  return decode(
    body
      .replace(/<script[\s\S]*?<\/script>/g, " ")
      .replace(/<style[\s\S]*?<\/style>/g, " ")
      .replace(/<template[\s\S]*?<\/template>/g, " ")
      .replace(/<!--[\s\S]*?-->/g, " ")
      // Block boundaries become a separator so text from two elements never reads as one phrase.
      .replace(/<\/(p|li|div|address|h[1-6]|dd|dt|figcaption|blockquote|section|button|a)>|<br\s*\/?>/g, " | ")
      .replace(/<[^>]+>/g, " "),
  ).replace(/\s+/g, " ");
}

const attrs = (tag: string) => {
  const out: Record<string, string> = {};
  for (const m of tag.matchAll(/([a-zA-Z:-]+)(?:="([^"]*)")?/g)) out[m[1].toLowerCase()] = m[2] ?? "";
  return out;
};

let demo = true;
const linkTargets = new Map<string, Set<string>>(); // path -> anchors needed

for (const route of routes) {
  const { status, html } = await get(route);
  if (status !== 200) {
    fail(route, `status ${status}`);
    continue;
  }
  if (route === "/") demo = /<meta name="robots" content="noindex/.test(html);

  // One h1.
  const h1s = html.match(/<h1[\s>]/g)?.length ?? 0;
  if (h1s !== 1) fail(route, `${h1s} h1 elements`);

  // Heading order: never skip a level going down.
  let prev = 0;
  for (const m of html.matchAll(/<h([1-6])[\s>]/g)) {
    const lvl = Number(m[1]);
    if (prev && lvl > prev + 1) fail(route, `heading jumps from h${prev} to h${lvl}`);
    prev = lvl;
  }

  // Internal links.
  for (const m of html.matchAll(/<a\b[^>]*\bhref="([^"]+)"/g)) {
    const href = decode(m[1]);
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const [pathAndQuery, hash] = href.split("#");
    const path = pathAndQuery.split("?")[0] || route;
    if (!linkTargets.has(path)) linkTargets.set(path, new Set());
    if (hash) linkTargets.get(path)!.add(hash);
  }

  const text = visibleText(html);

  // Leftover blanks and invented content.
  for (const bad of ["Sample review", "Sample client", "Photo coming soon", "Lorem", "lorem ipsum", "TODO", "undefined", "NaN", "[object Object]"]) {
    if (text.includes(bad)) fail(route, `leftover text "${bad}"`);
  }

  // Dashes.
  if (text.includes("\u2014")) fail(route, "em dash in rendered text");
  const dd = text.match(/.{0,20}--.{0,20}/);
  if (dd) fail(route, `double hyphen in rendered text: "${dd[0]}"`);

  // Images: alt and dimensions.
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const a = attrs(m[0]);
    if (!("alt" in a)) fail(route, `img without alt: ${a.src?.slice(0, 60)}`);
    if (!a.width || !a.height) fail(route, `img without width/height: ${a.src?.slice(0, 60)}`);
  }

  // Phone numbers and addresses match lib/business.ts.
  for (const m of text.matchAll(/\(?\b\d{3}\)?[\s.-]+\d{3}[\s.-]\d{4}\b/g)) {
    if (m[0] !== business.phoneDisplay) fail(route, `phone "${m[0]}" does not match ${business.phoneDisplay}`);
  }
  for (const m of html.matchAll(/href="(tel|sms):([^"?]+)/g)) {
    if (m[2] !== business.phoneE164) fail(route, `${m[1]}: link to ${m[2]}`);
  }
  // A house number or unit next to the street must be hers. "on Point Lookout Rd" alone is fine.
  const [num] = business.address.street.split(" ");
  const unit = business.address.street.match(/#\d+/)?.[0];
  for (const m of text.matchAll(/(\d+)?\s*Point Lookout Rd(?:\s*(#\d+))?/g)) {
    if ((m[1] && m[1] !== num) || (m[2] && m[2] !== unit) || (m[1] && !m[2]))
      fail(route, `address "${m[0].trim()}" does not match ${business.address.street}`);
  }
  for (const m of text.matchAll(/(?:Maryland|MD)\s+(\d{5})/g)) {
    if (m[1] !== business.address.postalCode) fail(route, `ZIP ${m[1]} does not match ${business.address.postalCode}`);
  }

  // DRAFT markers and placeholders.
  const drafts = html.match(/data-draft="/g)?.length ?? 0;
  const placeholders = html.match(/data-placeholder="/g)?.length ?? 0;
  if (!demo) {
    if (drafts) fail(route, `${drafts} DRAFT markers in live mode`);
    if (placeholders) fail(route, `${placeholders} placeholder cards in live mode`);
    if (/DRAFT|TODO: swap/.test(text)) fail(route, "DRAFT or TODO text in live mode");
  } else if (drafts || placeholders) {
    notes.push(`${route}: ${drafts} draft, ${placeholders} placeholder`);
  }
}

// Every internal link resolves, and every #anchor exists on its page.
for (const [path, anchors] of linkTargets) {
  const { status, html } = await get(path);
  if (status !== 200) {
    fail("links", `${path} returns ${status}`);
    continue;
  }
  for (const id of anchors) if (!html.includes(`id="${id}"`)) fail("links", `${path}#${id} has no element with that id`);
}

// Mode rules.
const home = await get("/");
const robotsHeader = home.headers.get("x-robots-tag");
const img = await fetch(`${base}/images/09-studio-swirl-mural-sequin-lemon.webp`);
const optimised = await fetch(`${base}/_next/image?url=${encodeURIComponent("/images/09-studio-swirl-mural-sequin-lemon.webp")}&w=640&q=75`);
const robots = await get("/robots.txt");
const sitemap = await fetch(`${base}/sitemap.xml`);
const llms = await fetch(`${base}/llms.txt`);
const sitemapBody = sitemap.status === 200 ? await sitemap.text() : "";
if (demo) {
  if (robotsHeader !== "noindex, nofollow") fail("demo", `X-Robots-Tag on / is "${robotsHeader}"`);
  if (img.headers.get("x-robots-tag") !== "noindex, nofollow") fail("demo", "X-Robots-Tag missing on a public image");
  if (optimised.headers.get("x-robots-tag") !== "noindex, nofollow") fail("demo", "X-Robots-Tag missing on an optimised image");
  if (sitemap.status !== 404) fail("demo", `/sitemap.xml returns ${sitemap.status}`);
  if (llms.status !== 404) fail("demo", `/llms.txt returns ${llms.status}`);
  for (const bot of ["GPTBot", "OAI-SearchBot", "ChatGPT-User", "ClaudeBot", "Claude-SearchBot", "anthropic-ai", "PerplexityBot", "Google-Extended", "Applebot-Extended", "CCBot", "Bytespider", "meta-externalagent"]) {
    if (!new RegExp(`User-Agent: ${bot}\\s+Disallow: /`, "i").test(robots.html)) fail("demo", `robots.txt does not disallow ${bot}`);
  }
  if (!/User-Agent: \*\s+Allow: \//i.test(robots.html)) fail("demo", "robots.txt does not allow search engines");
  if (!home.html.includes("Concept preview by Lee Enterprises Unlimited.")) fail("demo", "footer concept line missing");
} else {
  if (robotsHeader) fail("live", `X-Robots-Tag present: ${robotsHeader}`);
  if (sitemap.status !== 200) fail("live", `/sitemap.xml returns ${sitemap.status}`);
  const urls = sitemapBody.match(/<loc>/g)?.length ?? 0;
  if (urls !== routes.length) fail("live", `sitemap lists ${urls} URLs, expected ${routes.length}`);
  if (llms.status !== 200) fail("live", `/llms.txt returns ${llms.status}`);
  if (!/Sitemap: /.test(robots.html)) fail("live", "robots.txt does not list the sitemap");
  if (home.html.includes("Concept preview")) fail("live", "concept footer line still present");
}

if (server?.pid) process.kill(-server.pid, "SIGTERM");

console.log(`\nnpm run check (${demo ? "demo" : "live"} mode, ${base})`);
console.log(`Routes checked: ${routes.length}. Internal link targets checked: ${linkTargets.size}.`);
if (notes.length) console.log(`Owner to confirm before launch (demo only): ${notes.join("; ")}`);
if (failures.length) {
  console.log(`\nFAIL (${failures.length})`);
  for (const f of failures) console.log(`  x ${f}`);
  process.exit(1);
}
console.log("PASS: one h1 per page, headings in order, links and anchors resolve, no blanks or sample text, no em dashes or double hyphens, every image has alt and dimensions, phone and address match lib/business.ts, mode rules hold.");
