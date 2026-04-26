import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.2.2"],
  reactStrictMode: true,
  typedRoutes: true,
};

export default nextConfig;
