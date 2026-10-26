'use client';

import React from 'react';

const technologies = [
  'Next.js', 'React', 'Node.js', 'Python', 'Shopify', 
  'WordPress', 'PostgreSQL', 'Tailwind CSS', 'Google Ads', 'Meta Business', 'AWS Cloud'
];

export default function ClientSlider() {
  return (
    <section className="py-12 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-container mx-auto px-6 mb-6 text-center">
        <p className="text-xs font-black uppercase tracking-[0.25em] text-gray-400">
          Technologies & Core Platforms We Master
        </p>
      </div>

      <div className="flex overflow-hidden select-none gap-10 group">
        <div className="flex min-w-full shrink-0 items-center justify-around gap-10 animate-marquee">
          {technologies.map((b, i) => (
            <div key={i} className="text-xl md:text-2xl font-black text-gray-300 hover:text-primary transition-colors cursor-pointer tracking-wider font-sora">
              {b}
            </div>
          ))}
        </div>
        <div className="flex min-w-full shrink-0 items-center justify-around gap-10 animate-marquee">
          {technologies.map((b, i) => (
            <div key={`dup-${i}`} className="text-xl md:text-2xl font-black text-gray-300 hover:text-primary transition-colors cursor-pointer tracking-wider font-sora">
              {b}
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
          animation: marquee 25s linear infinite;
        }
        .group:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
