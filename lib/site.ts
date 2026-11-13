// The launch switch. Everything SEO-related reads from here.
//   NEXT_PUBLIC_SITE_MODE: "demo" (default) or "live"
//   NEXT_PUBLIC_SITE_URL:  base URL for every absolute link
export const siteMode: "demo" | "live" =
  process.env.NEXT_PUBLIC_SITE_MODE === "live" ? "live" : "demo";
export const isLive = siteMode === "live";

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/+$/, "");

export function absoluteUrl(path = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

// Real last-modified dates for the sitemap. Update when a page changes.
export const lastModified = {
  "/": "2026-11-13",
  "/contact": "2026-11-13",
} as const;

export const ogImage = {
  url: "/og-image.png",
  width: 1200,
  height: 630,
  alt: "Disco Lemonade Studio: vivids, rainbows, vanilla or otherwise. Leonardtown, MD",
};
