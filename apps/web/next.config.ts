import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "**.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "imagenes.compragamer.com",
      },
      {
        protocol: "https",
        hostname: "fullh4rd.com.ar",
      },
    ],
  },
};

export default nextConfig;
