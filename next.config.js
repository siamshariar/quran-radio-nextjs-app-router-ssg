/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: "export",
  reactStrictMode: true,
  basePath: "",
  images: {
    domains: ["images.unsplash.com"],
    unoptimized: true,
  },
  swcMinify: true,
};

module.exports = nextConfig;
