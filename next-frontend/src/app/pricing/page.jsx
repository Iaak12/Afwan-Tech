import React from 'react';
import Link from 'next/link';
import { Check, Zap, Star, ShieldCheck, ArrowRight, HelpCircle, FileText, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompactHeroForm from '@/components/CompactHeroForm';
import PreFooter from '@/components/PreFooter';
import ContentSectionsRenderer from '@/components/ContentSectionsRenderer';
import pricingContent from '@/data/pricingContent.json';

export const metadata = {
  title: pricingContent.metaTitle || 'Website Cost & Affordable Local SEO Services | AFWAN TECH',
  description: pricingContent.metaDescription || 'Affordable local SEO services from ₹15,000/month, WordPress websites from ₹15,999 and logo design from ₹12,000. Clear pricing, GST extra, no hidden costs.',
  keywords: pricingContent.keywords || [
    'affordable local seo services',
    'website development charges',
    'website development costs',
    'affordable search engine optimization',
    'website design india price',
    'website creation charges in india',
    'website creation cost in india',
    'affordable seo services',
    'ecommerce website price',
    'ecommerce website cost'
  ],
  alternates: {
    canonical: 'https://www.afwantech.com/pricing'
  },
  openGraph: {
    title: pricingContent.metaTitle || 'Website Cost & Affordable Local SEO Services | AFWAN TECH',
    description: pricingContent.metaDescription,
    url: 'https://www.afwantech.com/pricing',
    siteName: 'AFWAN TECH'
  }
};

const topFeaturedPlans = [
  {
    id: 'local',
    name: 'SEO Local Plan',
    price: '₹15,000',
    period: '/month + GST',
    desc: 'For local businesses serving up to 5 cities and 1 state targeting immediate Google Maps and search intent.',
    popular: false,
    cta: 'Choose Local Plan',
    features: [
      '15 Target Keywords',
      'Up to 5 Cities & 1 State Coverage',
      '4 In-Depth SEO Blogs / Month',
      '1 Google Business Profile (GMB) Optimization',
      'Complete On-Page & Technical Fixes',
      'Monthly Ranking & Traffic Audit',
      'Direct WhatsApp & Call Support'
    ]
  },
  {
    id: 'state',
    name: 'SEO State Plan',
    price: '₹25,000',
    period: '/month + GST',
    desc: 'For expanding businesses targeting regional market leadership across 10 states and 10 cities.',
    popular: true,
    cta: 'Choose State Plan',
    features: [
      '50 Competitive Keywords',
      '10 States & 10 Cities Coverage',
      '8 High-Impact Blogs / Month',
      'Up to 3 Google Business Profiles',
      'Competitor Gap & Content Strategy',
      'Speed & Core Web Vitals Optimization',
      'Bi-Weekly Strategic Sync'
    ]
  },
  {
    id: 'pan-india',
    name: 'SEO Pan-India Plan',
    price: '₹35,000',
    period: '/month + GST',
    desc: 'For brands scaling national reach across 50 cities, all 37 Indian states/UTs, and international queries.',
    popular: false,
    cta: 'Choose Pan-India Plan',
    features: [
      '100 High-Volume Keywords',
      '50 Cities & 37 States/UTs Coverage',
      '12 Authority Blogs / Month',
      'Up to 5 Google Business Profiles',
      'Advanced Programmatic Multi-City Mesh',
      'DA 50+ Editorial Backlinks Strategy',
      'Weekly Performance Review'
    ]
  }
];

const socialMediaPlans = [
  {
    id: 'smm-silver',
    name: 'Silver Plan',
    tag: null,
    desc: 'Starter plan for small businesses establishing consistency.',
    price: '₹10,000',
    period: '/month',
    popular: false,
    cta: 'Choose Silver Plan',
    features: [
      '1 Post Daily across FB, IG, X, LinkedIn & YouTube',
      '2 Reels / Short Videos per week (8 / month)',
      'Custom graphic designs & brand templates',
      'SEO captions, relevant hashtags & keywords',
      'Profile tuning & highlight covers',
      'Monthly analytics & performance report'
    ]
  },
  {
    id: 'smm-gold',
    name: 'Gold Plan',
    tag: 'MOST POPULAR',
    desc: 'Accelerated reach & engagement for growing businesses.',
    price: '₹15,000',
    period: '/month',
    popular: true,
    cta: 'Choose Gold Plan',
    features: [
      '2 Posts Daily across FB, IG, X, LinkedIn & YouTube',
      '3–4 Reels / Short Videos per week (12–16 / month)',
      'High-converting carousel & graphic designs',
      'Targeted industry keywords & hashtags',
      'Active comment monitoring & community replies',
      'Bi-weekly strategy review & report'
    ]
  },
  {
    id: 'smm-platinum',
    name: 'Platinum Plan',
    tag: 'MAXIMUM IMPACT',
    desc: 'Aggressive brand building & daily video authority.',
    price: '₹25,000',
    period: '/month',
    popular: false,
    isVip: true,
    cta: 'Choose Platinum Plan',
    features: [
      '3–4 Posts Daily across FB, IG, X, LinkedIn & YouTube',
      '1 Reel / Short Video Daily (30 / month)',
      'Motion graphics, custom captions & SEO tags',
      'Daily story publishing & offer promotions',
      'Meta & LinkedIn Paid Ads campaign setup',
      'Weekly performance calls & dedicated lead'
    ]
  }
];

export default function PricingPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen font-inter text-[#0f172a]">
      {/* Schema.org JSON-LD */}
      {pricingContent.schema_jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingContent.schema_jsonld) }}
        />
      )}

      <Header />

      <main>
        {/* Pricing 100vh Hero */}
        <section className="relative min-h-[85vh] flex items-center pt-32 pb-16 bg-gradient-to-b from-[#f0f7fd]/70 via-white to-white overflow-hidden border-b border-gray-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-container mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-glow text-xs font-black uppercase tracking-wider">
                  <Zap size={14} className="text-primary" />
                  <span>Transparent Deliverables, Zero Hidden Fees</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.1] font-sora">
                  {pricingContent.h1 || 'Clear Pricing for Websites, Logos and Affordable Local SEO Services'}
                </h1>

                {pricingContent.tagline && (
                  <p className="text-primary font-semibold text-sm md:text-base bg-blue-50/70 border-l-4 border-primary p-4 rounded-r-xl">
                    {pricingContent.tagline}
                  </p>
                )}

                <p className="text-gray-600 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                  {pricingContent.heroSubtitle || 'Affordable local SEO services from ₹15,000/month, WordPress websites from ₹15,999 and logo design from ₹12,000. Clear pricing, GST extra, pay on milestone deliverables.'}
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <ShieldCheck size={18} className="text-emerald-500 mb-1" />
                    <div className="text-xs font-bold text-gray-900">100% Code Ownership</div>
                    <div className="text-[10px] text-gray-400">Zero vendor lock-in</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <Star size={18} className="text-primary mb-1" />
                    <div className="text-xs font-bold text-gray-900">Milestone Invoicing</div>
                    <div className="text-[10px] text-gray-400">Pay on deliverables</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <Zap size={18} className="text-primary mb-1" />
                    <div className="text-xs font-bold text-gray-900">GST Invoice Ready</div>
                    <div className="text-[10px] text-gray-400">18% ITC compliant</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 w-full">
                <CompactHeroForm 
                  title="Request Instant Written Quote"
                  subtitle="Get a transparent, itemised cost breakdown and scope document for your project within hours."
                />
              </div>

            </div>
          </div>
        </section>

        {/* Featured SEO Pricing Cards */}
        <section className="max-w-container mx-auto px-6 py-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
              Monthly Organic Growth Retainers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] font-sora">
              Affordable Local & National SEO Plans
            </h2>
            <p className="text-gray-500 text-sm mt-3">
              Fixed monthly pricing without long-term contracts. Pause or cancel anytime with 30 days notice.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
            {topFeaturedPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-3xl p-8 md:p-10 border transition-all duration-300 flex flex-col justify-between relative ${plan.popular ? 'border-primary shadow-2xl shadow-primary/10 ring-2 ring-primary/20 scale-105 z-10' : 'border-gray-200/80 shadow-md hover:shadow-xl'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-extrabold text-[#0f172a]">{plan.name}</h3>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-6 min-h-[36px]">
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-gray-100">
                    <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-sora">
                      {plan.price}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">{plan.period}</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-2">
                      Included Deliverables:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 leading-normal">
                        <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact-us"
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${plan.popular ? 'btn-primary shadow-lg shadow-primary/25' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>

          {/* Social Media Management Pricing Packages */}
          <div className="pt-16 border-t border-gray-100">
            <div className="text-center max-w-2xl mx-auto mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                Multi-Channel Social Growth & Video
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] font-sora">
                Social Media Management Packages
              </h2>
              <p className="text-gray-500 text-sm mt-3">
                Daily multi-channel content publishing, custom short videos, and active community engagement.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-16">
              {socialMediaPlans.map((plan) => (
                <div 
                  key={plan.id}
                  className={`bg-white rounded-3xl p-8 md:p-10 border transition-all duration-300 flex flex-col justify-between relative ${plan.popular ? 'border-primary shadow-2xl shadow-primary/10 ring-2 ring-primary/20 scale-105 z-10' : (plan.isVip ? 'border-purple-300 shadow-xl shadow-purple-500/5' : 'border-gray-200/80 shadow-md hover:shadow-xl')}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                      {plan.tag || 'Most Popular Choice'}
                    </div>
                  )}
                  {plan.isVip && !plan.popular && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                      {plan.tag || 'Maximum Impact'}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-extrabold text-[#0f172a]">{plan.name}</h3>
                    </div>

                    <p className="text-xs text-gray-500 leading-relaxed mb-6 min-h-[36px]">
                      {plan.desc}
                    </p>

                    <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-gray-100">
                      <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-sora">
                        {plan.price}
                      </span>
                      <span className="text-xs text-gray-400 font-bold">{plan.period}</span>
                    </div>

                    <div className="space-y-3 mb-8">
                      <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-2">
                        Included Deliverables:
                      </span>
                      {plan.features.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 leading-normal">
                          <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href="/contact-us"
                    className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${plan.popular ? 'btn-primary shadow-lg shadow-primary/25' : (plan.isVip ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-md' : 'bg-gray-100 hover:bg-gray-200 text-gray-800')}`}
                  >
                    <span>{plan.cta}</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Development Pricing Cards Strip */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-gradient-to-br from-slate-900 to-slate-800 text-white p-8 rounded-3xl shadow-xl">
            <div className="space-y-2 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-blue-400">Fixed Starter Package</span>
              <h4 className="text-xl font-bold font-sora">WordPress Website</h4>
              <div className="text-3xl font-black text-white font-sora pt-1">From ₹15,999 <span className="text-xs font-normal text-gray-400">+ GST</span></div>
              <p className="text-xs text-gray-300 leading-relaxed pt-2">
                Responsive 5–10 page design, mobile optimized, basic on-page SEO, contact forms, and 30-day post-launch support.
              </p>
              <div className="pt-3">
                <Link href="/contact-us" className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-400 hover:text-blue-300">
                  Request WordPress Quote <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="space-y-2 border-b md:border-b-0 md:border-r border-white/10 pb-6 md:pb-0 md:pr-6">
              <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400">Brand Identity</span>
              <h4 className="text-xl font-bold font-sora">Logo & Visual Identity</h4>
              <div className="text-3xl font-black text-white font-sora pt-1">From ₹12,000 <span className="text-xs font-normal text-gray-400">+ GST</span></div>
              <p className="text-xs text-gray-300 leading-relaxed pt-2">
                Original vector logo, 3 distinct conceptual directions, typography selection, color palette, and high-res vector files.
              </p>
              <div className="pt-3">
                <Link href="/contact-us" className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300">
                  Request Brand Identity Quote <ArrowRight size={13} />
                </Link>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[11px] font-mono uppercase tracking-wider text-purple-400">Custom Engineering</span>
              <h4 className="text-xl font-bold font-sora">Custom Web, Apps & CRM</h4>
              <div className="text-3xl font-black text-white font-sora pt-1">Custom Scope <span className="text-xs font-normal text-gray-400">Milestone Billed</span></div>
              <p className="text-xs text-gray-300 leading-relaxed pt-2">
                Next.js full-stack web apps, e-commerce engines, mobile apps (iOS & Android), and custom CRM systems tailored to your exact workflow.
              </p>
              <div className="pt-3">
                <Link href="/contact-us" className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-400 hover:text-purple-300">
                  Get Tailored Scope & Estimate <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── FULL IN-DEPTH SEO CONTENT, COMPARISON TABLES & FAQS ── */}
        <section className="py-12 bg-white">
          <ContentSectionsRenderer
            contentBlocks={pricingContent.main_content}
            faqs={pricingContent.faqs}
            bottomContent={pricingContent.bottom_content}
            pageTitle="Afwan Tech Pricing Guide"
          />
        </section>

        {/* Guarantees Strip */}
        <section className="max-w-4xl mx-auto px-6 py-12">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <h4 className="font-extrabold text-sm text-[#0f172a]">100% Code Ownership</h4>
              <p className="text-xs text-gray-400 mt-1">Full IP rights, git access, and zero vendor lock-in</p>
            </div>
            <div>
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-extrabold text-sm text-[#0f172a]">No Long-term Lock-in</h4>
              <p className="text-xs text-gray-400 mt-1">Monthly SEO retainers cancellable with 30 days notice</p>
            </div>
            <div>
              <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <h4 className="font-extrabold text-sm text-[#0f172a]">Executive Support</h4>
              <p className="text-xs text-gray-400 mt-1">Direct communication via Slack, WhatsApp, and weekly calls</p>
            </div>
          </div>
        </section>

        <PreFooter />
      </main>

      <Footer />
    </div>
  );
}
