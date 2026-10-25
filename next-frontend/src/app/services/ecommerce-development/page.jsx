import React from 'react';
import servicesContent from '@/data/servicesContent.json';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const serviceData = servicesContent['ecommerce-development'];

export const metadata = {
  title: serviceData.metaTitle,
  description: serviceData.metaDescription,
  keywords: serviceData.keywords,
  alternates: {
    canonical: 'https://www.afwantech.com/services/ecommerce-development'
  }
};

export default function EcommerceDevelopmentPage() {
  return <ServicePageTemplate data={serviceData} />;
}
