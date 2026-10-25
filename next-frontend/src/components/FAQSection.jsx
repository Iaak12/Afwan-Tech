'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '@/data/siteData';

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggle = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-primary text-xs font-black uppercase tracking-widest block mb-3">
            Got Questions?
          </span>
          <h2 className="text-3xl md:text-5xl font-black text-[#0f172a] tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div 
                key={idx}
                className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm transition-all bg-gray-50/40"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-6 font-extrabold text-[#0f172a] text-base md:text-lg flex items-center justify-between gap-4 cursor-pointer hover:text-primary transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown size={20} className={`text-primary transition-transform duration-200 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 text-sm text-gray-600 leading-relaxed border-t border-gray-100 pt-4 bg-white">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
