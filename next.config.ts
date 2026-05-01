import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 1080, 1200, 1920],
  },
  async rewrites() {
    return [
      {
        source: '/api/auth/signup',
        destination: 'http://localhost:3000/auth/register',
      },
      {
        source: '/api/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ]
  },
};

export default nextConfig;
