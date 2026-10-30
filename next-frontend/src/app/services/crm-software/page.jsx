import React from 'react';
import servicesContent from '@/data/servicesContent.json';
import ServicePageTemplate from '@/components/ServicePageTemplate';

const serviceData = servicesContent['crm-software'];

export const metadata = {
  title: serviceData.metaTitle || 'Afwan Tech Custom CRM Software | AFWAN TECH',
  description: serviceData.metaDescription || 'CRM software built, customised and integrated for Indian businesses: custom CRM development, Zoho or HubSpot setup, WhatsApp and call links.',
  keywords: serviceData.keywords || [],
  alternates: {
    canonical: 'https://www.afwantech.com/services/crm-software'
  },
  openGraph: {
    title: serviceData.metaTitle,
    description: serviceData.metaDescription,
    url: 'https://www.afwantech.com/services/crm-software',
    siteName: 'AFWAN TECH'
  }
};

export default function CrmSoftwarePage() {
  return <ServicePageTemplate data={serviceData} />;
}

