import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    optimizePackageImports: ['@headlessui/react'],
  },
  outputFileTracingRoot: __dirname,
};

export default nextConfig;