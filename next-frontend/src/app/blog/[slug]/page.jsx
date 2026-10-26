import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { getAllBlogs, getBlogBySlug } from '@/lib/blogs';
import { 
  Calendar, Clock, User, ArrowLeft, ArrowRight, Phone, Mail, 
  MessageSquare, Share2, CheckCircle2, ChevronRight, BookOpen, AlertCircle
} from 'lucide-react';
import { siteSettings } from '@/data/siteData';

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map(b => ({ slug: b.slug }));
}

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const blog = getBlogBySlug(resolvedParams.slug);
  if (!blog) return { title: 'Article Not Found | Afwan Tech' };

  return {
    title: `${blog.title} | Afwan Tech Journal`,
    description: blog.metaDescription || blog.tagline,
    alternates: {
      canonical: blog.canonical || `https://www.afwantech.com/blog/${blog.slug}`
    },
    openGraph: {
      title: blog.title,
      description: blog.metaDescription || blog.tagline,
      type: 'article',
      url: `https://www.afwantech.com/blog/${blog.slug}`,
      authors: [blog.author.name]
    }
  };
}

export default async function BlogPostPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const blog = getBlogBySlug(resolvedParams.slug);

  const isPreview = resolvedSearchParams?.preview === 'true';

  if (!blog || (!blog.isLive && !isPreview)) {
    notFound();
  }

  // Helper to render main content blocks
  const renderBlock = (block, idx) => {
    switch (block.type) {
      case 'h2':
        return (
          <h2 key={idx} className="text-2xl sm:text-3xl font-extrabold text-[#0f172a] font-sora mt-10 mb-4 pt-4 border-t border-gray-100">
            {block.text}
          </h2>
        );
      case 'h3':
        return (
          <h3 key={idx} className="text-xl sm:text-2xl font-bold text-[#0f172a] font-sora mt-7 mb-3">
            {block.text}
          </h3>
        );
      case 'h4':
        return (
          <h4 key={idx} className="text-base sm:text-lg font-bold text-gray-800 font-sora mt-5 mb-2">
            {block.text}
          </h4>
        );
      case 'tagline':
        return (
          <p key={idx} className="text-base sm:text-lg text-primary font-medium italic border-l-4 border-primary pl-4 py-1 my-6 bg-blue-50/50 rounded-r-xl">
            {block.text}
          </p>
        );
      case 'p':
        return (
          <p key={idx} className="text-sm sm:text-base text-gray-700 leading-relaxed my-4">
            {block.text}
          </p>
        );
      case 'ul':
        return (
          <ul key={idx} className="space-y-2 my-5 pl-2">
            {block.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        );
      case 'ol':
        return (
          <ol key={idx} className="space-y-2.5 my-5 pl-2 counter-reset-item">
            {block.items?.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm sm:text-base text-gray-700 leading-relaxed">
                <span className="w-6 h-6 rounded-lg bg-blue-50 text-primary font-bold text-xs flex items-center justify-center flex-shrink-0 border border-blue-100">
                  {i + 1}
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        );
      case 'table':
        return (
          <div key={idx} className="my-8 overflow-x-auto rounded-2xl border border-gray-200 shadow-2xs bg-white">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              {block.headers && (
                <thead>
                  <tr className="bg-[#0f172a] text-white font-bold uppercase tracking-wider text-[11px]">
                    {block.headers.map((h, i) => (
                      <th key={i} className="py-3 px-4 sm:px-6">{h}</th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-gray-100">
                {block.rows?.map((row, rIdx) => (
                  <tr key={rIdx} className={rIdx % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className={`py-3.5 px-4 sm:px-6 ${cIdx === 0 ? 'font-bold text-gray-900' : 'text-gray-700'}`}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case 'cta':
        return (
          <div key={idx} className="my-8 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-blue-50 via-indigo-50 to-blue-50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm">
            <div className="space-y-2">
              <span className="text-xs font-black uppercase text-primary tracking-wider">Expert Consultation</span>
              <h4 className="text-lg sm:text-xl font-bold text-[#0f172a] font-sora">
                {block.heading || 'Need Engineering Support for Your Platform?'}
              </h4>
              <p className="text-xs sm:text-sm text-gray-600 max-w-lg">
                {block.text || 'Discuss your architecture, SEO strategy, or application roadmap with Afwan Tech architects.'}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <a
                href={`tel:${siteSettings.contactPhone}`}
                className="btn btn-outline !px-4 !py-2.5 text-xs font-bold"
              >
                Call {siteSettings.contactPhone}
              </a>
              <Link
                href="/contact-us"
                className="btn btn-primary !px-5 !py-2.5 text-xs font-bold"
              >
                Get Quote
              </Link>
            </div>
          </div>
        );
      case 'link_note':
      case 'sources':
        return (
          <div key={idx} className="my-4 p-4 rounded-xl bg-gray-50 border border-gray-100 text-xs text-gray-500">
            <span className="font-bold text-gray-700 mr-2">References & Notes:</span>
            <span>{block.text}</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white min-h-screen font-inter text-[#0f172a]">
      <Header />

      {/* JSON-LD Article Schema */}
      {blog.schema_jsonld && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blog.schema_jsonld) }}
        />
      )}

      <main className="pt-28 md:pt-36 pb-24">
        {/* Breadcrumb */}
        <div className="max-w-container mx-auto px-6 mb-8">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight size={12} />
            <Link href="/blog" className="hover:text-primary">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-gray-900 font-semibold truncate max-w-md">{blog.title}</span>
          </div>
        </div>

        {/* Article Layout */}
        <div className="max-w-container mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Article Body */}
          <article className="lg:col-span-8 space-y-6">
            {/* Header info */}
            <div className="space-y-4 pb-6 border-b border-gray-200">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-primary border border-blue-100">
                  {blog.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1 font-mono">
                  <Calendar size={13} /> {blog.scheduledDate}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Clock size={13} /> {blog.readTime}
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black font-sora text-[#0f172a] tracking-tight leading-tight">
                {blog.h1 || blog.title}
              </h1>

              {blog.tagline && (
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  {blog.tagline}
                </p>
              )}

              {/* Author Strip */}
              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-primary to-blue-400 text-white font-bold flex items-center justify-center text-sm shadow-sm">
                    MA
                  </div>
                  <div>
                    <span className="font-bold text-sm text-gray-900 block font-sora">{blog.author.name}</span>
                    <span className="text-xs text-gray-500">{blog.author.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={`https://wa.me/917979850684?text=${encodeURIComponent(`Hi Afwan Tech, I read your article "${blog.title}" and would like to discuss a project.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-xs font-bold flex items-center gap-1 transition-colors"
                  >
                    <MessageSquare size={14} />
                    <span className="hidden sm:inline">Ask on WA</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Content Blocks */}
            <div className="prose prose-slate max-w-none">
              {blog.main_content?.map((block, idx) => renderBlock(block, idx))}
            </div>

            {/* FAQs Accordion */}
            {blog.faqs && blog.faqs.length > 0 && (
              <div className="pt-10 mt-10 border-t border-gray-200 space-y-4">
                <h3 className="text-2xl font-bold font-sora text-[#0f172a]">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-3">
                  {blog.faqs.map((faq, i) => (
                    <details 
                      key={i}
                      className="group bg-gray-50 rounded-2xl p-5 border border-gray-100 open:bg-white open:shadow-xs transition-all"
                    >
                      <summary className="font-bold text-sm text-gray-900 cursor-pointer list-none flex items-center justify-between font-sora">
                        <span>{faq.q}</span>
                        <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform" />
                      </summary>
                      <p className="text-xs sm:text-sm text-gray-600 mt-3 pt-3 border-t border-gray-100 leading-relaxed">
                        {faq.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            )}
          </article>

          {/* Sticky Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Consultation Card */}
            <div className="sticky top-28 bg-[#0f172a] text-white p-6 sm:p-8 rounded-3xl space-y-5 shadow-xl border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-primary/20 text-primary flex items-center justify-center font-bold">
                <BookOpen size={20} />
              </div>

              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-primary block">
                  Afwan Tech Growth Deck
                </span>
                <h3 className="text-xl font-bold font-sora text-white mt-1">
                  Ready to Scale Your Platform?
                </h3>
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  We build lightning-fast web applications, programmatic SEO architectures across 500+ cities, and high-converting ecommerce platforms.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-white/10 text-xs">
                <a
                  href={`tel:${siteSettings.contactPhone}`}
                  className="w-full py-3 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone size={14} className="text-primary" /> {siteSettings.contactPhone}
                </a>
                <a
                  href={`https://wa.me/${siteSettings.whatsapp}?text=${encodeURIComponent(`Hi Afwan Tech, I would like to get a quote.`)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white font-bold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                >
                  <MessageSquare size={14} /> WhatsApp Consultation
                </a>
              </div>

              <div className="pt-2 text-[11px] text-gray-400 space-y-1">
                <div className="flex items-center gap-2">
                  <Mail size={12} className="text-primary" />
                  <a href={`mailto:${siteSettings.contactEmail}`} className="hover:underline">{siteSettings.contactEmail}</a>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  );
}
