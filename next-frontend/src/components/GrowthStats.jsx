'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShieldCheck, Zap, Users, Sparkles, ArrowUpRight } from 'lucide-react';

export default function GrowthStats() {
  const stats = [
    { 
      value: '595+', 
      label: 'Cities Network Coverage', 
      desc: 'Programmatic SEO architecture spanning tier-1, tier-2 and global business hubs with unique localized schemas.',
      icon: Globe,
      badge: 'Multi-City SEO'
    },
    { 
      value: '100%', 
      label: 'Direct Code Ownership', 
      desc: 'Zero vendor lock-in. Full intellectual property, GitHub repository, and deployment infrastructure transferred to you.',
      icon: ShieldCheck,
      badge: 'Full IP Rights'
    },
    { 
      value: 'Sub-Sec', 
      label: 'Speed & Core Web Vitals', 
      desc: 'Optimized server-side rendering, image compression, and edge caching deliver instantaneous page interaction.',
      icon: Zap,
      badge: '98+ PageSpeed'
    },
    { 
      value: 'Direct', 
      label: 'In-House Tech Team', 
      desc: 'No junior outsourcing. Work directly with senior software architects and search directors in Bengaluru.',
      icon: Users,
      badge: 'Senior Engineers'
    }
  ];

  return (
    <section className="py-20 bg-[#0f172a] text-white relative overflow-hidden">
      {/* Background radial highlights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00B4A6]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-container mx-auto px-6 relative z-10">
        {/* Top Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-blue-300 text-xs font-black uppercase tracking-wider border border-white/10">
            <Sparkles size={13} className="text-primary" /> Engineering Standards
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-sora text-white">
            Built For Uncompromising Performance
          </h2>
          <p className="text-xs sm:text-sm text-gray-400">
            Every web application and search engine deployment is held to quantitative performance metrics.
          </p>
        </div>

        {/* 4 Cards Grid with Animations */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative p-7 rounded-3xl bg-white/[0.04] backdrop-blur-md border border-white/10 hover:border-primary/50 hover:bg-white/[0.07] transition-all duration-300 flex flex-col justify-between hover:-translate-y-1.5 shadow-xl"
              >
                {/* Top Icon & Badge Row */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-11 h-11 rounded-xl bg-primary/20 text-blue-300 border border-primary/30 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                    <Icon size={20} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-gray-300 group-hover:text-white group-hover:bg-primary/20 border border-white/10 transition-colors">
                    {stat.badge}
                  </span>
                </div>

                {/* Big Metric Number */}
                <div className="space-y-2">
                  <div className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-primary font-sora tracking-tight">
                    {stat.value}
                  </div>
                  <div className="text-base font-extrabold text-white">
                    {stat.label}
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed pt-1">
                    {stat.desc}
                  </p>
                </div>

                {/* Bottom subtle bar indicator */}
                <div className="pt-6 mt-4 border-t border-white/5 flex items-center justify-between text-[11px] font-bold text-gray-500 group-hover:text-blue-300 transition-colors">
                  <span>Verified Standard</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
