'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Star, 
  MapPin, Clock, Award, Sparkles, ChevronDown, Check,
  Smartphone, Code, Globe, Layers, BarChart3, ShoppingCart,
  TrendingUp, Palette, Target, Users
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import CompactHeroForm from '@/components/CompactHeroForm';

const iconMap = {
  Zap: Zap,
  Globe: Globe,
  Layers: Layers,
  Smartphone: Smartphone,
  Shield: ShieldCheck,
  BarChart3: BarChart3,
  Code: Code,
  ShoppingCart: ShoppingCart,
  TrendingUp: TrendingUp,
  Sparkles: Sparkles,
  Palette: Palette,
  Target: Target,
  Users: Users
};

export default function ServicePageTemplate({ data }) {
  const [openFaq, setOpenFaq] = useState(0);

  if (!data) return null;

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": data.title,
        "description": data.metaDescription,
        "provider": {
          "@type": "Organization",
          "name": "AFWAN TECH",
          "url": "https://www.afwantech.com"
        },
        "serviceType": data.title,
        "areaServed": "Global"
      },
      {
        "@type": "FAQPage",
        "mainEntity": data.faqs ? data.faqs.map(faq => ({
          "@type": "Question",
          "name": faq.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": faq.answer
          }
        })) : []
      }
    ]
  };

  return (
    <div className="bg-white min-h-screen font-inter text-[#0f172a]">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <Header />

      <main className="pt-28 md:pt-32">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100 py-3">
          <div className="max-w-container mx-auto px-6 flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/services" className="hover:text-primary transition-colors">Services</Link>
            <span>/</span>
            <span className="text-primary font-bold">{data.title}</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[92vh] flex items-center py-16 md:py-24 bg-gradient-to-b from-[#f0f7fd] via-white to-white overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2081D3]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="max-w-container mx-auto px-6 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-primary text-xs font-black uppercase tracking-wider">
                  <Sparkles size={14} className="text-primary" />
                  <span>{data.badge || 'Enterprise Architecture'}</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15]">
                  {data.h1}
                </h1>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal">
                  {data.heroSubtitle}
                </p>

                {/* Key Metrics Strip */}
                {data.stats && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4">
                    {data.stats.map((s, idx) => (
                      <div key={idx} className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="text-2xl font-black text-primary font-sora">{s.value}</div>
                        <div className="text-xs font-bold text-gray-900 mt-0.5">{s.label}</div>
                        <div className="text-[10px] text-gray-400">{s.sub}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Service Strategy Lead Form */}
              <div className="lg:col-span-5 w-full">
                <CompactHeroForm 
                  defaultService={data.title}
                  title={`Request ${data.title} Proposal`}
                  subtitle="Get an actionable architecture breakdown and transparent cost estimate within 15 mins."
                />
              </div>
            </div>
          </div>
        </section>

        {/* In-Depth Overview Section */}
        {data.detailedOverview && (
          <section className="py-16 md:py-20 border-t border-gray-100 bg-white">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              <div className="inline-block text-xs font-black uppercase tracking-widest text-primary font-sora">
                Engineering Philosophy & Execution
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] tracking-tight">
                How We Deliver Predictable Business ROI for {data.title}
              </h2>
              {data.detailedOverview.map((paragraph, idx) => (
                <p key={idx} className="text-gray-700 text-base md:text-lg leading-relaxed font-normal">
                  {paragraph}
                </p>
              ))}
            </div>
          </section>
        )}

        {/* Key Features & Architecture Grid */}
        {data.keyFeatures && (
          <section className="py-16 md:py-20 bg-gray-50/60 border-t border-gray-100">
            <div className="max-w-container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                  System Architecture
                </span>
                <h2 className="text-3xl font-black text-[#0f172a]">Core Technical Capabilities & Inclusions</h2>
                <p className="text-gray-500 text-sm mt-3">Built to outperform competitors on speed, conversion rates, and long-term scalability.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.keyFeatures.map((feat, idx) => {
                  const Icon = iconMap[feat.iconName] || Zap;
                  return (
                    <div key={idx} className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary flex items-center justify-center mb-5">
                        <Icon size={22} />
                      </div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{feat.title}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* 4-Phase Deliverables Roadmap */}
        {data.deliverablesRoadmap && (
          <section className="py-16 md:py-24 bg-white border-t border-gray-100">
            <div className="max-w-container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                  Execution Methodology
                </span>
                <h2 className="text-3xl font-black text-[#0f172a]">Step-by-Step Delivery Roadmap</h2>
                <p className="text-gray-500 text-sm mt-3">From discovery to production deployment, our process is fully transparent with milestone deliverables.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.deliverablesRoadmap.map((step, idx) => (
                  <div key={idx} className="relative bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-6 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-extrabold uppercase px-2.5 py-1 rounded-md bg-blue-100 text-primary">
                          {step.phase}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">{step.duration}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-base mb-4">{step.title}</h3>
                      <ul className="space-y-2.5 text-xs text-gray-600">
                        {step.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 size={14} className="text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Head-to-Head Comparison Matrix */}
        {data.comparisonMatrix && (
          <section className="py-16 md:py-20 bg-gray-50/70 border-t border-gray-100">
            <div className="max-w-container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                  The Competitive Difference
                </span>
                <h2 className="text-3xl font-black text-[#0f172a]">AFWAN TECH Standard vs Average Agency</h2>
                <p className="text-gray-500 text-sm mt-3">See why high-growth enterprises transition away from generic agencies to our Next.js architecture.</p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm bg-white">
                <table className="min-w-full text-left text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#0f172a] text-white text-xs font-bold uppercase tracking-wider">
                      <th className="px-6 py-4">Evaluation Criteria</th>
                      <th className="px-6 py-4 bg-[#2081D3] text-white">AFWAN TECH (EzRank Architecture)</th>
                      <th className="px-6 py-4 text-gray-300">Average Agencies / Freelancers</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {data.comparisonMatrix.map((row, idx) => (
                      <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                        <td className="px-6 py-4 font-bold text-gray-900">{row.feature}</td>
                        <td className="px-6 py-4 font-semibold text-primary flex items-center gap-2">
                          <Check size={16} className="text-emerald-500 flex-shrink-0" />
                          <span>{row.afwanTech}</span>
                        </td>
                        <td className="px-6 py-4 text-gray-500">{row.regularAgency}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* Tech Stack Breakdown */}
        {data.techStack && (
          <section className="py-16 bg-white border-t border-gray-100">
            <div className="max-w-container mx-auto px-6">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                  Modern Tooling
                </span>
                <h2 className="text-2xl font-black text-[#0f172a]">Institutional Tech Stack</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.techStack.map((stack, idx) => (
                  <div key={idx} className="bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <span className="text-xs font-black text-gray-400 uppercase tracking-wider block mb-1">
                      {stack.category}
                    </span>
                    <p className="text-sm font-semibold text-gray-800">{stack.tools}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Industry Applications */}
        {data.industryApplications && (
          <section className="py-16 md:py-20 bg-gray-50/50 border-t border-gray-100">
            <div className="max-w-container mx-auto px-6">
              <div className="text-center max-w-3xl mx-auto mb-14">
                <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                  Proven Tailoring
                </span>
                <h2 className="text-3xl font-black text-[#0f172a]">Industry-Specific Implementations</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {data.industryApplications.map((app, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <span className="text-xs font-bold text-primary uppercase tracking-wider block mb-1">{app.industry}</span>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">{app.title}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{app.impact}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* FAQs Accordion */}
        {data.faqs && (
          <section className="py-16 md:py-24 bg-white border-t border-gray-100">
            <div className="max-w-3xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                  Clarification & Answers
                </span>
                <h2 className="text-3xl font-black text-[#0f172a]">Frequently Asked Questions</h2>
                <p className="text-gray-500 text-sm mt-2">Everything you need to know about our {data.title} engagements.</p>
              </div>

              <div className="space-y-4">
                {data.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="border border-gray-200 rounded-2xl overflow-hidden transition-colors"
                    >
                      <button 
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                        className="w-full text-left p-5 flex items-center justify-between font-bold text-gray-900 hover:text-primary transition-colors text-sm md:text-base cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown 
                          size={18} 
                          className={`text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                        />
                      </button>
                      {isOpen && (
                        <div className="px-5 pb-5 pt-0 text-sm text-gray-600 leading-relaxed border-t border-gray-100">
                          <p className="mt-3">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Bottom CTA Banner */}
        <section className="py-20 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
              Ready to Accelerate Growth with High-Performance {data.title}?
            </h2>
            <p className="text-gray-300 text-base max-w-2xl mx-auto">
              Schedule a technical consultation with our engineering and growth strategists today. No obligation, 100% actionable guidance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/contact-us"
                className="btn-primary px-8 py-3.5 text-sm uppercase tracking-wider font-bold shadow-xl shadow-primary/30"
              >
                Schedule Free Strategy Session
              </Link>
              <Link 
                href="/pricing"
                className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors"
              >
                Explore Pricing Plans
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
