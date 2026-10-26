'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  FileText, CheckCircle2, AlertTriangle, ExternalLink, 
  Search, MapPin, Globe, Sparkles, Layers 
} from 'lucide-react';
import contentPagesData from '@/data/contentPagesData.json';

export default function AdminPageContentPage() {
  const [search, setSearch] = useState('');

  const filtered = contentPagesData.filter(p => 
    (p.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.title || '').toLowerCase().includes(search.toLowerCase()) ||
    (p.url || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-inter text-[#0f172a]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] font-sora">
            Core Page Content & SEO Directory
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Standardized SEO blueprints, word counts, and keywords across the 11 core agency pages
          </p>
        </div>
      </div>

      {/* Pages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((page, idx) => {
          const internalPath = page.url ? page.url.replace('https://www.afwantech.com', '') || '/' : '/';

          return (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition-shadow group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-gray-500">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-primary border border-blue-100">
                    {page.type || 'Web Page'}
                  </span>
                  <span className="font-mono text-[11px] text-gray-400">{page.wordCount} words</span>
                </div>

                <h3 className="font-bold text-base text-gray-900 group-hover:text-primary transition-colors font-sora">
                  {page.name}
                </h3>

                <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                  {page.description || page.title}
                </p>

                {page.nap && (
                  <div className="pt-2 text-[11px] text-gray-600 space-y-1">
                    <div className="flex items-center gap-1.5">
                      <MapPin size={11} className="text-[#EA580C]" />
                      <span>{page.nap.city}, {page.nap.region}</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] text-gray-400 font-mono truncate max-w-[150px]">
                  {internalPath}
                </span>

                <Link
                  href={internalPath}
                  target="_blank"
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-primary hover:bg-blue-50 border border-blue-200 inline-flex items-center gap-1 transition-colors"
                >
                  <span>View Page</span>
                  <ExternalLink size={12} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
