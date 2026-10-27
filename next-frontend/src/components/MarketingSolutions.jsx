'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Globe2, ArrowUpRight, Search, 
  Smartphone, Zap, Layers, Code, ArrowRight,
  ShoppingCart, TrendingUp, Palette, Sparkles, Check
} from 'lucide-react';

const servicesList = [
  {
    title: 'Website Development',
    slug: 'website-development',
    desc: 'High-speed, server-rendered Next.js and WordPress business websites engineered for maximum lead conversion and speed.',
    icon: Code,
    tags: ['Next.js 15', 'Core Web Vitals', 'Responsive Design'],
    badge: 'High Conversion'
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
    tags: ['Shopify & WooCommerce', 'Cart Optimization', 'Multi-Currency'],
    badge: 'Direct Sales'
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
    tags: ['Technical SEO', '595+ City Mesh', 'Entity Schema'],
    badge: '595+ Cities'
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
    <section id="services-bento" className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white relative overflow-hidden font-inter border-t border-gray-100">
      {/* Background Soft Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* ── HEADER ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-16 gap-8"
        >
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-[0.2em] text-[#1a1a1a] bg-blue-50/80 border border-blue-100 text-primary">
              <Zap size={13} className="text-primary fill-primary" /> Comprehensive Digital Suite
            </div>
            <h2 className="text-3xl sm:text-5xl font-black leading-tight tracking-tightest text-[#1a1a1a] font-sora">
              End-To-End Digital Solutions For Scaling Brands
            </h2>
          </div>
          <p className="text-gray-600 text-sm lg:text-base font-medium leading-relaxed lg:text-right border-l-4 lg:border-l-0 lg:border-r-4 border-primary pl-4 lg:pl-0 lg:pr-6 max-w-md">
            From custom-coded web architectures to programmatic local SEO and high-ROAS paid acquisition across India and global business hubs.
          </p>
        </motion.div>

        {/* ── 8 SERVICES ANIMATED GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesList.map((s, i) => {
            const SafeIcon = s.icon;
            const formattedNumber = (i + 1).toString().padStart(2, '0');

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="h-full"
              >
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white border border-gray-200/90 p-7 sm:p-8 transition-all duration-300 cursor-pointer h-full min-h-[340px] hover:border-primary hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
                >
                  {/* Subtle Gradient Backlight on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* Header Row */}
                  <div className="flex items-start justify-between relative z-10 mb-5">
                    {/* Icon container */}
                    <div className="w-13 h-13 rounded-2xl bg-blue-50/90 border border-blue-100/80 shadow-xs flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:rotate-3 group-hover:shadow-md text-primary">
                      <SafeIcon size={24} className="transition-transform group-hover:scale-110" />
                    </div>
                    
                    <div className="flex items-center gap-2.5">
                      {s.badge && (
                        <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 text-primary border border-blue-100 group-hover:bg-primary group-hover:text-white transition-colors">
                          {s.badge}
                        </span>
                      )}
                      <div className="text-xs font-black text-gray-300 select-none group-hover:text-primary transition-colors font-mono">
                        {formattedNumber}
                      </div>
                      <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 bg-gray-50 group-hover:bg-primary group-hover:text-white transition-all shadow-xs group-hover:scale-105">
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
                      <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mt-2.5">
                        {s.desc}
                      </p>
                    </div>

                    {/* Feature Tags */}
                    {s.tags && (
                      <div className="pt-4 flex flex-wrap gap-1.5">
                        {s.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-lg bg-gray-50 text-gray-600 border border-gray-100 group-hover:border-primary/20 group-hover:text-primary group-hover:bg-blue-50/50 transition-all">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Interactive Explore Link in footer */}
                  <div className="pt-5 mt-5 border-t border-gray-100/80 flex items-center justify-between text-xs font-black text-gray-400 group-hover:text-primary transition-colors relative z-10">
                    <span>Explore Architecture</span>
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1.5" />
                  </div>

                  {/* Geometric Corner Accents */}
                  <div className="absolute top-4 right-4 w-2 h-2 border-t-2 border-r-2 border-transparent group-hover:border-primary transition-colors pointer-events-none" />
                  <div className="absolute bottom-4 left-4 w-2 h-2 border-b-2 border-l-2 border-transparent group-hover:border-primary transition-colors pointer-events-none" />
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom Hub CTA Strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-14 p-8 sm:p-10 bg-gradient-to-r from-[#0f172a] via-[#1a2942] to-[#0f172a] rounded-3xl text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl border border-white/10 relative overflow-hidden"
        >
          <div className="relative z-10 space-y-1">
            <div className="flex items-center gap-2 text-xs font-black uppercase text-blue-300 tracking-wider">
              <Sparkles size={14} className="text-primary" /> Integrated Multi-Service Strategy
            </div>
            <h4 className="text-2xl sm:text-3xl font-black text-white font-sora">
              Need a customized multi-service package?
            </h4>
            <p className="text-xs sm:text-sm text-gray-300 max-w-xl">
              Combine custom web engineering, 595+ city programmatic SEO, and high-ROAS paid media with unified analytics and dedicated SLA support.
            </p>
          </div>
          <Link 
            href="/contact-us"
            className="btn btn-primary !px-8 !py-4 text-xs font-extrabold uppercase tracking-wider text-white whitespace-nowrap shadow-lg shadow-primary/30 relative z-10 hover:scale-105 transition-all"
          >
            Request Custom Consultation
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
