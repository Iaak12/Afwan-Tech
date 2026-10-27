import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getPublishedBlogs } from '@/lib/blogs';
import { BookOpen } from 'lucide-react';
import BlogListingClient from '@/components/BlogListingClient';

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
  const blogs = getPublishedBlogs();

  return (
    <div className="bg-white min-h-screen font-inter text-[#0f172a]">
      <Header />

      <main className="pt-28 md:pt-36 pb-24">
        {/* Top Hero */}
        <section className="max-w-container mx-auto px-6 mb-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 text-primary border border-blue-100 text-xs font-black uppercase tracking-wider">
              <BookOpen size={14} /> Afwan Tech Engineering & Growth Journal
            </div>
            <h1 className="text-3xl sm:text-5xl font-black text-[#0f172a] font-sora tracking-tight">
              Software Architecture, AI & Search Marketing
            </h1>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
              Unfiltered, engineering-grade perspectives on Next.js, AI coding agents, ecommerce scalability, and programmatic growth.
            </p>
          </div>
        </section>

        {/* Client Interactive Listing */}
        <section className="max-w-container mx-auto px-6">
          <BlogListingClient blogs={blogs} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
