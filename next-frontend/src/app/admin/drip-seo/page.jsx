'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Rocket, RefreshCw, CheckCircle2, AlertCircle, ShieldAlert, 
  Layers, Clock, ArrowUpRight, Zap, Globe, ExternalLink 
} from 'lucide-react';

export default function DripSeoAdminPage() {
  const [dripData, setDripData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [speedInput, setSpeedInput] = useState(75);

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

  const total = dripData?.totalLocations || 595;
  const unlocked = dripData?.unlockedCount || 200;
  const queued = dripData?.queuedCount || 395;
  const percent = Math.min(100, Math.round((unlocked / total) * 100));

  return (
    <div className="space-y-8 font-inter">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary border border-blue-100 text-xs font-bold uppercase tracking-wider mb-2">
            <Zap size={13} /> Cohort Indexing Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-sora">
            Drip SEO & Indexing Pacer
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Safely releases programmatic location and service URLs into Google's index in cohorts to protect crawl budget and build domain trust.
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

      {/* Progress Card */}
      <div className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Overall Indexing Lifecycle</span>
            <h2 className="text-2xl font-black font-sora text-[#0f172a] mt-1">
              {unlocked} of {total} Locations Unlocked ({percent}%)
            </h2>
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
            className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full transition-all duration-500 shadow-sm"
            style={{ width: `${percent}%` }}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-100">
            <span className="text-[11px] font-bold uppercase text-emerald-800 tracking-wider block">Active Unlocked</span>
            <span className="text-3xl font-black text-emerald-700 font-sora block mt-1">{unlocked}</span>
            <span className="text-xs text-emerald-600 font-medium">In Sitemap • robots: index</span>
          </div>

          <div className="p-4 bg-amber-50/60 rounded-2xl border border-amber-100">
            <span className="text-[11px] font-bold uppercase text-amber-800 tracking-wider block">Queued Batches</span>
            <span className="text-3xl font-black text-amber-700 font-sora block mt-1">{queued}</span>
            <span className="text-xs text-amber-600 font-medium">Accessible • robots: noindex</span>
          </div>

          <div className="p-4 bg-blue-50/60 rounded-2xl border border-blue-100">
            <span className="text-[11px] font-bold uppercase text-primary tracking-wider block">Weekly Velocity</span>
            <span className="text-3xl font-black text-primary font-sora block mt-1">{dripData?.pagesPerWeek || 75}/wk</span>
            <span className="text-xs text-gray-500 font-medium">Auto-released every 7 days</span>
          </div>

          <div className="p-4 bg-purple-50/60 rounded-2xl border border-purple-100">
            <span className="text-[11px] font-bold uppercase text-purple-800 tracking-wider block">Next Auto Batch</span>
            <span className="text-2xl font-black text-purple-800 font-sora block mt-1.5">{dripData?.nextBatchDate || 'Next Monday'}</span>
            <span className="text-xs text-purple-600 font-medium">+{dripData?.pagesPerWeek || 75} URLs unlock</span>
          </div>
        </div>
      </div>

      {/* Manual Push Controls (Step 7) */}
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
            <span>🚀 Push +100 URLs Live</span>
          </button>

          <button
            onClick={() => handleAction({ action: 'push_urls', count: 200 })}
            disabled={processing}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 cursor-pointer transition-colors shadow-lg shadow-blue-600/20"
          >
            <Rocket size={14} />
            <span>🚀 Push +200 URLs Live</span>
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
              Change Automatic Speed (Pages / Week)
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
            <span className="text-[11px] text-gray-400 block">Recommended: 50 to 100 pages per week for safe domain warm-up.</span>
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
                {dripData?.enabled ? '⚡ Disable Drip (Unlock 100% Pages Now)' : '🛡️ Re-enable Safe Drip Pacing'}
              </button>
            </div>
            <span className="text-[11px] text-gray-400 block">
              {dripData?.enabled 
                ? 'Status: Active Drip SEO (Google only crawls active cohort; queued pages remain noindex).' 
                : 'Status: 100% Unlocked (All 595+ pages rendered in sitemap with index, follow).'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
