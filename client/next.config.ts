import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/foundation',
        destination: '/about',
        permanent: true,
      },
      {
        source: '/csr',
        destination: '/work',
        permanent: true,
      },
      {
        source: '/archive',
        destination: '/visual-archive',
        permanent: true,
      },
      {
        source: '/library',
        destination: '/publications',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
