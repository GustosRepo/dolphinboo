import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@dolphinboo/lib', '@dolphinboo/types'],
};

export default nextConfig;
