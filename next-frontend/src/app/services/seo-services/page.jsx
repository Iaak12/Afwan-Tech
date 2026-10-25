import React from 'react';
import servicesContent from '@/data/servicesContent.json';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const serviceData = servicesContent['seo-services'];

export const metadata = {
  title: serviceData.metaTitle,
  description: serviceData.metaDescription,
  keywords: serviceData.keywords,
  alternates: {
    canonical: 'https://www.afwantech.com/services/seo-services'
  }
};

export default function SeoServicesPage() {
  return <ServicePageTemplate data={serviceData} />;
}
