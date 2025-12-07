/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  // Optimize production build
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  // Image optimization
  images: {
    domains: ['via.placeholder.com', 'etherscan.io'],
    formats: ['image/webp'],
  },
};

module.exports = nextConfig;
