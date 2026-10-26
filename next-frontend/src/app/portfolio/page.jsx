import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, TrendingUp, Sparkles, CheckCircle2 } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PreFooter from '@/components/PreFooter';
import CompactHeroForm from '@/components/CompactHeroForm';
import ContentSectionsRenderer from '@/components/ContentSectionsRenderer';
import { portfolioProjects } from '@/data/siteData';
import portfolioContent from '@/data/portfolioContent.json';

export const metadata = {
  title: portfolioContent.metaTitle || 'Client Portfolio & Case Studies | AFWAN TECH',
  description: portfolioContent.metaDescription || 'Examine our proven track record: SaaS platforms, high-velocity e-commerce websites, and compounding organic search growth.',
  keywords: portfolioContent.keywords || [],
  alternates: {
    canonical: 'https://www.afwantech.com/portfolio'
  }
};

export default function PortfolioPage() {
  return (
    <div className="bg-white min-h-screen font-inter text-[#0f172a]">
      <Header />

      <main>
        {/* Portfolio 100vh Hero */}
        <section className="relative min-h-[90vh] flex items-center pt-32 pb-16 bg-gradient-to-b from-[#f0f7fd]/70 via-white to-white overflow-hidden border-b border-gray-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-container mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full badge-glow text-xs font-black uppercase tracking-wider">
                  <Sparkles size={14} className="text-primary" />
                  <span>Demonstrated ROI & Technical Rigor</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.08] font-sora">
                  Featured Case Studies & <span className="text-gradient">Client Wins</span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg max-w-xl font-normal leading-relaxed">
                  Real commercial results engineered through high-performance Next.js architectures, programmatic search expansion, and high-converting funnel design.
                </p>

                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <div className="text-2xl font-black text-primary font-sora">Next.js</div>
                    <div className="text-xs font-bold text-gray-900 mt-0.5">Modern Architecture</div>
                    <div className="text-[10px] text-gray-400">Headless & High Speed</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <div className="text-2xl font-black text-primary font-sora">595+</div>
                    <div className="text-xs font-bold text-gray-900 mt-0.5">Cities Reach</div>
                    <div className="text-[10px] text-gray-400">Programmatic Framework</div>
                  </div>
                  <div className="bg-white p-3.5 rounded-xl border border-gray-200/80 shadow-xs">
                    <div className="text-2xl font-black text-primary font-sora">100%</div>
                    <div className="text-xs font-bold text-gray-900 mt-0.5">Asset Ownership</div>
                    <div className="text-[10px] text-gray-400">Zero lock-in contracts</div>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 w-full">
                <CompactHeroForm 
                  title="Build a Winning Project Next"
                  subtitle="Discuss your vision with our senior tech architects. Get a roadmap in 15 mins."
                />
              </div>

            </div>
          </div>
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

        {/* Complete Deep Portfolio Content, Case Studies Methodology, 16 FAQs */}
        <section className="py-20 bg-white border-t border-gray-100">
          <ContentSectionsRenderer 
            contentBlocks={portfolioContent.main_content}
            faqs={portfolioContent.faqs}
            bottomContent={portfolioContent.bottom_content}
            pageTitle="Portfolio & Case Studies"
          />
        </section>

        <PreFooter />
      </main>

      <Footer />
    </div>
  );
}
