'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles } from 'lucide-react';

export default function ContactForm({ defaultService = 'Web Development', defaultLocation = 'Direct Website', title, subtitle }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interestedIn: defaultService,
    budget: '₹25k - ₹50k',
    message: '',
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

    // Target either PHP endpoint or local Next.js route
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
          pageSource: typeof window !== 'undefined' ? window.location.href : 'Website'
        })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus({
          type: 'success',
          message: data.message || 'Consultation request sent successfully! We will contact you soon.'
        });
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          interestedIn: defaultService,
          budget: '₹25k - ₹50k',
          message: '',
          location: defaultLocation
        });
      } else {
        setStatus({
          type: 'error',
          message: data.message || 'Something went wrong. Please check your details and try again.'
        });
      }
    } catch (err) {
      // If external PHP endpoint had a network issue, attempt fallback to internal Next.js route
      try {
        const fallbackRes = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData)
        });
        const fallbackData = await fallbackRes.json();
        if (fallbackRes.ok && fallbackData.success) {
          setStatus({
            type: 'success',
            message: fallbackData.message
          });
          setFormData({
            firstName: '', lastName: '', email: '', phone: '',
            interestedIn: defaultService, budget: '₹25k - ₹50k', message: '', location: defaultLocation
          });
          return;
        }
      } catch (e) {
        // Fallback also failed
      }

      setStatus({
        type: 'error',
        message: 'Could not connect to server. Please email contact@afwan.agency directly.'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 md:p-10 border border-gray-100 shadow-xl shadow-slate-200/50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />

      {title && (
        <div className="mb-8">
          <span className="text-primary text-xs font-black uppercase tracking-wider block mb-2">Instant Proposal</span>
          <h3 className="text-2xl md:text-3xl font-extrabold text-[#0f172a]">{title}</h3>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
      )}

      {status.message && (
        <div className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm ${status.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
          {status.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" /> : <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />}
          <div>{status.message}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">First Name *</label>
            <input 
              type="text" 
              name="firstName" 
              required
              value={formData.firstName}
              onChange={handleChange}
              placeholder="e.g. Rahul"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm bg-gray-50/50"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleChange}
              placeholder="e.g. Sharma"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm bg-gray-50/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Email Address *</label>
            <input 
              type="email" 
              name="email" 
              required
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm bg-gray-50/50"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Phone / WhatsApp *</label>
            <input 
              type="tel" 
              name="phone" 
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm bg-gray-50/50"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Primary Interest</label>
            <select 
              name="interestedIn" 
              value={formData.interestedIn}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm bg-gray-50/50 text-gray-800"
            >
              <option value="Website Development">Website Development</option>
              <option value="Custom Web Development">Custom Coded Web App</option>
              <option value="E-commerce Development">E-commerce Store</option>
              <option value="Mobile App Development">Mobile App (iOS/Android)</option>
              <option value="SEO Services">Search Engine Optimization (SEO)</option>
              <option value="PPC & Paid Ads">Performance Marketing (PPC)</option>
              <option value="Social Media Management">Social Media Strategy</option>
              <option value="Graphic Design">Branding & UI/UX Design</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Estimated Budget</label>
            <select 
              name="budget" 
              value={formData.budget}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm bg-gray-50/50 text-gray-800"
            >
              <option value="₹15k - ₹25k">₹15,000 - ₹25,000</option>
              <option value="₹25k - ₹50k">₹25,000 - ₹50,000</option>
              <option value="₹50k - ₹1 Lakh">₹50,000 - ₹1,00,000</option>
              <option value="₹1 Lakh - ₹3 Lakh">₹1,00,000 - ₹3,00,000</option>
              <option value="₹3 Lakh+ / Enterprise">₹3,00,000+ (Enterprise)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">Your Message / Project Details</label>
          <textarea 
            name="message" 
            rows="3"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us about your project requirements, current website, or target timeline..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 text-sm bg-gray-50/50"
          ></textarea>
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full btn-primary py-3.5 text-sm uppercase tracking-wider font-bold shadow-lg shadow-primary/25 disabled:opacity-50 cursor-pointer"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" /> Transmitting to Growth Engineers...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Request Free Strategy Proposal <Send size={15} />
            </span>
          )}
        </button>

        <p className="text-[11px] text-center text-gray-400 mt-2">
          🔒 Strict NDA protected. Response guaranteed within 24 hours.
        </p>
      </form>
    </div>
  );
}
