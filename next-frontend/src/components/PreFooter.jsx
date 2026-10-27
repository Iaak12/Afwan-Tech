'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, PhoneCall, CheckCircle2 } from 'lucide-react';
import { siteSettings } from '@/data/siteData';
import { trackContactTap } from '@/lib/tracking';

export default function PreFooter() {
  return (
    <section className="py-24 bg-gradient-to-br from-[#0f172a] via-[#162238] to-[#0f172a] text-white relative overflow-hidden font-inter">
      {/* Background ambient lighting */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute left-0 bottom-0 w-[400px] h-[400px] bg-sky-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-container mx-auto px-6 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/20 text-blue-300 text-xs font-black uppercase tracking-wider border border-primary/30">
            <Sparkles size={13} className="text-primary" /> Transform Your Digital Presence
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-[1.08] font-sora">
            Ready To Engineer Your Next Growth Engine?
          </h2>

          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Get an in-depth website speed audit, competitor gap analysis, and tailored programmatic growth blueprint with zero obligations.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="/contact-us"
              className="w-full sm:w-auto btn btn-primary !px-9 !py-4 text-xs uppercase tracking-wider font-extrabold flex items-center justify-center gap-2 shadow-2xl shadow-primary/40 rounded-2xl hover:scale-105 transition-all"
            >
              <span>Claim Free Consultation</span>
              <ArrowRight size={16} />
            </Link>

            <a 
              href={`tel:${siteSettings.contactPhone}`}
              onClick={() => trackContactTap('call', { location: 'PreFooter Call Direct' })}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl border border-white/20 hover:border-white text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10"
            >
              <PhoneCall size={15} className="text-primary" />
              <span>Call Direct: {siteSettings.contactPhone}</span>
            </a>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 font-medium">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" /> Guaranteed 15-Minute Response
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 size={13} className="text-emerald-400" /> Zero Obligation Roadmap
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
