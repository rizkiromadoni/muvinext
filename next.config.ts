import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "http",
        hostname: "**",
      }
    ]
  },
  env: {
    APP_NAME: process.env.APP_NAME,
    APP_URL: process.env.APP_URL,
  }
};

export default nextConfig;