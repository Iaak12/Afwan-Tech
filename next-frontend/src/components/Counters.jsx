'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Users, Award, Star } from 'lucide-react';

const stats = [
  { v: '8+', l: 'Years Technical Experience', icon: <Award size={20} />, suffix: '' },
  { v: '100', l: 'Source Code Ownership', icon: <Users size={20} />, suffix: '%' },
  { v: '595', l: 'Target Cities Network', icon: <Star size={20} />, suffix: '+' },
  { v: '24/7', l: 'Engineering & SLA Support', icon: <TrendingUp size={20} />, suffix: '' },
];

export default function Counters() {
  return (
    <section className="bg-[#1a1a1a] relative overflow-hidden py-12">
      {/* Top primary border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#2081D3]" />
      {/* Bottom accent border */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#2081D3]/30" />
      {/* Subtle glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-[#2081D3]/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group flex flex-col items-center justify-center py-6 px-6 text-center hover:bg-white/5 transition-all duration-300 rounded-2xl"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#2081D3]/15 border border-[#2081D3]/30 flex items-center justify-center text-[#2081D3] mb-4 group-hover:bg-[#2081D3] group-hover:text-white transition-all duration-300">
                {item.icon}
              </div>
              {/* Number */}
              <div className="flex items-end gap-0.5 mb-1">
                <span className="text-4xl lg:text-5xl font-black text-[#2081D3] italic tracking-tighter leading-none font-sora">
                  {item.v}
                </span>
                <span className="text-2xl font-black text-[#2081D3] italic mb-1">{item.suffix}</span>
              </div>
              {/* Divider line */}
              <div className="w-8 h-0.5 bg-[#2081D3]/40 mx-auto my-2 group-hover:w-16 group-hover:bg-[#2081D3] transition-all duration-300" />
              {/* Label */}
              <p className="text-[11px] font-black text-white/60 uppercase tracking-[0.2em] group-hover:text-white transition-colors">
                {item.l}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
