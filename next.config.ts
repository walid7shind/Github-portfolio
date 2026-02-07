import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")?.[1];

// GitHub Pages project sites are served under /<repo>.
// Deriving this avoids case mismatches between Windows (local) and Linux/Pages (deploy).
const inferredBasePath = isProd && repoName ? `/${repoName}` : "";

// Allow manual override, but default to GitHub Pages inference for production builds.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? inferredBasePath;

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : "",
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
