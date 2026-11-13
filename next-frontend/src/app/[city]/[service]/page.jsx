import { permanentRedirect, notFound } from 'next/navigation';
import { getLocationBySlug } from '@/data/locationsData';
import servicesContent from '@/data/servicesContent.json';

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { city, service } = await params;
  const canonicalPath = `/${city}/services/${service}`;
  return {
    robots: {
      index: false,
      follow: true,
    },
    alternates: {
      canonical: `https://www.afwantech.com${canonicalPath}`,
    },
  };
}

export default async function CityServiceRedirectPage({ params }) {
  const { city, service } = await params;
  const location = getLocationBySlug(city);
  const baseService = servicesContent[service];

  if (!location || !baseService) {
    notFound();
  }

  // 301 Permanent Redirect to canonical URL format /[city]/services/[service]
  permanentRedirect(`/${city}/services/${service}`);
}
