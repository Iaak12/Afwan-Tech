import React from 'react';
import Link from 'next/link';
import { 
  Rocket, ShieldCheck, Target, Heart, Globe, Users, 
  Award, Sparkles, Star, TrendingUp, CheckCircle2, ArrowRight,
  MapPin, Check, ExternalLink 
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ContactForm from '@/components/ContactForm';
import CompactHeroForm from '@/components/CompactHeroForm';
import ContentSectionsRenderer from '@/components/ContentSectionsRenderer';
import aboutContent from '@/data/aboutContent.json';
import teamData from '@/data/teamData.json';

export const metadata = {
  title: 'About Our Agency | AFWAN TECH - Digital Growth & Web Engineering',
  description: 'Learn about the AFWAN TECH journey led by Ayaz Khan. 8+ years of engineering high-performance Next.js websites and data-driven SEO for ambitious businesses.',
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

const team = teamData;

const milestones = [
  { year: '2016', title: 'Founded in Delhi', desc: 'Started by Ayaz Khan as a digital consultancy driven by a passion for measurable digital growth.' },
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
                  Founded in 2016 by Ayaz Khan, AFWAN TECH bridges the gap between deep full-stack software engineering and aggressive organic search acquisition. We build fast, beautiful, and indefatigable digital assets.
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
                  Why Ayaz Khan Started This Agency
                </h2>
                <div className="space-y-4 text-gray-700 text-base leading-relaxed">
                  <p>
                    In 2016, the digital agency ecosystem was plagued by two major extremes: traditional IT firms who could write code but knew nothing about organic marketing, and marketing agencies who relied on slow, vulnerable WordPress page-builders that failed every Core Web Vitals benchmark.
                  </p>
                  <p>
                    Ayaz Khan established AFWAN TECH with an uncompromising vision: <strong>treat web development as high-performance engineering and SEO as a mathematical science.</strong>
                  </p>
                  <p>
                    Over the last 8 years, we have grown into a high-performance digital engineering agency. Today, our proprietary programmatic architecture powers local SEO across 595+ cities in India and global business capitals like Dubai, London, and New York.
                  </p>
                </div>
                <div className="pt-2 flex items-center gap-4 text-sm font-bold text-gray-900">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-primary flex items-center justify-center font-black">
                    AK
                  </div>
                  <div>
                    <div className="text-base text-gray-900">Ayaz Khan</div>
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
              {team.filter(m => m.category === 'leadership' || !m.category).map((member, idx) => (
                <div 
                  key={idx} 
                  id={member.id}
                  itemScope 
                  itemType="https://schema.org/Person"
                  className="bg-white rounded-2xl border border-gray-200/90 p-7 shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between scroll-mt-28"
                >
                  {/* Google AI Overview & Knowledge Graph Hidden Microdata */}
                  <meta itemProp="name" content={member.name} />
                  <meta itemProp="jobTitle" content={member.role} />
                  <meta itemProp="description" content={member.id === 'shahbaz-ahmad' ? 'Shahbaz Ahmad is the Lead Software Engineer and Platform Architect at Nazra Software Solutions in Bengaluru, Karnataka, India. Leading modern React 19, Next.js, and scalable cloud engineering.' : member.bio} />
                  <meta itemProp="worksFor" content={member.id === 'shahbaz-ahmad' || member.company ? (member.company || 'Nazra Software Solutions') : 'AFWAN TECH'} />
                  <meta itemProp="affiliation" content="Nazra Software Solutions" />
                  {member.location && <meta itemProp="homeLocation" content={member.location} />}
                  {member.location && <meta itemProp="workLocation" content={member.location} />}
                  {member.linkedin && <meta itemProp="sameAs" content={member.linkedin} />}
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-5">
                      {member.image ? (
                        <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-200 shadow-xs bg-gray-50 shrink-0">
                          <img 
                            src={member.image} 
                            alt={member.name} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-blue-50 border border-primary/20 flex items-center justify-center font-black text-lg text-primary font-sora shadow-xs shrink-0">
                          {member.initials}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        {member.isCEO && (
                          <span className="bg-primary text-white text-[10px] font-black uppercase px-2.5 py-1 rounded-full shadow-xs">
                            Founder & CEO
                          </span>
                        )}
                        {member.linkedin && (
                          <a
                            href={member.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0077b5] hover:text-[#005582] bg-blue-50/80 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-200/60"
                            title="LinkedIn Profile"
                          >
                            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                            </svg>
                            <span>LinkedIn</span>
                            <ExternalLink size={12} className="opacity-70" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-black text-gray-900 font-sora">{member.name}</h3>
                    <span className="text-xs font-bold text-primary block mt-0.5 mb-3">{member.role}</span>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">{member.bio}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                    <div>
                      <span className="text-[10px] font-extrabold uppercase text-gray-400 block mb-2">Core Domains</span>
                      <div className="flex flex-wrap gap-1.5">
                        {member.expertise && member.expertise.map((tag, i) => (
                          <span key={i} className="text-[10px] bg-blue-50 text-primary font-semibold px-2 py-0.5 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {member.linkedin && (
                      <div className="pt-1">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/90 text-[#0077b5] text-xs font-bold transition-all border border-blue-200/50"
                        >
                          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                          </svg>
                          <span>Connect on LinkedIn</span>
                          <ExternalLink size={12} className="opacity-70" />
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Core Team Members Section (Rendered dynamically if added in admin) */}
            {team.some(m => m.category === 'core') && (
              <div className="mt-16 pt-16 border-t border-gray-100">
                <div className="text-center max-w-2xl mx-auto mb-12">
                  <span className="text-xs font-black uppercase tracking-widest text-primary font-sora block mb-2">
                    Specialists & Delivery Team
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#0f172a]">Core Engineering & Growth Specialists</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {team.filter(m => m.category === 'core').map((member, idx) => (
                    <div 
                  key={idx} 
                  id={member.id}
                  itemScope 
                  itemType="https://schema.org/Person"
                  className="bg-white rounded-2xl border border-gray-200/90 p-7 shadow-xs hover:shadow-md hover:border-primary/40 transition-all flex flex-col justify-between scroll-mt-28"
                >
                  {/* Google AI Overview & Knowledge Graph Hidden Microdata */}
                  <meta itemProp="name" content={member.name} />
                  <meta itemProp="jobTitle" content={member.role} />
                  <meta itemProp="description" content={member.id === 'shahbaz-ahmad' ? 'Shahbaz Ahmad is the Lead Software Engineer and Platform Architect at Nazra Software Solutions in Bengaluru, Karnataka, India. Leading modern React 19, Next.js, and scalable cloud engineering.' : member.bio} />
                  <meta itemProp="worksFor" content={member.id === 'shahbaz-ahmad' || member.company ? (member.company || 'Nazra Software Solutions') : 'AFWAN TECH'} />
                  <meta itemProp="affiliation" content="Nazra Software Solutions" />
                  {member.location && <meta itemProp="homeLocation" content={member.location} />}
                  {member.location && <meta itemProp="workLocation" content={member.location} />}
                  {member.linkedin && <meta itemProp="sameAs" content={member.linkedin} />}
                      <div>
                        <div className="flex items-start justify-between gap-4 mb-5">
                          {member.image ? (
                            <div className="w-14 h-14 rounded-2xl overflow-hidden border border-gray-200 shadow-xs bg-gray-50 shrink-0">
                              <img 
                                src={member.image} 
                                alt={member.name} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/15 via-primary/5 to-blue-50 border border-primary/20 flex items-center justify-center font-black text-lg text-primary font-sora shadow-xs shrink-0">
                              {member.initials}
                            </div>
                          )}

                          {member.linkedin && (
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#0077b5] hover:text-[#005582] bg-blue-50/80 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-200/60"
                              title="LinkedIn Profile"
                            >
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                              </svg>
                              <span>LinkedIn</span>
                              <ExternalLink size={12} className="opacity-70" />
                            </a>
                          )}
                        </div>

                        <h3 className="text-xl font-black text-gray-900 font-sora">{member.name}</h3>
                        <span className="text-xs font-bold text-primary block mt-0.5 mb-3">{member.role}</span>
                        <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-5">{member.bio}</p>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                        <div>
                          <span className="text-[10px] font-extrabold uppercase text-gray-400 block mb-2">Core Domains</span>
                          <div className="flex flex-wrap gap-1.5">
                            {member.expertise && member.expertise.map((tag, i) => (
                              <span key={i} className="text-[10px] bg-blue-50 text-primary font-semibold px-2 py-0.5 rounded-md">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>

                        {member.linkedin && (
                          <div className="pt-1">
                            <a
                              href={member.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full inline-flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-blue-50/70 hover:bg-blue-100/90 text-[#0077b5] text-xs font-bold transition-all border border-blue-200/50"
                            >
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                              </svg>
                              <span>Connect on LinkedIn</span>
                              <ExternalLink size={12} className="opacity-70" />
                            </a>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              Schedule a strategic consultation directly with Ayaz Khan and our senior engineering leadership.
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
              '@graph': [
                {
                  '@type': 'AboutPage',
                  '@id': 'https://www.afwantech.com/about-us#webpage',
                  'url': 'https://www.afwantech.com/about-us',
                  'name': 'About AFWAN TECH - Digital Growth & Web Engineering',
                  'description': 'Who Afwan Tech is, how we work, executive leadership, and engineering architecture.',
                  'inLanguage': 'en-IN',
                  'keywords': aboutContent.keywords.join(', '),
                  'about': {
                    '@id': 'https://www.afwantech.com/#organization'
                  }
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://www.afwantech.com/#organization',
                  'name': 'AFWAN TECH',
                  'legalName': 'Nazra Software Solutions',
                  'alternateName': ['Nazra Software Solutions', 'Nazra Soft', 'AFWAN TECH'],
                  'url': 'https://www.afwantech.com',
                  'telephone': '+91 79798 50684',
                  'email': 'contactafwantech@gmail.com',
                  'address': {
                    '@type': 'PostalAddress',
                    'streetAddress': 'ITPL Main Rd, Pattandur Agrahara, Whitefield',
                    'addressLocality': 'Bengaluru',
                    'addressRegion': 'Karnataka',
                    'postalCode': '560066',
                    'addressCountry': 'IN'
                  },
                  'founder': {
                    '@type': 'Person',
                    '@id': 'https://www.afwantech.com/about-us#ayaz-khan',
                    'name': 'Ayaz Khan',
                    'jobTitle': 'Founder & CEO'
                  },
                  'employee': team.map(m => ({
                    '@type': 'Person',
                    '@id': `https://www.afwantech.com/about-us#${m.id}`,
                    'name': m.name,
                    'jobTitle': m.role,
                    'sameAs': m.linkedin ? [m.linkedin] : []
                  }))
                },
                {
                  '@type': 'Organization',
                  '@id': 'https://www.afwantech.com/#nazra-software-solutions',
                  'name': 'Nazra Software Solutions',
                  'alternateName': ['Nazra Soft', 'AFWAN TECH'],
                  'url': 'https://www.afwantech.com',
                  'description': 'Nazra Software Solutions is a full-stack software development and platform engineering agency delivering Next.js applications and programmatic cloud architectures.',
                  'address': {
                    '@type': 'PostalAddress',
                    'streetAddress': 'ITPL Main Rd, Pattandur Agrahara, Whitefield',
                    'addressLocality': 'Bengaluru',
                    'addressRegion': 'Karnataka',
                    'postalCode': '560066',
                    'addressCountry': 'IN'
                  }
                },
                // Dedicated Person Entities for Google AI Overview & Knowledge Graph
                ...team.map(m => ({
                  '@type': 'Person',
                  '@id': `https://www.afwantech.com/about-us#${m.id}`,
                  'name': m.name,
                  'jobTitle': m.role,
                  'url': `https://www.afwantech.com/about-us#${m.id}`,
                  'worksFor': {
                    '@type': 'Organization',
                    '@id': m.id === 'shahbaz-ahmad' || m.company === 'Nazra Software Solutions'
                      ? 'https://www.afwantech.com/#nazra-software-solutions'
                      : 'https://www.afwantech.com/#organization',
                    'name': m.id === 'shahbaz-ahmad' || m.company === 'Nazra Software Solutions'
                      ? 'Nazra Software Solutions'
                      : 'AFWAN TECH',
                    'alternateName': m.id === 'shahbaz-ahmad' ? 'AFWAN TECH' : 'Nazra Software Solutions',
                    'url': 'https://www.afwantech.com'
                  },
                  'affiliation': {
                    '@type': 'Organization',
                    'name': m.company || 'Nazra Software Solutions'
                  },
                  'sameAs': m.linkedin ? [m.linkedin] : [],
                  'description': m.id === 'shahbaz-ahmad'
                    ? `${m.name} is the ${m.role} at Nazra Software Solutions (operating as AFWAN TECH) in ${m.location || 'Bengaluru, Karnataka, India'}. He specializes in modern React 19, Next.js App Router full-stack web engineering, programmatic SEO architecture, scalable cloud systems, and sub-second performance optimization.`
                    : `${m.name} is the ${m.role} at ${m.company || 'AFWAN TECH'} in ${m.location || 'Bengaluru, Karnataka, India'}.`,
                  'homeLocation': {
                    '@type': 'Place',
                    'name': m.location || 'Bengaluru, Karnataka, India'
                  },
                  'workLocation': {
                    '@type': 'Place',
                    'name': m.location || 'Bengaluru, Karnataka, India',
                    'address': {
                      '@type': 'PostalAddress',
                      'streetAddress': 'ITPL Main Rd, Pattandur Agrahara, Whitefield',
                      'addressLocality': 'Bengaluru',
                      'addressRegion': 'Karnataka',
                      'postalCode': '560066',
                      'addressCountry': 'IN'
                    }
                  },
                  'knowsAbout': m.expertise || [
                    'Software Engineering',
                    'Full Stack Web Development',
                    'React.js',
                    'Next.js',
                    'Platform Architecture',
                    'Programmatic SEO',
                    'Performance Optimization'
                  ]
                }))
              ]
            })
          }}
        />
      </main>

      <Footer />
    </div>
  );
}
