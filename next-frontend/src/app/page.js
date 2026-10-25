import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import GrowthStats from '@/components/GrowthStats';
import AboutROI from '@/components/AboutROI';
import Counters from '@/components/Counters';
import ClientSlider from '@/components/ClientSlider';
import MarketingSolutions from '@/components/MarketingSolutions';
import ProblemSolver from '@/components/ProblemSolver';
import TestimonialsSection from '@/components/TestimonialsSection';
import FAQSection from '@/components/FAQSection';
import PreFooter from '@/components/PreFooter';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { ArrowRight, MapPin, Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'AFWAN TECH | Digital Marketing & Web Engineering Agency',
  description: 'Scale your business with Next.js web development, programmatic local SEO across 500+ cities, and high-performance lead generation systems.',
};

export default function Home() {
  return (
    <div className="bg-white min-h-screen font-inter overflow-hidden">
      <Header />

      <main>
        {/* 1. Hero with dynamic mouse glow and live telemetry */}
        <Hero />

        {/* 2. Client Trust Marquee */}
        <ClientSlider />

        {/* 3. Performance Counters Strip */}
        <Counters />

        {/* 4. About ROI Performance Engine */}
        <div id="roi-section">
          <AboutROI />
        </div>

        {/* 5. Core Bento Grid Marketing Solutions */}
        <MarketingSolutions />

        {/* 6. Growth Stats Counter Cards */}
        <GrowthStats />

        {/* 7. Problem vs Solution Comparison Matrix */}
        <ProblemSolver />

        {/* 8. 500+ Programmatic Locations Network Banner */}
        <section className="py-20 bg-gradient-to-b from-blue-50/40 via-white to-white">
          <div className="max-w-container mx-auto px-6">
            <div className="bg-gradient-to-r from-[#0f172a] via-[#1a1a1a] to-[#0f172a] rounded-3xl p-8 md:p-14 text-white flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl relative overflow-hidden border border-white/10">
              <div className="space-y-4 max-w-xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/20 text-blue-300 text-xs font-black uppercase tracking-wider">
                  <MapPin size={14} className="text-primary" /> Programmatic SEO Engine
                </div>
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-sora text-white">
                  Rank On Page 1 In <span className="text-primary">500+ Cities</span> Across India & Worldwide
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Our automated multi-location SEO engine generates dedicated, authoritative landing pages with city-specific schema, keyword clusters, and localized value propositions.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10">
                <Link 
                  href="/market-area" 
                  className="btn btn-primary !px-8 !py-4 text-xs uppercase tracking-wider font-extrabold text-center text-white"
                >
                  Explore 500+ Cities Hub
                </Link>
                <Link 
                  href="/location/mumbai" 
                  className="btn btn-outline !border-white/30 hover:!border-white !text-white text-xs uppercase tracking-wider font-bold text-center bg-white/5"
                >
                  View Sample City Page
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 9. Direct Inbound Lead Capture Section */}
        <section className="py-24 bg-gray-50/60 border-y border-gray-100">
          <div className="max-w-container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-primary text-xs font-black uppercase tracking-widest block font-mono">
                  Get A Free Strategy Audit
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-[#1a1a1a] tracking-tight leading-tight font-sora">
                  Discover Exactly What's Holding Your Pipeline Back
                </h2>
                <p className="text-gray-600 text-base leading-relaxed">
                  Our senior web architects and SEO directors will audit your current website speed, backlink profile, and local conversion funnel with guaranteed 24-hour turnaround.
                </p>

                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    <span>Complete Core Web Vitals & code efficiency audit</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    <span>Competitor keyword gap analysis in your top 10 target cities</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm font-semibold text-gray-800">
                    <CheckCircle2 className="text-primary w-5 h-5 flex-shrink-0" />
                    <span>Actionable roadmap with zero obligations</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-6">
                <ContactForm 
                  defaultService="Website Development"
                  defaultLocation="Direct Website / Global"
                  title="Request Free Strategy Audit"
                  subtitle="Fill in your details below to receive a personalized growth report."
                />
              </div>
            </div>
          </div>
        </section>

        {/* 10. Verified Client Testimonials */}
        <TestimonialsSection />

        {/* 11. FAQs */}
        <FAQSection />

        {/* 12. PreFooter High-Impact CTA */}
        <PreFooter />
      </main>

      <Footer />
    </div>
  );
}
