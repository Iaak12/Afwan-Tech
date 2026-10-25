import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarketingSolutions from '@/components/MarketingSolutions';
import PreFooter from '@/components/PreFooter';
import CompactHeroForm from '@/components/CompactHeroForm';
import { Sparkles, CheckCircle2, Zap, ArrowRight, ShieldCheck, Code, Globe2 } from 'lucide-react';

export const metadata = {
  title: 'Digital Services & Solutions | AFWAN TECH',
  description: 'Explore our full spectrum of digital services: Next.js website development, custom web applications, e-commerce engineering, SEO, and paid performance advertising.',
};

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen font-inter text-[#0f172a]">
      <Header />

      <main>
        {/* Services 100vh Hero Section */}
        <section className="relative min-h-[92vh] flex items-center pt-32 pb-16 bg-gradient-to-b from-[#f0f7fd]/80 via-white to-white overflow-hidden border-b border-gray-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          
          <div className="max-w-container mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Headlines & Pillars */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-glow text-xs font-black uppercase tracking-wider">
                  <Sparkles size={14} className="text-primary" />
                  <span>End-To-End Technical Competencies</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.08] font-sora">
                  Engineered For Scale, <span className="text-gradient">Designed For Impact</span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                  From modern headless Next.js web architectures to programmatic local SEO and data-backed performance advertising, we construct digital assets that win.
                </p>

                {/* Technical Pillars Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <Code size={18} className="text-primary mb-1.5" />
                    <div className="text-xs font-bold text-gray-900">Next.js & React</div>
                    <div className="text-[10px] text-gray-400">Sub-Second Load</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <Globe2 size={18} className="text-primary mb-1.5" />
                    <div className="text-xs font-bold text-gray-900">500+ Cities SEO</div>
                    <div className="text-[10px] text-gray-400">Page 1 Rankings</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs col-span-2 sm:col-span-1">
                    <ShieldCheck size={18} className="text-emerald-500 mb-1.5" />
                    <div className="text-xs font-bold text-gray-900">100% Ownership</div>
                    <div className="text-[10px] text-gray-400">Zero Lock-in Contracts</div>
                  </div>
                </div>
              </div>

              {/* Right Column: 2-Column Compact Hero Contact Form */}
              <div className="lg:col-span-5 w-full">
                <CompactHeroForm 
                  defaultService="Custom Web Development"
                  title="Request Instant Service Scope"
                  subtitle="Get an actionable architecture breakdown and transparent cost quote within 15 mins."
                />
              </div>

            </div>
          </div>
        </section>

        {/* Services Bento Grid */}
        <MarketingSolutions />

        <PreFooter />
      </main>

      <Footer />
    </div>
  );
}
