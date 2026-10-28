'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, MapPin, Globe, Building2, ChevronRight, Sparkles, 
  Filter, X, ArrowRight, Code, ShoppingCart, Smartphone, 
  BarChart3, Palette, Share2, TrendingUp, Layers, CheckCircle2 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompactHeroForm from '@/components/CompactHeroForm';
import { getAllLocations, getLocationBySlug } from '@/data/locationsData';

const servicesList = [
  { name: 'Website Development', slug: 'website-development', icon: Code, desc: 'High-speed Next.js web systems' },
  { name: 'Custom Web Dev', slug: 'custom-web-development', icon: Layers, desc: 'Bespoke full-stack web applications' },
  { name: 'E-commerce Dev', slug: 'ecommerce-development', icon: ShoppingCart, desc: 'Shopify & headless commerce engines' },
  { name: 'Mobile App Dev', slug: 'app-development', icon: Smartphone, desc: 'Cross-platform iOS & Android apps' },
  { name: 'SEO Services', slug: 'seo-services', icon: TrendingUp, desc: 'Page 1 rankings & semantic authority' },
  { name: 'Performance Marketing', slug: 'ppc-paid-ads', icon: BarChart3, desc: 'Google & Meta high-ROAS ads' },
  { name: 'Social Media Growth', slug: 'social-media-management', icon: Share2, desc: 'Brand advocacy & organic reach' },
  { name: 'Branding & UI/UX', slug: 'graphic-design', icon: Palette, desc: 'Design systems & conversion UX' },
];

export default function MarketAreaPage() {
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all'); // all, state, city, region
  const [selectedCity, setSelectedCity] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const allLocations = useMemo(() => getAllLocations(), []);

  // Read saved location on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('afwan_selected_location');
      if (saved) {
        const found = getLocationBySlug(saved);
        if (found) {
          setSelectedCity(found);
        }
      }
    } catch (_) {}

    const handleLocationChange = (e) => {
      if (e?.detail) {
        const found = getLocationBySlug(e.detail);
        if (found) setSelectedCity(found);
      } else {
        setSelectedCity(null);
      }
    };

    window.addEventListener('afwan_location_changed', handleLocationChange);
    return () => window.removeEventListener('afwan_location_changed', handleLocationChange);
  }, []);

  const handleSelectCity = (loc) => {
    setSelectedCity(loc);
    setIsModalOpen(true);
    try {
      localStorage.setItem('afwan_selected_location', loc.slug);
    } catch (_) {}
    window.dispatchEvent(new CustomEvent('afwan_location_changed', { detail: loc.slug }));
  };

  const handleClearCity = () => {
    setSelectedCity(null);
    setIsModalOpen(false);
    try {
      localStorage.removeItem('afwan_selected_location');
    } catch (_) {}
    window.dispatchEvent(new CustomEvent('afwan_location_changed', { detail: null }));
  };

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

      <main>
        {/* Hero Section */}
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 bg-gradient-to-b from-[#f0f7fd]/70 via-white to-white overflow-hidden border-b border-gray-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-container mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-glow text-xs font-black uppercase tracking-wider">
                  <Globe size={14} className="text-primary" />
                  <span>595+ Programmatic Regional Footprints</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.08] font-sora">
                  Global Reach, <span className="text-gradient">Hyper-Local Dominance</span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                  Tap any city below to instantly adapt the entire site and navbar services dropdown for that location, or explore dedicated Next.js engineering and SEO services.
                </p>

                {/* Active Selected Location Banner */}
                {selectedCity && (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between gap-4 max-w-xl animate-in fade-in slide-in-from-top-1">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary text-white flex items-center justify-center font-bold">
                        <MapPin size={18} />
                      </div>
                      <div>
                        <div className="text-xs text-gray-500 font-medium">Selected Active Region:</div>
                        <div className="text-sm font-black text-[#0f172a]">
                          {selectedCity.name}, {selectedCity.state}
                          <span className="text-primary text-xs ml-2 font-semibold">
                            (Navbar Services Updated)
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-3 py-1.5 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        Explore Services
                      </button>
                      <button
                        onClick={handleClearCity}
                        className="p-1.5 text-gray-400 hover:text-red-500 transition-colors rounded-lg hover:bg-white"
                        title="Clear selection"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Search Bar */}
                <div className="max-w-xl relative">
                  <div className="relative flex items-center">
                    <Search className="absolute left-4 text-gray-400 w-5 h-5 pointer-events-none" />
                    <input 
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search across 595+ cities (e.g. Mumbai, Bengaluru, Noida, Dubai)..."
                      className="w-full pl-12 pr-4 py-3.5 rounded-2xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 shadow-md text-sm bg-white"
                    />
                  </div>
                </div>

                {/* Filter Pills */}
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button 
                    onClick={() => setFilterType('all')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filterType === 'all' ? 'bg-[#0f172a] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}
                  >
                    All Locations ({allLocations.length})
                  </button>
                  <button 
                    onClick={() => setFilterType('state')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filterType === 'state' ? 'bg-[#0f172a] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}
                  >
                    States
                  </button>
                  <button 
                    onClick={() => setFilterType('city')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filterType === 'city' ? 'bg-[#0f172a] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}
                  >
                    Cities
                  </button>
                  <button 
                    onClick={() => setFilterType('region')}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${filterType === 'region' ? 'bg-[#0f172a] text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:border-gray-400'}`}
                  >
                    Global Hubs
                  </button>
                </div>
              </div>

              <div className="lg:col-span-5 w-full">
                <CompactHeroForm 
                  defaultService="SEO Services"
                  title="Expand to Your Next 10 Cities"
                  subtitle="Get a free multi-location programmatic SEO audit & roadmap."
                />
              </div>

            </div>
          </div>
        </section>

        {/* Locations Directory Content */}
        <section className="max-w-container mx-auto px-6 py-12">
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
                        <span className="text-xs text-gray-400">{list.length} dedicated locations indexed • Tap to select</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {list.map((item) => {
                      const isSelected = selectedCity?.slug === item.slug;
                      return (
                        <button
                          key={item.slug}
                          onClick={() => handleSelectCity(item)}
                          className={`p-3.5 rounded-xl border transition-all text-left group flex flex-col justify-between cursor-pointer ${
                            isSelected 
                              ? 'bg-blue-50 border-primary shadow-sm ring-2 ring-primary/20' 
                              : item.type === 'state'
                                ? 'bg-primary/5 border-primary/30 hover:bg-primary/10'
                                : 'bg-gray-50/50 border-gray-100 hover:border-primary/40 hover:bg-white hover:shadow-sm'
                          }`}
                        >
                          <span className={`font-bold text-xs truncate ${isSelected ? 'text-primary' : item.type === 'state' ? 'text-primary' : 'text-[#0f172a] group-hover:text-primary'} transition-colors`}>
                            {item.name}
                          </span>
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-100/60 text-[10px] text-gray-400 w-full">
                            <span className="capitalize">{item.type}</span>
                            <span className="text-primary font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                              Select →
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </main>

      {/* Quick Services Selection Modal / Drawer */}
      {isModalOpen && selectedCity && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-gray-100 relative animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-800 flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>

            {/* Modal Header */}
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <MapPin size={24} />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-primary">
                  Region Activated in Navbar
                </span>
                <h3 className="text-2xl font-black text-[#0f172a]">
                  {selectedCity.name}, {selectedCity.state}
                </h3>
                <p className="text-xs text-gray-500">
                  Services dropdown in the top navbar is now customized for {selectedCity.name}. Select a service below:
                </p>
              </div>
            </div>

            {/* Prominent Website Development Direct Button */}
            <div className="mb-6 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-bold text-primary mb-1">
                  <Sparkles size={14} /> Recommended Entry Point
                </div>
                <div className="text-base font-black text-[#0f172a]">
                  Website Development in {selectedCity.name}
                </div>
                <div className="text-xs text-gray-600">
                  Sub-second Next.js web architecture engineered for {selectedCity.name} market.
                </div>
              </div>
              <Link
                href={`/${selectedCity.slug}/services/website-development`}
                className="btn-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider whitespace-nowrap flex items-center gap-1.5"
              >
                Open Page <ArrowRight size={14} />
              </Link>
            </div>

            {/* All 8 Services Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              {servicesList.map((srv) => {
                const Icon = srv.icon;
                return (
                  <Link
                    key={srv.slug}
                    href={`/${selectedCity.slug}/services/${srv.slug}`}
                    className="p-3.5 rounded-xl border border-gray-100 hover:border-primary/40 hover:bg-blue-50/40 transition-all flex items-start gap-3 group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-gray-100 text-gray-700 group-hover:bg-primary group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors">
                      <Icon size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-bold text-gray-900 group-hover:text-primary transition-colors flex items-center justify-between">
                        <span className="truncate">{srv.name} in {selectedCity.name}</span>
                        <ChevronRight size={13} className="text-gray-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
                      </div>
                      <div className="text-[11px] text-gray-500 line-clamp-1">{srv.desc}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Modal Footer */}
            <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3 text-xs">
              <Link
                href={`/location/${selectedCity.slug}`}
                className="font-bold text-gray-600 hover:text-primary flex items-center gap-1"
              >
                <Globe size={14} /> View Complete Regional Hub for {selectedCity.name}
              </Link>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-500 hover:text-gray-800 font-medium cursor-pointer"
              >
                Close & Keep Active in Navbar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
