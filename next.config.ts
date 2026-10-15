import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones load dev assets via the LAN IP or a temporary Cloudflare tunnel
  allowedDevOrigins: ["192.168.29.6", "*.trycloudflare.com"],
};

export default nextConfig;
