import React from 'react';
import servicesContent from '@/data/servicesContent.json';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const serviceData = servicesContent['social-media-management'];

export const metadata = {
  title: serviceData.metaTitle,
  description: serviceData.metaDescription,
  keywords: serviceData.keywords,
  alternates: {
    canonical: 'https://www.afwantech.com/services/social-media-management'
  }
};

export default function SocialMediaManagementPage() {
  return <ServicePageTemplate data={serviceData} />;
}
