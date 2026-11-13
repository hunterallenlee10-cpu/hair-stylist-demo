import type { MetadataRoute } from "next";
import { absoluteUrl, isLive } from "@/lib/site";

// Crawling is always allowed, so crawlers can read the page-level robots meta.
// Demo mode: every page says noindex, and no sitemap is listed.
// Live mode: pages say index, follow, and the sitemap is listed.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/" }],
    ...(isLive ? { sitemap: absoluteUrl("/sitemap.xml") } : {}),
  };
}
