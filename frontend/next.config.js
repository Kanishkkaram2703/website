/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api',
    NEXT_PUBLIC_WHATSAPP_NUMBER: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '919876543210',
    NEXT_PUBLIC_PHONE: process.env.NEXT_PUBLIC_PHONE || '+91-98765-43210',
    NEXT_PUBLIC_EMAIL: process.env.NEXT_PUBLIC_EMAIL || 'info@shivohamcrane.com',
  },
};

module.exports = nextConfig;
