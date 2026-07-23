import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: isProd ? "/Eva4-Front_end" : "",
  assetPrefix: isProd ? "/Eva4-Front_end" : "",
  trailingSlash: true,
};

export default nextConfig;