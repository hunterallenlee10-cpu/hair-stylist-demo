import type { NextConfig } from "next";

const live = process.env.NEXT_PUBLIC_SITE_MODE === "live";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [96, 160, 240, 320, 480],
    qualities: [75],
  },
  // Demo mode: every response (pages, images, files) says noindex, nofollow.
  // Headers are matched before the filesystem, so /public files and
  // /_next/image responses carry it too. Live mode: no header.
  async headers() {
    if (live) return [];
    return [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }];
  },
};

export default nextConfig;
