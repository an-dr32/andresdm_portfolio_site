const path = require("path");
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force Next.js to treat this workspace as the root for file tracing
  outputFileTracingRoot: path.join(__dirname),
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    // Enable Next Image Optimization and serve modern formats
    formats: ["image/avif", "image/webp"],
    // Tune responsive breakpoints for mobile-first loading
    deviceSizes: [360, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  devIndicators: false,
  allowedDevOrigins: [
    "*.macaly.dev",
    "*.macaly.app",
    "*.macaly-app.com",
    "*.macaly-user-data.dev",
    "192.168.1.88",
  ],
  // https://github.com/vercel/next.js/issues/79588#issuecomment-2972850452
  experimental: {
    preloadEntriesOnStart: false,
    webpackMemoryOptimizations: true,
  },
};

module.exports = nextConfig;
