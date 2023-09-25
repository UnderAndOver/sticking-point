/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
        port: "",
      },
      {
        protocol: "https",
        hostname: "*.googleusercontent.com",
        port: "",
      },
    ],
  },
  experimental: {
    serverActions: true,
    optimizePackageImports: ["@tanstack/react-table", ""],
  },
};

module.exports = nextConfig;
