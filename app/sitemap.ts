import type { MetadataRoute } from "next";
import { absoluteUrl, isLive, pages } from "@/lib/site";

// Demo mode returns an empty sitemap. Live mode lists every page.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isLive) return [];
  return pages.map((p) => ({
    url: absoluteUrl(p.path),
    lastModified: p.lastModified,
    changeFrequency: "monthly",
    priority: p.priority,
  }));
}
