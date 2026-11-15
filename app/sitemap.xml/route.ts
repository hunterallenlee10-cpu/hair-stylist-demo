import { absoluteUrl, isLive, pages } from "@/lib/site";

// Live mode lists every route with its real last-modified date.
// Demo mode has no sitemap at all: a plain 404, not an empty file.
// Rendered per request: a prerendered 404 body is served by Vercel with a 200 status.
export const dynamic = "force-dynamic";
export function GET() {
  if (!isLive) return new Response("Not found", { status: 404 });
  const urls = pages
    .map((p) => `  <url>\n    <loc>${absoluteUrl(p.path)}</loc>\n    <lastmod>${p.lastModified}</lastmod>\n  </url>`)
    .join("\n");
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
}
