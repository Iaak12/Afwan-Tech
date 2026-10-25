import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MarketingSolutions from '@/components/MarketingSolutions';
import PreFooter from '@/components/PreFooter';
import ContactForm from '@/components/ContactForm';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'Digital Services & Solutions | AFWAN TECH',
  description: 'Explore our full spectrum of digital services: Next.js website development, custom web applications, e-commerce engineering, SEO, and paid performance advertising.',
};

export default function ServicesPage() {
  return (
    <div className="bg-white min-h-screen font-inter text-[#0f172a]">
      <Header />

      <main className="pt-36">
        {/* Services Hero */}
        <section className="text-center max-w-4xl mx-auto px-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-glow text-xs font-black uppercase tracking-wider mb-6">
            <Sparkles size={14} className="text-primary" />
            <span>End-To-End Technical Competencies</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#0f172a] tracking-tight leading-tight mb-6">
            Engineered For Scale, Designed For Impact
          </h1>

          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            From modern headless web architectures to programmatic local SEO and data-backed performance advertising, we construct digital assets that win.
          </p>
        </section>

        {/* Services Grid */}
        <MarketingSolutions />

        {/* Lead Capture Section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6">
            <ContactForm 
              defaultService="Custom Web Development"
              title="Initiate Your Project Discussion"
              subtitle="Tell us your requirements and get a detailed architectural blueprint."
            />
          </div>
        </section>

        <PreFooter />
      </main>

      <Footer />
    </div>
  );
}
