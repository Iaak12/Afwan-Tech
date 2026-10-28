import React from 'react';
import Link from 'next/link';
import { 
  Rocket, ShieldCheck, Target, Heart, Globe, Users, 
  Award, Sparkles, Star, TrendingUp, CheckCircle2, ArrowRight,
  MapPin, Check 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import CompactHeroForm from '@/components/CompactHeroForm';
import ContentSectionsRenderer from '@/components/ContentSectionsRenderer';
import aboutContent from '@/data/aboutContent.json';

export const metadata = {
  title: 'About Our Agency | AFWAN TECH - Digital Growth & Web Engineering',
  description: 'Learn about the AFWAN TECH journey founded by Mohammad Afwan. 8+ years of engineering high-performance Next.js websites and data-driven SEO for ambitious businesses.',
  alternates: {
    canonical: 'https://www.afwantech.com/about-us'
  }
};

const stats = [
  { v: '8+', l: 'Years of Experience', sub: 'Industry Expertise' },
  { v: '595+', l: 'Cities Network', sub: 'Programmatic SEO Reach' },
  { v: '100%', l: 'Code Ownership', sub: 'Direct client control' },
  { v: 'Direct', l: 'In-House Team', sub: 'Bengaluru headquarters' },
];

const values = [
  { 
    title: 'Innovation First', 
    desc: 'We stay at the bleeding edge — integrating Next.js App Router, edge caching, structured entity schema, and data science into every web build and campaign.' 
  },
  { 
    title: 'Radical Transparency', 
    desc: 'No hidden fees, no vanity impressions, and zero surprise pivots. We provide full source code ownership, live analytics, and clear communication at every sprint.' 
  },
  { 
    title: 'Results-Obsessed Engineering', 
    desc: 'Every layout decision and line of code is measured against business conversions. If a feature does not move the needle for your revenue, we ruthlessly eliminate it.' 
  },
  { 
    title: 'Client-Centric Partnership', 
    desc: 'Your bottom-line growth is our ultimate benchmark. We build enduring multi-year partnerships, not transactional vendor contracts.' 
  },
  { 
    title: 'Global Thinking, Local Nuance', 
    desc: 'Empowering enterprises across India, GCC, UK, and North America with hyper-local programmatic SEO mesh adapted to regional buyer intent.' 
  },
  { 
    title: 'Elite Technical Team', 
    desc: 'A handpicked collective of 50+ specialists — full-stack React/Next.js engineers, technical SEO architects, UI/UX designers, and performance ad strategists.' 
  },
];

const team = [
  {
    name: 'Mohammad Afwan',
    role: 'Founder & CEO',
    bio: 'Visionary entrepreneur and digital architect with 8+ years building high-performance growth systems for global brands. Mohammad founded AFWAN TECH with a singular mission — to make institutional-grade web engineering and Page 1 organic SEO accessible to ambitious businesses worldwide.',
    expertise: ['Growth Strategy', 'SEO Architecture', 'Business Scaling', 'Next.js Systems'],
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400&h=400',
    initials: 'MA',
    isCEO: true,
  },
  {
    name: 'Priya Sharma',
    role: 'Head of Development',
    bio: 'Full-stack software architect with deep expertise in React 19, Next.js App Router, and scalable cloud infrastructure. Leads our technical delivery team ensuring sub-second load times and 100/100 Core Web Vitals on every release.',
    expertise: ['React / Next.js', 'Node.js & PHP APIs', 'Cloud Architecture', 'Core Web Vitals'],
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400&h=400',
    initials: 'PS',
  },
  {
    name: 'Rahul Mehta',
    role: 'SEO & Content Director',
    bio: 'Data-driven technical SEO strategist who has driven sustained organic growth for enterprise e-commerce and SaaS brands. Pioneer of our 500+ city programmatic SEO indexing mesh.',
    expertise: ['Technical SEO', 'Programmatic Indexing', 'Schema.org Graph', 'Digital PR'],
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400&h=400',
    initials: 'RM',
  },
  {
    name: 'Samira Khan',
    role: 'Creative & Design Lead',
    bio: 'Designer with deep UX expertise. Crafts distinctive visual brand identities, conversion-focused Figma design systems, and modern aesthetic user experiences.',
    expertise: ['Brand Identity', 'UI/UX Design Systems', 'Motion & Micro-interactions'],
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=400&h=400',
    initials: 'SK',
  },
  {
    name: 'Arjun Patel',
    role: 'PPC & Performance Lead',
    bio: 'Performance marketing specialist managing $2M+ in monthly ad spend across Google, Meta, and LinkedIn with consistent 4x to 6x ROAS through server-side CAPI tracking.',
    expertise: ['Google Search & Shopping', 'Meta Ads CAPI', 'Funnel CRO', 'Algorithmic Bidding'],
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400&h=400',
    initials: 'AP',
  },
];

const milestones = [
  { year: '2016', title: 'Founded in Delhi', desc: 'Started by Mohammad Afwan as an SEO consultancy driven by a passion for measurable digital growth.' },
  { year: '2018', title: 'Expanded Capabilities', desc: 'Scaled to a full-service agency with dedicated engineering and design divisions.' },
  { year: '2020', title: 'Global Reach', desc: 'Expanded delivery to clients across GCC (Dubai), United Kingdom, and Southeast Asia with an edge-first engineering stack.' },
  { year: '2022', title: 'Programmatic Scale', desc: 'Launched our proprietary programmatic SEO engine powering location search for businesses across the country.' },
  { year: '2024+', title: 'Pan-India & Global Infrastructure', desc: 'Operating high-performance web engineering and programmatic SEO infrastructure serving 595+ commercial cities.' }
];

export default function AboutUsPage() {
  return (
    <div className="bg-white min-h-screen font-inter text-[#0f172a]">
      <Header />

      <main className="pt-28 md:pt-32">
        {/* Breadcrumb */}
        <div className="bg-gray-50 border-b border-gray-100 py-3">
          <div className="max-w-container mx-auto px-6 flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <span className="text-primary font-bold">About Us</span>
          </div>
        </div>

        {/* Hero Section */}
        <section className="relative min-h-[92vh] flex items-center py-20 bg-gradient-to-b from-[#f0f7fd] via-white to-white overflow-hidden border-b border-gray-100">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
          <div className="max-w-container mx-auto px-6 relative z-10 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100/70 border border-blue-200 text-primary text-xs font-black uppercase tracking-wider">
                  <Sparkles size={14} className="text-primary" />
                  <span>The AFWAN TECH Story & Philosophy</span>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0f172a] tracking-tight leading-[1.08] font-sora">
                  Engineering Digital Dominance & <span className="text-gradient">Measurable Revenue Growth</span>
                </h1>

                <p className="text-gray-600 text-base md:text-lg leading-relaxed font-normal">
                  Founded in 2016 by Mohammad Afwan, AFWAN TECH bridges the gap between deep full-stack software engineering and aggressive organic search acquisition. We build fast, beautiful, and indefatigable digital assets.
                </p>

                {/* Stat Counters Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                  {stats.map((s, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl border border-gray-200/80 shadow-xs">
                      <div className="text-2xl font-black text-primary font-sora">{s.v}</div>
                      <div className="text-xs font-bold text-gray-900 mt-0.5">{s.l}</div>
                      <div className="text-[10px] text-gray-400">{s.sub}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: 2-Column Compact Hero Form */}
              <div className="lg:col-span-5 w-full">
                <CompactHeroForm 
                  title="Partner with AFWAN TECH"
                  subtitle="Connect directly with our leadership and senior engineering team within 15 mins."
                />
              </div>

            </div>
          </div>
        </section>

        {/* Founder Narrative Section */}
        <section className="py-16 md:py-24 bg-white border-t border-gray-100">
          <div className="max-w-container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block">
                  Our Inception & Vision
                </span>
                <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a] tracking-tight">
                  Why Mohammad Afwan Started This Agency
                </h2>
                <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    In 2016, the digital agency ecosystem was plagued by two major extremes: traditional IT firms who could write code but knew nothing about organic marketing, and marketing agencies who relied on slow, vulnerable WordPress page-builders that failed every Core Web Vitals benchmark.
                  </p>
                  <p>
                    Mohammad Afwan established AFWAN TECH with an uncompromising vision: <strong>treat web development as high-performance engineering and SEO as a mathematical science.</strong>
                  </p>
                  <p>
                    Over the last 8 years, we have grown into a high-performance digital engineering agency. Today, our proprietary programmatic architecture powers local SEO across 595+ cities in India and global business capitals like Dubai, London, and New York.
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-4 text-sm font-bold text-gray-900">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center font-black">
                    MA
                  </div>
                  <div>
                    <div className="text-base text-gray-900">Mohammad Afwan</div>
                    <div className="text-xs text-gray-500 font-normal">Founder & Chief Executive Officer</div>
                  </div>
                </div>
              </div>

              {/* Mission Card Grid */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Our Mission</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    To engineer high-converting web applications and programmatic SEO ecosystems that grant every business genuine, predictable market leadership.
                  </p>
                </div>
                <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Our Philosophy</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Zero bloat. Sub-second page loads. Clean decoupled APIs. Absolute transparency and 100% intellectual property ownership transferred to our clients.
                  </p>
                </div>
                <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Pan-India Reach</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Over 595 active programmatic city nodes covering Tier-1 metros, Tier-2 commercial hubs, and industrial trade corridors across all 28 states.
                  </p>
                </div>
                <div className="bg-[#f8fafc] p-6 rounded-2xl border border-gray-200">
                  <h3 className="font-bold text-gray-900 text-lg mb-2">Global Impact</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Proven track record across UAE, United Kingdom, USA, Canada, and Australia, delivering high-ROAS performance marketing and custom software.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Company Core Values */}
        <section className="py-16 md:py-24 bg-gray-50/70 border-t border-gray-100">
          <div className="max-w-container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                Guiding Principles
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a]">The Pillars of AFWAN TECH</h2>
              <p className="text-gray-500 text-sm mt-3">The non-negotiable operational principles that steer every project we undertake.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {values.map((val, idx) => (
                <div key={idx} className="bg-white p-7 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-primary flex items-center justify-center font-bold text-sm mb-4">
                    0{idx + 1}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{val.title}</h3>
                  <p className="text-xs text-gray-600 leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership & Specialists Team */}
        <section className="py-16 md:py-24 bg-white border-t border-gray-100">
          <div className="max-w-container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                Executive Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a]">Meet the Minds Behind the Engine</h2>
              <p className="text-gray-500 text-sm mt-3">Direct access to senior engineering and growth directors with proven global credentials.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, idx) => (
                <div key={idx} className="bg-[#fcfcfc] rounded-2xl border border-gray-200 overflow-hidden shadow-sm flex flex-col justify-between">
                  <div>
                    <div className="h-64 overflow-hidden relative bg-gray-100">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                      />
                      {member.isCEO && (
                        <span className="absolute top-3 right-3 bg-primary text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-md">
                          Founder & CEO
                        </span>
                      )}
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-black text-gray-900">{member.name}</h3>
                      <span className="text-xs font-bold text-primary block mb-3">{member.role}</span>
                      <p className="text-xs text-gray-600 leading-relaxed mb-4">{member.bio}</p>
                    </div>
                  </div>

                  <div className="p-6 pt-0 border-t border-gray-100">
                    <span className="text-[10px] font-extrabold uppercase text-gray-400 block mb-2">Core Domains</span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.expertise.map((tag, i) => (
                        <span key={i} className="text-[10px] bg-blue-50 text-primary font-semibold px-2 py-0.5 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Company Timeline & Milestones */}
        <section className="py-16 md:py-24 bg-gray-50/80 border-t border-gray-100">
          <div className="max-w-container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                Our Trajectory
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-[#0f172a]">Milestones That Shaped AFWAN TECH</h2>
            </div>

            <div className="relative max-w-4xl mx-auto">
              <div className="space-y-6">
                {milestones.map((item, idx) => (
                  <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-2xl font-black text-primary font-sora shrink-0">{item.year}</span>
                      <div>
                        <h3 className="font-bold text-gray-900 text-base">{item.title}</h3>
                        <p className="text-xs text-gray-600 mt-1">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Complete Deep About Us Content, 16 FAQs & Principles */}
        <section className="py-20 bg-white">
          <ContentSectionsRenderer 
            contentBlocks={aboutContent.main_content}
            faqs={aboutContent.faqs}
            bottomContent={aboutContent.bottom_content}
            pageTitle="About Afwan Tech"
          />
        </section>

        {/* Consultation Call to Action */}
        <section className="py-20 bg-gradient-to-r from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
          <div className="max-w-4xl mx-auto px-6 text-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              Partner with an Agency That Puts Engineering First
            </h2>
            <p className="text-gray-300 text-base max-w-2xl mx-auto">
              Schedule a strategic consultation directly with Mohammad Afwan and our senior engineering leadership.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/contact-us"
                className="btn-primary px-8 py-3.5 text-sm uppercase tracking-wider font-bold shadow-xl shadow-primary/30"
              >
                Schedule Free Strategy Session
              </Link>
              <Link 
                href="/pricing"
                className="px-8 py-3.5 rounded-xl border border-white/20 text-white font-bold text-sm hover:bg-white/10 transition-colors"
              >
                View Transparent Pricing
              </Link>
            </div>
          </div>
        </section>
        {/* About Page Schema with Keywords */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'AboutPage',
              name: 'About AFWAN TECH',
              description: 'Who Afwan Tech is, how we work and how we compare with top digital marketing companies and software firms.',
              url: 'https://www.afwantech.com/about-us',
              keywords: aboutContent.keywords.join(', '),
              mainEntity: {
                '@type': 'Organization',
                name: 'AFWAN TECH',
                founder: 'Mohammad Afwan',
                foundingDate: '2016',
                url: 'https://www.afwantech.com',
                telephone: '+91 79798 50684',
                email: 'contactafwantech@gmail.com'
              }
            })
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
