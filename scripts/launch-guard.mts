// Runs after `next build`. In live mode it fails the build if any DRAFT marker,
// placeholder review card or "TODO: swap" is left in the prerendered pages.
// Demo mode: does nothing. LAUNCH_GUARD=off skips it (local audits only).
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const live = process.env.NEXT_PUBLIC_SITE_MODE === "live";
if (!live || process.env.LAUNCH_GUARD === "off") {
  console.log(`launch guard: skipped (${live ? "LAUNCH_GUARD=off" : "demo mode"})`);
  process.exit(0);
}

async function* walk(dir: string): AsyncGenerator<string> {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (p.endsWith(".html")) yield p;
  }
}

const problems: string[] = [];
for await (const file of walk(".next/server/app")) {
  const html = await readFile(file, "utf8");
  const drafts = html.match(/data-draft="([^"]*)"/g) ?? [];
  const cards = html.match(/data-placeholder="/g) ?? [];
  if (drafts.length) problems.push(`${file}: ${drafts.length} DRAFT (${[...new Set(drafts)].join(", ")})`);
  if (cards.length) problems.push(`${file}: ${cards.length} placeholder card(s)`);
  if (html.includes("TODO: swap")) problems.push(`${file}: TODO: swap`);
}
if (problems.length) {
  console.error("launch guard: live mode build has unconfirmed content:\n  " + problems.join("\n  "));
  process.exit(1);
}
console.log("launch guard: clean");
