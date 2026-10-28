'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, Sparkles, User } from 'lucide-react';

export default function BlogCard({ blog, index = 0 }) {
  if (!blog) return null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="group flex flex-col bg-white rounded-3xl border border-gray-100/90 overflow-hidden shadow-xs hover:shadow-2xl hover:border-primary/40 hover:-translate-y-1.5 transition-all duration-300 relative"
    >
      {/* Thumbnail Image Container */}
      <Link href={`/blog/${blog.slug}`} className="relative h-52 sm:h-56 w-full overflow-hidden block bg-slate-100">
        <Image
          src={blog.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'}
          alt={blog.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* Floating Category Badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-white/95 backdrop-blur-md text-[#0f172a] shadow-md border border-white/40">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {blog.category}
          </span>
        </div>

        {/* Floating Read Time Badge */}
        <div className="absolute bottom-3 right-3 z-10">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-black/70 backdrop-blur-md text-white/90 shadow-sm border border-white/10">
            <Clock size={11} className="text-primary" />
            {blog.readTime || '5 min read'}
          </span>
        </div>
      </Link>

      {/* Card Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-3">
          {/* Metadata Row */}
          <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
            <span className="flex items-center gap-1.5">
              <Calendar size={13} className="text-primary/70" />
              {blog.scheduledDate}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-[11px] font-semibold text-primary uppercase tracking-wider font-sans">
              Engineering Guide
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-black text-[#0f172a] font-sora leading-snug group-hover:text-primary transition-colors line-clamp-2">
            <Link href={`/blog/${blog.slug}`}>
              {blog.title}
            </Link>
          </h3>

          {/* Excerpt */}
          <p className="text-xs sm:text-sm text-gray-600 leading-relaxed line-clamp-3">
            {blog.metaDescription || blog.tagline}
          </p>

          {/* Topic Keywords Preview */}
          {blog.keywords && (
            <div className="flex flex-wrap gap-1.5 pt-1">
              {(typeof blog.keywords === 'string' ? blog.keywords.split(',') : blog.keywords).slice(0, 3).map((kw, idx) => (
                <span key={idx} className="text-[10px] font-semibold text-primary bg-blue-50/80 px-2 py-0.5 rounded-md border border-blue-100/60">
                  #{kw.trim()}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Bottom Author & CTA Row */}
        <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-blue-400 text-white font-bold text-xs flex items-center justify-center shadow-xs">
              {blog.author?.name ? blog.author.name.split(' ').map(n => n[0]).join('').slice(0, 2) : 'AT'}
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-900 leading-none">
                {blog.author?.name || 'Afwan Tech'}
              </span>
              <span className="block text-[10px] text-gray-400 mt-0.5 leading-none">
                Author
              </span>
            </div>
          </div>

          <Link
            href={`/blog/${blog.slug}`}
            className="inline-flex items-center gap-1 text-xs font-black text-primary group-hover:text-[#2F6097] transition-colors"
          >
            <span>Read</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}
