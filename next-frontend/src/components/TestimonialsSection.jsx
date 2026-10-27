'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, Sparkles } from 'lucide-react';
import { testimonials } from '@/data/siteData';

export default function TestimonialsSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-white via-blue-50/20 to-white relative overflow-hidden font-inter">
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
            <Sparkles size={13} /> Verified Client Outcomes
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tight font-sora">
            Trusted By High-Growth Founders & Marketing Leaders
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed max-w-xl mx-auto">
            Discover how our web development and programmatic SEO architectures produce tangible organic inbound revenue.
          </p>
        </motion.div>

        {/* Testimonials 3-Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              className="bg-white rounded-3xl p-8 border border-gray-200/80 shadow-xs hover:shadow-2xl hover:border-primary/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between relative group"
            >
              {/* Decorative Quote Icon Watermark */}
              <div className="absolute top-6 right-6 text-gray-100 group-hover:text-blue-50 transition-colors pointer-events-none">
                <Quote size={48} className="rotate-180 opacity-60" />
              </div>

              <div className="relative z-10">
                {/* Star rating & verified badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} size={15} fill="currentColor" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                    <CheckCircle2 size={11} /> Verified Review
                  </span>
                </div>

                <p className="text-gray-700 text-sm sm:text-base leading-relaxed italic mb-8">
                  "{t.text}"
                </p>
              </div>

              {/* Author footer */}
              <div className="flex items-center gap-4 pt-6 border-t border-gray-100 relative z-10">
                <img 
                  src={t.image} 
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-primary/20 shadow-xs group-hover:border-primary transition-colors"
                />
                <div>
                  <h4 className="font-extrabold text-[#0f172a] text-sm font-sora">{t.name}</h4>
                  <p className="text-xs text-gray-500 font-medium">
                    {t.role}, <span className="text-primary font-bold">{t.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
