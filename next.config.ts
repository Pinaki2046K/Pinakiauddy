import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first (smallest), WebP for browsers without it
    formats: ['image/avif', 'image/webp'],
    // 90 keeps the small interface text in project screenshots crisp
    qualities: [75, 90],
    // Allow unoptimized for local screenshot images during development
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
