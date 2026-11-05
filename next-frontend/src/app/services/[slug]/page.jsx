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
    authors: [{ name: 'Ayaz Khan', url: 'https://www.afwantech.com/about-us' }],
    publisher: 'AFWAN TECH',
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    alternates: {
      canonical: `https://www.afwantech.com/services/${slug}`
    },
    openGraph: {
      title: data.metaTitle || `${data.title} Agency | AFWAN TECH`,
      description: data.metaDescription || data.heroSubtitle,
      url: `https://www.afwantech.com/services/${slug}`,
      siteName: 'AFWAN TECH',
      type: 'website',
      images: [{ url: '/afwan.png', width: 1200, height: 630, alt: data.title }]
    },
    twitter: {
      card: 'summary_large_image',
      title: data.metaTitle || `${data.title} Agency | AFWAN TECH`,
      description: data.metaDescription || data.heroSubtitle,
      images: ['/afwan.png']
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
