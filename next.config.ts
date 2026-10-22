import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // 90 keeps the small interface text in project screenshots crisp
    qualities: [75, 90],
    // Allow unoptimized for local screenshot images during development
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
