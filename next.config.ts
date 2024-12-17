import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    output: "standalone",
    env: {
        NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
        NEXT_PUBLIC_HTTP1_PORT: process.env.NEXT_PUBLIC_HTTP1_PORT,
        NEXT_PUBLIC_HTTP2_PORT: process.env.NEXT_PUBLIC_HTTP2_PORT,
    },
};

export default nextConfig;