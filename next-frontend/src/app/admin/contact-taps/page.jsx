'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Phone, MessageSquare, RefreshCw, Search, ArrowUpRight, 
  Smartphone, Monitor, Tablet, Calendar, Filter, Clock, MapPin, Globe 
} from 'lucide-react';

export default function AdminContactTapsPage() {
  const [taps, setTaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'whatsapp' | 'call'
  const [search, setSearch] = useState('');

  const fetchTaps = async () => {
    setLoading(true);
    try {
      const phpApi = process.env.NEXT_PUBLIC_PHP_API_URL;
      const targetUrl = phpApi ? `${phpApi.replace(/\/$/, '')}/stats.php` : '/api/track-tap';
      const res = await fetch(targetUrl);
      const json = await res.json();
      if (json.success && json.data) {
        setTaps(json.data.contact_taps || json.data.recent || []);
      }
    } catch (e) {
      console.error('Error fetching taps:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTaps();
  }, []);

  const counts = useMemo(() => {
    let wa = 0;
    let call = 0;
    let mobile = 0;
    let desktop = 0;

    taps.forEach(t => {
      if (t.type === 'call') call++;
      else wa++;

      if (t.device === 'mobile') mobile++;
      else desktop++;
    });

    return { total: taps.length, wa, call, mobile, desktop };
  }, [taps]);

  const filtered = useMemo(() => {
    return taps.filter(t => {
      if (filterType === 'whatsapp' && t.type !== 'whatsapp') return false;
      if (filterType === 'call' && t.type !== 'call') return false;

      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        (t.path || '').toLowerCase().includes(q) ||
        (t.location || '').toLowerCase().includes(q) ||
        (t.device || '').toLowerCase().includes(q) ||
        (t.referrer || '').toLowerCase().includes(q)
      );
    });
  }, [taps, filterType, search]);

  const formatDate = (dateStr) => {
    if (!dateStr) return 'Just now';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 font-inter text-[#0f172a]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] font-sora">
            Contact Taps (WhatsApp / Call)
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real-time telemetry of direct WhatsApp chat clicks and phone call taps across all site pages
          </p>
        </div>

        <button
          onClick={fetchTaps}
          disabled={loading}
          className="btn btn-outline !px-4 !py-2 text-xs font-bold flex items-center gap-2 self-start sm:self-auto cursor-pointer"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin text-primary' : ''} />
          <span>Sync Taps</span>
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Taps */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Contact Taps</span>
          <div className="text-2xl font-extrabold text-[#0f172a] font-sora mt-1">{counts.total}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Live captured visitor taps</span>
        </div>

        {/* WhatsApp Taps */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">WhatsApp Taps</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageSquare size={14} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-sora mt-1">{counts.wa}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Chats initiated to +91 7979850684</span>
        </div>

        {/* Phone Call Taps */}
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Phone Calls Initiated</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
              <Phone size={14} />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-primary font-sora mt-1">{counts.call}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Tel clicks to +91 7979850684</span>
        </div>

        {/* Device Breakdown */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Device Category</span>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-xs text-gray-700">
              <Smartphone size={15} className="text-emerald-500" />
              <span>Mobile: <strong>{counts.mobile}</strong></span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-700">
              <Monitor size={15} className="text-primary" />
              <span>Desktop: <strong>{counts.desktop}</strong></span>
            </div>
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#0f172a] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Taps ({counts.total})
          </button>

          <button
            onClick={() => setFilterType('whatsapp')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterType === 'whatsapp'
                ? 'bg-[#16a34a] text-white'
                : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
            }`}
          >
            <MessageSquare size={13} />
            <span>WhatsApp ({counts.wa})</span>
          </button>

          <button
            onClick={() => setFilterType('call')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              filterType === 'call'
                ? 'bg-[#2081D3] text-white'
                : 'bg-white text-primary hover:bg-blue-50 border border-blue-200'
            }`}
          >
            <Phone size={13} />
            <span>Phone Calls ({counts.call})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search page URL, city, device..."
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-gray-200 focus:border-primary focus:outline-none"
          />
        </div>
      </div>

      {/* Taps Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-[#fafafa] text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-5">DATE & TIME</th>
                <th className="py-3.5 px-5">ACTION CHANNEL</th>
                <th className="py-3.5 px-5">ORIGIN PAGE</th>
                <th className="py-3.5 px-5">LOCATION CONTEXT</th>
                <th className="py-3.5 px-5">DEVICE</th>
                <th className="py-3.5 px-5 text-right">DESTINATION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <RefreshCw size={22} className="animate-spin mx-auto mb-2 text-primary" />
                    <span>Loading tap telemetry...</span>
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-400">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                      <Phone size={20} />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">No contact taps recorded yet</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                      Clicks on the floating WhatsApp button, call buttons in the header, hero, or footer will be logged here.
                    </p>
                  </td>
                </tr>
              ) : (
                filtered.map((tap, idx) => {
                  const isCall = tap.type === 'call';

                  return (
                    <tr key={tap.id || idx} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-5 font-mono text-[11px] text-gray-600 whitespace-nowrap">
                        {formatDate(tap.created_at)}
                      </td>

                      <td className="py-4 px-5">
                        {isCall ? (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-50 text-primary border border-blue-100">
                            <Phone size={12} /> Phone Call Tap
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-100">
                            <MessageSquare size={12} /> WhatsApp Click
                          </span>
                        )}
                      </td>

                      <td className="py-4 px-5">
                        <span className="font-mono text-[11px] text-gray-800 font-semibold block">
                          {tap.path || '/'}
                        </span>
                        {tap.referrer && tap.referrer !== 'Direct' && (
                          <span className="text-[10px] text-gray-400 block mt-0.5">Ref: {tap.referrer}</span>
                        )}
                      </td>

                      <td className="py-4 px-5">
                        <span className="inline-flex items-center gap-1 text-[11px] text-gray-700 font-medium">
                          <MapPin size={11} className="text-[#EA580C]" />
                          {tap.location || 'Website'}
                        </span>
                      </td>

                      <td className="py-4 px-5">
                        <span className="capitalize text-[11px] text-gray-600 font-medium flex items-center gap-1">
                          {tap.device === 'mobile' ? <Smartphone size={13} className="text-gray-400" /> : <Monitor size={13} className="text-gray-400" />}
                          {tap.device || 'desktop'}
                        </span>
                      </td>

                      <td className="py-4 px-5 text-right font-mono text-[11px] text-gray-600">
                        {isCall ? 'tel:+917979850684' : 'wa.me/917979850684'}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
