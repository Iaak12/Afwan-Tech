import { getAllLocations } from '@/data/locationsData';
import { services } from '@/data/siteData';

export default async function sitemap() {
  const baseUrl = 'https://afwantech.com';

  // 1. Core static routes
  const staticRoutes = [
    '',
    '/about-us',
    '/services',
    '/pricing',
    '/portfolio',
    '/contact-us',
    '/market-area',
    '/analytics'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8
  }));

  // 2. Service pages
  const serviceRoutes = services.map(service => ({
    url: `${baseUrl}/services/${service.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.85
  }));

  // 3. All 500+ Programmatic Location Pages
  const allLocations = getAllLocations();
  const locationRoutes = allLocations.map(location => ({
    url: `${baseUrl}/location/${location.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: location.type === 'state' ? 0.8 : 0.75
  }));

  return [...staticRoutes, ...serviceRoutes, ...locationRoutes];
}
