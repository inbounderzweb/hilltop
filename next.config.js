/** @type {import('next').NextConfig} */
const nextConfig = {
    // Use a server output (default) instead of static export, which allows force-dynamic routes.
    // You can also use 'standalone' if you plan to deploy a self‑contained server bundle.
    output: 'standalone',
    // Add any other custom config you need here.
};

module.exports = nextConfig;
