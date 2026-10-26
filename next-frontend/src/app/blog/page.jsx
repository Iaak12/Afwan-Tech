import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllBlogs } from '@/lib/blogs';
import { 
  Calendar, Clock, User, ArrowRight, Sparkles, BookOpen, 
  CheckCircle2, Rocket, Timer, ChevronRight 
} from 'lucide-react';

export const metadata = {
  title: 'Blog & Engineering Journal | Afwan Tech',
  description: 'In-depth engineering guides, AI tools analysis, ecommerce architectures, and modern SEO playbooks written by senior architects.',
  openGraph: {
    title: 'Afwan Tech Engineering Journal',
    description: 'Practical guides on AI tools, Python frameworks, headless commerce, and search engine optimization.',
    url: 'https://www.afwantech.com/blog'
  }
};

export default function BlogIndexPage() {
  const blogs = getAllBlogs();
  const liveBlogs = blogs.filter(b => b.isLive);
  const scheduledBlogs = blogs.filter(b => !b.isLive);

  const featured = liveBlogs[0];
  const regularLive = liveBlogs.slice(1);

  return (
    <div className="bg-white min-h-screen font-inter text-[#0f172a]">
      <Header />

      <main className="pt-28 md:pt-36 pb-20">
        {/* Top Hero */}
        <section className="max-w-container mx-auto px-6 mb-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-primary border border-blue-100 text-xs font-black uppercase tracking-wider">
              <BookOpen size={14} /> Afwan Tech Engineering & Growth Journal
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#0f172a] font-sora tracking-tight">
              Software Architecture, AI & Search Marketing
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Unfiltered, engineering-grade perspectives on Next.js, AI coding agents, ecommerce scalability, and programmatic growth. Automated weekly drops every Monday.
            </p>
          </div>
        </section>

        {/* Featured Live Article */}
        {featured && (
          <section className="max-w-container mx-auto px-6 mb-16">
            <div className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl border border-white/10 group">
              <div className="relative z-10 max-w-3xl space-y-5">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-white">
                    {featured.category}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" /> Live Now (Week {featured.weekNumber})
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1">
                    <Clock size={12} /> {featured.readTime}
                  </span>
                </div>

                <h2 className="text-2xl sm:text-4xl font-black font-sora tracking-tight leading-tight group-hover:text-blue-300 transition-colors">
                  <Link href={`/blog/${featured.slug}`}>
                    {featured.title}
                  </Link>
                </h2>

                <p className="text-gray-300 text-sm sm:text-base leading-relaxed line-clamp-3">
                  {featured.metaDescription || featured.tagline}
                </p>

                <div className="flex items-center justify-between pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-blue-500/20 text-white font-black flex items-center justify-center text-xs border border-white/10">
                      MA
                    </div>
                    <div>
                      <span className="block text-xs font-bold text-white">{featured.author.name}</span>
                      <span className="block text-[10px] text-gray-400">Published on {featured.scheduledDate}</span>
                    </div>
                  </div>

                  <Link 
                    href={`/blog/${featured.slug}`}
                    className="btn btn-primary !px-6 !py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5"
                  >
                    <span>Read Article</span>
                    <ArrowRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Other Live Articles */}
        {regularLive.length > 0 && (
          <section className="max-w-container mx-auto px-6 mb-20">
            <h2 className="text-xl font-bold font-sora text-[#0f172a] mb-6 flex items-center gap-2">
              <span>Published Articles</span>
              <span className="text-xs font-normal text-gray-400">({regularLive.length} live)</span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularLive.map(blog => (
                <article 
                  key={blog.id}
                  className="bg-white rounded-2xl border border-gray-200 p-6 flex flex-col justify-between hover:shadow-lg hover:border-primary/40 transition-all group"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-primary">
                        {blog.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={11} /> {blog.readTime}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-gray-900 group-hover:text-primary transition-colors font-sora line-clamp-2">
                      <Link href={`/blog/${blog.slug}`}>
                        {blog.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed">
                      {blog.metaDescription || blog.tagline}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-[11px] text-gray-400 font-mono">{blog.scheduledDate}</span>
                    <Link 
                      href={`/blog/${blog.slug}`}
                      className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                    >
                      Read Guide <ChevronRight size={13} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* Scheduled Automated Weekly Drops Roadmap */}
        <section className="max-w-container mx-auto px-6">
          <div className="bg-[#f8fafc] rounded-3xl p-8 sm:p-12 border border-gray-200">
            <div className="max-w-xl space-y-2 mb-8">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-100">
                <Timer size={12} /> Automated Weekly Publication Schedule
              </div>
              <h2 className="text-2xl sm:text-3xl font-black font-sora text-[#0f172a]">
                Upcoming Weekly Releases (1 Per Week)
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                The following articles are already written, SEO-optimized, and scheduled to release automatically every week.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {scheduledBlogs.map(blog => (
                <div 
                  key={blog.id}
                  className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-100 flex items-center gap-1">
                      <Timer size={10} /> Week {blog.weekNumber}
                    </span>
                    <span className="font-mono text-[11px] text-gray-500 font-semibold">
                      {blog.scheduledDate}
                    </span>
                  </div>

                  <h3 className="font-bold text-sm text-gray-800 line-clamp-2 font-sora">
                    {blog.title}
                  </h3>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {blog.metaDescription || blog.tagline}
                  </p>

                  <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[11px]">
                    <span className="text-gray-400 font-medium">{blog.wordCount} words • {blog.readTime}</span>
                    <span className="text-emerald-600 font-bold">Auto-Scheduled</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
