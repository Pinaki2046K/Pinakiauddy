import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    // Allow unoptimized for local screenshot images during development
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Required for react-rnd in some environments
  transpilePackages: ['react-rnd'],
};

export default nextConfig;
