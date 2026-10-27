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
import ContentSectionsRenderer from '@/components/ContentSectionsRenderer';
import PreFooter from '@/components/PreFooter';
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';
import { ArrowRight, MapPin, Sparkles, CheckCircle2, BookOpen } from 'lucide-react';
import homeContent from '@/data/homeContent.json';
import BlogCard from '@/components/BlogCard';
import { getPublishedBlogs } from '@/lib/blogs';

export const metadata = {
  title: homeContent.metaTitle || 'AFWAN TECH | Digital Marketing & Web Engineering Agency',
  description: homeContent.metaDescription || 'Scale your business with Next.js web development, programmatic local SEO across 595+ cities, and high-performance lead generation systems.',
  keywords: homeContent.keywords || [],
  alternates: {
    canonical: 'https://www.afwantech.com'
  }
};

export default function Home() {
  const homeBlogs = getPublishedBlogs().slice(0, 3);

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

        {/* 5. Core Bento Grid Marketing Solutions (All 8 Services) */}
        <MarketingSolutions />

        {/* 6. Growth Stats Counter Cards */}
        <GrowthStats />

        {/* 7. Problem vs Solution Comparison Matrix */}
        <ProblemSolver />

        {/* 8. 595+ Programmatic Locations Network Banner */}
        <section className="py-24 bg-gradient-to-b from-blue-50/40 via-white to-white">
          <div className="max-w-container mx-auto px-6">
            <div className="bg-gradient-to-br from-[#0f172a] via-[#162238] to-[#0f172a] rounded-[2.5rem] p-8 sm:p-12 md:p-16 text-white flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl relative overflow-hidden border border-white/10">
              {/* Soft ambient backlight */}
              <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[140px] pointer-events-none" />

              <div className="space-y-5 max-w-xl relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/20 text-blue-300 text-xs font-black uppercase tracking-wider border border-primary/30">
                  <MapPin size={13} className="text-primary" /> Programmatic SEO Network
                </div>
                <h3 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight font-sora text-white">
                  Expand Your Local Search Visibility In <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300">595+ Cities</span>
                </h3>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                  Our automated multi-location SEO engine generates dedicated, authoritative landing pages with city-specific entity schemas, localized keyword clusters, and high-conversion funnels.
                </p>

                {/* Popular City Quick-Links Pills */}
                <div className="pt-2 flex flex-wrap gap-2 text-xs">
                  {['Mumbai', 'Bengaluru', 'Delhi NCR', 'Hyderabad', 'Pune', 'Chennai', 'Kolkata', 'Ahmedabad', 'Dubai'].map((city, cIdx) => (
                    <Link
                      key={cIdx}
                      href={`/location/${city.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/5 hover:bg-white/15 text-gray-300 hover:text-white border border-white/10 transition-colors"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>{city}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto relative z-10 flex-shrink-0">
                <Link 
                  href="/market-area" 
                  className="btn btn-primary !px-9 !py-4 text-xs uppercase tracking-wider font-extrabold text-center text-white shadow-xl shadow-primary/30 rounded-2xl hover:scale-105 transition-all"
                >
                  Explore 595+ Cities Hub
                </Link>
                <Link 
                  href="/location/mumbai" 
                  className="btn btn-outline !border-white/20 hover:!border-white !text-white text-xs uppercase tracking-wider font-bold text-center bg-white/5 hover:bg-white/10 rounded-2xl transition-all"
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

        {/* 11. Latest Engineering & AI Guides Showcase */}
        {homeBlogs && homeBlogs.length > 0 && (
          <section className="py-24 bg-gradient-to-b from-white via-slate-50/50 to-white border-t border-gray-100">
            <div className="max-w-container mx-auto px-6">
              <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
                <div className="max-w-xl space-y-3">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-primary border border-blue-100 text-xs font-black uppercase tracking-wider">
                    <BookOpen size={13} /> Engineering & AI Insights
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-black font-sora text-[#0f172a] tracking-tight">
                    Latest From Our Engineering Journal
                  </h2>
                  <p className="text-sm sm:text-base text-gray-600">
                    In-depth architectural guides, AI coding workflows, and programmatic search strategies written by senior engineers.
                  </p>
                </div>

                <Link 
                  href="/blog" 
                  className="btn btn-outline !px-7 !py-3.5 text-xs font-bold uppercase tracking-wider flex items-center gap-2 whitespace-nowrap shadow-xs hover:shadow-md"
                >
                  <span>View All Articles</span>
                  <ArrowRight size={14} />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {homeBlogs.map((b, idx) => (
                  <BlogCard key={b.id || b.slug} blog={b} index={idx} />
                ))}
              </div>
            </div>
          </section>
        )}

        {/* 12. Complete Deep Home Page Content & 16 FAQs */}
        <section className="py-20 bg-white">
          <ContentSectionsRenderer 
            contentBlocks={homeContent.main_content}
            faqs={homeContent.faqs}
            bottomContent={homeContent.bottom_content}
            pageTitle="Digital Marketing & Software"
          />
        </section>

        {/* 12. PreFooter High-Impact CTA */}
        <PreFooter />
      </main>

      <Footer />
    </div>
  );
}
