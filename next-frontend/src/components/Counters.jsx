'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Star, ShieldCheck, Zap } from 'lucide-react';

const stats = [
  { v: '8+', l: 'Years Technical Engineering', icon: Award, suffix: '', desc: 'Direct software architecture experience' },
  { v: '100', l: 'Source Code Ownership', icon: ShieldCheck, suffix: '%', desc: 'Full GitHub IP rights transferred to you' },
  { v: '595', l: 'Target Cities Network', icon: Zap, suffix: '+', desc: 'Programmatic SEO coverage across India & Global' },
  { v: '24/7', l: 'Engineering & SLA Support', icon: TrendingUp, suffix: '', desc: 'Dedicated senior architects in Bengaluru' },
];

export default function Counters() {
  return (
    <section className="bg-gradient-to-r from-[#0f172a] via-[#162238] to-[#0f172a] relative overflow-hidden py-14 text-white font-inter">
      {/* Top and bottom subtle glowing line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      
      {/* Subtle center glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[150px] bg-primary/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="group flex flex-col items-center sm:items-start text-center sm:text-left p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/5 hover:border-primary/40 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-blue-300 mb-4 group-hover:bg-primary group-hover:text-white transition-all shadow-sm">
                  <Icon size={18} />
                </div>

                <div className="flex items-baseline gap-1 mb-1 font-sora">
                  <span className="text-4xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-sky-300 tracking-tight leading-none">
                    {item.v}
                  </span>
                  <span className="text-2xl font-black text-primary font-sora">{item.suffix}</span>
                </div>

                <p className="text-xs font-black uppercase tracking-wider text-white mt-1">
                  {item.l}
                </p>
                <p className="text-[11px] text-gray-400 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
