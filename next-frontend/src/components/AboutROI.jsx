'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  CircleCheckBig, ArrowRight, Sparkles, TrendingUp, 
  Zap, Search, ShieldCheck, CheckCircle2, BarChart2, Layers
} from 'lucide-react';

export default function AboutROI() {
  const data = [
    { 
      t: "Programmatic Search Architecture", 
      p: "We model commercial search intent across 595+ Indian and global cities to capture high-intent buyers who are ready to purchase.",
      icon: Search,
      badge: "595+ Cities"
    },
    { 
      t: "Sub-Second Next.js Performance", 
      p: "High-speed server components, edge caching, and micro-optimizations maximize Google Core Web Vitals and lower bounce rates.",
      icon: Zap,
      badge: "100 PageSpeed"
    },
    { 
      t: "Conversion Rate Engineering", 
      p: "Every interaction is engineered with scientific UI/UX principles that move visitors smoothly from discovery into qualified sales meetings.",
      icon: TrendingUp,
      badge: "High ROAS"
    }
  ];

  return (
    <section className="py-24 bg-white overflow-hidden relative font-inter">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[140px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="max-w-container mx-auto px-6 grid lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
        
        {/* ── LEFT VISUAL: ENGINEERED ROI ARCHITECTURE CARD (6 COLS) ── */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 relative"
        >
          {/* Ambient Glow */}
          <div className="absolute inset-0 bg-primary/10 rounded-3xl blur-[60px] pointer-events-none" />

          {/* Main Visual Frame */}
          <div className="relative z-10 rounded-3xl bg-gradient-to-b from-[#0f172a] via-[#1a2942] to-[#0f172a] p-7 sm:p-9 text-white border border-white/10 shadow-2xl space-y-6">
            
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-mono font-bold text-gray-300">
                  Performance ROI Engine
                </span>
              </div>
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/20 text-blue-300 border border-primary/30">
                Compounding Growth
              </span>
            </div>

            {/* Simulated Live Funnel Pipeline Card */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/5 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-gray-300">Organic Inbound Conversion Velocity</span>
                <span className="text-xs font-mono font-bold text-emerald-400">+312% YoY</span>
              </div>
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>Programmatic Search Indexing</span>
                    <span className="text-white font-mono">595 / 595 Cities</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-full rounded-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-[11px] text-gray-400 mb-1">
                    <span>Mobile PageSpeed Benchmark</span>
                    <span className="text-white font-mono">0.58s (Instant)</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-400 w-[96%] rounded-full" />
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Metric Pills */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <span className="text-[10px] font-mono text-gray-400 block uppercase">ROAS</span>
                <span className="text-lg font-black text-emerald-400 font-sora mt-0.5 block">4.8x</span>
                <span className="text-[9px] text-gray-500">Verified Target</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <span className="text-[10px] font-mono text-gray-400 block uppercase">Uptime</span>
                <span className="text-lg font-black text-white font-sora mt-0.5 block">99.9%</span>
                <span className="text-[9px] text-gray-500">Edge Hosted</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                <span className="text-[10px] font-mono text-gray-400 block uppercase">IP Rights</span>
                <span className="text-lg font-black text-blue-300 font-sora mt-0.5 block">100%</span>
                <span className="text-[9px] text-gray-500">Your Code</span>
              </div>
            </div>

            {/* Bottom Guarantee Banner */}
            <div className="p-3.5 rounded-xl bg-blue-500/10 border border-blue-400/20 flex items-center justify-between text-xs text-blue-200 font-semibold">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} className="text-primary" /> Transparent Telemetry
              </span>
              <span>Zero Vendor Lock-in</span>
            </div>
          </div>
        </motion.div>
        
        {/* ── RIGHT EDITORIAL CONTENT (6 COLS) ── */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 space-y-8"
        >
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-primary text-xs font-black uppercase tracking-wider border border-blue-100">
              <Sparkles size={13} /> Performance Web Engineering
            </div>
            <h2 className="text-3xl sm:text-5xl font-black leading-[1.08] tracking-tight text-[#0f172a] font-sora">
              Engineered For Speed, Rankings & Inbound Pipeline
            </h2>
            <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed">
              We don't assemble generic templates. We craft custom-coded digital platforms that combine Next.js architecture, AI workflows, and multi-city programmatic SEO so every marketing rupee yields compounding organic authority.
            </p>
          </div>

          {/* 3 Strategic Feature Items */}
          <div className="space-y-4">
            {data.map((item, i) => {
              const Icon = item.icon;
              return (
                <div 
                  key={i} 
                  className="flex gap-4 items-start p-4 rounded-2xl bg-slate-50/70 hover:bg-blue-50/50 border border-gray-100 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-11 h-11 rounded-xl bg-white border border-gray-200/80 flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-white transition-all text-primary shadow-xs">
                    <Icon size={20} />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="text-base font-black text-[#0f172a] group-hover:text-primary transition-colors font-sora">
                        {item.t}
                      </h4>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white text-gray-600 border border-gray-200">
                        {item.badge}
                      </span>
                    </div>
                    <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                      {item.p}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <Link 
            href="/contact-us" 
            className="btn btn-primary !px-9 !py-4 text-xs uppercase tracking-wider font-extrabold text-white group inline-flex items-center gap-2 shadow-xl shadow-primary/25 rounded-2xl hover:scale-105 transition-all"
          >
            <span>Request Strategy Blueprint</span>
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
