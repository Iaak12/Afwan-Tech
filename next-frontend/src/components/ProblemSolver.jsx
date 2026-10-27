'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export default function ProblemSolver() {
  const comparison = [
    {
      feature: 'Web Architecture & Speed',
      traditional: 'Bloated WordPress templates with 40+ plugins & 4+ second load times',
      afwan: 'Ultra-lean Next.js 15 & React with sub-second speeds & 100 Core Web Vitals score',
      highlight: 'Sub-second speed'
    },
    {
      feature: 'Local & City SEO Coverage',
      traditional: 'Generic single contact page; ranks only in one physical locality',
      afwan: 'Programmatic SEO network covering 595+ cities with unique localized metadata & schema',
      highlight: '595+ Cities mesh'
    },
    {
      feature: 'Backend Infrastructure',
      traditional: 'Clunky monolithic CMS requiring frequent server restarts and fragile updates',
      afwan: 'Lightweight, decoupled REST API handles leads & telemetry with 99.9% uptime',
      highlight: 'Zero bloat'
    },
    {
      feature: 'Web Analytics & Privacy',
      traditional: 'Heavy third-party tracking scripts that slow down devices and compromise privacy',
      afwan: 'Built-in privacy-compliant telemetry dashboard + GA4 with real-time attribution',
      highlight: 'Server-side CAPI'
    },
    {
      feature: 'Client Accountability',
      traditional: 'Vague monthly PDF reports generated automatically by junior account managers',
      afwan: 'Live transparent analytics dashboard + bi-weekly strategic executive sync with CEO',
      highlight: 'Direct Founder sync'
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-white via-slate-50/40 to-white relative overflow-hidden font-inter">
      {/* Background soft ambient */}
      <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-3xl mx-auto mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-primary border border-blue-100 text-xs font-black uppercase tracking-wider">
            <Sparkles size={13} /> Competitive Advantage
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tight font-sora">
            The Difference Between Stagnation & Exponential Dominance
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-2xl mx-auto">
            See how our modern full-stack web engineering and programmatic SEO stack outperforms conventional agency models.
          </p>
        </motion.div>

        {/* Comparison Cards Stack */}
        <div className="space-y-4 max-w-5xl mx-auto">
          {comparison.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.07 }}
              className="group bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 hover:border-primary/50 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 p-5 sm:p-7 relative overflow-hidden"
            >
              {/* Feature Title Row */}
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold text-xs font-mono">
                    {(idx + 1).toString().padStart(2, '0')}
                  </div>
                  <h3 className="font-extrabold text-base sm:text-lg text-[#0f172a] font-sora">
                    {item.feature}
                  </h3>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <Zap size={11} className="text-emerald-500 fill-emerald-500" />
                  {item.highlight}
                </span>
              </div>

              {/* Side-by-Side Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Traditional Agency side */}
                <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100/70 flex items-start gap-3">
                  <div className="w-6 h-6 rounded-lg bg-rose-100 text-rose-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <X size={14} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-rose-600 mb-0.5">
                      Typical Legacy Agency
                    </span>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {item.traditional}
                    </p>
                  </div>
                </div>

                {/* Afwan Tech side */}
                <div className="p-4 rounded-2xl bg-blue-50/50 border border-primary/20 flex items-start gap-3 group-hover:bg-blue-50/80 group-hover:border-primary/40 transition-colors shadow-2xs">
                  <div className="w-6 h-6 rounded-lg bg-primary text-white flex items-center justify-center flex-shrink-0 mt-0.5 shadow-xs">
                    <Check size={14} />
                  </div>
                  <div>
                    <span className="block text-[10px] font-black uppercase tracking-wider text-primary mb-0.5">
                      Afwan Tech Engine
                    </span>
                    <p className="text-xs sm:text-sm font-semibold text-gray-900 leading-relaxed">
                      {item.afwan}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
