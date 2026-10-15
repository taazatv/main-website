import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Let phones on the local Wi-Fi load dev assets via the LAN IP
  allowedDevOrigins: ["192.168.29.6"],
};

export default nextConfig;
