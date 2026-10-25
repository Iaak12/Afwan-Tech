'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Shield, BarChart3, Globe2, ArrowUpRight, Search, 
  Smartphone, Zap, Layers, Code, ArrowRight 
} from 'lucide-react';

const servicesList = [
  {
    title: 'Website Development',
    slug: 'website-development',
    desc: 'High-end custom websites built for conversion, speed, and modern SEO architecture.',
    icon: Code,
    size: 'lg:col-span-2 lg:row-span-2'
  },
  {
    title: 'Search Engine Optimization',
    slug: 'seo-services',
    desc: 'Mastering search algorithms to put your brand on page 1 across 500+ cities.',
    icon: Search,
    size: 'lg:col-span-1 lg:row-span-1'
  },
  {
    title: 'Social Media Management',
    slug: 'social-media-management',
    desc: 'Building high-impact social presence that turns casual interest into loyal advocacy.',
    icon: Globe2,
    size: 'lg:col-span-1 lg:row-span-1'
  },
  {
    title: 'Custom Web Applications',
    slug: 'custom-web-development',
    desc: 'Engineering blazing-fast, high-performance web ecosystems designed for the modern era.',
    icon: Layers,
    size: 'lg:col-span-1 lg:row-span-2'
  },
  {
    title: 'Mobile App Development',
    slug: 'app-development',
    desc: 'Cross-platform iOS and Android applications crafted for supreme performance and UX.',
    icon: Smartphone,
    size: 'lg:col-span-2 lg:row-span-1'
  }
];

export default function MarketingSolutions() {
  return (
    <section className="py-16 bg-white relative overflow-hidden font-inter border-t border-gray-100">
      <div className="max-w-[1400px] mx-auto px-6 relative z-10">

        {/* ── HEADER ── */}
        <div className="flex flex-col lg:flex-row justify-between items-end mb-12 gap-8">
          <div className="max-w-xl space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-[#1a1a1a] bg-gray-50 border border-gray-200">
              <Zap size={11} className="text-primary fill-primary" /> Cockpit Feed
            </div>
            <h2 className="text-4xl md:text-5xl font-black leading-tight tracking-tightest text-[#1a1a1a] font-sora">
              Elite Solutions for Exponential Growth
            </h2>
          </div>
          <p className="text-[#666] text-sm lg:text-base font-medium leading-relaxed lg:text-right border-r-4 border-primary pr-6 max-w-sm">
            We don't just deliver services — we engineer market dominance through AI-integrated strategies across India and Global hubs.
          </p>
        </div>

        {/* ── BENTO GRID ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-[180px]">
          {servicesList.map((s, i) => {
            const SafeIcon = s.icon;
            const isLarge = s.size.includes('row-span-2');
            const formattedNumber = (i + 1).toString().padStart(2, '0');

            return (
              <Link
                key={i}
                href={`/services/${s.slug}`}
                className={`group relative flex flex-col overflow-hidden rounded-[2rem] bg-white border border-gray-100 p-7 transition-all duration-300 cursor-pointer ${s.size} hover:border-primary/40 hover:shadow-xl`}
              >
                <div className="absolute inset-0 noise-texture opacity-[0.04] pointer-events-none" />

                {/* Header Section */}
                <div className="flex items-start justify-between relative z-10 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50/80 border border-gray-100 shadow-sm flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:text-white text-primary">
                    <SafeIcon size={20} className="transition-transform group-hover:rotate-6" />
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="text-xs font-black text-gray-200 select-none group-hover:text-primary transition-colors font-mono">
                      {formattedNumber}
                    </div>
                    <div className="w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center text-gray-400 bg-gray-50 group-hover:bg-[#1a1a1a] group-hover:text-white transition-all">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>
                </div>

                {/* Scaled Typography */}
                <div className={`mt-auto space-y-2 relative z-10 ${isLarge ? 'pb-2' : ''}`}>
                  <h3 className={`${isLarge ? 'text-2xl' : 'text-lg'} font-black text-[#1a1a1a] tracking-tight group-hover:translate-x-1 transition-transform font-sora`}>
                    {s.title}
                  </h3>
                  <p className={`${isLarge ? 'text-sm' : 'text-xs'} text-[#666] font-medium leading-relaxed line-clamp-2`}>
                    {s.desc}
                  </p>

                  {isLarge && (
                    <div className="pt-4 flex flex-col gap-1.5">
                      <div className="h-[2px] w-10 bg-primary/30 group-hover:w-1/2 transition-all duration-500" />
                      <div className="text-[9px] font-black uppercase tracking-[0.3em] text-primary">
                        Performance Core
                      </div>
                    </div>
                  )}
                </div>

                {/* Corner accent marks */}
                <div className="absolute top-4 right-4 w-2 h-2 border-t border-r border-gray-200 group-hover:border-primary/40 pointer-events-none" />
                <div className="absolute bottom-4 left-4 w-2 h-2 border-b border-l border-gray-200 group-hover:border-primary/40 pointer-events-none" />
              </Link>
            );
          })}

          {/* CTA BENTO CARD */}
          <Link
            href="/services"
            className="lg:col-span-1 lg:row-span-1 bg-[#1a1a1a] rounded-[2rem] p-7 flex flex-col justify-between group cursor-pointer relative overflow-hidden transition-all duration-300 shadow-xl hover:scale-[1.02] text-white"
          >
            <div className="absolute inset-0 noise-texture opacity-20 pointer-events-none" />
            <div className="relative z-10 flex justify-between items-center">
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#2081D3]">
                Full Directory
              </span>
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:bg-[#2081D3] transition-colors">
                <ArrowRight size={15} />
              </div>
            </div>
            <div className="relative z-10">
              <h4 className="text-xl font-black text-white group-hover:text-primary transition-colors font-sora">
                View All Services
              </h4>
              <p className="text-xs text-gray-400 mt-1">Explore our complete tech stack & capabilities.</p>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
