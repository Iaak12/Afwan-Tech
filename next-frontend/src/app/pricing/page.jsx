import React from 'react';
import Link from 'next/link';
import { Check, Zap, Star, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CompactHeroForm from '@/components/CompactHeroForm';
import { pricingPlans } from '@/data/siteData';

export const metadata = {
  title: 'Transparent Pricing Plans | AFWAN TECH',
  description: 'Fixed and predictable pricing for Web Development, Custom Coded Web Applications, Programmatic SEO, and Paid Media Management.',
};

export default function PricingPage() {
  return (
    <div className="bg-[#fcfcfc] min-h-screen font-inter text-[#0f172a]">
      <Header />

      <main>
        {/* Pricing 100vh Hero */}
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 bg-gradient-to-b from-[#f0f7fd]/70 via-white to-white overflow-hidden border-b border-gray-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-container mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-glow text-xs font-black uppercase tracking-wider">
                  <Zap size={14} className="text-primary" />
                  <span>Predictable Investment, Guaranteed Velocity</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.08] font-sora">
                  Transparent Pricing <span className="text-gradient">Built For Growth</span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                  No hidden retainers or opaque hourly billing. Select a performance-focused package below or get a custom scope breakdown in minutes.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <ShieldCheck size={18} className="text-emerald-500 mb-1" />
                    <div className="text-xs font-bold text-gray-900">100% Code Ownership</div>
                    <div className="text-[10px] text-gray-400">Zero vendor lock-in</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <Star size={18} className="text-primary mb-1" />
                    <div className="text-xs font-bold text-gray-900">Milestone Invoicing</div>
                    <div className="text-[10px] text-gray-400">Pay on deliverables</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <Zap size={18} className="text-primary mb-1" />
                    <div className="text-xs font-bold text-gray-900">Direct Slack/Call Sync</div>
                    <div className="text-[10px] text-gray-400">Senior architects</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 w-full">
                <CompactHeroForm 
                  title="Custom Scope & Cost Estimate"
                  subtitle="Need custom enterprise features or SLA? Get a transparent breakdown in 15 mins."
                />
              </div>

            </div>
          </div>
        </section>

        {/* Pricing Cards Grid */}
        <section className="max-w-container mx-auto px-6 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {pricingPlans.map((plan) => (
              <div 
                key={plan.id}
                className={`bg-white rounded-3xl p-8 md:p-10 border transition-all duration-300 flex flex-col justify-between relative ${plan.popular ? 'border-primary shadow-2xl shadow-primary/10 ring-2 ring-primary/20 scale-105 z-10' : 'border-gray-100 shadow-md hover:shadow-xl'}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-white text-[11px] font-black uppercase tracking-wider px-4 py-1 rounded-full shadow-md">
                    Most Popular Choice
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-extrabold text-[#0f172a]">{plan.name}</h3>
                  </div>

                  <p className="text-xs text-gray-500 leading-relaxed mb-6 min-h-[36px]">
                    {plan.desc}
                  </p>

                  <div className="flex items-baseline gap-1 mb-8 pb-6 border-b border-gray-100">
                    <span className="text-4xl sm:text-5xl font-black text-[#0f172a] font-sora">
                      {plan.price}
                    </span>
                    <span className="text-xs text-gray-400 font-bold">{plan.period}</span>
                  </div>

                  <div className="space-y-3 mb-8">
                    <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-2">
                      Included Capabilities:
                    </span>
                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-gray-700 leading-normal">
                        <Check size={14} className="text-primary flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <Link
                  href="/contact-us"
                  className={`w-full py-3.5 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all flex items-center justify-center gap-2 cursor-pointer ${plan.popular ? 'btn-primary shadow-lg shadow-primary/25' : 'bg-gray-100 hover:bg-gray-200 text-gray-800'}`}
                >
                  <span>{plan.cta}</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Guarantees Strip */}
        <section className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            <div>
              <ShieldCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
              <h4 className="font-extrabold text-sm text-[#0f172a]">100% Code Ownership</h4>
              <p className="text-xs text-gray-400 mt-1">Full IP rights and repository access</p>
            </div>
            <div>
              <Zap className="w-8 h-8 text-primary mx-auto mb-2" />
              <h4 className="font-extrabold text-sm text-[#0f172a]">No Long-term Lock-in</h4>
              <p className="text-xs text-gray-400 mt-1">Monthly retainers cancellable with 30 days notice</p>
            </div>
            <div>
              <Star className="w-8 h-8 text-amber-500 mx-auto mb-2" />
              <h4 className="font-extrabold text-sm text-[#0f172a]">Executive Support</h4>
              <p className="text-xs text-gray-400 mt-1">Direct communication via Slack & WhatsApp</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
