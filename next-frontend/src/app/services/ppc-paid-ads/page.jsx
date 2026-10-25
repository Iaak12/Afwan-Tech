import React from 'react';
import servicesContent from '@/data/servicesContent.json';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const serviceData = servicesContent['ppc-paid-ads'];

export const metadata = {
  title: serviceData.metaTitle,
  description: serviceData.metaDescription,
  keywords: serviceData.keywords,
  alternates: {
    canonical: 'https://www.afwantech.com/services/ppc-paid-ads'
  }
};

export default function PpcPaidAdsPage() {
  return <ServicePageTemplate data={serviceData} />;
}
