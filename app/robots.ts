import type { MetadataRoute } from "next";
import { absoluteUrl, isLive } from "@/lib/site";

// AI crawlers named in the brief. Blocked in demo mode only.
const aiCrawlers = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "anthropic-ai",
  "PerplexityBot",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "meta-externalagent",
];

// Search engines may always crawl, so they can read the page-level noindex.
// Demo mode: AI crawlers are disallowed by name and no sitemap is listed.
// Live mode: everyone is allowed and the sitemap is listed.
export default function robots(): MetadataRoute.Robots {
  if (isLive) return { rules: [{ userAgent: "*", allow: "/" }], sitemap: absoluteUrl("/sitemap.xml") };
  return {
    rules: [{ userAgent: "*", allow: "/" }, ...aiCrawlers.map((userAgent) => ({ userAgent, disallow: "/" }))],
  };
}
