import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pravarteesales.com",
      },
    ],
  },
};

export default nextConfig;