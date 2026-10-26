import { getAllLocations } from '@/data/locationsData';
import { services } from '@/data/siteData';
import { getPublishedBlogs } from '@/lib/blogs';

export default async function sitemap() {
  const baseUrl = 'https://www.afwantech.com';

  // 1. Core static routes
  const staticRoutes = [
    '',
    '/about-us',
    '/services',
    '/pricing',
    '/portfolio',
    '/contact-us',
    '/market-area',
    '/blog'
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

  // 3. Blog articles
  const liveBlogs = getPublishedBlogs();
  const blogRoutes = liveBlogs.map(blog => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  // 4. All 500+ Programmatic Location Pages
  const allLocations = getAllLocations();
  const locationRoutes = allLocations.map(location => ({
    url: `${baseUrl}/location/${location.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly',
    priority: location.type === 'state' ? 0.8 : 0.75
  }));

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...locationRoutes];
}
