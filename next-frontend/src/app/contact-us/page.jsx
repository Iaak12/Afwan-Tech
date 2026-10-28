import React from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, ShieldCheck, Sparkles } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import TrackedContactLink from '@/components/TrackedContactLink';
import { siteSettings } from '@/data/siteData';

export const metadata = {
  title: 'Contact Us | Free Growth Consultation | AFWAN TECH',
  description: 'Connect directly with our engineering and SEO strategists. Guaranteed response within 24 hours.',
  keywords: [
    'contact afwan tech',
    'web development inquiry',
    'hire next.js developers',
    'seo consultation india',
    'custom web application quote',
    'bengaluru software agency contact',
    'mohammad afwan phone',
    'digital marketing agency consultation'
  ],
  alternates: {
    canonical: 'https://www.afwantech.com/contact-us'
  }
};

export default function ContactUsPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen font-inter text-[#0f172a]">
      <Header />

      <main className="pt-36 pb-24">
        {/* Header */}
        <section className="text-center max-w-4xl mx-auto px-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-glow text-xs font-black uppercase tracking-wider mb-6">
            <Sparkles size={14} className="text-primary" />
            <span>Connect Directly With Senior Strategists</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#0f172a] tracking-tight leading-tight mb-6">
            Let's Discuss Your Digital Pipeline
          </h1>

          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Ready to upgrade your web technology, capture rank #1 in your key target cities, or cut customer acquisition costs? Reach out below.
          </p>
        </section>

        {/* Contact Layout Grid */}
        <section className="max-w-container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Info Cards Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm space-y-6">
                <h3 className="text-xl font-extrabold text-[#0f172a] pb-4 border-b border-gray-100">
                  Headquarters & Regional Offices
                </h3>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center flex-shrink-0">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0f172a]">Main Corporate Office</h4>
                    <p className="text-xs text-gray-500 mt-1 leading-relaxed">{siteSettings.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center flex-shrink-0">
                    <Phone size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0f172a]">Direct Telephone</h4>
                    <TrackedContactLink 
                      type="call" 
                      location="Contact Us - India Phone"
                      href={`tel:${siteSettings.contactPhone}`} 
                      className="text-xs text-gray-700 hover:text-primary transition-colors block mt-1"
                    >
                      India: {siteSettings.contactPhone}
                    </TrackedContactLink>
                    <TrackedContactLink 
                      type="call" 
                      location="Contact Us - North America Phone"
                      href={`tel:${siteSettings.contactPhone2}`} 
                      className="text-xs text-gray-500 hover:text-primary transition-colors block"
                    >
                      North America: {siteSettings.contactPhone2}
                    </TrackedContactLink>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center flex-shrink-0">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0f172a]">Electronic Mail</h4>
                    <a href={`mailto:${siteSettings.contactEmail}`} className="text-xs text-primary font-semibold hover:underline block mt-1">
                      {siteSettings.contactEmail}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
                    <Clock size={20} />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-[#0f172a]">Operating Hours</h4>
                    <p className="text-xs text-gray-500 mt-1">Mon – Sat: 9:00 AM – 7:30 PM IST</p>
                    <p className="text-[11px] text-gray-400">Emergency support: 24/7 for SLA retainers</p>
                  </div>
                </div>
              </div>

              {/* Instant WhatsApp Quick connect */}
              <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-3xl text-white shadow-lg flex items-center justify-between">
                <div>
                  <h4 className="font-extrabold text-base">Instant WhatsApp Chat</h4>
                  <p className="text-xs text-emerald-100 mt-0.5">Chat directly with a technical representative</p>
                </div>
                <TrackedContactLink 
                  type="whatsapp"
                  location="Contact Us - Instant WhatsApp Chat"
                  href={`https://wa.me/${siteSettings.whatsapp || siteSettings.whatsappNumber || '917979850684'}?text=Hi%20AFWAN%20Tech,%20I%20would%20like%20to%20discuss%20a%20project`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white text-emerald-700 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-emerald-50 transition-colors shadow-sm"
                >
                  Message Now
                </TrackedContactLink>
              </div>
            </div>

            {/* Form Column */}
            <div className="lg:col-span-7">
              <ContactForm 
                defaultService="Web Development"
                title="Send Us Your Project Brief"
                subtitle="Fill out the form below. We will review your site and reply with actionable advice."
              />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
