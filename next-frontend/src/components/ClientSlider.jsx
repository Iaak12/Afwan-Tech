'use client';

import React from 'react';
import { 
  Code, Cpu, Layers, Sparkles, Terminal, Database, 
  Cloud, ShoppingCart, Globe, TrendingUp 
} from 'lucide-react';

const technologies = [
  { name: 'Next.js 15', tag: 'Core Framework' },
  { name: 'React 19', tag: 'UI Library' },
  { name: 'TypeScript', tag: 'Type Safety' },
  { name: 'Tailwind CSS', tag: 'Styling' },
  { name: 'Node.js', tag: 'Runtime' },
  { name: 'Python & Django', tag: 'Backend' },
  { name: 'Shopify Plus', tag: 'Ecommerce' },
  { name: 'AWS Cloud', tag: 'Cloud Edge' },
  { name: 'PostgreSQL', tag: 'Database' },
  { name: 'Google Ads', tag: 'Search Ads' },
  { name: 'Meta CAPI', tag: 'Server Tracking' },
  { name: 'Programmatic SEO', tag: '595+ Cities' }
];

export default function ClientSlider() {
  return (
    <section className="py-10 bg-white border-y border-gray-100 overflow-hidden relative font-inter">
      {/* Left/Right subtle fade masks for smooth infinite marquee */}
      <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      <div className="max-w-container mx-auto px-6 mb-5 text-center">
        <p className="text-[11px] font-black uppercase tracking-[0.25em] text-gray-400 font-mono">
          Technologies & Core Platforms We Master
        </p>
      </div>

      <div className="flex overflow-hidden select-none gap-6 group py-2">
        <div className="flex min-w-full shrink-0 items-center justify-around gap-6 animate-marquee">
          {technologies.map((tech, i) => (
            <div 
              key={i} 
              className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-gray-50/80 hover:bg-blue-50/70 border border-gray-200/60 hover:border-primary/40 transition-all cursor-default shadow-2xs group-hover:scale-105"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs sm:text-sm font-extrabold text-[#0f172a] font-sora whitespace-nowrap">
                {tech.name}
              </span>
              <span className="text-[10px] text-gray-400 font-mono font-semibold uppercase">
                {tech.tag}
              </span>
            </div>
          ))}
        </div>

        <div className="flex min-w-full shrink-0 items-center justify-around gap-6 animate-marquee">
          {technologies.map((tech, i) => (
            <div 
              key={`dup-${i}`} 
              className="flex items-center gap-2.5 px-4 py-2 rounded-2xl bg-gray-50/80 hover:bg-blue-50/70 border border-gray-200/60 hover:border-primary/40 transition-all cursor-default shadow-2xs group-hover:scale-105"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              <span className="text-xs sm:text-sm font-extrabold text-[#0f172a] font-sora whitespace-nowrap">
                {tech.name}
              </span>
              <span className="text-[10px] text-gray-400 font-mono font-semibold uppercase">
                {tech.tag}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }
        .animate-marquee {
          animation: marquee 32s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
