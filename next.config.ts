import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Local backend on various hosts/ports
      { protocol: "http", hostname: "localhost", port: "4000" },
      { protocol: "http", hostname: "localhost", port: "5000" },
      { protocol: "http", hostname: "127.0.0.1", port: "4000" },
      { protocol: "http", hostname: "127.0.0.1", port: "5000" },
      // Fallback match for localhost without explicit port (if needed)
      { protocol: "http", hostname: "localhost" },
      { protocol: "http", hostname: "127.0.0.1" },
      // Unsplash for product placeholder images
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Allow OAuth popups (e.g., Google) to communicate with the opener
          { key: "Cross-Origin-Opener-Policy", value: "same-origin-allow-popups" },
        ],
      },
    ];
  },
};

export default nextConfig;
