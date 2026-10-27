'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  BookOpen, Sparkles, ArrowRight, Phone, MessageSquare, 
  Mail, Code, Search, Layers, ShoppingCart, Smartphone, 
  Clock, Calendar, CheckCircle2, ChevronRight 
} from 'lucide-react';
import TrackedContactLink from '@/components/TrackedContactLink';
import { siteSettings } from '@/data/siteData';

const servicesList = [
  {
    name: 'Website Development',
    slug: 'website-development',
    desc: 'High-speed Next.js platforms',
    icon: Code,
    badge: 'Sub-second'
  },
  {
    name: 'Programmatic SEO Engine',
    slug: 'seo-services',
    desc: 'Rank across 595+ target cities',
    icon: Search,
    badge: '595+ Cities'
  },
  {
    name: 'Custom Web Applications',
    slug: 'custom-web-development',
    desc: 'Full-stack cloud architectures',
    icon: Layers,
    badge: 'Scalable'
  },
  {
    name: 'E-Commerce Development',
    slug: 'ecommerce-development',
    desc: 'Shopify, Headless & WooCommerce',
    icon: ShoppingCart,
    badge: 'High ROAS'
  },
  {
    name: 'Mobile App Engineering',
    slug: 'app-development',
    desc: 'React Native & Flutter apps',
    icon: Smartphone,
    badge: 'iOS & Android'
  }
];

export default function BlogSidebar({ currentBlog, recommendedBlogs = [] }) {
  return (
    <aside className="space-y-8">
      {/* ── 1. RECOMMENDED ARTICLES WIDGET ── */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-primary flex items-center justify-center">
              <BookOpen size={16} />
            </div>
            <h3 className="text-base font-black text-[#0f172a] font-sora">
              Recommended Reads
            </h3>
          </div>
          <span className="text-[10px] font-black uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
            Featured
          </span>
        </div>

        <div className="space-y-4">
          {recommendedBlogs && recommendedBlogs.length > 0 ? (
            recommendedBlogs.slice(0, 4).map((blog) => (
              <Link
                key={blog.id || blog.slug}
                href={`/blog/${blog.slug}`}
                className="group flex gap-3.5 items-start p-2.5 -mx-2.5 rounded-2xl hover:bg-slate-50 transition-colors"
              >
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-slate-100 border border-gray-200/60">
                  <Image
                    src={blog.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=300'}
                    alt={blog.title}
                    fill
                    sizes="64px"
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="inline-block text-[10px] font-bold text-primary uppercase tracking-wider mb-0.5">
                    {blog.category}
                  </span>
                  <h4 className="text-xs sm:text-sm font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 font-sora leading-snug">
                    {blog.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 mt-1">
                    <span className="flex items-center gap-0.5">
                      <Clock size={10} /> {blog.readTime || '5 min'}
                    </span>
                    <span>•</span>
                    <span>{blog.scheduledDate}</span>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-xs text-gray-500">More articles coming soon.</p>
          )}
        </div>

        <div className="pt-4 mt-2 border-t border-gray-100">
          <Link
            href="/blog"
            className="flex items-center justify-between text-xs font-bold text-primary hover:text-[#2F6097] transition-colors group"
          >
            <span>Explore All Engineering Articles</span>
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ── 2. SERVICES SHOWCASE WIDGET ── */}
      <div className="bg-gradient-to-br from-slate-900 via-[#0f172a] to-slate-900 rounded-3xl p-6 sm:p-7 text-white shadow-xl border border-white/10 relative overflow-hidden">
        {/* Subtle Background Accent */}
        <div className="absolute top-0 right-0 w-36 h-36 bg-primary/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-300 font-mono">
              Our Growth Services
            </span>
          </div>

          <h3 className="text-lg font-black font-sora text-white">
            Need Expert Digital Engineering?
          </h3>

          <p className="text-xs text-gray-300 leading-relaxed">
            We architect lightning-speed web platforms, multi-city SEO funnels, and enterprise apps that generate compounding revenue.
          </p>

          {/* Service items */}
          <div className="space-y-2 pt-2">
            {servicesList.map((svc, idx) => {
              const Icon = svc.icon;
              return (
                <Link
                  key={idx}
                  href={`/services/${svc.slug}`}
                  className="group flex items-center justify-between p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-primary/40 transition-all text-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/20 text-blue-300 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                      <Icon size={14} />
                    </div>
                    <div>
                      <span className="font-bold text-white group-hover:text-primary transition-colors block leading-tight">
                        {svc.name}
                      </span>
                      <span className="text-[10px] text-gray-400 block leading-tight mt-0.5">
                        {svc.desc}
                      </span>
                    </div>
                  </div>
                  <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-blue-200 group-hover:bg-primary group-hover:text-white transition-colors">
                    {svc.badge}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="pt-2">
            <Link
              href="/#services-bento"
              className="w-full py-2.5 px-4 rounded-xl bg-primary hover:bg-[#2F6097] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md"
            >
              <span>Explore All 8 Services</span>
              <ArrowRight size={13} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── 3. INSTANT AUDIT & CONSULTATION CTA ── */}
      <div className="bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-blue-50/70 rounded-3xl p-6 sm:p-7 border border-blue-100 shadow-sm space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-[10px] font-black uppercase tracking-wider">
          <Sparkles size={11} /> Free Strategy Audit
        </div>

        <h4 className="text-base font-black text-[#0f172a] font-sora">
          Discuss Your Project With Mohammad Afwan
        </h4>

        <p className="text-xs text-gray-600 leading-relaxed">
          Get a direct 1-on-1 architecture review, tech stack recommendations, and actionable growth plan with guaranteed 24-hour turnaround.
        </p>

        <div className="space-y-2 pt-2">
          <TrackedContactLink
            type="whatsapp"
            location={`Blog Sidebar CTA - ${currentBlog?.title || 'Article'}`}
            href={`https://wa.me/${siteSettings.whatsapp || siteSettings.whatsappNumber || '917979850684'}?text=${encodeURIComponent(`Hi Afwan Tech, I read your article "${currentBlog?.title || 'guide'}" and would like to discuss my project.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
          >
            <MessageSquare size={14} />
            <span>Chat on WhatsApp</span>
          </TrackedContactLink>

          <TrackedContactLink
            type="call"
            location={`Blog Sidebar Call - ${currentBlog?.title || 'Article'}`}
            href={`tel:${siteSettings.contactPhone}`}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 font-bold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Phone size={13} className="text-primary" />
            <span>Direct Call: {siteSettings.contactPhone}</span>
          </TrackedContactLink>
        </div>

        <div className="pt-2 border-t border-blue-100/80 flex items-center justify-between text-[11px] text-gray-500">
          <span className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-500" /> 100% Free Audit
          </span>
          <span className="flex items-center gap-1">
            <CheckCircle2 size={12} className="text-emerald-500" /> Zero Obligation
          </span>
        </div>
      </div>
    </aside>
  );
}
