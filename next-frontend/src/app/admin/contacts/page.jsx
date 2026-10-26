'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Mail, Phone, MapPin, Globe, RefreshCw, Search, 
  ExternalLink, MessageSquare, ArrowUpRight, Calendar,
  Filter, CheckCircle2, User, ChevronRight, X, Clock, Shield
} from 'lucide-react';

export default function AdminContactSubmissionsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'location' | 'website'
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const phpApi = process.env.NEXT_PUBLIC_PHP_API_URL;
      const targetUrl = phpApi ? `${phpApi.replace(/\/$/, '')}/stats.php` : '/api/stats';
      const res = await fetch(targetUrl);
      const json = await res.json();
      if (json.success && json.data) {
        setContacts(json.data.all_leads || json.data.recent_leads || []);
      }
    } catch (e) {
      console.error('Error fetching leads:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Filter leads by tab and search
  const filteredLeads = useMemo(() => {
    return contacts.filter(lead => {
      // Determine lead category
      const isLoc = lead.lead_type === 'location' || 
        (lead.location && !lead.location.toLowerCase().includes('direct') && !lead.location.toLowerCase().includes('website') && !lead.location.toLowerCase().includes('global')) ||
        (lead.source && (lead.source.includes('/location/') || lead.source.includes('/market-area/')));

      if (activeTab === 'location' && !isLoc) return false;
      if (activeTab === 'website' && isLoc) return false;

      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        (lead.name || '').toLowerCase().includes(q) ||
        (lead.email || '').toLowerCase().includes(q) ||
        (lead.phone || '').toLowerCase().includes(q) ||
        (lead.service || '').toLowerCase().includes(q) ||
        (lead.location || '').toLowerCase().includes(q)
      );
    });
  }, [contacts, activeTab, search]);

  const counts = useMemo(() => {
    const total = contacts.length;
    let locationCount = 0;
    let websiteCount = 0;

    contacts.forEach(lead => {
      const isLoc = lead.lead_type === 'location' || 
        (lead.location && !lead.location.toLowerCase().includes('direct') && !lead.location.toLowerCase().includes('website') && !lead.location.toLowerCase().includes('global')) ||
        (lead.source && (lead.source.includes('/location/') || lead.source.includes('/market-area/')));
      if (isLoc) locationCount++;
      else websiteCount++;
    });

    return { total, locationCount, websiteCount };
  }, [contacts]);

  // Clean phone for WhatsApp link
  const cleanPhone = (phone) => {
    if (!phone) return '';
    const digits = phone.replace(/\D/g, '');
    if (digits.length === 10) return `91${digits}`;
    return digits;
  };

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return 'Recently';
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      const day = String(d.getDate()).padStart(2, '0');
      const month = String(d.getMonth() + 1).padStart(2, '0');
      const year = d.getFullYear();
      return `${day}/${month}/${year}`;
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6 font-inter text-[#0f172a]">
      {/* Page Title & Subtitle */}
      <div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] font-sora">
          Contact Submissions & Inbound Leads
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 mt-1">
          Track and manage leads categorized by Location vs Website
        </p>
      </div>

      {/* Tabs & Search Filter Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Pills / Tabs */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Tab 1: All Leads */}
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'all'
                ? 'bg-[#0f172a] text-white shadow-sm'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            <span>All Leads ({counts.total})</span>
          </button>

          {/* Tab 2: Location Leads */}
          <button
            onClick={() => setActiveTab('location')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'location'
                ? 'bg-[#EA580C] text-white shadow-sm'
                : 'bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5] hover:bg-[#FFEDD5]/60'
            }`}
          >
            <MapPin size={13} className="text-[#EA580C]" />
            <span>Location Leads ({counts.locationCount})</span>
          </button>

          {/* Tab 3: Website Leads */}
          <button
            onClick={() => setActiveTab('website')}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
              activeTab === 'website'
                ? 'bg-[#2081D3] text-white shadow-sm'
                : 'bg-[#EFF6FF] text-[#2081D3] border border-[#DBEAFE] hover:bg-[#DBEAFE]/60'
            }`}
          >
            <Globe size={13} className="text-[#2081D3]" />
            <span>Website Leads ({counts.websiteCount})</span>
          </button>
        </div>

        {/* Right Search Input & Refresh */}
        <div className="flex items-center gap-3">
          <div className="relative w-full md:w-80">
            <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search name, phone, city, service..."
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white border border-gray-200 focus:border-primary focus:outline-none shadow-2xs"
            />
          </div>

          <button
            onClick={fetchContacts}
            disabled={loading}
            className="p-2 rounded-xl bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 transition-colors cursor-pointer"
            title="Refresh Leads"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin text-primary' : ''} />
          </button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-[#fafafa] text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-5 w-28">DATE</th>
                <th className="py-3.5 px-5 w-52">LEAD ORIGIN</th>
                <th className="py-3.5 px-5 w-44">NAME</th>
                <th className="py-3.5 px-5">CONTACT INFO</th>
                <th className="py-3.5 px-5 w-48">SERVICE</th>
                <th className="py-3.5 px-5 text-right w-24">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-400">
                    <RefreshCw size={24} className="animate-spin mx-auto mb-2 text-primary" />
                    <span>Loading leads...</span>
                  </td>
                </tr>
              ) : filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-gray-400">
                    <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3 text-gray-400">
                      <Mail size={20} />
                    </div>
                    <p className="text-sm font-semibold text-gray-700">No client submissions found</p>
                    <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                      {search ? 'Try adjusting your search filter keywords.' : 'Inbound consultation inquiries from your website and programmatic location pages will be logged here in real-time.'}
                    </p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead, idx) => {
                  const isLoc = lead.lead_type === 'location' || 
                    (lead.location && !lead.location.toLowerCase().includes('direct') && !lead.location.toLowerCase().includes('website') && !lead.location.toLowerCase().includes('global')) ||
                    (lead.source && (lead.source.includes('/location/') || lead.source.includes('/market-area/')));

                  const waDigits = cleanPhone(lead.phone);

                  return (
                    <tr 
                      key={lead.id || idx}
                      onClick={() => setSelectedLead(lead)}
                      className="hover:bg-blue-50/40 transition-colors cursor-pointer group"
                    >
                      {/* DATE */}
                      <td className="py-4 px-5 text-gray-600 font-mono text-[11px] whitespace-nowrap align-top">
                        {formatDate(lead.created_at || lead.createdAt)}
                      </td>

                      {/* LEAD ORIGIN */}
                      <td className="py-4 px-5 align-top">
                        {isLoc ? (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FFF7ED] text-[#EA580C] border border-[#FFEDD5]">
                              Location Lead <ArrowUpRight size={10} />
                            </span>
                            <div className="flex items-center gap-1 text-[11px] text-gray-600 font-medium">
                              <MapPin size={11} className="text-[#EA580C] flex-shrink-0" />
                              <span className="line-clamp-1">{lead.location}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#EFF6FF] text-[#2081D3] border border-[#DBEAFE]">
                              🌐 Website Lead <ArrowUpRight size={10} />
                            </span>
                            <div className="text-[11px] text-gray-500 font-medium line-clamp-1">
                              {lead.source?.includes('http') ? lead.source.split('/').slice(3).join('/') || 'Home Page' : lead.source || 'Website'}
                            </div>
                          </div>
                        )}
                      </td>

                      {/* NAME */}
                      <td className="py-4 px-5 align-top">
                        <span className="font-bold text-gray-900 text-[13px] block font-sora group-hover:text-primary transition-colors">
                          {lead.name}
                        </span>
                        {lead.budget && lead.budget !== 'Flexible' && (
                          <span className="text-[10px] text-gray-400 font-medium">Budget: {lead.budget}</span>
                        )}
                      </td>

                      {/* CONTACT INFO */}
                      <td className="py-4 px-5 align-top space-y-1">
                        {/* Email */}
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Mail size={12} className="text-gray-400 flex-shrink-0" />
                          {lead.email ? (
                            <a 
                              href={`mailto:${lead.email}`} 
                              onClick={(e) => e.stopPropagation()}
                              className="text-primary hover:underline font-medium text-[11px]"
                            >
                              {lead.email}
                            </a>
                          ) : (
                            <span className="text-gray-400 italic text-[11px]">Not Provided</span>
                          )}
                        </div>

                        {/* Phone */}
                        {lead.phone && (
                          <div className="flex items-center gap-1.5 text-gray-700">
                            <Phone size={12} className="text-gray-400 flex-shrink-0" />
                            <a 
                              href={`tel:${lead.phone}`}
                              onClick={(e) => e.stopPropagation()}
                              className="text-gray-700 hover:text-primary font-mono text-[11px]"
                            >
                              {lead.phone}
                            </a>
                          </div>
                        )}

                        {/* WhatsApp Direct Link */}
                        {waDigits && (
                          <div className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#25D366]" />
                            <a 
                              href={`https://wa.me/${waDigits}?text=${encodeURIComponent(`Hi ${lead.name}, thank you for contacting Afwan Tech regarding your project.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-[#16a34a] hover:underline font-bold text-[11px] flex items-center gap-1"
                            >
                              <span>WA: {lead.phone}</span>
                              <ExternalLink size={10} />
                            </a>
                          </div>
                        )}
                      </td>

                      {/* SERVICE */}
                      <td className="py-4 px-5 align-top">
                        <span className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold bg-gray-100 text-gray-800 border border-gray-200">
                          {lead.service || 'Website Development'}
                        </span>
                      </td>

                      {/* ACTION */}
                      <td className="py-4 px-5 text-right align-top">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedLead(lead);
                          }}
                          className="px-2.5 py-1 text-[11px] font-bold text-gray-600 hover:text-primary hover:bg-white rounded-lg border border-gray-200 transition-colors"
                        >
                          View
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over / Modal for Lead Details */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl border border-gray-200 animate-in fade-in zoom-in-95 duration-150">
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Lead Details</span>
                <h3 className="text-lg font-bold text-[#0f172a] font-sora">{selectedLead.name}</h3>
              </div>
              <button 
                onClick={() => setSelectedLead(null)}
                className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500"
              >
                <X size={18} />
              </button>
            </div>

            {/* Details List */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Service Needed</span>
                <span className="font-bold text-primary">{selectedLead.service}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Email</span>
                <a href={`mailto:${selectedLead.email}`} className="font-bold text-primary hover:underline">{selectedLead.email}</a>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Phone</span>
                <a href={`tel:${selectedLead.phone}`} className="font-bold text-gray-900 hover:text-primary">{selectedLead.phone}</a>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Location</span>
                <span className="font-bold text-gray-900">{selectedLead.location || 'Direct Website'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Estimated Budget</span>
                <span className="font-bold text-emerald-600">{selectedLead.budget || 'Flexible'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-50">
                <span className="text-gray-400 font-medium">Submitted On</span>
                <span className="font-mono text-gray-600">{selectedLead.created_at || selectedLead.createdAt}</span>
              </div>
              {selectedLead.source && (
                <div className="flex justify-between py-1.5 border-b border-gray-50">
                  <span className="text-gray-400 font-medium">Origin Source</span>
                  <span className="font-mono text-[10px] text-gray-500 max-w-[250px] truncate">{selectedLead.source}</span>
                </div>
              )}

              {/* Message Box */}
              {selectedLead.message && (
                <div className="pt-2">
                  <span className="text-gray-400 font-medium block mb-1">Client Message:</span>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 italic text-xs leading-relaxed">
                    "{selectedLead.message}"
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="flex items-center gap-3 pt-2">
              {cleanPhone(selectedLead.phone) && (
                <a
                  href={`https://wa.me/${cleanPhone(selectedLead.phone)}?text=${encodeURIComponent(`Hi ${selectedLead.name}, this is Afwan Tech regarding your consultation request.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 rounded-xl bg-[#25D366] text-white text-xs font-bold text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <MessageSquare size={14} /> Chat on WhatsApp
                </a>
              )}
              {selectedLead.email && (
                <a
                  href={`mailto:${selectedLead.email}?subject=${encodeURIComponent(`Afwan Tech - ${selectedLead.service} Consultation`)}`}
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white text-xs font-bold text-center hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5"
                >
                  <Mail size={14} /> Send Email
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
