'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CheckCircle2, ArrowRight, ShieldCheck, Zap, Star, 
  MapPin, Clock, Award, Sparkles, ChevronDown, Check,
  Smartphone, Code, Globe, Layers, BarChart3, ShoppingCart,
  TrendingUp, Palette, Target, Users, MessageSquare, Phone,
  HelpCircle, FileText, ExternalLink
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompactHeroForm from '@/components/CompactHeroForm';
import PreFooter from '@/components/PreFooter';
import { siteSettings } from '@/data/siteData';
import { trackContactTap } from '@/lib/tracking';

function renderFormattedText(text) {
  if (!text || typeof text !== 'string') return text;
  // Splits by **bold** text
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i} className="font-bold text-gray-900">{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function ServicePageTemplate({ data }) {
  const [openFaq, setOpenFaq] = useState(0);

  if (!data) return null;

  const schemaJsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Service",
        "name": data.title,
        "description": data.metaDescription || data.heroSubtitle,
        "provider": {
          "@type": "Organization",
          "name": "AFWAN TECH",
          "url": "https://www.afwantech.com",
          "telephone": siteSettings.contactPhone,
          "email": siteSettings.contactEmail,
          "address": {
            "@type": "PostalAddress",
            "streetAddress": siteSettings.address,
            "addressLocality": "Bengaluru",
            "addressRegion": "Karnataka",
            "postalCode": "560066",
            "addressCountry": "IN"
          }
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

  // Filter out h1 and tagline from main_content as they are displayed in the Hero
  const contentBlocks = (data.main_content || []).filter(
    (b) => b.type !== 'h1' && b.type !== 'tagline'
  );

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
        <section className="relative min-h-[92vh] flex items-center py-16 md:py-24 bg-gradient-to-b from-[#f0f7fd] via-white to-white overflow-hidden border-b border-gray-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#2081D3]/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
          <div className="max-w-container mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Headlines & Pillars */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-primary text-xs font-black uppercase tracking-wider">
                  <Sparkles size={14} className="text-primary" />
                  <span>{data.title} • Afwan Tech</span>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#0f172a] tracking-tight leading-[1.15] font-sora">
                  {data.h1}
                </h1>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal">
                  {data.tagline || data.heroSubtitle}
                </p>

                {/* Key Quick Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <ShieldCheck size={18} className="text-emerald-500 mb-1" />
                    <div className="text-xs font-bold text-gray-900">100% Code Ownership</div>
                    <div className="text-[10px] text-gray-400">Zero Lock-in Contracts</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <MapPin size={18} className="text-primary mb-1" />
                    <div className="text-xs font-bold text-gray-900">Bengaluru Direct Team</div>
                    <div className="text-[10px] text-gray-400">Whitefield Headquarters</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs col-span-2 sm:col-span-1">
                    <Users size={18} className="text-[#2081D3] mb-1" />
                    <div className="text-xs font-bold text-gray-900">In-House Engineers</div>
                    <div className="text-[10px] text-gray-400">Direct Senior Architects</div>
                  </div>
                </div>

                {/* Direct Action Buttons */}
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a 
                    href="#inquiry-form"
                    className="btn btn-primary !px-7 !py-3.5 text-xs font-extrabold uppercase tracking-wider text-white"
                  >
                    Request Detailed Scope
                  </a>
                  <a 
                    href={`https://wa.me/${siteSettings.whatsappNumber}?text=Hi%20Afwan%20Tech,%20I%20would%20like%20to%20discuss%20${encodeURIComponent(data.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackContactTap('whatsapp', { location: `Hero - ${data.title}` })}
                    className="btn btn-outline !px-6 !py-3.5 text-xs font-bold uppercase tracking-wider bg-white/70"
                  >
                    Chat on WhatsApp
                  </a>
                  <a 
                    href={`tel:${siteSettings.contactPhone}`}
                    onClick={() => trackContactTap('call', { location: `Hero - ${data.title}` })}
                    className="text-xs font-bold text-gray-600 hover:text-primary transition-colors flex items-center gap-1.5"
                  >
                    <Phone size={14} className="text-primary" />
                    <span>{siteSettings.contactPhone}</span>
                  </a>
                </div>
              </div>

              {/* Service Strategy Lead Form */}
              <div id="inquiry-form" className="lg:col-span-5 w-full scroll-mt-24">
                <CompactHeroForm 
                  defaultService={data.title}
                  title={`Request ${data.title} Proposal`}
                  subtitle="Get an actionable architecture breakdown and transparent cost estimate within 15 mins."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Complete Main Content Blocks Section */}
        <section className="py-16 md:py-24 bg-white border-b border-gray-100">
          <div className="max-w-4xl mx-auto px-6 space-y-8">
            {contentBlocks.map((block, idx) => {
              switch (block.type) {
                case 'h2':
                  return (
                    <div key={idx} className="pt-8 first:pt-0 border-t first:border-t-0 border-gray-100">
                      <div className="inline-block text-xs font-black uppercase tracking-widest text-primary font-sora mb-2">
                        {data.title}
                      </div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] tracking-tight font-sora">
                        {block.text}
                      </h2>
                    </div>
                  );

                case 'h3':
                  return (
                    <h3 key={idx} className="text-xl sm:text-2xl font-bold text-[#0f172a] pt-4 font-sora">
                      {block.text}
                    </h3>
                  );

                case 'h4':
                  return (
                    <h4 key={idx} className="text-lg font-bold text-gray-900 pt-2 font-sora">
                      {block.text}
                    </h4>
                  );

                case 'p':
                  return (
                    <p key={idx} className="text-gray-700 text-base md:text-lg leading-relaxed font-normal">
                      {renderFormattedText(block.text)}
                    </p>
                  );

                case 'ul':
                  return (
                    <div key={idx} className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-6 sm:p-8 my-4">
                      <ul className="space-y-3.5">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm md:text-base text-gray-700 leading-relaxed">
                            <CheckCircle2 size={18} className="text-primary mt-1 flex-shrink-0" />
                            <span>{renderFormattedText(item)}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );

                case 'ol':
                  return (
                    <div key={idx} className="bg-[#f8fafc] border border-gray-200/80 rounded-2xl p-6 sm:p-8 my-4">
                      <ol className="space-y-4">
                        {block.items.map((item, i) => (
                          <li key={i} className="flex items-start gap-3.5 text-sm md:text-base text-gray-700 leading-relaxed">
                            <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-extrabold flex items-center justify-center flex-shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span>{renderFormattedText(item)}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  );

                case 'table':
                  return (
                    <div key={idx} className="my-6 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="min-w-full text-left text-sm border-collapse bg-white">
                          {block.header && (
                            <thead>
                              <tr className="bg-[#0f172a] text-white text-xs font-bold uppercase tracking-wider">
                                {block.header.map((th, hIdx) => (
                                  <th key={hIdx} className="px-5 py-3.5 border-b border-gray-800">
                                    {th}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                          )}
                          <tbody className="divide-y divide-gray-100">
                            {block.rows && block.rows.map((row, rIdx) => (
                              <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}>
                                {row.map((cell, cIdx) => (
                                  <td key={cIdx} className={`px-5 py-3.5 text-gray-700 ${cIdx === 0 ? 'font-bold text-gray-900 whitespace-nowrap' : 'leading-relaxed'}`}>
                                    {renderFormattedText(cell)}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );

                case 'cta':
                  return (
                    <div key={idx} className="my-8 p-6 sm:p-8 bg-gradient-to-r from-[#0f172a] via-[#1a2942] to-[#0f172a] text-white rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6 border border-white/10">
                      <div className="space-y-1 text-center sm:text-left">
                        <h4 className="text-xl font-black text-white font-sora">
                          Ready to discuss your {data.title.toLowerCase()}?
                        </h4>
                        <p className="text-xs text-gray-300">
                          Speak directly with our senior engineers and growth team.
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-3">
                        <a 
                          href="#inquiry-form" 
                          className="btn btn-primary !px-6 !py-3 text-xs font-bold uppercase tracking-wider text-white"
                        >
                          Get Free Audit
                        </a>
                        <a 
                          href={`tel:${siteSettings.contactPhone}`}
                          onClick={() => trackContactTap('call', { location: `In-Content CTA - ${data.title}` })}
                          className="btn btn-outline !border-white/30 hover:!border-white !text-white text-xs font-bold uppercase tracking-wider bg-white/5"
                        >
                          Call {siteSettings.contactPhone}
                        </a>
                        <a 
                          href={`https://wa.me/${siteSettings.whatsappNumber}?text=Hi%20Afwan%20Tech,%20I%20would%20like%20to%20discuss%20${encodeURIComponent(data.title)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => trackContactTap('whatsapp', { location: `In-Content CTA - ${data.title}` })}
                          className="px-4 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md"
                        >
                          <MessageSquare size={14} /> WhatsApp
                        </a>
                      </div>
                    </div>
                  );

                case 'note':
                case 'link_note':
                  return (
                    <div key={idx} className="bg-blue-50/70 border-l-4 border-primary p-5 rounded-r-2xl my-4 text-sm text-gray-700 leading-relaxed">
                      {renderFormattedText(block.text)}
                    </div>
                  );

                case 'sources':
                  return (
                    <div key={idx} className="bg-gray-50 border border-gray-200 rounded-xl p-4 text-xs text-gray-500 space-y-1 my-4">
                      <div className="font-bold text-gray-700 flex items-center gap-1">
                        <FileText size={12} /> Sources & References:
                      </div>
                      <div>{block.text}</div>
                    </div>
                  );

                default:
                  return null;
              }
            })}
          </div>
        </section>

        {/* 16 Comprehensive FAQs Accordion */}
        {data.faqs && data.faqs.length > 0 && (
          <section className="py-16 md:py-24 bg-gray-50/70 border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-6">
              <div className="text-center mb-12">
                <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                  Clarification & Verified Answers
                </span>
                <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] font-sora">
                  Frequently Asked Questions About Our {data.title}
                </h2>
                <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
                  Everything you need to know about pricing, deliverables, code ownership, and timelines.
                </p>
              </div>

              <div className="space-y-3.5">
                {data.faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div 
                      key={idx} 
                      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-xs hover:border-primary/40 transition-colors"
                    >
                      <button 
                        onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                        className="w-full text-left p-5 md:p-6 flex items-center justify-between font-bold text-gray-900 hover:text-primary transition-colors text-sm md:text-base cursor-pointer gap-4"
                      >
                        <span className="flex items-center gap-3">
                          <span className="w-6 h-6 rounded-lg bg-blue-50 text-primary text-xs font-black flex items-center justify-center flex-shrink-0">
                            {idx + 1}
                          </span>
                          <span>{faq.question}</span>
                        </span>
                        <ChevronDown 
                          size={18} 
                          className={`text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                        />
                      </button>
                      {isOpen && (
                        <div className="px-6 pb-6 pt-0 text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100/80">
                          <p className="mt-4">{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Bottom Authority Summary Block */}
        {data.bottom_content && data.bottom_content.length > 0 && (
          <section className="py-16 bg-white border-b border-gray-100">
            <div className="max-w-4xl mx-auto px-6 space-y-6">
              {data.bottom_content.map((b, idx) => {
                if (b.type === 'h2') {
                  return (
                    <h2 key={idx} className="text-2xl font-black text-[#0f172a] font-sora">
                      {b.text}
                    </h2>
                  );
                }
                if (b.type === 'p') {
                  return (
                    <p key={idx} className="text-gray-600 text-sm md:text-base leading-relaxed">
                      {renderFormattedText(b.text)}
                    </p>
                  );
                }
                return null;
              })}
            </div>
          </section>
        )}

        {/* PreFooter CTA */}
        <PreFooter />
      </main>

      <Footer />
    </div>
  );
}
