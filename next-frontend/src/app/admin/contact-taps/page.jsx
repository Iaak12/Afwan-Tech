'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Phone, MessageSquare, RefreshCw, Search, ArrowUpRight, 
  Smartphone, Monitor, Tablet, Calendar, Filter, Clock, MapPin, 
  Globe, Download, X, ChevronDown, CheckCircle2
} from 'lucide-react';

export default function AdminContactTapsPage() {
  const [taps, setTaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all'); // 'all' | 'whatsapp' | 'call'
  const [dateRange, setDateRange] = useState('all'); // 'all' | 'today' | 'yesterday' | 'last7' | 'last30' | 'last90' | 'custom'
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');
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

  // Helper to extract timestamp in milliseconds
  const getTapTimestamp = (t) => {
    if (t.timestamp && !isNaN(Number(t.timestamp))) {
      const num = Number(t.timestamp);
      return num > 1e11 ? num : num * 1000;
    }
    if (t.created_at) {
      const d = new Date(t.created_at).getTime();
      if (!isNaN(d)) return d;
    }
    if (t.date) {
      const d = new Date(t.date).getTime();
      if (!isNaN(d)) return d;
    }
    return 0;
  };

  // Filtered taps according to date range, channel type, and search query
  const filtered = useMemo(() => {
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0).getTime();
    const endOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const startOfYesterday = startOfToday - 24 * 60 * 60 * 1000;
    const endOfYesterday = startOfToday - 1;

    const sevenDaysAgo = startOfToday - 6 * 24 * 60 * 60 * 1000;
    const thirtyDaysAgo = startOfToday - 29 * 24 * 60 * 60 * 1000;
    const ninetyDaysAgo = startOfToday - 89 * 24 * 60 * 60 * 1000;

    return taps.filter(t => {
      // 1. Channel Filter
      if (filterType === 'whatsapp' && t.type !== 'whatsapp') return false;
      if (filterType === 'call' && t.type !== 'call') return false;

      // 2. Date Range Filter
      const tapTime = getTapTimestamp(t);
      if (tapTime > 0) {
        if (dateRange === 'today') {
          if (tapTime < startOfToday || tapTime > endOfToday) return false;
        } else if (dateRange === 'yesterday') {
          if (tapTime < startOfYesterday || tapTime > endOfYesterday) return false;
        } else if (dateRange === 'last7') {
          if (tapTime < sevenDaysAgo) return false;
        } else if (dateRange === 'last30') {
          if (tapTime < thirtyDaysAgo) return false;
        } else if (dateRange === 'last90') {
          if (tapTime < ninetyDaysAgo) return false;
        } else if (dateRange === 'custom') {
          if (customStart) {
            const startLimit = new Date(customStart + 'T00:00:00').getTime();
            if (tapTime < startLimit) return false;
          }
          if (customEnd) {
            const endLimit = new Date(customEnd + 'T23:59:59.999').getTime();
            if (tapTime > endLimit) return false;
          }
        }
      }

      // 3. Search Query Filter
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        (t.path || '').toLowerCase().includes(q) ||
        (t.location || '').toLowerCase().includes(q) ||
        (t.device || '').toLowerCase().includes(q) ||
        (t.referrer || '').toLowerCase().includes(q)
      );
    });
  }, [taps, filterType, dateRange, customStart, customEnd, search]);

  // Dynamic KPI counts based on the active filtered set
  const counts = useMemo(() => {
    let wa = 0;
    let call = 0;
    let mobile = 0;
    let desktop = 0;

    filtered.forEach(t => {
      if (t.type === 'call') call++;
      else wa++;

      if (t.device === 'mobile') mobile++;
      else desktop++;
    });

    return { total: filtered.length, wa, call, mobile, desktop };
  }, [filtered]);

  const formatDate = (dateStr, timestamp) => {
    const val = dateStr || timestamp;
    if (!val) return 'Just now';
    try {
      const d = typeof val === 'number' ? new Date(val > 1e11 ? val : val * 1000) : new Date(val);
      if (isNaN(d.getTime())) return dateStr || 'Just now';
      return d.toLocaleString('en-IN', { 
        day: '2-digit', 
        month: 'short', 
        year: 'numeric', 
        hour: '2-digit', 
        minute: '2-digit' 
      });
    } catch {
      return dateStr || 'Just now';
    }
  };

  // Export filtered data as CSV
  const handleExportCSV = () => {
    if (filtered.length === 0) return;
    const headers = ['Date & Time', 'Channel', 'Origin Page', 'Location Context', 'Device', 'Destination'];
    const rows = filtered.map(t => [
      formatDate(t.created_at, t.timestamp),
      t.type === 'call' ? 'Phone Call' : 'WhatsApp',
      `"${(t.path || '/').replace(/"/g, '""')}"`,
      `"${(t.location || 'Website').replace(/"/g, '""')}"`,
      t.device || 'desktop',
      t.type === 'call' ? 'tel:+917979850684' : 'wa.me/917979850684'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `contact_taps_${dateRange}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const dateRangePills = [
    { id: 'all', label: 'All Time' },
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: 'last7', label: 'Last 7 Days' },
    { id: 'last30', label: 'Last 30 Days' },
    { id: 'last90', label: 'Last 90 Days' },
    { id: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="space-y-6 font-inter text-[#0f172a]">
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] font-sora">
            Contact Taps (WhatsApp / Phone Calls)
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Real-time telemetry of direct WhatsApp chat clicks and phone call taps with advanced timeframe filtering
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            disabled={filtered.length === 0}
            className="btn btn-outline !px-3.5 !py-2 text-xs font-bold flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            title="Export filtered records to CSV"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          <button
            onClick={fetchTaps}
            disabled={loading}
            className="btn btn-outline !px-4 !py-2 text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-primary' : ''} />
            <span>Sync Taps</span>
          </button>
        </div>
      </div>

      {/* ── DATE RANGE FILTER BAR ── */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-2xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 scrollbar-none">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mr-1">
              <Calendar size={13} className="text-primary" /> Timeframe:
            </span>
            {dateRangePills.map(pill => {
              const isActive = dateRange === pill.id;
              return (
                <button
                  key={pill.id}
                  onClick={() => setDateRange(pill.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isActive 
                      ? 'bg-primary text-white shadow-sm shadow-primary/20 scale-102' 
                      : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
                  }`}
                >
                  {pill.label}
                </button>
              );
            })}
          </div>

          {/* Active selection tag indicator */}
          <div className="text-xs font-medium text-gray-500 flex items-center gap-2">
            <span>Showing:</span>
            <span className="px-2.5 py-0.5 rounded-md bg-blue-50 text-primary font-bold">
              {dateRangePills.find(p => p.id === dateRange)?.label}
            </span>
          </div>
        </div>

        {/* Custom Date Pickers (Shown only when 'Custom Range' is active) */}
        {dateRange === 'custom' && (
          <div className="pt-3 border-t border-gray-100 flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-bold">From:</span>
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:border-primary focus:outline-none"
              />
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-gray-500 font-bold">To:</span>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-200 text-xs bg-gray-50 focus:bg-white focus:border-primary focus:outline-none"
              />
            </div>
            {(customStart || customEnd) && (
              <button
                onClick={() => { setCustomStart(''); setCustomEnd(''); }}
                className="text-xs text-rose-600 hover:underline flex items-center gap-1 font-bold ml-2"
              >
                <X size={12} /> Clear dates
              </button>
            )}
          </div>
        )}
      </div>

      {/* ── KPI CARDS (DYNMICALLY RE-CALCULATED FOR SELECTED TIMEFRAME) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Taps */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
              Filtered Contact Taps
            </span>
            <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
              {dateRangePills.find(p => p.id === dateRange)?.label}
            </span>
          </div>
          <div className="text-3xl font-extrabold text-[#0f172a] font-sora mt-1">{counts.total}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">
            {counts.total === 1 ? '1 interaction' : `${counts.total} total interactions`} in range
          </span>
        </div>

        {/* WhatsApp Taps */}
        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">WhatsApp Taps</span>
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MessageSquare size={14} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-emerald-600 font-sora mt-1">{counts.wa}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">
            {counts.total > 0 ? `${Math.round((counts.wa / counts.total) * 100)}% of total taps` : 'Chats to WhatsApp'}
          </span>
        </div>

        {/* Phone Call Taps */}
        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Phone Calls Initiated</span>
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
              <Phone size={14} />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-primary font-sora mt-1">{counts.call}</div>
          <span className="text-[11px] text-gray-500 mt-1 block">
            {counts.total > 0 ? `${Math.round((counts.call / counts.total) * 100)}% of total taps` : 'Direct phone calls'}
          </span>
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
          <span className="text-[11px] text-gray-400 mt-1.5 block">
            {counts.total > 0 ? `${Math.round((counts.mobile / counts.total) * 100)}% mobile traffic` : 'Platform split'}
          </span>
        </div>
      </div>

      {/* ── CHANNEL PILLS & SEARCH BAR ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Channel Pills */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilterType('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
              filterType === 'all'
                ? 'bg-[#0f172a] text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            All Channels ({counts.total})
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

        {/* Search Input */}
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

      {/* ── TAPS DATA TABLE ── */}
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
                    <p className="text-sm font-semibold text-gray-700">No contact taps recorded in this timeframe</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                      Try selecting "All Time" or adjusting your search filters to see all recorded taps.
                    </p>
                    {(dateRange !== 'all' || filterType !== 'all' || search) && (
                      <button
                        onClick={() => { setDateRange('all'); setFilterType('all'); setSearch(''); }}
                        className="mt-3 px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold cursor-pointer"
                      >
                        Reset All Filters
                      </button>
                    )}
                  </td>
                </tr>
              ) : (
                filtered.map((tap, idx) => {
                  const isCall = tap.type === 'call';

                  return (
                    <tr key={tap.id || idx} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-4 px-5 font-mono text-[11px] text-gray-600 whitespace-nowrap">
                        {formatDate(tap.created_at, tap.timestamp)}
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
