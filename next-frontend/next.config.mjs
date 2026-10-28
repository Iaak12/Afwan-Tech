/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  async redirects() {
    return [
      // 1. Legacy PHP pages to clean Next.js routes
      {
        source: '/index.php',
        destination: '/',
        permanent: true,
      },
      {
        source: '/services.php',
        destination: '/services',
        permanent: true,
      },
      // 2. Bot / Hacker probe protection (saves crawl budget)
      {
        source: '/:path*.php',
        destination: '/404',
        permanent: false,
      },
      {
        source: '/wp-admin/:path*',
        destination: '/404',
        permanent: false,
      },
      // 3. Trailing slash consistency
      {
        source: '/:path+/',
        destination: '/:path+',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
