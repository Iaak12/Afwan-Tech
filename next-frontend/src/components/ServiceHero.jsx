'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, ChevronRight, Star, CircleCheckBig } from 'lucide-react';

export default function ServiceHero({
  badge,
  badgeIcon,
  heading,
  headingHighlight,
  description,
  primaryCta = { label: 'Get Started', href: '/contact-us' },
  secondaryCta = { label: 'View Portfolio', href: '/portfolio' },
  highlights = [],
  visual,
}) {
  return (
    <section className="relative bg-white pt-24 pb-12 overflow-hidden border-b border-gray-100">
      {/* Top accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#2081D3]" />

      {/* Diagonal split background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute right-0 top-0 w-[55%] h-full bg-[#1a1a1a] clip-hero-right" />
        <div className="absolute right-[45%] top-0 w-64 h-full bg-[#2081D3]/15 blur-3xl" />
      </div>

      <div className="max-w-container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center min-h-[75vh]">

          {/* LEFT: Text content */}
          <div className="py-12 lg:py-16 pr-0 lg:pr-12 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2081D3]/15 border border-[#2081D3]/30 text-[#1a1a1a] text-[10px] font-black uppercase tracking-[0.2em]"
            >
              {badgeIcon}
              <span>{badge}</span>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 25 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }}
              className="space-y-3"
            >
              <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-[#1a1a1a] leading-tight tracking-tightest font-sora">
                {heading} <span className="text-gradient">{headingHighlight}</span>
              </h1>
              <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed max-w-lg">
                {description}
              </p>
            </motion.div>

            {/* Checkmark Highlights */}
            {highlights.length > 0 && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.2 }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2"
              >
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs font-bold text-gray-700">
                    <CircleCheckBig size={15} className="text-emerald-500 flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link 
                href={primaryCta.href || '/contact-us'}
                className="btn btn-primary !px-8 !py-4 rounded-xl shadow-glow text-xs uppercase tracking-wider font-extrabold text-white flex items-center gap-2"
              >
                <span>{primaryCta.label}</span>
                <ArrowRight size={16} />
              </Link>
              <Link 
                href={secondaryCta.href || '/portfolio'}
                className="btn btn-outline !px-8 !py-4 rounded-xl text-xs uppercase tracking-wider font-extrabold flex items-center gap-2"
              >
                <span>{secondaryCta.label}</span>
                <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>

          {/* RIGHT: Visual Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.25, duration: 0.7 }}
            className="py-12 pl-0 lg:pl-10"
          >
            {visual}
          </motion.div>

        </div>
      </div>
    </section>
  );
}
