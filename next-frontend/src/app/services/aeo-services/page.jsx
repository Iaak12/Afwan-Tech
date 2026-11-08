import React from 'react';
import servicesContent from '@/data/servicesContent.json';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const serviceData = servicesContent['aeo-services'];

export const metadata = {
  title: serviceData.metaTitle || 'AEO Agency & Answer Engine Optimization Services | AFWAN TECH',
  description: serviceData.metaDescription || 'AEO services to get your brand cited in Google AI Overviews, ChatGPT search and Perplexity: audits, answer-ready content, schema and tracking.',
  keywords: serviceData.keywords || [],
  alternates: {
    canonical: 'https://www.afwantech.com/services/aeo-services'
  },
  openGraph: {
    title: serviceData.metaTitle,
    description: serviceData.metaDescription,
    url: 'https://www.afwantech.com/services/aeo-services',
    siteName: 'AFWAN TECH'
  }
};

export default function AeoServicesPage() {
  return <ServicePageTemplate data={serviceData} />;
}
