/**
 * Robots Configuration for Search Crawlers
 * Prevents indexing of internal PHP backend endpoints, admin panel, and saves crawl budget.
 */
export default function robots() {
  const baseUrl = 'https://www.afwantech.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/*.php$',
          '/wp-admin/',
          '/backend-php/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: [
          '/admin/',
          '/api/',
          '/*.php$',
          '/wp-admin/',
          '/backend-php/',
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
