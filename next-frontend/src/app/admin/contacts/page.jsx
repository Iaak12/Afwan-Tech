'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Mail, Phone, MapPin, Globe, RefreshCw, Search, 
  ExternalLink, MessageSquare, ArrowUpRight, Calendar,
  Filter, CheckCircle2, User, ChevronRight, X, Clock, Shield,
  Trash2, Download, CheckSquare, Square, AlertCircle, FileText
} from 'lucide-react';

export default function AdminContactSubmissionsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'location' | 'website'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'new' | 'in_progress' | 'contacted' | 'closed'
  const [search, setSearch] = useState('');
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);
  const [leadNotes, setLeadNotes] = useState('');

  const fetchContacts = async () => {
    setLoading(true);
    try {
      // 1. Try Next.js admin contacts API
      const res = await fetch('/api/admin/contacts', { cache: 'no-store' });
      const json = await res.json();
      if (json.success && Array.isArray(json.data) && json.data.length > 0) {
        setContacts(json.data);
        return;
      }

      // 2. Fallback to stats endpoint
      const statsRes = await fetch('/api/stats', { cache: 'no-store' });
      const statsJson = await statsRes.json();
      const leads = statsJson?.data?.all_leads || statsJson?.data?.recent_leads || [];
      if (leads.length > 0) {
        setContacts(leads);
        return;
      }

      // 3. Fallback directly to Hostinger PHP MySQL backend
      const phpApi = process.env.NEXT_PUBLIC_PHP_API_URL || 'https://violet-ibis-402728.hostingersite.com/api/backend-php';
      const directRes = await fetch(`${phpApi}/contact.php`, { cache: 'no-store' });
      const directJson = await directRes.json();
      if (directJson.success && Array.isArray(directJson.data)) {
        setContacts(directJson.data);
      } else {
        setContacts([]);
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

  // Sync modal notes when lead selected
  useEffect(() => {
    if (selectedLead) {
      setLeadNotes(selectedLead.notes || '');
    }
  }, [selectedLead]);

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

  // Handle single delete
  const handleDeleteSingle = async (id, e) => {
    if (e) e.stopPropagation();
    if (!confirm('Are you sure you want to delete this submission?')) return;

    try {
      setProcessing(true);
      const res = await fetch(`/api/admin/contacts?id=${id}`, { method: 'DELETE' });
      const json = await res.json();
      if (json.success) {
        setMessage({ type: 'success', text: json.message });
        if (selectedLead?.id === id) setSelectedLead(null);
        setSelectedIds(prev => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        fetchContacts();
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = async () => {
    const count = selectedIds.size;
    if (count === 0) return;
    if (!confirm(`Are you sure you want to permanently delete ${count} selected submission(s)?`)) return;

    try {
      setProcessing(true);
      const res = await fetch('/api/admin/contacts', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids: Array.from(selectedIds) })
      });
      const json = await res.json();
      if (json.success) {
        setMessage({ type: 'success', text: json.message });
        setSelectedIds(new Set());
        fetchContacts();
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  // Handle status update
  const handleStatusUpdate = async (id, newStatus, e) => {
    if (e) e.stopPropagation();
    try {
      setProcessing(true);
      const res = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const json = await res.json();
      if (json.success) {
        setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
        if (selectedLead?.id === id) {
          setSelectedLead(prev => ({ ...prev, status: newStatus }));
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setProcessing(false);
    }
  };

  // Handle save notes
  const handleSaveNotes = async () => {
    if (!selectedLead) return;
    try {
      setProcessing(true);
      const res = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: selectedLead.id, notes: leadNotes })
      });
      const json = await res.json();
      if (json.success) {
        setContacts(prev => prev.map(c => c.id === selectedLead.id ? { ...c, notes: leadNotes } : c));
        setSelectedLead(prev => ({ ...prev, notes: leadNotes }));
        setMessage({ type: 'success', text: 'Notes saved for lead!' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  // Export to CSV
  const exportToCSV = () => {
    if (contacts.length === 0) return;
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Service', 'Budget', 'Location', 'Source', 'Lead Type', 'Status', 'Submitted At', 'Notes'];
    const rows = filteredLeads.map(l => [
      `"${l.id || ''}"`,
      `"${(l.name || '').replace(/"/g, '""')}"`,
      `"${l.email || ''}"`,
      `"${l.phone || ''}"`,
      `"${(l.service || '').replace(/"/g, '""')}"`,
      `"${l.budget || ''}"`,
      `"${(l.location || '').replace(/"/g, '""')}"`,
      `"${(l.source || '').replace(/"/g, '""')}"`,
      `"${l.lead_type || ''}"`,
      `"${l.status || 'new'}"`,
      `"${l.created_at || ''}"`,
      `"${(l.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `afwantech_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Selection toggle
  const toggleSelect = (id, e) => {
    if (e) e.stopPropagation();
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const selectAll = () => {
    if (selectedIds.size === filteredLeads.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filteredLeads.map(l => l.id)));
    }
  };

  // Filter leads by tab, status and search
  const filteredLeads = useMemo(() => {
    return contacts.filter(lead => {
      const isLoc = lead.lead_type === 'location' || 
        (lead.location && !lead.location.toLowerCase().includes('direct') && !lead.location.toLowerCase().includes('website') && !lead.location.toLowerCase().includes('global')) ||
        (lead.source && (lead.source.includes('/location/') || lead.source.includes('/market-area/')));

      if (activeTab === 'location' && !isLoc) return false;
      if (activeTab === 'website' && isLoc) return false;

      const leadStatus = lead.status || 'new';
      if (statusFilter !== 'all' && leadStatus !== statusFilter) return false;

      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        (lead.name || '').toLowerCase().includes(q) ||
        (lead.email || '').toLowerCase().includes(q) ||
        (lead.phone || '').toLowerCase().includes(q) ||
        (lead.service || '').toLowerCase().includes(q) ||
        (lead.location || '').toLowerCase().includes(q) ||
        (lead.notes || '').toLowerCase().includes(q)
      );
    });
  }, [contacts, activeTab, statusFilter, search]);

  const counts = useMemo(() => {
    const total = contacts.length;
    let locationCount = 0;
    let websiteCount = 0;
    let newCount = 0;

    contacts.forEach(lead => {
      const isLoc = lead.lead_type === 'location' || 
        (lead.location && !lead.location.toLowerCase().includes('direct') && !lead.location.toLowerCase().includes('website') && !lead.location.toLowerCase().includes('global')) ||
        (lead.source && (lead.source.includes('/location/') || lead.source.includes('/market-area/')));
      if (isLoc) locationCount++;
      else websiteCount++;

      if (!lead.status || lead.status === 'new') newCount++;
    });

    return { total, locationCount, websiteCount, newCount };
  }, [contacts]);

  return (
    <div className="space-y-8 font-inter">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary border border-blue-100 text-xs font-bold uppercase tracking-wider mb-2">
            <Mail size={13} /> Consultation Pipeline & CRM
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-sora">
            Inbound Submissions & Leads
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Track inquiries captured via hero consultation forms, localized landing pages, and contact modals.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedIds.size > 0 && (
            <button
              onClick={handleBulkDelete}
              disabled={processing}
              className="px-4 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer shadow-md transition-colors"
            >
              <Trash2 size={14} />
              <span>Delete Selected ({selectedIds.size})</span>
            </button>
          )}

          <button
            onClick={exportToCSV}
            disabled={contacts.length === 0}
            className="btn btn-outline !px-4 !py-2.5 text-xs font-bold flex items-center gap-2 cursor-pointer"
          >
            <Download size={14} />
            <span>Export CSV</span>
          </button>

          <button 
            onClick={fetchContacts}
            disabled={loading}
            className="btn btn-outline !px-3.5 !py-2.5 text-xs font-bold cursor-pointer"
            title="Refresh Leads"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-primary' : ''} />
          </button>
        </div>
      </div>

      {/* Alert Notification */}
      {message && (
        <div className={`p-4 rounded-2xl flex items-center justify-between gap-3 text-sm font-semibold ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          <div className="flex items-center gap-2">
            {message.type === 'success' ? <CheckCircle2 size={18} className="text-emerald-600 shrink-0" /> : <AlertCircle size={18} className="text-red-600 shrink-0" />}
            <span>{message.text}</span>
          </div>
          <button onClick={() => setMessage(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
            <X size={16} />
          </button>
        </div>
      )}

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Total Inquiries</span>
          <div className="text-3xl font-black text-[#0f172a] font-sora mt-1">{counts.total}</div>
          <span className="text-xs text-primary font-medium">Lifetime leads captured</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">New / Unaddressed</span>
          <div className="text-3xl font-black text-amber-600 font-sora mt-1">{counts.newCount}</div>
          <span className="text-xs text-amber-600 font-medium">Pending initial contact</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Regional City Leads</span>
          <div className="text-3xl font-black text-emerald-600 font-sora mt-1">{counts.locationCount}</div>
          <span className="text-xs text-emerald-600 font-medium">From 595+ city pages</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Direct Website Leads</span>
          <div className="text-3xl font-black text-blue-600 font-sora mt-1">{counts.websiteCount}</div>
          <span className="text-xs text-blue-600 font-medium">From main brand site</span>
        </div>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 bg-gray-100 p-1.5 rounded-2xl self-start">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'all' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              All Leads ({counts.total})
            </button>
            <button
              onClick={() => setActiveTab('location')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'location' ? 'bg-white text-primary shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              City Hub Leads ({counts.locationCount})
            </button>
            <button
              onClick={() => setActiveTab('website')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${activeTab === 'website' ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
            >
              Direct Leads ({counts.websiteCount})
            </button>
          </div>

          {/* Search Input & Status Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3.5 py-2 rounded-xl border border-gray-200 text-xs font-bold text-gray-700 focus:outline-hidden focus:border-primary"
            >
              <option value="all">All Statuses</option>
              <option value="new">🔵 New Inquiries</option>
              <option value="in_progress">🟡 In Progress</option>
              <option value="contacted">🟢 Contacted</option>
              <option value="closed">⚪ Closed</option>
            </select>

            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search name, phone, email, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-64 pl-9 pr-8 py-2 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-primary"
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X size={12} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Submissions Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-black uppercase text-gray-400 tracking-wider">
              <tr>
                <th className="py-4 px-4 text-center w-12">
                  <button onClick={selectAll} className="text-gray-400 hover:text-gray-700 cursor-pointer">
                    {selectedIds.size > 0 && selectedIds.size === filteredLeads.length ? (
                      <CheckSquare size={16} className="text-primary" />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                </th>
                <th className="py-4 px-6">Client / Contact</th>
                <th className="py-4 px-6">Service Requested</th>
                <th className="py-4 px-6">Budget & Location</th>
                <th className="py-4 px-6">Status Tracker</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-gray-400">
                    <Mail size={36} className="mx-auto mb-2 text-gray-300" />
                    <p className="font-bold text-gray-600">No submissions found</p>
                    <p className="text-xs text-gray-400 mt-1">Inbound form submissions will appear here live in real time.</p>
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => {
                  const isSelected = selectedIds.has(lead.id);
                  const isLocationLead = lead.lead_type === 'location' || 
                    (lead.location && !lead.location.toLowerCase().includes('direct') && !lead.location.toLowerCase().includes('website') && !lead.location.toLowerCase().includes('global')) ||
                    (lead.source && (lead.source.includes('/location/') || lead.source.includes('/market-area/')));

                  const leadStatus = lead.status || 'new';

                  return (
                    <tr 
                      key={lead.id} 
                      onClick={() => setSelectedLead(lead)}
                      className={`hover:bg-blue-50/30 transition-colors cursor-pointer group ${isSelected ? 'bg-blue-50/50' : ''}`}
                    >
                      <td className="py-4 px-4 text-center" onClick={(e) => toggleSelect(lead.id, e)}>
                        <button className="text-gray-400 hover:text-primary cursor-pointer">
                          {isSelected ? <CheckSquare size={16} className="text-primary" /> : <Square size={16} />}
                        </button>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-blue-400 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-xs">
                            {lead.name ? lead.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'LD'}
                          </div>
                          <div>
                            <div className="font-bold text-gray-900 group-hover:text-primary transition-colors flex items-center gap-1.5">
                              <span>{lead.name || 'Anonymous'}</span>
                              {isLocationLead && (
                                <span className="text-[9px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                                  City Hub
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-2 text-xs text-gray-400 mt-0.5">
                              {lead.email && <span className="truncate max-w-[150px]">{lead.email}</span>}
                              {lead.phone && <span>• {lead.phone}</span>}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="py-4 px-6 font-semibold text-gray-800">
                        <span className="block text-xs font-bold text-gray-900">{lead.service || 'General Inquiry'}</span>
                        {lead.message && (
                          <span className="text-[11px] text-gray-400 line-clamp-1 mt-0.5 italic">"{lead.message}"</span>
                        )}
                      </td>

                      <td className="py-4 px-6">
                        <span className="text-xs font-bold text-emerald-600 block">{lead.budget || 'Flexible'}</span>
                        <span className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
                          <MapPin size={11} /> {lead.location || 'Direct Website'}
                        </span>
                      </td>

                      <td className="py-4 px-6" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={leadStatus}
                          onChange={(e) => handleStatusUpdate(lead.id, e.target.value)}
                          className={`text-xs font-bold px-2.5 py-1 rounded-lg border cursor-pointer focus:outline-hidden ${
                            leadStatus === 'new' ? 'bg-blue-50 text-primary border-blue-200' :
                            leadStatus === 'in_progress' ? 'bg-amber-50 text-amber-800 border-amber-200' :
                            leadStatus === 'contacted' ? 'bg-emerald-50 text-emerald-800 border-emerald-200' :
                            'bg-gray-100 text-gray-600 border-gray-200'
                          }`}
                        >
                          <option value="new">🔵 New</option>
                          <option value="in_progress">🟡 In Progress</option>
                          <option value="contacted">🟢 Contacted</option>
                          <option value="closed">⚪ Closed</option>
                        </select>
                      </td>

                      <td className="py-4 px-6 font-mono text-xs text-gray-500 whitespace-nowrap">
                        {formatDate(lead.created_at || lead.createdAt)}
                      </td>

                      <td className="py-4 px-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          {cleanPhone(lead.phone) && (
                            <a
                              href={`https://wa.me/${cleanPhone(lead.phone)}?text=${encodeURIComponent(`Hi ${lead.name}, this is Afwan Tech regarding your consultation request for ${lead.service || 'digital growth'}.`)}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                              title="Chat on WhatsApp"
                            >
                              <MessageSquare size={16} />
                            </a>
                          )}

                          <button
                            onClick={(e) => handleDeleteSingle(lead.id, e)}
                            className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            title="Delete Submission"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── LEAD DETAILS & CRM NOTES MODAL ── */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-6 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-primary to-blue-500 text-white font-black text-sm flex items-center justify-center shadow-md">
                  {selectedLead.name ? selectedLead.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : 'LD'}
                </div>
                <div>
                  <h3 className="text-xl font-black font-sora text-gray-900">{selectedLead.name || 'Anonymous'}</h3>
                  <span className="text-xs text-gray-400 font-mono">ID: {selectedLead.id}</span>
                </div>
              </div>
              <button onClick={() => setSelectedLead(null)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            {/* Status & Quick Communication Actions */}
            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <div>
                <span className="text-[10px] font-bold uppercase text-gray-400 block mb-1">Lead Stage</span>
                <select
                  value={selectedLead.status || 'new'}
                  onChange={(e) => handleStatusUpdate(selectedLead.id, e.target.value)}
                  className="text-xs font-bold px-3 py-1.5 rounded-lg border bg-white cursor-pointer"
                >
                  <option value="new">🔵 New Inquiry</option>
                  <option value="in_progress">🟡 In Progress / Follow-Up</option>
                  <option value="contacted">🟢 Contacted & Pitch Sent</option>
                  <option value="closed">⚪ Closed / Converted</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                {cleanPhone(selectedLead.phone) && (
                  <a
                    href={`https://wa.me/${cleanPhone(selectedLead.phone)}?text=${encodeURIComponent(`Hi ${selectedLead.name}, this is Afwan Tech regarding your consultation request.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-2 rounded-xl bg-[#25D366] text-white text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <MessageSquare size={13} /> WhatsApp
                  </a>
                )}
                {selectedLead.phone && (
                  <a
                    href={`tel:${selectedLead.phone}`}
                    className="p-2 rounded-xl bg-blue-50 text-primary hover:bg-blue-100 transition-colors"
                    title="Call"
                  >
                    <Phone size={14} />
                  </a>
                )}
              </div>
            </div>

            {/* Lead Specifications Grid */}
            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Email Address</span>
                <a href={`mailto:${selectedLead.email}`} className="font-bold text-primary hover:underline">{selectedLead.email || 'N/A'}</a>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Phone Number</span>
                <span className="font-bold text-gray-800">{selectedLead.phone || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Service Needed</span>
                <span className="font-bold text-gray-900">{selectedLead.service}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Target Location</span>
                <span className="font-bold text-gray-800">{selectedLead.location || 'Direct Website'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Estimated Budget</span>
                <span className="font-bold text-emerald-600">{selectedLead.budget || 'Flexible'}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-gray-100">
                <span className="text-gray-500 font-medium">Submitted On</span>
                <span className="font-mono text-gray-600">{selectedLead.created_at || selectedLead.createdAt}</span>
              </div>

              {/* Client Message */}
              {selectedLead.message && (
                <div className="pt-2">
                  <span className="text-gray-500 font-bold block mb-1">Client Message:</span>
                  <div className="p-3 bg-gray-50 rounded-xl border border-gray-100 text-gray-700 italic text-xs leading-relaxed">
                    "{selectedLead.message}"
                  </div>
                </div>
              )}

              {/* Internal Notes / Tracking */}
              <div className="pt-2 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700 font-bold flex items-center gap-1.5">
                    <FileText size={13} className="text-primary" /> Internal Follow-up Notes
                  </span>
                  <button
                    onClick={handleSaveNotes}
                    disabled={processing}
                    className="text-xs font-bold text-primary hover:underline cursor-pointer"
                  >
                    Save Notes
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={leadNotes}
                  onChange={(e) => setLeadNotes(e.target.value)}
                  placeholder="e.g. Spoke with client. Looking for Next.js e-commerce store with 200 products. Follow up next Tuesday."
                  className="w-full p-3 rounded-xl border border-gray-200 text-xs focus:outline-hidden focus:border-primary"
                />
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <button
                onClick={() => handleDeleteSingle(selectedLead.id)}
                className="px-4 py-2.5 rounded-xl text-red-600 hover:bg-red-50 text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors"
              >
                <Trash2 size={14} /> Delete Submission
              </button>

              <button
                onClick={() => setSelectedLead(null)}
                className="btn-primary !px-6 !py-2.5 text-xs font-bold cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
