import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  experimental: {
    esmExternals: true,
  },
};

export default nextConfig;
