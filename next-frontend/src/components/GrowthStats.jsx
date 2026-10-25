import React from 'react';
import { Award, Users, TrendingUp, Globe, CheckCircle2 } from 'lucide-react';

export default function GrowthStats() {
  const stats = [
    { value: '595+', label: 'Cities & Regions Covered', desc: 'Programmatic SEO network spanning India and Global tech hubs' },
    { value: '350+', label: 'Digital Products Deployed', desc: 'High-conversion Next.js applications and customized online stores' },
    { value: '4.9/5', label: 'Average Client Rating', desc: 'Across verified Clutch, Google, and direct client evaluations' },
    { value: '320%', label: 'Average Client Organic Growth', desc: 'Sustained compounding search visibility within first 120 days' }
  ];

  return (
    <section className="py-16 bg-[#0f172a] text-white">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((stat, idx) => (
            <div key={idx} className={`pt-6 sm:pt-0 ${idx > 0 ? 'sm:pl-8' : ''}`}>
              <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#2081D3] mb-2 font-sora">
                {stat.value}
              </div>
              <div className="text-base font-extrabold text-white mb-1.5">{stat.label}</div>
              <div className="text-xs text-gray-400 leading-relaxed">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
