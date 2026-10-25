import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';

export default function ProblemSolver() {
  const comparison = [
    {
      feature: 'Web Architecture',
      traditional: 'Bloated WordPress templates with 40+ plugins & 4-second load times',
      afwan: 'Ultra-lean Next.js / React with sub-second speeds & 100 Core Web Vitals score'
    },
    {
      feature: 'Local & City SEO Coverage',
      traditional: 'Generic single contact page; ranks only in one physical locality',
      afwan: 'Programmatic SEO network covering 500+ cities with unique metadata & schema'
    },
    {
      feature: 'Backend Infrastructure',
      traditional: 'Clunky monolithic CMS requiring constant server restarts and updates',
      afwan: 'Lightweight, decoupled PHP API handles leads & analytics without overhead'
    },
    {
      feature: 'Web Analytics & Privacy',
      traditional: 'Heavy third-party tracking scripts that slow down devices and violate GDPR',
      afwan: 'Built-in lightweight, privacy-compliant telemetry dashboard with real-time stats'
    },
    {
      feature: 'Client Accountability',
      traditional: 'Vague monthly PDF reports generated automatically by junior staff',
      afwan: 'Live transparent analytics dashboard + bi-weekly strategic executive sync'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary text-xs font-black uppercase tracking-widest block mb-3">
            Why Brands Choose Us
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tight">
            The Difference Between Stagnation & Exponential Dominance
          </h2>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[700px] border border-gray-100 rounded-3xl overflow-hidden shadow-lg shadow-gray-100">
            <div className="grid grid-cols-12 bg-gray-50/80 p-5 font-extrabold text-xs uppercase tracking-wider text-gray-500 border-b border-gray-100">
              <div className="col-span-4">Strategic Dimension</div>
              <div className="col-span-4 text-rose-600 flex items-center gap-1.5"><X size={15} /> Typical Legacy Agencies</div>
              <div className="col-span-4 text-emerald-600 flex items-center gap-1.5"><Check size={15} /> Afwan Tech Engine</div>
            </div>

            <div className="divide-y divide-gray-100 bg-white text-sm">
              {comparison.map((item, idx) => (
                <div key={idx} className="grid grid-cols-12 p-6 items-center hover:bg-blue-50/30 transition-colors">
                  <div className="col-span-4 font-extrabold text-[#0f172a] pr-4">{item.feature}</div>
                  <div className="col-span-4 text-xs text-gray-500 pr-6">{item.traditional}</div>
                  <div className="col-span-4 text-xs font-semibold text-gray-900 bg-emerald-50/60 p-3 rounded-xl border border-emerald-100 flex items-start gap-2">
                    <Check size={14} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                    <span>{item.afwan}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
