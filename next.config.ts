import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local backend on various hosts/ports
      { protocol: "http", hostname: "localhost", port: "4000" },
      { protocol: "http", hostname: "localhost", port: "5000" },
      { protocol: "http", hostname: "127.0.0.1", port: "4000" },
      { protocol: "http", hostname: "127.0.0.1", port: "5000" },

      // Fallback localhost
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },

      // Render backend (🔥 REQUIRED)
      {
        protocol: "https",
        hostname: "hamro-pasal-xdjr.onrender.com",
        pathname: "/uploads/**",
      },

      // Unsplash placeholders
      { protocol: "https", hostname: "images.unsplash.com" },

      // DummyJSON CDN
      { protocol: "https", hostname: "cdn.dummyjson.com" },
      { protocol: "https", hostname: "i.dummyjson.com" },

      // Cloudinary
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
