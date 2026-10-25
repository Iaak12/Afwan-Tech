import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PreFooter from '@/components/PreFooter';
import { portfolioProjects } from '@/data/siteData';

export const metadata = {
  title: 'Client Portfolio & Case Studies | AFWAN TECH',
  description: 'Examine our proven track record: SaaS platforms, high-velocity e-commerce websites, and compounding organic search growth.',
};

export default function PortfolioPage() {
  return (
    <div className="bg-white min-h-screen font-inter text-[#0f172a]">
      <Header />

      <main className="pt-36">
        {/* Header */}
        <section className="text-center max-w-4xl mx-auto px-6 mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-glow text-xs font-black uppercase tracking-wider mb-6">
            <Sparkles size={14} className="text-primary" />
            <span>Demonstrated ROI & Technical Rigor</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-[#0f172a] tracking-tight leading-tight mb-6">
            Featured Case Studies & Client Wins
          </h1>

          <p className="text-gray-500 text-base md:text-lg max-w-2xl mx-auto">
            Real commercial results engineered through high-performance Next.js architectures, programmatic search expansion, and high-converting funnel design.
          </p>
        </section>

        {/* Portfolio Projects Grid */}
        <section className="max-w-container mx-auto px-6 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioProjects.map((project) => (
              <div 
                key={project.id}
                className="bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col group"
              >
                <div className="relative h-64 overflow-hidden bg-gray-100">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#0f172a]/90 backdrop-blur-md text-white text-[11px] font-bold px-3 py-1 rounded-full">
                    {project.category}
                  </div>
                </div>

                <div className="p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-extrabold text-primary uppercase tracking-wider block mb-1">
                      {project.industry} • {project.duration}
                    </span>
                    <h3 className="text-2xl font-black text-[#0f172a] mb-4 group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                  </div>

                  <div className="pt-6 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <div className="text-xl font-black text-primary font-sora">{project.stat1.value}</div>
                      <div className="text-[11px] text-gray-400 font-medium">{project.stat1.label}</div>
                    </div>
                    <div>
                      <div className="text-xl font-black text-[#0f172a] font-sora">{project.stat2.value}</div>
                      <div className="text-[11px] text-gray-400 font-medium">{project.stat2.label}</div>
                    </div>
                    <Link 
                      href="/contact-us"
                      className="w-10 h-10 rounded-xl bg-blue-50 hover:bg-primary text-primary hover:text-white flex items-center justify-center transition-colors shadow-2xs"
                    >
                      <ArrowUpRight size={18} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <PreFooter />
      </main>

      <Footer />
    </div>
  );
}
