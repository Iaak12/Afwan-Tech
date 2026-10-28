'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { 
  MapPin, Plus, Search, Trash2, Edit3, ExternalLink, RefreshCw, 
  CheckCircle2, AlertCircle, Globe, Building2, Filter, X, 
  ChevronLeft, ChevronRight, Eye, ShieldCheck, Sparkles, Undo2
} from 'lucide-react';

export default function AdminLocationsPage() {
  const [locations, setLocations] = useState([]);
  const [stats, setStats] = useState({ total: 0, cities: 0, states: 0, customAdded: 0, deletedCount: 0 });
  const [availableStates, setAvailableStates] = useState([]);
  const [deletedSlugs, setDeletedSlugs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [message, setMessage] = useState(null);

  // Filters & Pagination
  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('active'); // 'active' | 'custom' | 'deleted'
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 25;

  // Modals state
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // New location form state
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    state: 'Maharashtra',
    type: 'city',
    country: 'India',
    title: '',
    metaDescription: ''
  });

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/locations');
      const json = await res.json();
      if (json.success && json.data) {
        const normalized = (json.data.locations || []).map(loc => ({
          ...loc,
          isCustom: Boolean(loc.isCustom || loc.is_custom === 1 || loc.is_custom === '1' || loc.is_custom === true)
        }));
        setLocations(normalized);
        setStats(json.data.stats || {});
        setAvailableStates(json.data.states || []);
        setDeletedSlugs(json.data.deletedSlugs || []);
      }
    } catch (err) {
      console.error('Failed to load locations', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLocations();
  }, []);

  // Auto generate slug & SEO metadata when city name changes
  const handleNameChange = (e) => {
    const val = e.target.value;
    const autoSlug = val.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const stateName = formData.state || 'India';
    setFormData(prev => ({
      ...prev,
      name: val,
      slug: autoSlug,
      title: `Best Web Development & SEO Agency in ${val}, ${stateName} | Afwan Tech`,
      metaDescription: `Scale revenue in ${val} with award-winning Next.js Web Development, Custom Apps, and Page 1 Google SEO by AFWAN TECH.`
    }));
  };

  // Add City Submit
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    try {
      setProcessing(true);
      setMessage(null);
      const res = await fetch('/api/admin/locations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const json = await res.json();
      if (json.success) {
        setMessage({ type: 'success', text: json.message });
        setAddModalOpen(false);
        setFormData({
          name: '',
          slug: '',
          state: 'Maharashtra',
          type: 'city',
          country: 'India',
          title: '',
          metaDescription: ''
        });
        fetchLocations();
      } else {
        setMessage({ type: 'error', text: json.message || 'Error adding city' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  // Delete City Submit
  const handleDeleteConfirm = async () => {
    if (!selectedLocation) return;
    try {
      setProcessing(true);
      setMessage(null);
      const res = await fetch('/api/admin/locations', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: selectedLocation.slug })
      });
      const json = await res.json();
      if (json.success) {
        setMessage({ type: 'success', text: json.message });
        setDeleteModalOpen(false);
        setSelectedLocation(null);
        fetchLocations();
      } else {
        setMessage({ type: 'error', text: json.message || 'Error deleting city' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  // Restore deleted city
  const handleRestore = async (slug) => {
    try {
      setProcessing(true);
      setMessage(null);
      const res = await fetch('/api/admin/locations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, action: 'restore' })
      });
      const json = await res.json();
      if (json.success) {
        setMessage({ type: 'success', text: json.message });
        fetchLocations();
      }
    } catch (err) {
      setMessage({ type: 'error', text: err.message });
    } finally {
      setProcessing(false);
    }
  };

  // Filtered List
  const filtered = useMemo(() => {
    return locations.filter(loc => {
      const isCustomCity = Boolean(loc.isCustom || loc.is_custom === 1 || loc.is_custom === '1' || loc.is_custom === true);
      if (sourceFilter === 'custom' && !isCustomCity) return false;
      if (stateFilter && loc.state !== stateFilter) return false;
      if (typeFilter && loc.type !== typeFilter) return false;

      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        loc.name.toLowerCase().includes(q) ||
        loc.slug.toLowerCase().includes(q) ||
        (loc.state && loc.state.toLowerCase().includes(q))
      );
    });
  }, [locations, search, stateFilter, typeFilter, sourceFilter]);

  // Pagination slice
  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginatedLocations = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filtered.slice(start, start + pageSize);
  }, [filtered, currentPage]);

  return (
    <div className="space-y-8 font-inter">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-primary border border-blue-100 text-xs font-bold uppercase tracking-wider mb-2">
            <Building2 size={13} /> Programmatic Locations Network
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-sora">
            Cities & Locations Manager
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Add new cities, edit regional metadata, and delete locations. Changes immediately reflect across programmatic pages, sitemaps, and navigation dropdowns.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setAddModalOpen(true)}
            className="btn-primary !px-5 !py-2.5 text-xs uppercase font-bold tracking-wider flex items-center gap-2 cursor-pointer shadow-lg shadow-primary/20"
          >
            <Plus size={15} />
            <span>Add New City</span>
          </button>

          <button 
            onClick={fetchLocations}
            disabled={loading}
            className="btn btn-outline !px-3.5 !py-2.5 text-xs font-bold cursor-pointer"
            title="Refresh List"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-primary' : ''} />
          </button>
        </div>
      </div>

      {/* Notification Message */}
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
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Active Locations</span>
          <div className="text-3xl font-black text-[#0f172a] font-sora mt-1">{stats.total || locations.length}</div>
          <span className="text-xs text-primary font-medium">Pan-India & Global</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Commercial Cities</span>
          <div className="text-3xl font-black text-emerald-600 font-sora mt-1">{stats.cities || 0}</div>
          <span className="text-xs text-gray-400">Target local markets</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">States & Regions</span>
          <div className="text-3xl font-black text-blue-600 font-sora mt-1">{stats.states || 0}</div>
          <span className="text-xs text-gray-400">State hubs</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block">Custom Added Cities</span>
          <div className="text-3xl font-black text-purple-600 font-sora mt-1">{stats.customAdded || 0}</div>
          <span className="text-xs text-purple-500 font-medium">Added via Admin</span>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by city name, state, or slug..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:border-primary"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {/* Filter by State */}
            <select
              value={stateFilter}
              onChange={(e) => { setStateFilter(e.target.value); setCurrentPage(1); }}
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-hidden focus:border-primary"
            >
              <option value="">All States ({availableStates.length})</option>
              {availableStates.map((st, i) => (
                <option key={i} value={st}>{st}</option>
              ))}
            </select>

            {/* Filter by Type */}
            <select
              value={typeFilter}
              onChange={(e) => { setTypeFilter(e.target.value); setCurrentPage(1); }}
              className="px-3.5 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 focus:outline-hidden focus:border-primary"
            >
              <option value="">All Types</option>
              <option value="city">Cities Only</option>
              <option value="state">States Only</option>
            </select>

            {/* Filter by Source */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => { setSourceFilter('active'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${sourceFilter === 'active' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
              >
                All ({locations.length})
              </button>
              <button
                onClick={() => { setSourceFilter('custom'); setCurrentPage(1); }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${sourceFilter === 'custom' ? 'bg-white text-primary shadow-xs' : 'text-gray-500 hover:text-gray-900'}`}
              >
                Custom Added ({stats.customAdded || 0})
              </button>
            </div>
          </div>
        </div>

        {/* Results Count & Reset */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
          <span>Showing <strong>{filtered.length}</strong> matching locations (Page {currentPage} of {totalPages})</span>
          {(search || stateFilter || typeFilter || sourceFilter !== 'active') && (
            <button
              onClick={() => { setSearch(''); setStateFilter(''); setTypeFilter(''); setSourceFilter('active'); setCurrentPage(1); }}
              className="text-primary font-bold hover:underline cursor-pointer"
            >
              Clear All Filters
            </button>
          )}
        </div>
      </div>

      {/* Locations Table */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50/70 border-b border-gray-100 text-[11px] font-black uppercase text-gray-400 tracking-wider">
              <tr>
                <th className="py-4 px-6">Location / City Name</th>
                <th className="py-4 px-6">State / Region</th>
                <th className="py-4 px-6">Type</th>
                <th className="py-4 px-6">SEO Route</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedLocations.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-400">
                    <Building2 size={36} className="mx-auto mb-2 text-gray-300" />
                    <p className="font-bold text-gray-600">No locations found matching your criteria</p>
                    <p className="text-xs text-gray-400 mt-1">Try clearing your search query or add a new city above.</p>
                  </td>
                </tr>
              ) : (
                paginatedLocations.map((loc) => (
                  <tr key={loc.slug} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center font-bold shrink-0">
                          <MapPin size={15} />
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 group-hover:text-primary transition-colors flex items-center gap-2">
                            <span>{loc.name}</span>
                            {(loc.isCustom || loc.is_custom === 1 || loc.is_custom === '1' || loc.is_custom === true) && (
                              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 border border-purple-200">
                                Custom Added
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-gray-400 font-mono">/{loc.slug}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-4 px-6 font-semibold text-gray-700">
                      {loc.state}
                    </td>

                    <td className="py-4 px-6">
                      <span className={`inline-block text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md ${
                        loc.type === 'state' ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-blue-50 text-primary border border-blue-100'
                      }`}>
                        {loc.type || 'city'}
                      </span>
                    </td>

                    <td className="py-4 px-6">
                      <Link
                        href={`/location/${loc.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 text-xs text-primary font-bold hover:underline"
                      >
                        <span>/location/{loc.slug}</span>
                        <ExternalLink size={12} />
                      </Link>
                    </td>

                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/location/${loc.slug}`}
                          target="_blank"
                          className="p-2 text-gray-400 hover:text-primary hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Live Page"
                        >
                          <Eye size={16} />
                        </Link>

                        <button
                          onClick={() => {
                            setSelectedLocation(loc);
                            setDeleteModalOpen(true);
                          }}
                          className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Delete City from Network"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {totalPages > 1 && (
          <div className="p-4 sm:p-6 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong>
            </span>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Deleted Cities Trash Can / Restore Section */}
      {deletedSlugs.length > 0 && (
        <div className="bg-amber-50/60 p-6 rounded-3xl border border-amber-200 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-bold text-amber-900">
              <AlertCircle size={16} className="text-amber-600" />
              <span>Deleted / Excluded Cities ({deletedSlugs.length})</span>
            </div>
            <span className="text-xs text-amber-700">These slugs are removed from the sitemap & routes</span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {deletedSlugs.map((slug) => (
              <span key={slug} className="inline-flex items-center gap-1.5 px-3 py-1 bg-white rounded-lg border border-amber-200 text-xs font-mono text-gray-700 shadow-2xs">
                <span>{slug}</span>
                <button
                  onClick={() => handleRestore(slug)}
                  className="text-primary hover:text-[#2F6097] cursor-pointer ml-1 font-bold"
                  title="Restore this city"
                >
                  <Undo2 size={12} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── ADD NEW CITY MODAL ── */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-gray-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-primary flex items-center justify-center">
                  <Plus size={18} />
                </div>
                <div>
                  <h3 className="text-lg font-black font-sora text-gray-900">Add New City to Network</h3>
                  <p className="text-xs text-gray-400">Instantly creates a programmatic location page and sitemap entry.</p>
                </div>
              </div>
              <button onClick={() => setAddModalOpen(false)} className="text-gray-400 hover:text-gray-600 cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-gray-700 mb-1 font-bold">City / Market Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Gurugram, Navi Mumbai, Noida Sector 62"
                  value={formData.name}
                  onChange={handleNameChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 font-bold">URL Slug *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. gurugram"
                    value={formData.slug}
                    onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-mono font-medium focus:outline-hidden focus:border-primary"
                  />
                  <span className="text-[10px] text-gray-400 mt-1 block">Live at /location/{formData.slug || '...'}</span>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-bold">State / Territory *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Maharashtra, Haryana"
                    value={formData.state}
                    onChange={(e) => setFormData(prev => ({ ...prev, state: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-1 font-bold">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-hidden focus:border-primary"
                  >
                    <option value="city">City / Local Town</option>
                    <option value="state">State / Province</option>
                    <option value="region">International / Region</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 mb-1 font-bold">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData(prev => ({ ...prev, country: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-hidden focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-bold">SEO Title (Auto-generated)</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-normal focus:outline-hidden focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-1 font-bold">Meta Description (Auto-generated)</label>
                <textarea
                  rows={3}
                  value={formData.metaDescription}
                  onChange={(e) => setFormData(prev => ({ ...prev, metaDescription: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 text-xs font-normal focus:outline-hidden focus:border-primary"
                />
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setAddModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold hover:bg-gray-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={processing}
                  className="flex-1 btn-primary py-2.5 text-xs uppercase font-bold tracking-wider cursor-pointer"
                >
                  {processing ? 'Adding City...' : 'Add City & Launch Page'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── DELETE CONFIRMATION MODAL ── */}
      {deleteModalOpen && selectedLocation && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-xl font-black font-sora text-gray-900">Delete "{selectedLocation.name}"?</h3>
              <p className="text-xs text-gray-500">
                Are you sure you want to remove <strong>{selectedLocation.name}</strong> (<code>/{selectedLocation.slug}</code>)?
                This city will be removed from the active locations directory and sitemap.xml.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => { setDeleteModalOpen(false); setSelectedLocation(null); }}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-bold text-xs hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={processing}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold text-xs uppercase tracking-wider cursor-pointer shadow-lg shadow-red-600/20"
              >
                {processing ? 'Deleting...' : 'Yes, Delete City'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

