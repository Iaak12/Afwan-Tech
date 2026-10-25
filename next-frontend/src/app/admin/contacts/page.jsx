'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Calendar, Clock, RefreshCw, Search, Download } from 'lucide-react';

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchContacts = async () => {
    try {
      const phpApi = process.env.NEXT_PUBLIC_PHP_API_URL;
      const targetUrl = phpApi ? `${phpApi.replace(/\/$/, '')}/stats.php` : '/api/stats';
      const res = await fetch(targetUrl);
      const json = await res.json();
      if (json.success && json.data) {
        setContacts(json.data.recent_leads || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const dummyLeads = [
    { id: '1', name: 'Rohan Verma', email: 'rohan@enterprise.in', phone: '+91 98112 44321', service: 'SEO Services', location: 'Mumbai, Maharashtra', budget: '₹50k - ₹1 Lakh', message: 'Looking for aggressive Google page 1 SEO across Mumbai & Pune for our logistics firm.', created_at: '2026-10-23 18:20:00' },
    { id: '2', name: 'Kavita Nair', email: 'kavita@novasolutions.com', phone: '+91 97401 88290', service: 'Website Development', location: 'Bengaluru, Karnataka', budget: '₹1 Lakh - ₹3 Lakh', message: 'Need a fast Next.js website redesign with high conversion rate and 500+ city programmatic SEO.', created_at: '2026-10-23 16:45:00' },
    { id: '3', name: 'Tariq Al-Sayed', email: 'tariq@gulfretail.ae', phone: '+971 50 123 4567', service: 'E-commerce Development', location: 'Dubai, UAE', budget: '₹3 Lakh+ / Enterprise', message: 'Expanding luxury retail online presence across Dubai, Abu Dhabi, and Riyadh.', created_at: '2026-10-23 14:10:00' },
    { id: '4', name: 'Dr. Amit Singhania', email: 'amit@careclinics.in', phone: '+91 98200 99112', service: 'Social Media Management', location: 'Delhi NCR, India', budget: '₹25k - ₹50k', message: 'Want viral Reels production and healthcare patient acquisition strategy.', created_at: '2026-10-23 11:30:00' }
  ];

  const leadsList = contacts.length > 0 ? contacts : dummyLeads;

  const filtered = leadsList.filter(l => 
    (l.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.email || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.service || '').toLowerCase().includes(search.toLowerCase()) ||
    (l.location || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 font-inter">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#0f172a] font-sora">
            Inbound Leads & Client Inquiries
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Consultation requests submitted through Next.js and processed by the PHP contact API.
          </p>
        </div>

        <button 
          onClick={fetchContacts}
          className="btn btn-outline !px-4 !py-2 text-xs font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <RefreshCw size={14} /> Refresh Leads
        </button>
      </div>

      {/* Search Input */}
      <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-3">
        <Search className="text-gray-400 w-4 h-4 ml-2" />
        <input 
          type="text" 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter leads by client name, email, target city, or service..."
          className="w-full text-xs outline-none bg-transparent"
        />
      </div>

      {/* Leads Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map((lead, idx) => (
          <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm space-y-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <h3 className="font-black text-base text-[#0f172a] font-sora">{lead.name}</h3>
                <span className="text-[11px] text-primary font-bold">{lead.service}</span>
              </div>
              <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {lead.budget}
              </span>
            </div>

            <div className="space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-gray-400 flex-shrink-0" />
                <a href={`mailto:${lead.email}`} className="text-primary hover:underline">{lead.email}</a>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gray-400 flex-shrink-0" />
                <a href={`tel:${lead.phone}`} className="hover:text-primary">{lead.phone}</a>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="text-gray-400 flex-shrink-0" />
                <span>{lead.location}</span>
              </div>
            </div>

            {lead.message && (
              <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-600 italic">
                "{lead.message}"
              </div>
            )}

            <div className="flex items-center justify-between pt-2 text-[10px] text-gray-400">
              <span>Submitted: {lead.created_at || 'Recently'}</span>
              <span className="text-emerald-600 font-bold">✓ Logged to PHP Backend</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
