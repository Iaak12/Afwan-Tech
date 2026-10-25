import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { 
  MapPin, Globe, CheckCircle2, ArrowRight, ShieldCheck, 
  Sparkles, Star, TrendingUp, Zap, Building2, PhoneCall, 
  ArrowUpRight, Award, Check, ChevronDown 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import CompactHeroForm from '@/components/CompactHeroForm';
import { 
  getAllLocations, 
  getLocationBySlug, 
  getNearbyLocations 
} from '@/data/locationsData';
import { getLocationIntelligence } from '@/data/locationIntelligence';
import { services } from '@/data/siteData';

// Dynamic SEO Metadata for each of the 500+ locations
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    return {
      title: 'Location Not Found | AFWAN TECH',
      description: 'The requested regional location page could not be located.'
    };
  }

  const intel = getLocationIntelligence(location);
  const title = `Top Web Development & SEO Agency in ${location.name}, ${location.state} | AFWAN TECH`;
  const description = `Scale revenue in ${location.name} with award-winning Next.js Web Development, Custom Web Apps, and Page 1 Google SEO. Trusted by leading businesses across ${location.state}.`;

  return {
    title,
    description,
    keywords: [
      `web development in ${location.name}`,
      `seo agency ${location.name}`,
      `digital marketing company ${location.name}`,
      `ecommerce website ${location.name}`,
      `app developers in ${location.name}`,
      `${location.name} software agency`,
      `${location.state} digital marketing`
    ],
    openGraph: {
      title,
      description,
      type: 'website',
      url: `https://www.afwantech.com/location/${location.slug}`,
      siteName: 'AFWAN TECH'
    },
    alternates: {
      canonical: `https://www.afwantech.com/location/${location.slug}`
    }
  };
}

// Generate static params for the top cities during build, remaining rendered on demand
export async function generateStaticParams() {
  const all = getAllLocations();
  return all.slice(0, 50).map(loc => ({
    slug: loc.slug
  }));
}

export default async function LocationPage({ params }) {
  const { slug } = await params;
  const location = getLocationBySlug(slug);

  if (!location) {
    notFound();
  }

  const intel = getLocationIntelligence(location);
  const nearbyLocations = getNearbyLocations(slug, 12);

  const localFaqs = [
    {
      question: `Why should a business in ${location.name} choose AFWAN TECH over local agencies?`,
      answer: `Most local agencies in ${location.name} rely on bloated generic templates, slow WordPress plugins, and superficial SEO checklists. AFWAN TECH delivers enterprise-level Next.js 15 web architecture, sub-second load times, and programmatic Google Page 1 ranking systems that out-rank competitors and convert significantly more visitors into paid clients.`
    },
    {
      question: `Can you help my ${location.name} business rank on Google Local Map Pack?`,
      answer: `Yes. We optimize your Google Business Profile (GBP), embed localized Schema.org JSON-LD data with exact geo-coordinates, build authoritative local citations across ${location.state}, and configure location landing pages to capture top 3 map pack positions.`
    },
    {
      question: `Do you offer in-person or remote consultations for ${location.name} clients?`,
      answer: `We provide complete end-to-end digital collaboration for businesses across ${location.name}. You get direct access to dedicated senior project managers via video calls, real-time Slack/WhatsApp channels, and our proprietary live analytics dashboard.`
    },
    {
      question: `How fast can we launch our new website in ${location.name}?`,
      answer: `High-performance Next.js corporate and service websites typically go live in 2 to 4 weeks. Custom web applications with complex workflows require 4 to 6 weeks.`
    },
    {
      question: `What industries do you serve in ${location.name}, ${location.state}?`,
      answer: `We specialize in ${intel.sectors.join(', ')}, helping both emerging SMBs and established enterprise organizations scale their digital customer acquisition.`
    }
  ];

  // Schema.org Structured Data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        name: `AFWAN TECH - Web Development & SEO in ${location.name}`,
        image: 'https://www.afwantech.com/afwan.png',
        '@id': `https://www.afwantech.com/location/${location.slug}`,
        url: `https://www.afwantech.com/location/${location.slug}`,
        telephone: '+919560133711',
        address: {
          '@type': 'PostalAddress',
          addressLocality: location.name,
          addressRegion: location.state,
          addressCountry: location.country === 'Global' ? 'US' : 'IN'
        },
        priceRange: '₹₹₹',
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          reviewCount: location.reviewsCount || 148
        }
      },
      {
        '@type': 'FAQPage',
        mainEntity: localFaqs.map(faq => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer
          }
        }))
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="bg-[#fcfcfc] min-h-screen text-[#0f172a] font-inter">
        <Header />

        <main className="pt-28 md:pt-32">
          {/* Breadcrumbs */}
          <div className="bg-white border-b border-gray-100 py-3">
            <div className="max-w-container mx-auto px-6 flex items-center gap-2 text-xs text-gray-500">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-gray-400">Locations</span>
              <span>/</span>
              {location.state && (
                <>
                  <span className="text-gray-400">{location.state}</span>
                  <span>/</span>
                </>
              )}
              <span className="text-primary font-bold">{location.name}</span>
            </div>
          </div>

          {/* Hero Section */}
          <section className="min-h-[92vh] flex items-center py-16 md:py-24 bg-gradient-to-b from-[#f0f7fd] via-white to-white relative overflow-hidden">
            <div className="max-w-container mx-auto px-6 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-primary text-xs font-black uppercase tracking-wider">
                    <MapPin size={14} className="text-primary" />
                    <span>{intel.archetype}</span>
                  </div>

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15]">
                    Web Development & SEO Company in <span className="text-gradient">{location.name}</span>
                  </h1>

                  <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal">
                    Empowering enterprises and high-growth brands in <strong>{location.name}, {location.state}</strong> with lightning-fast Next.js websites, dominant Google Page 1 search rankings, and scalable programmatic lead-generation engines.
                  </p>

                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-2xl font-black text-primary font-sora">4.9/5</div>
                      <div className="text-xs text-gray-900 font-bold mt-0.5">Local Rating</div>
                      <div className="text-[10px] text-gray-400">Verified Client Reviews</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-2xl font-black text-primary font-sora">+340%</div>
                      <div className="text-xs text-gray-900 font-bold mt-0.5">Average Traffic Lift</div>
                      <div className="text-[10px] text-gray-400">{location.name} Campaigns</div>
                    </div>
                    <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                      <div className="text-2xl font-black text-primary font-sora">&lt; 0.8s</div>
                      <div className="text-xs text-gray-900 font-bold mt-0.5">Page Load Speed</div>
                      <div className="text-[10px] text-gray-400">100% Core Web Vitals</div>
                    </div>
                  </div>
                </div>

                {/* Local Lead Capture Card */}
                <div className="lg:col-span-5 w-full">
                  <CompactHeroForm 
                    defaultService="Website Development"
                    defaultLocation={`${location.name}, ${location.state}`}
                    title={`Instant Proposal for ${location.name}`}
                    subtitle={`Dedicated architecture roadmap for businesses targeting ${location.name}. Response in 15 mins.`}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Local Market Dynamics & Strategy (Unique to this location) */}
          <section className="py-16 md:py-20 bg-white border-t border-gray-100">
            <div className="max-w-container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-6 space-y-5">
                  <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block">
                    Regional Market Landscape
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0f172a] tracking-tight">
                    Digital Transformation & Growth in {location.name}
                  </h2>
                  <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
                    <p>
                      <strong>The Local Challenge:</strong> {intel.keyChallenge}
                    </p>
                    <p>
                      <strong>Our Targeted Strategy:</strong> {intel.strategy}
                    </p>
                    <p>
                      Whether you are an established industrial corporation, healthcare institution, retail chain, or fast-scaling tech venture in {location.name}, AFWAN TECH builds the digital infrastructure needed to turn web visits into revenue.
                    </p>
                  </div>
                </div>

                {/* Local Sector Tags & Client Testimonial */}
                <div className="lg:col-span-6 space-y-6">
                  <div className="bg-gray-50 p-6 rounded-2xl border border-gray-200">
                    <h3 className="font-bold text-gray-900 text-sm uppercase tracking-wider mb-3">
                      Key Growth Sectors We Empower in {location.name}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {intel.sectors.map((sec, i) => (
                        <div key={i} className="flex items-center gap-2 bg-white px-3.5 py-2.5 rounded-xl border border-gray-100 text-xs font-semibold text-gray-800 shadow-2xs">
                          <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
                          <span>{sec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Local Testimonial Box */}
                  <div className="bg-gradient-to-tr from-blue-50 to-white p-6 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-1 text-amber-400 mb-3">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={15} fill="currentColor" />
                      ))}
                    </div>
                    <blockquote className="text-sm text-gray-800 italic leading-relaxed mb-3">
                      "{intel.clientQuote}"
                    </blockquote>
                    <div className="text-xs font-bold text-primary">
                      {intel.clientPerson}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Regional Market Tailored Solutions */}
          <section className="py-16 md:py-20 bg-gray-50/70 border-t border-gray-100">
            <div className="max-w-container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-primary text-xs font-black uppercase tracking-widest block mb-2 font-sora">
                  Comprehensive Capabilities
                </span>
                <h2 className="text-3xl font-black text-[#0f172a]">
                  Full-Suite Digital Engineering for {location.name}
                </h2>
                <p className="text-gray-500 text-sm mt-3">
                  Every service is engineered for sub-second performance, bulletproof security, and Page 1 search rankings.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {services.map((service, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-7 border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
                    <div>
                      <h3 className="text-base font-black text-[#0f172a] mb-2">{service.title} in {location.name}</h3>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">{service.shortDesc}</p>
                      <ul className="space-y-2 text-xs text-gray-700 mb-6">
                        {service.features.slice(0, 3).map((f, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 size={13} className="text-primary flex-shrink-0" /> 
                            <span>{f}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <Link 
                      href={`/services/${service.slug}`}
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1 pt-3 border-t border-gray-100"
                    >
                      Explore {service.title} <ArrowRight size={13} />
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Localized FAQs */}
          <section className="py-16 md:py-20 bg-white border-t border-gray-100">
            <div className="max-w-3xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                  Local Information
                </span>
                <h2 className="text-3xl font-black text-[#0f172a]">Frequently Asked Questions in {location.name}</h2>
              </div>

              <div className="space-y-4">
                {localFaqs.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-2xl p-5">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base mb-2">{faq.question}</h3>
                    <p className="text-xs md:text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Programmatic Internal Link Mesh: Nearby Locations */}
          <section className="py-16 md:py-20 bg-gray-50 border-t border-gray-100">
            <div className="max-w-container mx-auto px-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                <div>
                  <h3 className="text-2xl font-black text-[#0f172a]">
                    Explore Sibling Markets & Regional Hubs in {location.state}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Extend your digital footprint across neighboring industrial and commercial districts.
                  </p>
                </div>
                <Link 
                  href="/market-area" 
                  className="btn-primary text-xs px-5 py-2.5 uppercase tracking-wider font-bold"
                >
                  Browse All 500+ Cities
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {nearbyLocations.map((loc) => (
                  <Link
                    key={loc.slug}
                    href={`/location/${loc.slug}`}
                    className="p-3.5 rounded-xl border border-gray-200 hover:border-primary/50 bg-white hover:bg-blue-50/50 transition-all group flex flex-col justify-between"
                  >
                    <span className="font-bold text-xs text-[#0f172a] group-hover:text-primary transition-colors truncate">
                      {loc.name}
                    </span>
                    <span className="text-[10px] text-gray-400 mt-1 truncate">
                      {loc.state}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
}
