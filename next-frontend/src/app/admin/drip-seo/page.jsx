'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Rocket, RefreshCw, CheckCircle2, AlertCircle, ShieldAlert, 
  Layers, Clock, ArrowUpRight, Zap, Globe, ExternalLink,
  MapPin, Sparkles, Code2, FileText, Check, ChevronRight, Copy
} from 'lucide-react';

export default function DripSeoAdminPage() {
  const [dripData, setDripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [speedInput, setSpeedInput] = useState(75);
  const [copiedUrl, setCopiedUrl] = useState(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/drip-seo');
      const json = await res.json();
      if (json.success && json.data) {
        setDripData(json.data);
        setSpeedInput(json.data.pagesPerWeek);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleAction = async (payload) => {
    try {
      setProcessing(true);
      setMessage(null);
      const res = await fetch('/api/drip-seo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const json = await res.json();
      if (json.success) {
        setMessage({ type: 'success', text: json.message });
        if (json.data) {
          setDripData(json.data);
        } else {
          fetchStatus();
        }
      } else {
        setMessage({ type: 'error', text: json.error || 'Failed to execute action' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  // Dynamic calculations based on full programmatic footprint
  const totalLocations = dripData?.totalLocations || 595;
  const unlockedLocations = dripData?.unlockedCount ?? 595;
  const queuedLocations = dripData?.queuedCount ?? 0;

  const servicesPerLocation = 8;
  const coreServicesCount = 8;
  const staticPagesCount = 8;
  const blogPagesCount = 6;
  const otherPagesCount = coreServicesCount + staticPagesCount + blogPagesCount; // 22

  // Total pages across entire website infrastructure
  const totalCityServiceUrls = totalLocations * servicesPerLocation; // 595 * 8 = 4,760
  const totalProgrammaticUrls = dripData?.totalUrls || (totalLocations + totalCityServiceUrls + otherPagesCount); // 5,377

  // Unlocked pages based on active cohort
  const unlockedCityServiceUrls = unlockedLocations * servicesPerLocation;
  const unlockedTotalUrls = dripData?.unlockedUrls || (unlockedLocations + unlockedCityServiceUrls + otherPagesCount);

  // Queued pages
  const queuedCityServiceUrls = queuedLocations * servicesPerLocation;
  const queuedTotalUrls = dripData?.queuedUrls || (queuedLocations + queuedCityServiceUrls);

  const percent = Math.min(100, Math.round((unlockedLocations / totalLocations) * 100));

  // Sample live URLs from programmatic sitemap
  const sampleUrls = [
    { type: 'Localized City Service', url: 'https://www.afwantech.com/mumbai/services/website-development', desc: 'Mumbai Web Development (High Intent)' },
    { type: 'Localized City Service', url: 'https://www.afwantech.com/delhi/services/seo-services', desc: 'Delhi SEO & Search Ranking Hub' },
    { type: 'Localized City Service', url: 'https://www.afwantech.com/bengaluru/services/app-development', desc: 'Bengaluru Custom Mobile & Web Apps' },
    { type: 'Location Landing Hub', url: 'https://www.afwantech.com/location/hyderabad', desc: 'City Landing Page & Local Telemetry' },
    { type: 'State Directory Hub', url: 'https://www.afwantech.com/location/maharashtra', desc: 'Regional State Aggregate Hub' },
    { type: 'Market Area Directory', url: 'https://www.afwantech.com/market-area', desc: 'Pan-India 595+ Cities Index' },
    { type: 'Core Agency Service', url: 'https://www.afwantech.com/services/website-development', desc: 'Direct Brand Services Landing' },
  ];

  return (
    <div className="space-y-8 font-inter">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary border border-blue-100 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap size={13} /> Cohort Indexing Control & Architecture
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-sora">
            Drip SEO & Programmatic URLs Engine
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Safely paces and manages {totalProgrammaticUrls.toLocaleString()}+ programmatic location & service URLs into Google's search index.
          </p>
        </div>

        <button 
          onClick={fetchStatus}
          disabled={loading || processing}
          className="btn btn-outline !px-4 !py-2 text-xs font-bold flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin text-primary' : ''} />
          <span>Refresh Cohort Data</span>
        </button>
      </div>

      {/* Alert Notification */}
      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {message.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> : <AlertCircle size={18} className="text-red-600 shrink-0" />}
          <span>{message.text}</span>
        </div>
      )}

      {/* ── PROGRAMMATIC ARCHITECTURE BREAKDOWN (595 * 8 + Other Pages) ── */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl border border-blue-900/50 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-blue-800/40 pb-5">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Total Programmatic URL Surface</span>
            <div className="flex items-baseline gap-3 mt-1">
              <span className="text-3xl sm:text-4xl font-black font-sora text-white">
                {totalProgrammaticUrls.toLocaleString()}+ URLs
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100% Live in Sitemap
              </span>
            </div>
            <p className="text-xs text-blue-200/70 mt-1">
              {totalLocations} Locations (Cities, States, Tech Hubs) × 8 Localized Services + Regional Hubs + Core Pages.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/sitemap.xml" 
              target="_blank"
              className="text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 shadow-md shadow-blue-500/20"
            >
              Open Active Sitemap <ExternalLink size={13} />
            </Link>
          </div>
        </div>

        {/* 4 Pillars Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-blue-300 font-bold uppercase">
              <span>City × 8 Services</span>
              <Code2 size={16} className="text-blue-400" />
            </div>
            <div className="text-3xl font-black text-white font-sora">{totalCityServiceUrls.toLocaleString()}</div>
            <div className="text-xs text-blue-200/80 leading-relaxed">
              <strong className="text-white">595 × 8 Services:</strong> e.g. /{'{city}'}/services/website-development with localized FAQs & schemas.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-emerald-300 font-bold uppercase">
              <span>Location Hub Pages</span>
              <MapPin size={16} className="text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white font-sora">{totalLocations}</div>
            <div className="text-xs text-emerald-200/80 leading-relaxed">
              <strong className="text-white">Cities & States:</strong> /location/{'{slug}'} programmatic landing pages covering Pan-India.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-purple-300 font-bold uppercase">
              <span>Core Agency Services</span>
              <Sparkles size={16} className="text-purple-400" />
            </div>
            <div className="text-3xl font-black text-white font-sora">{coreServicesCount}</div>
            <div className="text-xs text-purple-200/80 leading-relaxed">
              <strong className="text-white">Core Services:</strong> /services/{'{service}'} direct agency service landing hubs.
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xs space-y-2">
            <div className="flex items-center justify-between text-xs text-amber-300 font-bold uppercase">
              <span>Static & Blogs</span>
              <FileText size={16} className="text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white font-sora">{otherPagesCount - coreServicesCount}+</div>
            <div className="text-xs text-amber-200/80 leading-relaxed">
              <strong className="text-white">Authority Pages:</strong> /market-area, /about-us, /pricing, /portfolio, /blog articles.
            </div>
          </div>
        </div>
      </div>

      {/* Progress & Indexing Lifecycle Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Drip Pacing & Indexing Lifecycle</span>
            <h2 className="text-2xl font-black font-sora text-[#0f172a] mt-1">
              {unlockedTotalUrls.toLocaleString()} of {totalProgrammaticUrls.toLocaleString()} Total URLs Active ({percent}%)
            </h2>
            <span className="text-xs text-gray-500 font-medium mt-0.5 block">
              {unlockedLocations} of {totalLocations} Locations Unlocked ({unlockedCityServiceUrls.toLocaleString()} Localized Services + {unlockedLocations} Location Hubs + {otherPagesCount} Authority Pages)
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/sitemap.xml" 
              target="_blank"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100"
            >
              Inspect Active Sitemap <ExternalLink size={12} />
            </Link>
            <Link 
              href="/robots.txt" 
              target="_blank"
              className="text-xs font-bold text-gray-700 hover:underline flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200"
            >
              Robots.txt <ExternalLink size={12} />
            </Link>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-100 h-4 rounded-full overflow-hidden p-0.5 border border-gray-200">
          <div 
            className="h-full bg-gradient-to-r from-primary via-blue-500 to-emerald-500 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
            <span className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider block">Active Unlocked URLs</span>
            <span className="text-3xl font-black text-emerald-700 font-sora block mt-1">{unlockedTotalUrls.toLocaleString()}</span>
            <span className="text-xs text-emerald-600 font-medium">{unlockedLocations} Locations Live • robots: index</span>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100">
            <span className="text-[11px] font-bold uppercase text-amber-800 tracking-wider block">Queued Batches</span>
            <span className="text-3xl font-black text-amber-700 font-sora block mt-1">{queuedTotalUrls.toLocaleString()}</span>
            <span className="text-xs text-amber-600 font-medium">{queuedLocations} Locations • robots: noindex</span>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
            <span className="text-[11px] font-bold uppercase text-primary tracking-wider block">Weekly Velocity</span>
            <span className="text-3xl font-black text-primary font-sora block mt-1">{dripData?.pagesPerWeek || 75} loc/wk</span>
            <span className="text-xs text-gray-500 font-medium">~{((dripData?.pagesPerWeek || 75) * 9).toLocaleString()} URLs unlocked every 7 days</span>
          </div>

          <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100">
            <span className="text-[11px] font-bold uppercase text-purple-800 tracking-wider block">Next Auto Batch</span>
            <span className="text-2xl font-black text-purple-800 font-sora block mt-1.5">{dripData?.nextBatchDate || 'Next Monday'}</span>
            <span className="text-xs text-purple-600 font-medium">+{((dripData?.pagesPerWeek || 75) * 9).toLocaleString()} programmatic URLs</span>
          </div>
        </div>
      </div>

      {/* ── PROGRAMMATIC SITEMAP SAMPLE PREVIEW ── */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Live Sitemaps Architecture</span>
            <h3 className="text-xl font-black font-sora text-[#0f172a] mt-0.5">
              Sample Programmatic URLs in Google Sitemap
            </h3>
            <p className="text-xs text-gray-500">
              Each location automatically spins up 8 hyper-targeted service pages with localized H1, pricing FAQs, and structured data.
            </p>
          </div>
          <Link
            href="/market-area"
            target="_blank"
            className="text-xs font-bold text-gray-700 hover:text-primary flex items-center gap-1 self-start sm:self-auto"
          >
            Explore Public Market Area <ArrowUpRight size={13} />
          </Link>
        </div>

        <div className="divide-y divide-gray-100 border border-gray-100 rounded-2xl overflow-hidden bg-gray-50/50">
          {sampleUrls.map((item, idx) => (
            <div key={idx} className="p-3.5 sm:px-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white transition-colors">
              <div className="space-y-0.5 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-md bg-blue-100 text-blue-800 shrink-0">
                    {item.type}
                  </span>
                  <span className="text-xs text-gray-500 truncate">{item.desc}</span>
                </div>
                <div className="font-mono text-xs text-gray-800 truncate font-semibold">
                  {item.url}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => copyToClipboard(item.url)}
                  className="px-2.5 py-1 text-xs rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 flex items-center gap-1 cursor-pointer"
                  title="Copy URL"
                >
                  {copiedUrl === item.url ? <Check size={12} className="text-emerald-600" /> : <Copy size={12} />}
                  <span>{copiedUrl === item.url ? 'Copied' : 'Copy'}</span>
                </button>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 rounded-lg border border-gray-200 hover:bg-gray-100 text-gray-600 hover:text-primary transition-colors"
                  title="Open Page"
                >
                  <ExternalLink size={13} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Manual Push Controls */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Immediate Interventions</span>
          <h3 className="text-xl font-black font-sora text-[#0f172a] mt-1">
            Manual Push & Cohort Release
          </h3>
          <p className="text-xs text-gray-500 mt-1">
            Need to launch campaign URLs ahead of schedule? Instantly unlock batches into the live sitemap and switch robots to index.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <button
            onClick={() => handleAction({ action: 'push_urls', count: 100 })}
            disabled={processing}
            className="btn-primary !px-6 !py-3 text-xs uppercase font-bold tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-primary/20"
          >
            <Rocket size={14} />
            <span>🚀 Push +100 Locations (+900 URLs) Live</span>
          </button>

          <button
            onClick={() => handleAction({ action: 'push_urls', count: 200 })}
            disabled={processing}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-lg shadow-blue-600/20"
          >
            <Rocket size={14} />
            <span>🚀 Push +200 Locations (+1,800 URLs) Live</span>
          </button>

          <button
            onClick={() => handleAction({ action: 'release_batch', count: 1 })}
            disabled={processing}
            className="px-6 py-3 rounded-xl bg-gray-800 hover:bg-black text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Layers size={14} />
            <span>📦 Release +1 Full Batch</span>
          </button>
        </div>

        {/* Speed Adjustment & Mode Toggle */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Change Automatic Speed (Locations / Week)
            </label>
            <div className="flex items-center gap-3">
              <input
                type="number"
                min="10"
                max="500"
                value={speedInput}
                onChange={(e) => setSpeedInput(e.target.value)}
                className="w-32 px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-900 focus:outline-hidden focus:border-primary"
              />
              <button
                onClick={() => handleAction({ pagesPerWeek: Number(speedInput) })}
                disabled={processing}
                className="btn btn-outline !px-4 !py-2.5 text-xs font-bold cursor-pointer"
              >
                Update Speed
              </button>
            </div>
            <span className="text-[11px] text-gray-400 block">Recommended: 50 to 100 locations per week (~450 to 900 URLs/week) for safe domain warm-up.</span>
          </div>

          <div className="space-y-3">
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
              Master Indexing Switch
            </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleAction({ enabled: !dripData?.enabled })}
                disabled={processing}
                className={`px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer ${
                  dripData?.enabled 
                    ? 'bg-amber-100 text-amber-900 hover:bg-amber-200 border border-amber-300' 
                    : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md'
                }`}
              >
                {dripData?.enabled ? '⚡ Disable Drip (Unlock All 5,370+ Pages Now)' : '🛡️ Re-enable Safe Drip Pacing'}
              </button>
            </div>
            <span className="text-[11px] text-gray-400 block">
              {dripData?.enabled 
                ? 'Status: Active Drip SEO (Google only crawls active cohort; queued pages remain noindex).' 
                : 'Status: 100% Unlocked (All 5,370+ URLs rendered in live sitemap with index, follow).'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
