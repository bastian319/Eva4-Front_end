import type { NextConfig } from "next";

const repo = "Laboratorio_Next_React";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  basePath: `/${repo}`,
  assetPrefix: `/${repo}`,
  trailingSlash: true,
};

export default nextConfig;
