// The launch switch. Everything SEO-related reads from here.
//   NEXT_PUBLIC_SITE_MODE: "demo" (default) or "live"
//   NEXT_PUBLIC_SITE_URL:  base URL for every absolute link
export const siteMode: "demo" | "live" =
  process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";
export const isLive = siteMode === "live";

// Base URL: NEXT_PUBLIC_SITE_URL if set; otherwise, on Vercel, the project's
// production domain (a system variable available at build time); otherwise localhost.
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || vercelUrl || "http://localhost:3000").replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

// Real last-modified dates for the sitemap. Update when a page changes.
export const pages = [
  { path: "/", lastModified: "2026-11-14", priority: 1 },
  { path: "/work", lastModified: "2026-11-14", priority: 0.8 },
  { path: "/services", lastModified: "2026-11-14", priority: 0.9 },
  { path: "/new-here", lastModified: "2026-11-14", priority: 0.8 },
  { path: "/studio", lastModified: "2026-11-14", priority: 0.7 },
  { path: "/contact", lastModified: "2026-11-14", priority: 0.7 },
] as const;

export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Disco Lemonade Studio: vivids, rainbows, vanilla or otherwise. Leonardtown, MD",
};
