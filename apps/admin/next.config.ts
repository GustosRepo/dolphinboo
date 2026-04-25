import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@dolphinboo/lib', '@dolphinboo/types', '@dolphinboo/ui'],
};

export default nextConfig;
