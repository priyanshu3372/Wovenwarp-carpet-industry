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
      {
        protocol: 'https',
        hostname: 'mir-s3-cdn-cf.behance.net',
      },
      {
        protocol: 'https',
        hostname: 'mir-s4-cdn-cf.behance.net',
      },
      {
        protocol: 'https',
        hostname: 'mir-s3-cdn.behance.net',
      },
      {
        protocol: 'https',
        hostname: 'mir-s4-cdn.behance.net',
      },
    ],
  },
};

module.exports = nextConfig;
