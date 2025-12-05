/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/github-portfolio",
  assetPrefix: "/github-portfolio",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
