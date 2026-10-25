import React from 'react';
import servicesContent from '@/data/servicesContent.json';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const serviceData = servicesContent['custom-web-development'];

export const metadata = {
  title: serviceData.metaTitle,
  description: serviceData.metaDescription,
  keywords: serviceData.keywords,
  alternates: {
    canonical: 'https://www.afwantech.com/services/custom-web-development'
  }
};

export default function CustomWebDevelopmentPage() {
  return <ServicePageTemplate data={serviceData} />;
}
