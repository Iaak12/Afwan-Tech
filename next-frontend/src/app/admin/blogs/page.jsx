'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Calendar, Clock, CheckCircle2, Timer, ArrowUpRight, 
  RefreshCw, BookOpen, ExternalLink, Play, Eye, Sparkles, Filter 
} from 'lucide-react';
import blogsInitialData from '@/data/blogsData.json';

export default function AdminBlogSchedulerPage() {
  const [blogs, setBlogs] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'published' | 'scheduled'

  useEffect(() => {
    // Check if there are overrides in localStorage
    const saved = localStorage.getItem('afwan_blogs_status_override');
    let overrides = {};
    if (saved) {
      try { overrides = JSON.parse(saved); } catch {}
    }

    const now = new Date();
    const evaluated = blogsInitialData.map(b => {
      const isOverridden = overrides[b.id] !== undefined;
      const scheduledTime = new Date(b.scheduledDate + 'T00:00:00Z').getTime();
      const isPastOrToday = now.getTime() >= scheduledTime;
      const isLive = isOverridden ? overrides[b.id] : (b.isPublished || isPastOrToday);

      return {
        ...b,
        isLive,
        status: isLive ? 'published' : 'scheduled'
      };
    });

    setBlogs(evaluated);
  }, []);

  const handleTogglePublish = (blogId) => {
    const saved = localStorage.getItem('afwan_blogs_status_override');
    let overrides = {};
    if (saved) {
      try { overrides = JSON.parse(saved); } catch {}
    }

    const current = blogs.find(b => b.id === blogId)?.isLive;
    overrides[blogId] = !current;
    localStorage.setItem('afwan_blogs_status_override', JSON.stringify(overrides));

    setBlogs(prev => prev.map(b => {
      if (b.id === blogId) {
        const next = !b.isLive;
        return { ...b, isLive: next, status: next ? 'published' : 'scheduled' };
      }
      return b;
    }));
  };

  const total = blogs.length;
  const publishedCount = blogs.filter(b => b.isLive).length;
  const scheduledCount = blogs.filter(b => !b.isLive).length;
  const nextScheduled = blogs.find(b => !b.isLive);

  const filtered = blogs.filter(b => {
    if (filter === 'published') return b.isLive;
    if (filter === 'scheduled') return !b.isLive;
    return true;
  });

  return (
    <div className="space-y-6 font-inter text-[#0f172a]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#0f172a] font-sora">
            Blog Scheduler & Automation Deck
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Automated weekly publishing cadence (1 blog post per week) across 13 SEO-optimized articles
          </p>
        </div>

        <Link
          href="/blog"
          target="_blank"
          className="btn btn-outline !px-4 !py-2 text-xs font-bold flex items-center gap-2 self-start sm:self-auto"
        >
          <ExternalLink size={14} />
          <span>View Public Blog</span>
        </Link>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-2xs">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Total Articles</span>
          <div className="text-2xl font-extrabold text-[#0f172a] font-sora mt-1">{total} Guides</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Full JSON structured format</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-emerald-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Published (Live)</span>
            <CheckCircle2 size={16} className="text-emerald-500" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-600 font-sora mt-1">{publishedCount} Live</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Accessible to Google & users</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-amber-100 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-700 uppercase tracking-wider block">Scheduled In Queue</span>
            <Timer size={16} className="text-amber-500" />
          </div>
          <div className="text-2xl font-extrabold text-amber-700 font-sora mt-1">{scheduledCount} Upcoming</div>
          <span className="text-[11px] text-gray-500 mt-1 block">Releasing 1 every week</span>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-blue-100 shadow-2xs">
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider block">Next Weekly Drop</span>
          <div className="text-base font-extrabold text-gray-900 font-sora mt-1 truncate">
            {nextScheduled ? nextScheduled.scheduledDate : 'All Published'}
          </div>
          <span className="text-[11px] text-primary font-medium mt-1 block truncate">
            {nextScheduled ? `Week ${nextScheduled.weekNumber}: ${nextScheduled.slug}` : 'All 13 weeks live'}
          </span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer ${
            filter === 'all'
              ? 'bg-[#0f172a] text-white'
              : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
          }`}
        >
          All Articles ({total})
        </button>

        <button
          onClick={() => setFilter('published')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            filter === 'published'
              ? 'bg-[#16a34a] text-white'
              : 'bg-white text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
          }`}
        >
          <CheckCircle2 size={13} />
          <span>Live Now ({publishedCount})</span>
        </button>

        <button
          onClick={() => setFilter('scheduled')}
          className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            filter === 'scheduled'
              ? 'bg-amber-600 text-white'
              : 'bg-white text-amber-700 hover:bg-amber-50 border border-amber-200'
          }`}
        >
          <Timer size={13} />
          <span>Scheduled Queue ({scheduledCount})</span>
        </button>
      </div>

      {/* Scheduler Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-200 bg-[#fafafa] text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-5 w-24">CADENCE</th>
                <th className="py-3.5 px-5 w-32">RELEASE DATE</th>
                <th className="py-3.5 px-5 w-32">STATUS</th>
                <th className="py-3.5 px-5">ARTICLE TITLE & TOPIC</th>
                <th className="py-3.5 px-5 w-36">CATEGORY</th>
                <th className="py-3.5 px-5 text-right w-44">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map(blog => (
                <tr key={blog.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="py-4 px-5 font-mono text-[11px] font-bold text-gray-700">
                    Week {blog.weekNumber}
                  </td>

                  <td className="py-4 px-5 font-mono text-[11px] text-gray-600">
                    {blog.scheduledDate}
                  </td>

                  <td className="py-4 px-5">
                    {blog.isLive ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        <CheckCircle2 size={11} /> Published
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">
                        <Timer size={11} /> Scheduled
                      </span>
                    )}
                  </td>

                  <td className="py-4 px-5">
                    <span className="font-bold text-gray-900 block font-sora line-clamp-1">
                      {blog.title}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">
                      /blog/{blog.slug} • {blog.wordCount} words • {blog.readTime}
                    </span>
                  </td>

                  <td className="py-4 px-5">
                    <span className="inline-block px-2.5 py-1 rounded-full text-[10px] font-semibold bg-gray-100 text-gray-700 border border-gray-200">
                      {blog.category}
                    </span>
                  </td>

                  <td className="py-4 px-5 text-right space-x-2">
                    <Link
                      href={`/blog/${blog.slug}`}
                      target="_blank"
                      className="px-2.5 py-1 rounded-lg text-[11px] font-bold text-gray-600 hover:text-primary border border-gray-200 hover:bg-white inline-flex items-center gap-1"
                    >
                      <Eye size={12} /> Preview
                    </Link>

                    <button
                      onClick={() => handleTogglePublish(blog.id)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-colors cursor-pointer ${
                        blog.isLive
                          ? 'text-amber-700 hover:bg-amber-50 border border-amber-200'
                          : 'text-emerald-700 hover:bg-emerald-50 border border-emerald-200'
                      }`}
                    >
                      {blog.isLive ? 'Unpublish' : 'Publish Now'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
