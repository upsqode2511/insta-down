import type { NextConfig } from "next";
import os from "os";

function getLocalNetworkHosts(): string[] {
  const hosts: string[] = ["192.168.1.19", "localhost", "127.0.0.1"];
  try {
    const interfaces = os.networkInterfaces();
    for (const name of Object.keys(interfaces)) {
      for (const net of interfaces[name] || []) {
        if (net.family === "IPv4" && !net.internal) {
          hosts.push(net.address);
        }
      }
    }
  } catch {
    // fallback
  }
  return Array.from(new Set(hosts));
}

const nextConfig: NextConfig = {
  trailingSlash: true,
  allowedDevOrigins: getLocalNetworkHosts(),
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

