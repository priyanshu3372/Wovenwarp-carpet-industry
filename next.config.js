/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: 'export',
  trailingSlash: true,
  allowedDevOrigins: ['192.168.1.11'],
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.builder.io',
      },
      {
        protocol: 'https',
        hostname: 'chatgpt.com',
      },
    ],
  },
};

module.exports = nextConfig;
