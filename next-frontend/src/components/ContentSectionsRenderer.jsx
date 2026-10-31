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

export default function ContentSectionsRenderer({ 
  contentBlocks = [], 
  faqs = [], 
  bottomContent = [],
  pageTitle = 'Afwan Tech'
}) {
  const [openFaq, setOpenFaq] = useState(0);

  // Filter out h1 and tagline from contentBlocks as they belong in heroes
  const filteredBlocks = contentBlocks.filter(
    (b) => b.type !== 'h1' && b.type !== 'tagline'
  );

  let h2Counter = 0;

  return (
    <div className="space-y-16">
      {/* ── MAIN CONTENT BLOCKS ── */}
      <section className="max-w-4xl mx-auto px-6 space-y-8">
        {filteredBlocks.map((block, idx) => {
          switch (block.type) {
            case 'h2': {
              const sectionId = `sec-${h2Counter++}`;
              return (
                <div key={idx} id={sectionId} className="pt-10 first:pt-0 border-t first:border-t-0 border-gray-100 scroll-mt-28">
                  <div className="inline-block text-xs font-black uppercase tracking-widest text-primary font-sora mb-2">
                    {pageTitle}
                  </div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0f172a] tracking-tight font-sora">
                    {block.text}
                  </h2>
                </div>
              );
            }

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
                      Ready to start your project with Afwan Tech?
                    </h4>
                    <p className="text-xs text-gray-300">
                      Speak directly with our senior engineers and marketing strategists in Bengaluru.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <Link 
                      href="/contact-us" 
                      className="btn btn-primary !px-6 !py-3 text-xs font-bold uppercase tracking-wider text-white"
                    >
                      Get Free Audit
                    </Link>
                    <a 
                      href={`tel:${siteSettings.contactPhone}`}
                      onClick={() => trackContactTap('call', { location: `Content CTA - ${pageTitle}` })}
                      className="btn btn-outline !border-white/30 hover:!border-white !text-white text-xs font-bold uppercase tracking-wider bg-white/5"
                    >
                      Call {siteSettings.contactPhone}
                    </a>
                    <a 
                      href={`https://wa.me/${siteSettings.whatsapp || siteSettings.whatsappNumber || '917979850684'}?text=Hi%20Afwan%20Tech,%20I%20would%20like%20to%20discuss%20a%20project`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackContactTap('whatsapp', { location: `Content CTA - ${pageTitle}` })}
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
      </section>

      {/* ── 16 COMPREHENSIVE FAQS ACCORDION ── */}
      {faqs && faqs.length > 0 && (
        <section className="py-16 md:py-24 bg-gray-50/70 border-y border-gray-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                Clarification & Answers
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-[#0f172a] font-sora">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-500 text-sm mt-2 max-w-xl mx-auto">
                Verified answers to common questions about services, deliverables, code ownership, and timelines.
              </p>
            </div>

            <div className="space-y-3.5">
              {faqs.map((faq, idx) => {
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
                        <span>{faq.question || faq.q}</span>
                      </span>
                      <ChevronDown 
                        size={18} 
                        className={`text-gray-400 transition-transform flex-shrink-0 ${isOpen ? 'rotate-180 text-primary' : ''}`} 
                      />
                    </button>
                    {isOpen && (
                      <div className="px-6 pb-6 pt-0 text-sm md:text-base text-gray-600 leading-relaxed border-t border-gray-100/80">
                        <p className="mt-4">{faq.answer || faq.a}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CONTENT AUTHORITY SUMMARY ── */}
      {bottomContent && bottomContent.length > 0 && (
        <section className="max-w-4xl mx-auto px-6 pb-16 space-y-6">
          {bottomContent.map((b, idx) => {
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
        </section>
      )}
    </div>
  );
}
