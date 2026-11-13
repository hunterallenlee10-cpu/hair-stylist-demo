import type { MetadataRoute } from "next";
import { absoluteUrl, isLive, lastModified } from "@/lib/site";

// Demo mode returns an empty sitemap. Live mode lists every page.
export default function sitemap(): MetadataRoute.Sitemap {
  if (!isLive) return [];
  return [
    { url: absoluteUrl("/"), lastModified: lastModified["/"], changeFrequency: "monthly", priority: 1 },
    { url: absoluteUrl("/contact"), lastModified: lastModified["/contact"], changeFrequency: "yearly", priority: 0.7 },
  ];
}
