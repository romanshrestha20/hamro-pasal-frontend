import type { NextConfig } from "next";

const nextConfig: NextConfig = {

  // basePath: "/hamro-pasal",
  // assetPrefix: "/hamro-pasal",


  images: {
    remotePatterns: [

      // 🔥 Render backend (uploads)
      {
        protocol: "https",
        hostname: "hamro-pasal-xdjr.onrender.com",
        pathname: "/uploads/**",
      },

      // ☁️ Cloudinary
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/**",
      },

      // 🖼️ External image sources
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.dummyjson.com",
      },
      {
        protocol: "https",
        hostname: "i.dummyjson.com",
      },
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
