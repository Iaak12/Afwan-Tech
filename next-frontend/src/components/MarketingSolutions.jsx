'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Globe2, ArrowUpRight, Search, 
  Smartphone, Zap, Layers, Code, ArrowRight,
  ShoppingCart, TrendingUp, Palette
} from 'lucide-react';

const servicesList = [
  {
    title: 'Website Development',
    slug: 'website-development',
    desc: 'High-speed, server-rendered Next.js and WordPress business websites engineered for maximum lead conversion and speed.',
    icon: Code,
    tags: ['Next.js 15', 'Core Web Vitals', 'Responsive Design']
  },
  {
    title: 'Custom Web Applications',
    slug: 'custom-web-development',
    desc: 'Bespoke web applications, client portals, and cloud microservices tailored to your unique commercial workflows.',
    icon: Layers,
    tags: ['Full Stack', 'Cloud Architecture', 'Decoupled APIs']
  },
  {
    title: 'E-Commerce Development',
    slug: 'ecommerce-development',
    desc: 'High-converting online stores built on Shopify, WooCommerce, or headless Next.js Commerce with secure payment gateways.',
    icon: ShoppingCart,
    tags: ['Shopify & WooCommerce', 'Cart Optimization', 'Multi-Currency']
  },
  {
    title: 'Mobile App Development',
    slug: 'app-development',
    desc: 'Cross-platform iOS and Android mobile applications engineered with React Native and Flutter for flawless performance.',
    icon: Smartphone,
    tags: ['React Native', 'Flutter', 'App Store Ready']
  },
  {
    title: 'Search Engine Optimization',
    slug: 'seo-services',
    desc: 'Technical SEO, structured JSON-LD entity schema, and programmatic search architecture spanning 595+ commercial cities.',
    icon: Search,
    tags: ['Technical SEO', '595+ City Mesh', 'Entity Schema']
  },
  {
    title: 'PPC & Paid Search Advertising',
    slug: 'ppc-paid-ads',
    desc: 'High-ROAS paid acquisition campaigns across Google Search, Shopping, Meta Ads, and LinkedIn with server-side CAPI tracking.',
    icon: TrendingUp,
    tags: ['Google Ads', 'Meta CAPI', 'Conversion Tracking']
  },
  {
    title: 'Social Media Management',
    slug: 'social-media-management',
    desc: 'Strategic social content creation, audience engagement, and community growth that turns casual viewers into brand advocates.',
    icon: Globe2,
    tags: ['Content Strategy', 'Brand Authority', 'Community Building']
  },
  {
    title: 'Graphic Design & UI/UX',
    slug: 'graphic-design',
    desc: 'Distinctive brand identity systems, Figma design tokens, pitch decks, and user experience wireframes tailored to convert.',
    icon: Palette,
    tags: ['Figma Systems', 'Brand Guidelines', 'Conversion UX']
  }
];

export default function MarketingSolutions() {
  return (
    <section id="services-bento" className="py-20 bg-white relative overflow-hidden font-inter border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-14 gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] bg-gray-50 border border-gray-200">
              <Zap size={11} className="text-primary fill-primary" /> Full Service Suite
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tightest text-[#1a1a1a] font-sora">
              End-To-End Digital Solutions For Scaling Brands
            </h2>
          </div>
          <p className="text-[#666] text-sm lg:text-base font-medium leading-relaxed lg:text-right border-l-4 lg:border-l-0 lg:border-r-4 border-primary pl-4 lg:pl-0 lg:pr-6 max-w-sm">
            From custom-coded web architectures to programmatic local SEO and high-ROAS paid acquisition across India and global business hubs.
          </p>
        </div>

        {/* ── 8 SERVICES BALANCED GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((s, i) => {
            const SafeIcon = s.icon;
            const formattedNumber = (i + 1).toString().padStart(2, '0');

            return (
              <Link
                key={i}
                href={`/services/${s.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white border border-gray-200/80 p-8 transition-all duration-300 cursor-pointer min-h-[290px] hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1"
              >
                {/* Header Section */}
                <div className="flex items-start justify-between relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/50 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white text-primary">
                    <SafeIcon size={22} className="transition-transform group-hover:scale-110" />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-black text-gray-300 select-none group-hover:text-primary transition-colors font-mono">
                      {formattedNumber}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 bg-gray-50 group-hover:bg-[#1a1a1a] group-hover:text-white transition-all shadow-xs">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>

                {/* Typography & Content */}
                <div className="space-y-3 relative z-10 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-black text-[#1a1a1a] tracking-tight group-hover:text-primary transition-colors font-sora">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mt-2">
                      {s.desc}
                    </p>
                  </div>

                  {/* Feature Tags */}
                  {s.tags && (
                    <div className="pt-4 flex flex-wrap gap-1.5">
                      {s.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-gray-50 text-gray-600 border border-gray-100 group-hover:border-primary/20 group-hover:text-primary transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Corner accent lines */}
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-gray-200 group-hover:border-primary pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-gray-200 group-hover:border-primary pointer-events-none" />
              </Link>
            );
          })}
        </div>

        {/* Bottom Hub CTA Strip */}
        <div className="mt-12 p-8 bg-gradient-to-r from-[#0f172a] via-[#1a2942] to-[#0f172a] rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
          <div>
            <h4 className="text-2xl font-black text-white font-sora">Need a customized multi-service package?</h4>
            <p className="text-xs sm:text-sm text-gray-300 mt-1">Combine web engineering, programmatic SEO, and paid media with unified reporting.</p>
          </div>
          <Link 
            href="/contact-us"
            className="btn btn-primary !px-8 !py-4 text-xs font-bold uppercase tracking-wider text-white whitespace-nowrap"
          >
            Request Custom Consultation
          </Link>
        </div>

      </div>
    </section>
  );
}
