'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CircleCheckBig, ArrowRight, Sparkles } from 'lucide-react';

export default function AboutROI() {
  const content = {
    title: "Performance Web Engineering & Growth Marketing",
    description: "We don't just provide generic services; we craft conversion-engineered digital platforms. Our deep-tech integration of AI, modern Next.js architecture, and programmatic SEO ensures every dollar delivers peak compounding ROI.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=900",
    data: [
      { t: "Predictive Search Analytics", p: "We model search intent across 500+ Indian & Global cities to capture untapped high-intent buyers." },
      { t: "Omnichannel Pipeline Sync", p: "Seamlessly connecting high-speed Next.js websites, SEO rankings, and paid ads for unified revenue dominance." },
      { t: "Conversion Rate Engineering", p: "Scientific UX/UI design moving visitors from casual discovery into qualified inquiries and booked clients." }
    ]
  };

  return (
    <section className="section-padding bg-white overflow-hidden relative">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-container mx-auto px-6 grid lg:grid-cols-2 gap-16 lg:gap-20 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative group"
        >
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-[100px] scale-75 group-hover:scale-100 transition-transform duration-700 pointer-events-none" />
          <div className="relative z-10 p-4 bg-white/80 backdrop-blur-sm rounded-3xl border border-gray-100 shadow-xl overflow-hidden">
            <img 
              src={content.image} 
              alt="ROI Strategy" 
              className="w-full max-w-lg mx-auto rounded-2xl transform group-hover:scale-105 transition-transform duration-700 drop-shadow-[0_20px_50px_rgba(32,129,211,0.15)]"
            />
          </div>
          
          {/* Decorative tag */}
          <div className="absolute bottom-8 right-8 z-20 glass-card !p-4 border-primary/20 shadow-xl bg-white/95">
            <p className="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles size={14} /> ROAS Focused Architecture
            </p>
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-black uppercase tracking-wider">
              Measurable Performance
            </div>
            <h2 className="text-3xl lg:text-5xl font-black leading-[1.1] tracking-tight text-[#1a1a1a] font-sora">
              {content.title}
            </h2>
            <p className="text-gray-600 text-base lg:text-lg font-medium leading-relaxed">
              {content.description}
            </p>
          </div>

          <div className="grid gap-6">
            {content.data.map((item, i) => (
              <div key={i} className="flex gap-4 items-start group">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary shadow-sm">
                  <CircleCheckBig size={22} />
                </div>
                <div>
                  <h4 className="text-xl font-black text-[#1a1a1a] group-hover:text-primary transition-colors">{item.t}</h4>
                  <p className="text-gray-500 text-sm font-medium mt-1 leading-relaxed">{item.p}</p>
                </div>
              </div>
            ))}
          </div>

          <Link href="/contact-us" className="btn btn-primary !px-10 !py-4 text-sm font-bold text-white group inline-flex items-center gap-2 shadow-lg shadow-primary/25">
            <span>Our Strategy Blueprint</span>
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
