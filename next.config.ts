import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [375, 480, 640, 750, 828, 1080, 1200],
    imageSizes: [96, 160, 240, 320, 480],
  },
};

export default nextConfig;
