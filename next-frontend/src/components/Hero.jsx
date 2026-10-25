'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { 
  ArrowRight, Star, TrendingUp, Zap, Globe, Search, 
  Smartphone, Code, CircleCheckBig, Layers, ShieldCheck, MapPin
} from 'lucide-react';
import { siteSettings } from '@/data/siteData';

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
    <section className="relative min-h-[90vh] flex items-center pt-24 pb-16 overflow-hidden bg-white">
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
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* ── LEFT HERO CONTENT ── */}
          <div className="space-y-6">
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
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-white/80">
                Trusted by 16,000+ Clients
              </span>
            </motion.div>

            {/* Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 28 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1 }} 
              className="space-y-4"
            >
              <h1 className="text-5xl md:text-6xl xl:text-7xl font-black leading-[0.98] tracking-tightest text-[#1a1a1a]">
                <span className="block mb-1">Every Digital</span>
                <span className="text-gradient">Service Your<br />Business Needs.</span>
              </h1>
              <p className="text-base md:text-lg text-gray-500 max-w-lg font-medium leading-relaxed pt-1">
                From custom-coded Next.js websites and mobile applications to graphic design, programmatic SEO, and social media — we are the single agency partner that scales your entire digital presence.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Link 
                href="/contact-us"
                className="btn btn-primary !px-8 !py-4 rounded-2xl shadow-glow text-sm font-bold text-white group flex items-center"
              >
                Get a Free Strategy Call
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                href="/services"
                className="btn btn-outline !px-8 !py-4 rounded-2xl text-sm font-bold group backdrop-blur-md bg-white/10 flex items-center"
              >
                Explore All Services
                <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Social proof strip */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.3 }}
              className="flex flex-wrap items-center gap-6 pt-4 border-t border-gray-100"
            >
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2.5">
                  {[11,12,13,14,15].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white overflow-hidden bg-gray-100">
                      <img src={`https://i.pravatar.cc/80?img=${i}`} alt="client" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-[#1a1a1a] font-black text-xs">16,000+ Clients</div>
                  <div className="flex items-center gap-1">
                    {[1,2,3,4,5].map(s => <Star key={s} size={9} className="text-[#2081D3] fill-[#2081D3]" />)}
                    <span className="text-[#555555] text-[9px] font-bold ml-1">4.9/5 Rating</span>
                  </div>
                </div>
              </div>
              <div className="h-8 w-px bg-gray-200 hidden sm:block" />
              <div className="flex items-center gap-2 text-gray-500">
                <CircleCheckBig size={15} className="text-emerald-500 flex-shrink-0" />
                <span className="text-xs font-bold whitespace-nowrap">No Lock-in Contracts</span>
              </div>
              <div className="flex items-center gap-2 text-gray-500">
                <MapPin size={15} className="text-primary flex-shrink-0" />
                <span className="text-xs font-bold whitespace-nowrap">500+ Cities Network</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT VISUAL: Live Dashboard Glass Card ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ delay: 0.25, duration: 0.8 }}
            className="relative hidden lg:block"
          >
            {/* Central card */}
            <div className="relative z-10 glass-card !rounded-[2.5rem] !p-8 !border-gray-200 shadow-2xl bg-white/90">
              {/* Live indicator */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
                  <span className="text-gray-500 text-[10px] font-black uppercase tracking-widest">
                    Live Performance Telemetry
                  </span>
                </div>
                <span className="text-primary text-xs font-bold font-mono">afwan.agency</span>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-3 mb-5">
                {[
                  { v: '16,000+', l: 'Global Clients', up: '+18%' },
                  { v: '98.4%', l: 'Success Rate', up: '+2.1%' },
                  { v: '$50M+', l: 'Revenue Added', up: '+34%' },
                  { v: '285%', l: 'Organic Traffic Lift', up: '+62%' },
                ].map((m, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    transition={{ delay: 0.4 + i * 0.1 }}
                    className="bg-gray-50 rounded-2xl p-4 border border-gray-100 hover:border-primary/40 transition-colors"
                  >
                    <div className="text-2xl font-black text-[#1a1a1a] italic leading-none font-sora">{m.v}</div>
                    <div className="text-[9px] font-black text-gray-400 uppercase tracking-widest mt-1.5">{m.l}</div>
                    <div className="text-emerald-600 text-[9px] font-black mt-1 flex items-center gap-0.5">
                      <TrendingUp size={10} /> {m.up} verified
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Mini bar chart */}
              <div className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Compounding Traffic & Ranking Growth</span>
                  <span className="text-[10px] font-bold text-primary">Live Next.js Telemetry</span>
                </div>
                <div className="flex items-end gap-1.5 h-14">
                  {[35, 48, 42, 65, 58, 76, 70, 88, 82, 95, 92, 100].map((h, i) => (
                    <motion.div 
                      key={i} 
                      initial={{ height: 0 }} 
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.6 + i * 0.04, duration: 0.4 }}
                      className={`flex-1 rounded-sm ${i === 11 ? 'bg-primary shadow-sm shadow-primary/50' : i >= 8 ? 'bg-[#1a1a1a]/50' : 'bg-[#1a1a1a]/15'}`} 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Floating service pills around dashboard */}
            <div className="absolute -top-4 -right-4 z-20 glass-pill px-4 py-2 rounded-2xl flex items-center gap-2 border border-gray-200 shadow-lg text-xs font-bold text-gray-800 animate-bounce">
              <Zap size={14} className="text-primary" />
              <span>Sub-Second Page Load</span>
            </div>

            <div className="absolute -bottom-4 -left-4 z-20 glass-pill px-4 py-2 rounded-2xl flex items-center gap-2 border border-gray-200 shadow-lg text-xs font-bold text-gray-800">
              <ShieldCheck size={14} className="text-emerald-500" />
              <span>100% Core Web Vitals Pass</span>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
