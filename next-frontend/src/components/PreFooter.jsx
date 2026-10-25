import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, PhoneCall } from 'lucide-react';
import { siteSettings } from '@/data/siteData';

export default function PreFooter() {
  return (
    <section className="py-20 bg-gradient-to-tr from-[#0b1324] via-[#0f172a] to-[#1e293b] text-white relative overflow-hidden">
      <div className="absolute right-0 top-0 w-96 h-96 bg-primary/20 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-container mx-auto px-6 relative z-10 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-blue-300 text-xs font-bold uppercase tracking-wider">
            <Sparkles size={14} /> Ready To Outrank Competitors?
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-tight">
            Let's Engineer Your Next High-Converting Digital Engine
          </h2>
          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Get a comprehensive technical website and SEO audit with actionable growth recommendations. No obligations, 100% value.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/contact-us"
              className="w-full sm:w-auto btn-primary px-8 py-4 text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-xl shadow-primary/30"
            >
              Claim Your Free Consultation <ArrowRight size={16} />
            </Link>
            <a 
              href={`tel:${siteSettings.contactPhone}`}
              className="w-full sm:w-auto px-8 py-4 rounded-xl border border-white/20 hover:border-white text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 bg-white/5"
            >
              <PhoneCall size={16} /> Call Direct {siteSettings.contactPhone}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
