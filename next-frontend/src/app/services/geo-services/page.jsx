import React from 'react';
import servicesContent from '@/data/servicesContent.json';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const serviceData = servicesContent['geo-services'];

export const metadata = {
  title: serviceData.metaTitle || 'GEO Services & Generative Engine Optimization Agency | AFWAN TECH',
  description: serviceData.metaDescription || 'GEO services so ChatGPT, Gemini, Perplexity and Copilot describe and cite your brand: prompt audits, brand facts, content, PR and tracking.',
  keywords: serviceData.keywords || [],
  alternates: {
    canonical: 'https://www.afwantech.com/services/geo-services'
  },
  openGraph: {
    title: serviceData.metaTitle,
    description: serviceData.metaDescription,
    url: 'https://www.afwantech.com/services/geo-services',
    siteName: 'AFWAN TECH'
  }
};

export default function GeoServicesPage() {
  return <ServicePageTemplate data={serviceData} />;
}
