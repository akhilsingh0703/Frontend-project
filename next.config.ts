import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['preview.redd.it', 'via.placeholder.com', 'images.unsplash.com', 'picsum.photos'],
  },
};

export default nextConfig;
