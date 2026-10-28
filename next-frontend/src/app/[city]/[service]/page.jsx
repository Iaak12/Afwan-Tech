import React from 'react';
import { notFound } from 'next/navigation';
import ServicePageTemplate from '@/components/ServicePageTemplate';
import { getAllLocations, getLocationBySlug } from '@/data/locationsData';
import { getLocalizedServiceData } from '@/lib/localizedContent';
import servicesContent from '@/data/servicesContent.json';
import { fetchDripStatus, isLocationUnlocked } from '@/lib/dripConfig';

export const revalidate = 3600; // 1-hour ISR revalidation

export async function generateMetadata({ params }) {
  const { city, service } = await params;
  const location = getLocationBySlug(city);
  const baseService = servicesContent[service];

  if (!location || !baseService) {
    return {
      title: 'Page Not Found | AFWAN TECH',
      description: 'The requested regional service page could not be located.'
    };
  }

  const localized = getLocalizedServiceData(service, location);
  const drip = await fetchDripStatus();
  const allLocations = getAllLocations();
  const isUnlocked = isLocationUnlocked(city, allLocations, drip.unlockedCount, drip.enabled);
  const siteUrl = 'https://www.afwantech.com';
  const canonicalPath = `/${city}/services/${service}`;

  return {
    title: localized.metaTitle,
    description: localized.metaDescription,
    keywords: localized.keywords,
    alternates: {
      canonical: `${siteUrl}${canonicalPath}`
    },
    robots: {
      index: isUnlocked,
      follow: true,
      googleBot: {
        index: isUnlocked,
        follow: true
      }
    },
    openGraph: {
      title: localized.metaTitle,
      description: localized.metaDescription,
      type: 'website',
      url: `${siteUrl}${canonicalPath}`,
      siteName: 'AFWAN TECH'
    }
  };
}

export async function generateStaticParams() {
  const topCities = getAllLocations().slice(0, 15);
  const validServiceSlugs = Object.keys(servicesContent);

  const params = [];
  for (const c of topCities) {
    for (const s of validServiceSlugs) {
      params.push({ city: c.slug, service: s });
    }
  }
  return params;
}

export default async function CityServiceDetailPage({ params }) {
  const { city, service } = await params;
  const location = getLocationBySlug(city);
  const baseService = servicesContent[service];

  if (!location || !baseService) {
    notFound();
  }

  const localizedData = getLocalizedServiceData(service, location);

  return <ServicePageTemplate data={localizedData} location={location} />;
}
