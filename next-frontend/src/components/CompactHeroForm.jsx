'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, User, Phone, Mail, ChevronDown } from 'lucide-react';

export default function CompactHeroForm({ 
  defaultService = 'Website Development', 
  defaultLocation = 'Direct Website / Global',
  title = 'Get Instant Proposal & Free Audit',
  subtitle = 'Senior architects reply within 15 minutes. 100% free with zero obligations.'
}) {
  const [formData, setFormData] = useState({
    firstName: '',
    phone: '',
    email: '',
    interestedIn: defaultService,
    location: defaultLocation
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus({ type: '', message: '' });

    const phpApi = process.env.NEXT_PUBLIC_PHP_API_URL;
    const targetUrl = phpApi ? `${phpApi.replace(/\/$/, '')}/contact.php` : '/api/contact';

    try {
      const res = await fetch(targetUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          ...formData,
          lastName: '',
          budget: '₹25k - ₹50k',
          message: `Hero quick inquiry for ${formData.interestedIn} from ${formData.location}`,
          pageSource: typeof window !== 'undefined' ? window.location.href : 'Hero Section'
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: 'Inquiry received! Our director will call you within 15 minutes.'
        });
        setFormData({
          firstName: '',
          phone: '',
          email: '',
          interestedIn: defaultService,
          location: defaultLocation
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Please verify your information and submit again.'
        });
      }
    } catch (err) {
      // Fallback to internal API
      try {
        const fallbackRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            message: `Hero quick inquiry for ${formData.interestedIn}`
          })
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok && fallbackData.success) {
          setStatus({
            type: 'success',
            message: 'Inquiry received! Our director will call you within 15 minutes.'
          });
          setFormData({ firstName: '', phone: '', email: '', interestedIn: defaultService, location: defaultLocation });
          return;
        }
      } catch (e) {}

      setStatus({
        type: 'error',
        message: 'Network issue. Please click the WhatsApp button to chat instantly.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 border border-gray-200/90 shadow-2xl shadow-blue-500/10 overflow-hidden w-full max-w-lg mx-auto">
      {/* Decorative top-right gradient glow */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-br from-primary/15 to-transparent rounded-bl-full pointer-events-none" />

      {/* Header */}
      <div className="mb-5 relative z-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-black uppercase tracking-wider mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Quick 60-Sec Estimate</span>
        </div>
        <h3 className="text-xl sm:text-2xl font-black text-[#0f172a] font-sora tracking-tight leading-snug">
          {title}
        </h3>
        {subtitle && (
          <p className="text-xs text-gray-500 mt-1 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {/* Status banner */}
      {status.message && (
        <div className={`p-3.5 rounded-xl mb-4 flex items-start gap-2.5 text-xs font-semibold ${
          status.type === 'success' 
            ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
            : 'bg-red-50 text-red-800 border border-red-200'
        }`}>
          {status.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
          )}
          <div>{status.message}</div>
        </div>
      )}

      {/* 2 Column Form */}
      <form onSubmit={handleSubmit} className="space-y-3 relative z-10">
        {/* ROW 1: Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
              Your Name *
            </label>
            <div className="relative">
              <input
                type="text"
                name="firstName"
                required
                value={formData.firstName}
                onChange={handleChange}
                placeholder="e.g. Rahul Sharma"
                className="w-full pl-3.5 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm bg-gray-50/70 transition-all font-medium text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
              Phone / WhatsApp *
            </label>
            <div className="relative">
              <input
                type="tel"
                name="phone"
                required
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="w-full pl-3.5 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm bg-gray-50/70 transition-all font-medium text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* ROW 2: Email + Service Required */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
              Email Address *
            </label>
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="name@company.com"
                className="w-full pl-3.5 pr-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm bg-gray-50/70 transition-all font-medium text-gray-900"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold text-gray-700 uppercase tracking-wider mb-1">
              Service Needed
            </label>
            <div className="relative">
              <select
                name="interestedIn"
                value={formData.interestedIn}
                onChange={handleChange}
                className="w-full pl-3.5 pr-8 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-xs sm:text-sm bg-gray-50/70 transition-all font-medium text-gray-900 appearance-none cursor-pointer"
              >
                <option value="Website Development">Website Development</option>
                <option value="Custom Web Development">Custom Coded Web App</option>
                <option value="E-commerce Development">E-commerce Store</option>
                <option value="SEO Services">Search Engine Optimization</option>
                <option value="Mobile App Development">Mobile App (iOS/Android)</option>
                <option value="PPC & Paid Ads">Performance Paid Ads</option>
                <option value="Social Media Management">Social Media Strategy</option>
                <option value="Graphic Design">Branding & UI/UX Design</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* ROW 3: Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full btn-primary py-3 px-5 text-xs sm:text-sm uppercase tracking-wider font-extrabold shadow-lg shadow-primary/30 rounded-xl transition-all duration-300 hover:shadow-xl hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2 cursor-pointer mt-1"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Transmitting to Senior Architects...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <Sparkles size={15} /> Claim Free Strategy & Proposal <Send size={14} />
            </span>
          )}
        </button>

        {/* Trust micro-badges */}
        <div className="pt-2 flex flex-wrap items-center justify-between text-[10px] text-gray-400 font-bold uppercase tracking-wider border-t border-gray-100">
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block" /> 15-Min Response
          </span>
          <span>🔒 100% Privacy</span>
          <span>⭐ 4.9/5 Rating</span>
        </div>
      </form>
    </div>
  );
}
