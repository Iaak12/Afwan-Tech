'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, CheckCircle2, AlertTriangle, ExternalLink, 
  Search, MapPin, Globe, Sparkles, Layers, ChevronRight,
  X, BookOpen, HelpCircle, Key, ShieldCheck, Eye
} from 'lucide-react';
import contentPagesData from '@/data/contentPagesData.json';

export default function AdminPageContentPage() {
  const [search, setSearch] = useState('');
  const [selectedPage, setSelectedPage] = useState(null);
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'faqs' | 'keywords' | 'audit'

  const filtered = contentPagesData.filter(p => 
    (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.url || '').toLowerCase().includes(search.toLowerCase())
  );

  const renderBlock = (block, idx) => {
    switch (block.type) {
      case 'h1':
        return <h1 key={idx} className="text-2xl font-black text-[#0f172a] font-sora mb-3">{block.text}</h1>;
      case 'h2':
        return <h2 key={idx} className="text-xl font-bold text-[#0f172a] font-sora mt-6 mb-2 pt-3 border-t border-gray-100">{block.text}</h2>;
      case 'h3':
        return <h3 key={idx} className="text-base font-bold text-gray-900 font-sora mt-4 mb-2">{block.text}</h3>;
      case 'tagline':
        return <p key={idx} className="text-sm font-semibold text-primary italic bg-blue-50/60 p-3 rounded-xl border-l-4 border-primary my-3">{block.text}</p>;
      case 'p':
        return <p key={idx} className="text-xs sm:text-sm text-gray-700 leading-relaxed my-2">{block.text}</p>;
      case 'ul':
        return (
          <ul key={idx} className="space-y-1.5 my-3 pl-2">
            {block.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={idx} className="space-y-1.5 my-3 pl-2">
            {block.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-gray-700">
                <span className="font-bold text-primary font-mono text-xs">{i + 1}.</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      case 'table':
        return (
          <div key={idx} className="my-4 overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-xs">
              {block.headers && (
                <thead className="bg-[#0f172a] text-white">
                  <tr>
                    {block.headers.map((h, i) => (
                      <th key={i} className="py-2.5 px-4 font-bold">{h}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-gray-100">
                {block.rows?.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="py-2 px-4 text-gray-700">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'cta':
        return (
          <div key={idx} className="my-4 p-4 rounded-xl bg-blue-50 border border-blue-100 text-xs text-gray-800">
            <span className="font-bold text-primary block mb-1">CTA Block:</span>
            <span>{block.text || block.heading}</span>
          </div>
        );
      default:
        return block.text ? <p key={idx} className="text-xs text-gray-600 my-1">{block.text}</p> : null;
    }
  };

  return (
    <div className="space-y-6 font-inter text-[#0f172a]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] font-sora">
            Core Page Content & SEO Directory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Complete SEO blueprints, structured body content, 16 FAQs, and keyword audits across 11 core agency pages
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter pages..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-gray-200 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((page, idx) => {
          const internalPath = page.url ? page.url.replace('https://www.afwantech.com', '') || '/' : '/';
          const mainBlocksCount = page.main_content?.length || 0;
          const faqsCount = page.faqs?.length || 0;
          const totalWords = page.word_counts?.main || 0;

          return (
            <div 
              key={idx}
              onClick={() => setSelectedPage(page)}
              className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-primary border border-blue-100">
                    {page.type || 'Web Page'}
                  </span>
                  <span className="font-mono text-[11px] text-gray-400">{totalWords} words</span>
                </div>

                <h3 className="font-bold text-base text-gray-900 group-hover:text-primary transition-colors font-sora">
                  {page.name}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {page.meta?.description_option_1?.text || page.meta?.h1 || page.title}
                </p>

                {/* Content Pill Badges */}
                <div className="flex items-center gap-2 pt-1 flex-wrap">
                  <span className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 font-semibold text-[10px]">
                    {mainBlocksCount} Content Blocks
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 font-semibold text-[10px]">
                    {faqsCount} FAQs
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-purple-50 text-purple-700 font-semibold text-[10px]">
                    {page.keywords?.length || 0} Keywords
                  </span>
                </div>

                {page.nap && (
                  <div className="pt-2 text-[11px] text-gray-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={11} className="text-[#EA580C]" />
                      <span>{page.nap.city}, {page.nap.region} • {page.nap.phone}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPage(page);
                  }}
                  className="text-xs font-bold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <Eye size={12} /> Inspect Full Content
                </button>

                <Link
                  href={internalPath}
                  target="_blank"
                  onClick={(e) => e.stopPropagation()}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-gray-600 hover:text-primary border border-gray-200 hover:bg-gray-50 inline-flex items-center gap-1"
                >
                  <span>Live Page</span>
                  <ExternalLink size={10} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Content Inspector Drawer / Modal */}
      {selectedPage && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-gray-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Top Bar */}
            <div className="p-6 border-b border-gray-100 flex items-start justify-between bg-[#fafafa]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-primary text-white">
                    {selectedPage.type}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {selectedPage.url}
                  </span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0f172a] font-sora">
                  {selectedPage.name} — Complete Content Blueprint
                </h2>
              </div>
              <button 
                onClick={() => setSelectedPage(null)}
                className="p-2 rounded-full hover:bg-gray-200 text-gray-500"
              >
                <X size={20} />
              </button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2 px-6 pt-3 border-b border-gray-100 bg-white">
              <button
                onClick={() => setActiveTab('content')}
                className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'content'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <FileText size={14} /> Full Body Content ({selectedPage.main_content?.length || 0})
              </button>

              <button
                onClick={() => setActiveTab('faqs')}
                className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'faqs'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <HelpCircle size={14} /> FAQs ({selectedPage.faqs?.length || 0})
              </button>

              <button
                onClick={() => setActiveTab('keywords')}
                className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'keywords'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <Key size={14} /> Target Keywords ({selectedPage.keywords?.length || 0})
              </button>

              <button
                onClick={() => setActiveTab('audit')}
                className={`pb-3 px-3 text-xs font-bold border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === 'audit'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-900'
                }`}
              >
                <ShieldCheck size={14} /> Fixes & Audits ({selectedPage.fixes_before_publishing?.length || 0})
              </button>
            </div>

            {/* Tab Body Content */}
            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {activeTab === 'content' && (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 text-xs space-y-2">
                    <span className="font-bold text-gray-900 block">SEO Meta Title & Description:</span>
                    <p className="font-semibold text-primary">{selectedPage.meta?.title_option_1?.text}</p>
                    <p className="text-gray-600">{selectedPage.meta?.description_option_1?.text}</p>
                  </div>

                  <div className="prose max-w-none pt-2">
                    {selectedPage.main_content?.map((b, idx) => renderBlock(b, idx))}
                  </div>

                  {selectedPage.bottom_content && selectedPage.bottom_content.length > 0 && (
                    <div className="mt-8 pt-8 border-t border-gray-200 space-y-3 bg-gray-50/70 p-6 rounded-2xl">
                      <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block">Bottom Page Content Block</span>
                      {selectedPage.bottom_content.map((b, idx) => renderBlock(b, idx))}
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'faqs' && (
                <div className="space-y-3">
                  {selectedPage.faqs?.map((faq, i) => (
                    <div key={i} className="p-4 rounded-xl bg-gray-50 border border-gray-100 space-y-2">
                      <h4 className="font-bold text-sm text-[#0f172a] font-sora">
                        {i + 1}. {faq.q}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pl-4 border-l-2 border-primary">
                        {faq.a}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'keywords' && (
                <div className="overflow-x-auto rounded-xl border border-gray-200">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#0f172a] text-white">
                      <tr>
                        <th className="py-2.5 px-4">Keyword</th>
                        <th className="py-2.5 px-4">Type</th>
                        <th className="py-2.5 px-4">Search Volume</th>
                        <th className="py-2.5 px-4">Difficulty (KD)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {selectedPage.keywords?.map((kw, i) => (
                        <tr key={i} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/40'}>
                          <td className="py-2.5 px-4 font-bold text-gray-900">{kw.kw}</td>
                          <td className="py-2.5 px-4 text-primary font-semibold">{kw.type}</td>
                          <td className="py-2.5 px-4 font-mono">{kw.vol || 'N/A'}</td>
                          <td className="py-2.5 px-4 font-mono">{kw.kd || 'N/A'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'audit' && (
                <div className="space-y-4">
                  <div>
                    <h4 className="font-bold text-sm text-gray-900 mb-2">Fixes Required Before Publishing:</h4>
                    <ul className="space-y-2">
                      {selectedPage.fixes_before_publishing?.map((fix, i) => (
                        <li key={i} className="p-3 bg-amber-50 rounded-xl border border-amber-100 text-xs text-amber-900 flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-amber-600 mt-0.5 flex-shrink-0" />
                          <span>{fix}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {selectedPage.problems_found && (
                    <div className="pt-4">
                      <h4 className="font-bold text-sm text-gray-900 mb-2">Audit Problems Resolved:</h4>
                      <div className="space-y-2">
                        {selectedPage.problems_found.map((prob, i) => (
                          <div key={i} className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-xs text-gray-700">
                            <span className="font-bold text-gray-900 block mb-1">{prob.issue || `Check ${i + 1}`}</span>
                            <span className="text-gray-500">{prob.evidence || prob.note || JSON.stringify(prob)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
