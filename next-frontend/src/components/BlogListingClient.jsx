'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, ArrowRight, Sparkles, BookOpen, 
  Search, Filter, CheckCircle2, TrendingUp 
} from 'lucide-react';
import BlogCard from '@/components/BlogCard';

export default function BlogListingClient({ blogs = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(blogs.map(b => b.category).filter(Boolean)))];

  const isDefaultView = selectedCategory === 'All' && !searchQuery.trim();
  const showFeaturedHero = isDefaultView && blogs.length > 0;
  const featured = showFeaturedHero ? blogs[0] : null;

  // Filter blogs based on category & search
  const filteredBlogs = blogs.filter(blog => {
    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.metaDescription && blog.metaDescription.toLowerCase().includes(searchQuery.toLowerCase())) ||
      blog.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Grid blogs exclude the featured blog when in default view
  const gridBlogs = showFeaturedHero ? filteredBlogs.slice(1) : filteredBlogs;

  return (
    <div className="space-y-16">
      {/* ── SEARCH & CATEGORY PILLS FILTER BAR ── */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-4 border-b border-gray-100">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-primary text-white shadow-md shadow-primary/25 scale-105'
                    : 'bg-gray-100/80 text-gray-600 hover:bg-gray-200/70 hover:text-gray-900'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full lg:w-72">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search guides & architectures..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:border-primary focus:bg-white transition-all"
          />
        </div>
      </div>

      {/* ── FEATURED HERO ARTICLE (Shown when category is 'All' and no search query) ── */}
      {selectedCategory === 'All' && !searchQuery && featured && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white shadow-2xl border border-white/10 group"
        >
          {/* Subtle Ambient Radial Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 sm:p-12 relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-primary text-white shadow-sm">
                  {featured.category}
                </span>
                <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                  Featured Editorial
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                  <Calendar size={13} /> {featured.scheduledDate}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                  <Clock size={13} /> {featured.readTime}
                </span>
              </div>

              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-sora tracking-tight leading-tight group-hover:text-blue-300 transition-colors">
                <Link href={`/blog/${featured.slug}`}>
                  {featured.title}
                </Link>
              </h2>

              <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                {featured.metaDescription || featured.tagline}
              </p>

              <div className="flex items-center justify-between pt-6 border-t border-white/10 flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary to-blue-400 text-white font-black flex items-center justify-center text-sm shadow-md border border-white/20">
                    {featured.author?.name ? featured.author.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'AK'}
                  </div>
                  <div>
                    <span className="block text-sm font-bold text-white font-sora">
                      {featured.author?.name || 'Ayaz Khan'}
                    </span>
                    <span className="block text-xs text-gray-400">
                      {featured.author?.role || 'Founder & CEO'}
                    </span>
                  </div>
                </div>

                <Link
                  href={`/blog/${featured.slug}`}
                  className="btn btn-primary !px-7 !py-3.5 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-primary/30 group-hover:scale-105 transition-all"
                >
                  <span>Read Full Guide</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            {/* Right Thumbnail Banner */}
            <div className="lg:col-span-5 relative h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <Image
                src={featured.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800'}
                alt={featured.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        </motion.div>
      )}

      {/* ── ARTICLES GRID (Shown if more than 1 article, or if category/search filter is applied) ── */}
      {gridBlogs.length > 0 ? (
        <div className="space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-primary">Curated Knowledge</span>
              <h2 className="text-2xl sm:text-3xl font-black font-sora text-[#0f172a] mt-1">
                {selectedCategory === 'All' ? 'More Engineering Guides' : `${selectedCategory} Guides`}
              </h2>
            </div>
            <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
              {gridBlogs.length} {gridBlogs.length === 1 ? 'Article' : 'Articles'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gridBlogs.map((blog, idx) => (
              <BlogCard key={blog.id || blog.slug} blog={blog} index={idx} />
            ))}
          </div>
        </div>
      ) : !showFeaturedHero && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <BookOpen size={40} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-bold text-gray-700 font-sora">No published guides match your criteria</h3>
          <p className="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
            Try adjusting your category filter or search keywords to explore our engineering library.
          </p>
          <button
            onClick={() => { setSelectedCategory('All'); setSearchQuery(''); }}
            className="mt-4 px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
