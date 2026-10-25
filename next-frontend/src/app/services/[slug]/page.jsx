import React from 'react';
import { notFound } from 'next/navigation';
import servicesContent from '@/data/servicesContent.json';
import ServicePageTemplate from '@/components/ServicePageTemplate';

export async function generateStaticParams() {
  return Object.keys(servicesContent).map(slug => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const data = servicesContent[slug];
  if (!data) return { title: 'Service Not Found | AFWAN TECH' };

  return {
    title: data.metaTitle || `${data.title} Agency | AFWAN TECH`,
    description: data.metaDescription || data.heroSubtitle,
    keywords: data.keywords || [],
    alternates: {
      canonical: `https://www.afwantech.com/services/${slug}`
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://www.afwantech.com/services/${slug}`,
      siteName: 'AFWAN TECH'
    }
  };
}

export default async function DynamicServicePage({ params }) {
  const { slug } = await params;
  const data = servicesContent[slug];

  if (!data) {
    notFound();
  }

  return <ServicePageTemplate data={data} />;
}
