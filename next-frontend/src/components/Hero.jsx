'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { 
  ArrowRight, Star, TrendingUp, Zap, Globe, Search, 
  Smartphone, Code, CircleCheckBig, Layers, ShieldCheck, MapPin
} from 'lucide-react';
import { siteSettings } from '@/data/siteData';
import { trackContactTap } from '@/lib/tracking';
import CompactHeroForm from '@/components/CompactHeroForm';

const floatingServices = [
  { icon: <Search size={14} />, label: 'SEO Services' },
  { icon: <Code size={14} />, label: 'Web Development' },
  { icon: <Smartphone size={14} />, label: 'App Development' },
  { icon: <Globe size={14} />, label: 'Social Media' },
  { icon: <TrendingUp size={14} />, label: 'PPC & Growth' },
];

export default function Hero() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const dx = useSpring(mouseX, springConfig);
  const dy = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <section className="relative min-h-screen flex items-center pt-28 pb-16 overflow-hidden bg-white">
      {/* ── PREMIUM BACKGROUND ELEMENTS ── */}
      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{ 
          backgroundImage: 'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)', 
          backgroundSize: '50px 50px' 
        }} 
      />
      
      {/* Ambient Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[50%] bg-[#00B4A6]/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-container mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 items-center">

          {/* ── LEFT HERO CONTENT (7 COLS) ── */}
          <div className="lg:col-span-7 space-y-6">
            {/* Top Rating Badge */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }} 
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-3 bg-[#1a1a1a] px-4 py-2 rounded-full shadow-md"
            >
              <span className="flex">
                {[1,2,3,4,5].map(s => (
                  <Star key={s} size={11} className="text-[#2081D3] fill-[#2081D3]" />
                ))}
              </span>
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/90">
                Full-Stack Web Engineering & SEO
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 28 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-black leading-[1.02] tracking-tightest text-[#1a1a1a] font-sora">
                <span className="block mb-1">Every Digital</span>
                <span className="text-gradient">Service Your<br />Business Needs.</span>
              </h1>
              <p className="text-base md:text-lg text-gray-600 max-w-xl font-medium leading-relaxed pt-1">
                From custom-coded Next.js websites and mobile applications to graphic design, search optimization, and social media — we are the single agency partner that scales your digital presence.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <a 
                href="#services-bento"
                className="btn btn-primary !px-8 !py-4 rounded-2xl shadow-glow text-sm font-bold text-white group flex items-center"
              >
                Explore All Services
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </a>
              <a 
                href={`tel:${siteSettings.contactPhone}`}
                onClick={() => trackContactTap('call', { location: 'Hero Section' })}
                className="btn btn-outline !px-7 !py-4 rounded-2xl text-sm font-bold group bg-white/60 flex items-center gap-2"
              >
                <span>Call {siteSettings.contactPhone}</span>
              </a>
            </motion.div>

            {/* Social proof strip */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100"
            >
              <div className="flex items-center gap-2 text-gray-700">
                <CircleCheckBig size={16} className="text-primary flex-shrink-0" />
                <span className="text-xs font-bold whitespace-nowrap">Direct In-House Developers</span>
              </div>
              <div className="h-6 w-px bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-2 text-gray-700">
                <CircleCheckBig size={16} className="text-emerald-500 flex-shrink-0" />
                <span className="text-xs font-bold whitespace-nowrap">No Lock-in Contracts</span>
              </div>
              <div className="h-6 w-px bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-2 text-gray-700">
                <MapPin size={16} className="text-primary flex-shrink-0" />
                <span className="text-xs font-bold whitespace-nowrap">Whitefield, Bengaluru</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT VISUAL: Small 2-Column Hero Contact Form (5 COLS) ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.25, duration: 0.8 }}
            className="lg:col-span-5 relative w-full"
          >
            {/* Floating micro badges */}
            <div className="absolute -top-3.5 -right-2 z-20 glass-pill px-3.5 py-1.5 rounded-xl hidden sm:flex items-center gap-1.5 border border-gray-200 shadow-md text-[11px] font-bold text-gray-800">
              <Zap size={13} className="text-primary" />
              <span>Sub-Second Speed</span>
            </div>

            <div className="absolute -bottom-3.5 -left-2 z-20 glass-pill px-3.5 py-1.5 rounded-xl hidden sm:flex items-center gap-1.5 border border-gray-200 shadow-md text-[11px] font-bold text-gray-800">
              <ShieldCheck size={13} className="text-emerald-500" />
              <span>100% Core Web Vitals</span>
            </div>

            <CompactHeroForm 
              defaultService="Website Development"
              title="Get Instant Strategy & Proposal"
              subtitle="Fill in 2 quick rows to get a dedicated technical roadmap & cost quote."
            />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
