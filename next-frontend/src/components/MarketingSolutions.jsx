'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Globe2, ArrowUpRight, Search, 
  Smartphone, Zap, Layers, Code, ArrowRight 
} from 'lucide-react';

const servicesList = [
  {
    title: 'Website Development',
    slug: 'website-development',
    desc: 'High-end custom websites built for high conversion, lightning speed, and modern SEO architecture.',
    icon: Code,
    colSpan: 'lg:col-span-2',
    tags: ['Next.js 15', 'Speed Score 99+', 'SEO Schema']
  },
  {
    title: 'Search Engine Optimization',
    slug: 'seo-services',
    desc: 'Mastering modern search algorithms to put your brand on page 1 across 500+ target cities.',
    icon: Search,
    colSpan: 'lg:col-span-1',
    tags: ['Programmatic SEO', 'Local Rank #1']
  },
  {
    title: 'Social Media Management',
    slug: 'social-media-management',
    desc: 'Building high-impact digital presence that turns casual interest into paying clients.',
    icon: Globe2,
    colSpan: 'lg:col-span-1',
    tags: ['Brand Authority', 'Ad Campaigns']
  },
  {
    title: 'Custom Web Applications',
    slug: 'custom-web-development',
    desc: 'Engineering blazing-fast, secure full-stack web platforms tailored to your business logic.',
    icon: Layers,
    colSpan: 'lg:col-span-1',
    tags: ['Full Stack', 'Cloud CI/CD']
  },
  {
    title: 'Mobile App Development',
    slug: 'app-development',
    desc: 'Cross-platform iOS and Android applications engineered for supreme user experience and speed.',
    icon: Smartphone,
    colSpan: 'lg:col-span-2',
    tags: ['React Native', 'Flutter', 'App Store Ready']
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
              <Zap size={11} className="text-primary fill-primary" /> Cockpit Feed
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tightest text-[#1a1a1a] font-sora">
              Elite Solutions for Exponential Growth
            </h2>
          </div>
          <p className="text-[#666] text-sm lg:text-base font-medium leading-relaxed lg:text-right border-l-4 lg:border-l-0 lg:border-r-4 border-primary pl-4 lg:pl-0 lg:pr-6 max-w-sm">
            We don't just deliver services — we engineer market dominance through AI-integrated strategies across India and Global hubs.
          </p>
        </div>

        {/* ── BALANCED 4-COLUMN BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Website Development (Span 2) */}
          {servicesList.slice(0, 3).map((s, i) => {
            const SafeIcon = s.icon;
            const formattedNumber = (i + 1).toString().padStart(2, '0');
            const isWide = s.colSpan.includes('col-span-2');

            return (
              <Link
                key={i}
                href={`/services/${s.slug}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white border border-gray-200/80 p-8 transition-all duration-300 cursor-pointer ${s.colSpan} min-h-[250px] hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1`}
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
                <div className="space-y-3 relative z-10">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a1a1a] tracking-tight group-hover:text-primary transition-colors font-sora">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {s.desc}
                  </p>

                  {/* Feature Tags */}
                  {s.tags && (
                    <div className="pt-3 flex flex-wrap gap-2">
                      {s.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 border border-gray-100 group-hover:border-primary/20 group-hover:text-primary transition-colors">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Corner accent line */}
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-gray-200 group-hover:border-primary pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-gray-200 group-hover:border-primary pointer-events-none" />
              </Link>
            );
          })}

          {/* Row 2: Custom Web Apps (1 Col) */}
          {(() => {
            const s = servicesList[3];
            const SafeIcon = s.icon;
            return (
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white border border-gray-200/80 p-8 transition-all duration-300 cursor-pointer lg:col-span-1 min-h-[250px] hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex items-start justify-between relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/50 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white text-primary">
                    <SafeIcon size={22} className="transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-black text-gray-300 select-none group-hover:text-primary transition-colors font-mono">04</div>
                    <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 bg-gray-50 group-hover:bg-[#1a1a1a] group-hover:text-white transition-all shadow-xs">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 relative z-10">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a1a1a] tracking-tight group-hover:text-primary transition-colors font-sora">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="pt-3 flex flex-wrap gap-2">
                    {s.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 border border-gray-100 group-hover:border-primary/20 group-hover:text-primary transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-gray-200 group-hover:border-primary pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-gray-200 group-hover:border-primary pointer-events-none" />
              </Link>
            );
          })()}

          {/* Row 2: Mobile App Development (Span 2) */}
          {(() => {
            const s = servicesList[4];
            const SafeIcon = s.icon;
            return (
              <Link
                href={`/services/${s.slug}`}
                className="group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white border border-gray-200/80 p-8 transition-all duration-300 cursor-pointer lg:col-span-2 min-h-[250px] hover:border-primary/50 hover:shadow-2xl hover:-translate-y-1"
              >
                <div className="flex items-start justify-between relative z-10 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-blue-100/50 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white text-primary">
                    <SafeIcon size={22} className="transition-transform group-hover:scale-110" />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-black text-gray-300 select-none group-hover:text-primary transition-colors font-mono">05</div>
                    <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 bg-gray-50 group-hover:bg-[#1a1a1a] group-hover:text-white transition-all shadow-xs">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>

                <div className="space-y-3 relative z-10">
                  <h3 className="text-xl md:text-2xl font-black text-[#1a1a1a] tracking-tight group-hover:text-primary transition-colors font-sora">
                    {s.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {s.desc}
                  </p>
                  <div className="pt-3 flex flex-wrap gap-2">
                    {s.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-gray-50 text-gray-600 border border-gray-100 group-hover:border-primary/20 group-hover:text-primary transition-colors">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-gray-200 group-hover:border-primary pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-gray-200 group-hover:border-primary pointer-events-none" />
              </Link>
            );
          })()}

          {/* Row 2: CTA Bento Card (1 Col) */}
          <Link
            href="/services"
            className="lg:col-span-1 bg-gradient-to-br from-[#0f172a] via-[#1a1a1a] to-[#0f172a] rounded-[2rem] p-8 flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-300 shadow-xl hover:-translate-y-1 hover:shadow-2xl border border-white/10 min-h-[250px]"
          >
            <div className="relative z-10 flex justify-between items-center mb-6">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#2081D3] bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
                Full Directory
              </span>
              <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#2081D3] group-hover:rotate-45 transition-all">
                <ArrowRight size={16} />
              </div>
            </div>
            
            <div className="relative z-10 space-y-2">
              <h4 className="text-2xl font-black text-white group-hover:text-primary transition-colors font-sora">
                View All Services
              </h4>
              <p className="text-xs text-gray-300 font-medium leading-relaxed">
                Explore our full digital engineering stack, pricing models & capabilities.
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs text-primary font-bold">
                <span>Browse catalog</span>
                <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
