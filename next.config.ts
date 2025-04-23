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
    TMDB_API_KEY: process.env.TMDB_API_KEY
  }
};

export default nextConfig;