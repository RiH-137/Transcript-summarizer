/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  images: {
    unoptimized: true
  },
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || 'https://transcript-summarizer-backend-ipi6.onrender.com',
    NEXT_PUBLIC_API_BASE_URL_DEV: process.env.NEXT_PUBLIC_API_BASE_URL_DEV || 'http://localhost:3001'
  }
};

export default nextConfig;
