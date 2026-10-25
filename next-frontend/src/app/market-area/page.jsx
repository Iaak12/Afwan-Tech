'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, MapPin, Globe, Building2, ChevronRight, Sparkles, Filter } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllLocations } from '@/data/locationsData';

export default function MarketAreaPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, state, city, region

  const allLocations = useMemo(() => getAllLocations(), []);

  const filtered = useMemo(() => {
    return allLocations.filter(loc => {
      const matchSearch = loc.name.toLowerCase().includes(search.toLowerCase()) || 
                          loc.state.toLowerCase().includes(search.toLowerCase());
      if (filterType === 'state') return matchSearch && loc.type === 'state';
      if (filterType === 'city') return matchSearch && loc.type === 'city';
      if (filterType === 'region') return matchSearch && loc.country === 'Global';
      return matchSearch;
    });
  }, [allLocations, search, filterType]);

  // Group by state for organized display
  const stateGroups = useMemo(() => {
    const groups = {};
    filtered.forEach(loc => {
      const st = loc.state || 'Other Regions';
      if (!groups[st]) groups[st] = [];
      groups[st].push(loc);
    });
    return groups;
  }, [filtered]);

  return (
    <div className="bg-[#fcfcfc] min-h-screen text-[#0f172a] font-inter">
      <Header />

      <main className="pt-36 pb-24">
        {/* Hero Header */}
        <section className="text-center max-w-4xl mx-auto px-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-glow text-xs font-black uppercase tracking-wider mb-6">
            <Globe size={14} className="text-primary" />
            <span>500+ Programmatic Regional Footprints</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#0f172a] tracking-tight leading-tight mb-6">
            Global Reach, Hyper-Local Dominance
          </h1>

          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Click on any state or city below to view dedicated technical web development, SEO benchmarks, and digital solutions for that market.
          </p>

          {/* Search Bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <div className="relative flex items-center">
              <Search className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
              <input 
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search across 500+ cities (e.g. Mumbai, Bengaluru, Noida, Dubai)..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-lg shadow-slate-100 text-sm bg-white"
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-6">
            <button 
              onClick={() => setFilterType('all')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filterType === 'all' ? 'bg-[#0f172a] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}
            >
              All Locations ({allLocations.length})
            </button>
            <button 
              onClick={() => setFilterType('state')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filterType === 'state' ? 'bg-[#0f172a] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}
            >
              Indian States ({allLocations.filter(l => l.type === 'state').length})
            </button>
            <button 
              onClick={() => setFilterType('city')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filterType === 'city' ? 'bg-[#0f172a] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}
            >
              Cities ({allLocations.filter(l => l.type === 'city').length})
            </button>
            <button 
              onClick={() => setFilterType('region')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filterType === 'region' ? 'bg-[#0f172a] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}
            >
              Global Hubs ({allLocations.filter(l => l.country === 'Global').length})
            </button>
          </div>
        </section>

        {/* Locations Directory Content */}
        <section className="max-w-container mx-auto px-6">
          <div className="space-y-12">
            {Object.keys(stateGroups).map((stateName) => {
              const list = stateGroups[stateName];
              if (!list || list.length === 0) return null;

              return (
                <div key={stateName} className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h2 className="text-xl font-black text-[#0f172a]">{stateName}</h2>
                        <span className="text-xs text-gray-400">{list.length} dedicated locations indexed</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {list.map((item) => (
                      <Link
                        key={item.slug}
                        href={`/location/${item.slug}`}
                        className={`p-3.5 rounded-xl border transition-all group flex flex-col justify-between ${item.type === 'state' ? 'bg-primary/5 border-primary/30 hover:bg-primary/10' : 'bg-gray-50/50 border-gray-100 hover:border-primary/40 hover:bg-white hover:shadow-sm'}`}
                      >
                        <span className={`font-bold text-xs truncate ${item.type === 'state' ? 'text-primary' : 'text-[#0f172a] group-hover:text-primary'} transition-colors`}>
                          {item.name}
                        </span>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100/60 text-[10px] text-gray-400">
                          <span className="capitalize">{item.type}</span>
                          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform group-hover:text-primary" />
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
