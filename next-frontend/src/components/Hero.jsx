'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Star, TrendingUp, Zap, Globe, Search, 
  Smartphone, Code, CircleCheckBig, Layers, ShieldCheck, 
  MapPin, Sparkles, Activity, CheckCircle, ArrowUpRight,
  Terminal, Cpu
} from 'lucide-react';
import { siteSettings } from '@/data/siteData';
import { trackContactTap } from '@/lib/tracking';

export default function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center pt-32 pb-20 overflow-hidden bg-gradient-to-b from-slate-50/60 via-white to-white font-inter">
      {/* ── AMBIENT BACKGROUND GLOWS & GRID ── */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{ 
          backgroundImage: 'radial-gradient(#2081D3 1px, transparent 1px), linear-gradient(to right, #1a1a1a 1px, transparent 1px)', 
          backgroundSize: '40px 40px, 40px 40px' 
        }} 
      />
      
      {/* Dynamic top radiant beam */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[450px] bg-gradient-to-b from-primary/15 via-sky-200/10 to-transparent rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 -right-20 w-[400px] h-[400px] bg-[#00B4A6]/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-container mx-auto px-6 relative z-10 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">

          {/* ── LEFT HERO EDITORIAL (7 COLS) ── */}
          <div className="lg:col-span-7 space-y-7">
            {/* Top Eyebrow Badge */}
            <motion.div 
              initial={{ opacity: 0, y: -16 }} 
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white border border-blue-100 shadow-sm shadow-blue-500/5 backdrop-blur-md"
            >
              <span className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={11} className="text-[#2081D3] fill-[#2081D3]" />
                ))}
              </span>
              <span className="text-gray-300">|</span>
              <span className="text-[11px] font-black uppercase tracking-wider text-[#0f172a] flex items-center gap-1.5 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Engineering & Search Marketing Agency
              </span>
            </motion.div>

            {/* Main Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 24 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.1, duration: 0.6 }} 
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-[68px] font-black leading-[1.04] tracking-tightest text-[#0f172a] font-sora">
                <span className="block text-gray-900 font-extrabold">Next-Gen Web Platforms</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#2F6097] to-sky-500">
                  Engineered For Compounding ROI.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl font-medium leading-relaxed pt-1">
                We combine custom-coded Next.js web applications, programmatic SEO architectures across <strong className="text-gray-900 font-bold">595+ commercial cities</strong>, and high-ROAS paid acquisition to systematically scale your client pipeline.
              </p>
            </motion.div>

            {/* High-Impact CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ delay: 0.2, duration: 0.5 }}
              className="flex flex-wrap items-center gap-4 pt-1"
            >
              <a 
                href="#services-bento"
                className="btn btn-primary !px-8 !py-4 rounded-2xl shadow-xl shadow-primary/25 text-sm font-extrabold text-white group flex items-center gap-2 hover:shadow-2xl hover:scale-[1.02] transition-all"
              >
                <span>Explore 8 Core Services</span>
                <ArrowRight size={16} className="group-hover:translate-x-1.5 transition-transform" />
              </a>

              <a 
                href="/contact-us"
                className="btn btn-outline !border-gray-300 hover:!border-primary !px-7 !py-4 rounded-2xl text-sm font-bold text-gray-900 bg-white/80 backdrop-blur-sm hover:bg-blue-50/50 flex items-center gap-2 transition-all shadow-xs"
              >
                <Sparkles size={16} className="text-primary" />
                <span>Request Free Strategy Audit</span>
              </a>
            </motion.div>

            {/* Trust Micro-Metrics Strip */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              transition={{ delay: 0.35, duration: 0.6 }}
              className="pt-6 border-t border-gray-100 flex flex-wrap items-center gap-6 sm:gap-8 text-xs font-bold text-gray-700"
            >
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <CircleCheckBig size={14} />
                </div>
                <span>Sub-Second Next.js Speed</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-blue-50 text-primary flex items-center justify-center">
                  <Globe size={14} />
                </div>
                <span>595+ Cities SEO Mesh</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <ShieldCheck size={14} />
                </div>
                <span>100% Direct Code Ownership</span>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT VISUAL: LIVE ENGINEERING TELEMETRY DASHBOARD (5 COLS) ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.94, y: 20 }} 
            animate={{ opacity: 1, scale: 1, y: 0 }} 
            transition={{ delay: 0.25, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative w-full"
          >
            {/* Ambient Background Glow Behind Dashboard */}
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 via-sky-400/10 to-transparent rounded-[2.5rem] blur-2xl pointer-events-none" />

            {/* Floating Badge 1 - Top Left */}
            <motion.div 
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -left-4 z-20 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-lg text-[11px] font-black text-gray-800 flex items-center gap-2 hidden sm:flex"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Core Web Vitals: 100/100</span>
            </motion.div>

            {/* Floating Badge 2 - Bottom Right */}
            <motion.div 
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-4 -right-3 z-20 px-3.5 py-1.5 rounded-xl bg-white/95 backdrop-blur-md border border-gray-200/80 shadow-lg text-[11px] font-black text-gray-800 flex items-center gap-2 hidden sm:flex"
            >
              <TrendingUp size={13} className="text-primary" />
              <span>Organic Traffic: +340%</span>
            </motion.div>

            {/* Main Interactive Glass Console Card */}
            <div className="relative rounded-[2.2rem] bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white p-7 sm:p-8 border border-white/10 shadow-2xl overflow-hidden">
              {/* Header Window Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-gray-400 font-bold">
                    afwan-telemetry // v2.6
                  </span>
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
                  Live Engine
                </span>
              </div>

              {/* Body Telemetry Metrics */}
              <div className="space-y-5 pt-6">
                {/* Metric Row 1: Core Speed Benchmark */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-300 font-semibold flex items-center gap-2">
                      <Zap size={14} className="text-amber-400" /> PageSpeed & First Contentful Paint
                    </span>
                    <span className="text-xs font-mono font-black text-emerald-400">0.52s</span>
                  </div>
                  <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: "98%" }}
                      transition={{ duration: 1.2, delay: 0.3 }}
                      className="h-full bg-gradient-to-r from-emerald-400 to-primary rounded-full"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-gray-400 mt-1.5 font-mono">
                    <span>Target: &lt; 1.0s</span>
                    <span className="text-emerald-300 font-bold">Grade A+ (Optimal)</span>
                  </div>
                </div>

                {/* Metric Row 2: Programmatic SEO Mesh */}
                <div className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-primary/40 transition-colors">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs text-gray-300 font-semibold flex items-center gap-2">
                      <MapPin size={14} className="text-primary" /> Multi-City Automated SEO Mesh
                    </span>
                    <span className="text-xs font-mono font-black text-primary">595 Cities</span>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">
                    Automated entity schemas, dynamic keyword nodes, and localized conversion funnels active across India & global hubs.
                  </p>
                </div>

                {/* Metric Row 3: Modern Tech Stack Grid */}
                <div className="grid grid-cols-3 gap-2.5 pt-1">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase font-mono">Frontend</span>
                    <span className="block text-xs font-black text-white mt-0.5">Next.js 15</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase font-mono">Backend</span>
                    <span className="block text-xs font-black text-white mt-0.5">Lightweight API</span>
                  </div>
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="block text-[10px] font-bold text-gray-400 uppercase font-mono">Analytics</span>
                    <span className="block text-xs font-black text-emerald-400 mt-0.5">Real-Time GA4</span>
                  </div>
                </div>

                {/* Card CTA Link */}
                <div className="pt-2">
                  <Link
                    href="/contact-us"
                    className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-[#2F6097] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg shadow-primary/25"
                  >
                    <span>Get Instant Proposal & Audit</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
