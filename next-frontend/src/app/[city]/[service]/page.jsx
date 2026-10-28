import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompactHeroForm from '@/components/CompactHeroForm';
import ContactForm from '@/components/ContactForm';
import { getAllLocations, getLocationBySlug, getNearbyLocations } from '@/data/locationsData';
import { services } from '@/data/siteData';
import { fetchDripStatus, isLocationUnlocked } from '@/lib/dripConfig';
import { 
  MapPin, CheckCircle2, ArrowRight, ShieldCheck, 
  Sparkles, Star, TrendingUp, Zap, ChevronRight, PhoneCall 
} from 'lucide-react';

export async function generateMetadata({ params }) {
  const { city, service } = await params;
  const location = getLocationBySlug(city);
  const serviceItem = services.find(s => s.slug === service);

  if (!location || !serviceItem) {
    return {
      title: 'Page Not Found | AFWAN TECH',
      description: 'The requested regional service page could not be located.'
    };
  }

  const drip = await fetchDripStatus();
  const allLocations = getAllLocations();
  const isUnlocked = isLocationUnlocked(city, allLocations, drip.unlockedCount, drip.enabled);
  const siteUrl = 'https://www.afwantech.com';
  const path = `/${city}/${service}`;

  const title = `Top ${serviceItem.name} in ${location.name}, ${location.state} | AFWAN TECH`;
  const description = `Leading ${serviceItem.name} in ${location.name}. Fast, high-converting Next.js architecture, ROI-driven SEO and doorstep client support across ${location.state}.`;

  return {
    title,
    description,
    keywords: [
      `${serviceItem.name.toLowerCase()} in ${location.name}`,
      `best ${serviceItem.name.toLowerCase()} ${location.name}`,
      `${location.name} ${serviceItem.name.toLowerCase()} agency`,
      `${serviceItem.name.toLowerCase()} services ${location.state}`,
      `afwan tech ${location.name}`
    ],
    alternates: {
      canonical: `${siteUrl}${path}`, // Exact Self-Canonical (Prevents GSC Duplicates)
    },
    robots: {
      index: isUnlocked,     // Drip SEO indexing control
      follow: true,
      googleBot: {
        index: isUnlocked,
        follow: true,
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      url: `${siteUrl}${path}`,
      siteName: 'AFWAN TECH'
    }
  };
}

export async function generateStaticParams() {
  const topCities = getAllLocations().slice(0, 15);
  const primaryServices = services.slice(0, 4);

  const params = [];
  for (const city of topCities) {
    for (const s of primaryServices) {
      params.push({ city: city.slug, service: s.slug });
    }
  }
  return params;
}

export default async function CityServicePage({ params }) {
  const { city, service } = await params;
  const location = getLocationBySlug(city);
  const serviceItem = services.find(s => s.slug === service);

  if (!location || !serviceItem) {
    notFound();
  }

  const nearbyLocations = getNearbyLocations(city, 8);

  const localDeliverables = [
    `Hyper-localized ${serviceItem.name} customized for ${location.name} commercial ecosystem.`,
    `Sub-second 100/100 Core Web Vitals speed score on Next.js 15 App Router.`,
    `Localized Schema.org JSON-LD graph targeting regional buyer intent in ${location.state}.`,
    `Direct senior engineer and SEO architect point of contact for your ${location.name} team.`,
    `Complete intellectual property & 100% source code ownership from day one.`
  ];

  const cityServiceFaqs = [
    {
      q: `Why choose AFWAN TECH for ${serviceItem.name} in ${location.name}?`,
      a: `Unlike generic agencies in ${location.name} that outsource to unvetted freelancers, AFWAN TECH deploys an elite in-house engineering and SEO team with 8+ years of expertise. We build high-performing digital systems designed for maximum ROI and organic dominance.`
    },
    {
      q: `What is the timeline to deliver ${serviceItem.name} in ${location.name}?`,
      a: `Standard projects go live within 2 to 4 weeks with iterative staging sprints and direct WhatsApp/Slack communication.`
    },
    {
      q: `Can you help us outrank local competitors in ${location.name}?`,
      a: `Yes. Our programmatic local SEO mesh and semantic entity architecture are engineered specifically to rank top 3 in Google Local Map Packs and organic SERPs.`
    }
  ];

  return (
    <div className="bg-white min-h-screen font-inter text-[#0f172a]">
      <Header />

      <main className="pt-28 md:pt-32">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100 py-3">
          <div className="max-w-container mx-auto px-6 flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href={`/location/${location.slug}`} className="hover:text-primary transition-colors">
              {location.name}
            </Link>
            <span>/</span>
            <span className="text-primary font-bold">{serviceItem.name}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-[#f0f7fd] via-white to-white overflow-hidden border-b border-gray-100">
          <div className="max-w-container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-primary text-xs font-black uppercase tracking-wider">
                  <MapPin size={13} className="text-primary" />
                  <span>{location.name}, {location.state} • Dedicated Delivery</span>
                </div>

                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] font-sora">
                  Award-Winning <span className="text-gradient">{serviceItem.name}</span> in {location.name}
                </h1>

                <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-normal">
                  Scale your customer acquisition with modern Next.js architecture, edge-speed load times, and Page 1 Google SEO built specifically for ambitious businesses in {location.name}, {location.state}.
                </p>

                <div className="space-y-3 pt-2">
                  {localDeliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                        <CheckCircle2 size={13} />
                      </div>
                      <span className="text-sm font-semibold text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <Link 
                    href="/contact-us"
                    className="btn-primary px-8 py-3.5 text-xs uppercase tracking-wider font-bold shadow-xl shadow-primary/20"
                  >
                    Get Free Strategy Audit
                  </Link>
                  <Link 
                    href={`/location/${location.slug}`}
                    className="btn btn-outline px-6 py-3.5 text-xs font-bold"
                  >
                    Explore {location.name} Hub
                  </Link>
                </div>
              </div>

              {/* Right Column: Instant Lead Capture */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-2xl relative">
                  <div className="mb-4">
                    <span className="text-xs font-black uppercase tracking-wider text-primary">Direct Engineer Access</span>
                    <h3 className="text-xl font-black font-sora text-gray-900 mt-1">
                      Start Your {location.name} Project
                    </h3>
                  </div>
                  <CompactHeroForm defaultService={serviceItem.name} defaultLocation={location.name} />
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Localized FAQ Section */}
        <section className="py-16 md:py-24 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                Frequently Asked Questions
              </span>
              <h2 className="text-3xl font-black text-[#0f172a] font-sora">
                {serviceItem.name} in {location.name}
              </h2>
            </div>

            <div className="space-y-4">
              {cityServiceFaqs.map((faq, idx) => (
                <div key={idx} className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="font-bold text-base text-gray-900 font-sora">{faq.q}</h3>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nearby Cities Mesh */}
        {nearbyLocations && nearbyLocations.length > 0 && (
          <section className="py-16 bg-gray-50 border-b border-gray-100">
            <div className="max-w-container mx-auto px-6">
              <div className="mb-8">
                <span className="text-xs font-black uppercase tracking-wider text-primary">Cross-Regional Coverage</span>
                <h2 className="text-2xl font-black font-sora text-gray-900 mt-1">
                  Nearby Markets Around {location.name}
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {nearbyLocations.map((nearby, idx) => (
                  <Link 
                    key={idx}
                    href={`/${nearby.slug}/${serviceItem.slug}`}
                    className="p-4 bg-white rounded-xl border border-gray-200 hover:border-primary/50 hover:shadow-md transition-all group"
                  >
                    <span className="font-bold text-sm text-gray-800 group-hover:text-primary transition-colors block">
                      {nearby.name}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {serviceItem.name} →
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Consultation Banner */}
        <section className="py-16 bg-[#0f172a] text-white">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-4">
            <h2 className="text-2xl sm:text-3xl font-black font-sora">
              Ready to Outrank Competitors in {location.name}?
            </h2>
            <p className="text-gray-300 text-sm max-w-xl mx-auto">
              Get in touch for a comprehensive technical blueprint and ROI projection tailored to your industry.
            </p>
            <div className="pt-2">
              <Link href="/contact-us" className="btn-primary px-8 py-3 text-xs uppercase font-bold tracking-wider inline-block">
                Speak With Mohammad Afwan
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
