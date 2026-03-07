/** @type {import('next').NextConfig} */
const nextConfig = {
  /* config options here */
  output: "export",
images: { unoptimized: true },
assetPrefix: "./",   // ⭐ IMPORTANT FIX

  // basePath: '/hilltop',
  assetPrefix: '/',

};

export default nextConfig;
