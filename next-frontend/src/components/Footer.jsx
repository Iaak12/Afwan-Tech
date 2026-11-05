'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin, ArrowRight, ShieldCheck, Heart, BarChart3, Globe } from 'lucide-react';
import { siteSettings, services } from '@/data/siteData';
import { trackContactTap } from '@/lib/tracking';

const popularCities = [
  { name: 'Mumbai', slug: 'mumbai' },
  { name: 'Bengaluru', slug: 'bengaluru' },
  { name: 'Delhi NCR', slug: 'delhi-ncr' },
  { name: 'Noida', slug: 'noida' },
  { name: 'Gurugram', slug: 'gurugram' },
  { name: 'Hyderabad', slug: 'hyderabad' },
  { name: 'Chennai', slug: 'chennai' },
  { name: 'Pune', slug: 'pune' },
  { name: 'Ahmedabad', slug: 'ahmedabad' },
  { name: 'Kolkata', slug: 'kolkata' },
  { name: 'Jaipur', slug: 'jaipur' },
  { name: 'Lucknow', slug: 'lucknow' },
  { name: 'Chandigarh', slug: 'chandigarh' },
  { name: 'Dubai', slug: 'dubai' },
  { name: 'London', slug: 'london' },
  { name: 'New York', slug: 'new-york' }
];

export default function Footer() {
  return (
    <footer className="bg-[#0b1324] text-gray-300 font-inter pt-20 pb-10 border-t border-white/10">
      <div className="max-w-container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-6">
            <Link href="/" className="flex items-center group" aria-label="Afwan Tech Home">
              <div className="relative h-11 w-48 flex items-center">
                <Image
                  src={siteSettings.footerLogo || "/afwan.png"}
                  alt={siteSettings.siteName || "Afwan Tech"}
                  width={185}
                  height={54}
                  className="w-auto h-full max-h-11 object-contain object-left group-hover:scale-105 transition-transform"
                />
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-sm">
              {siteSettings.footerTagline}
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-300">
              <span className="flex items-center gap-2.5">
                <MapPin size={16} className="text-primary flex-shrink-0" />
                {siteSettings.address}
              </span>
              <a 
                href={`tel:${siteSettings.contactPhone}`} 
                onClick={() => trackContactTap('call', { location: 'Footer Phone' })}
                className="flex items-center gap-2.5 hover:text-white transition-colors"
              >
                <Phone size={16} className="text-primary flex-shrink-0" />
                {siteSettings.contactPhone}
              </a>
              <a href={`mailto:${siteSettings.contactEmail}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                <Mail size={16} className="text-primary flex-shrink-0" />
                {siteSettings.contactEmail}
              </a>
            </div>

            {/* Official Social Media Links */}
            <div className="pt-2">
              <span className="text-[11px] font-black uppercase tracking-wider text-gray-400 block mb-3 font-mono">
                Official Channels
              </span>
              <div className="flex items-center gap-3">
                <a
                  href={siteSettings.socials?.linkedin || "https://www.linkedin.com/company/afwan-tech"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#0077b5] text-gray-300 hover:text-white flex items-center justify-center transition-all border border-white/10 hover:border-[#0077b5] hover:scale-105 shadow-sm"
                  title="AFWAN TECH on LinkedIn"
                  aria-label="LinkedIn"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a
                  href={siteSettings.socials?.youtube || "https://youtube.com/@afwantechservices?si=C1yL9fv94A6gaKy5"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#ff0000] text-gray-300 hover:text-white flex items-center justify-center transition-all border border-white/10 hover:border-[#ff0000] hover:scale-105 shadow-sm"
                  title="AFWAN TECH on YouTube"
                  aria-label="YouTube"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </a>
                <a
                  href={siteSettings.socials?.instagram || "https://www.instagram.com/afwan.tech?cplk=MTB0cXN5amZ0dzVpNA=="}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-gray-300 hover:text-white flex items-center justify-center transition-all border border-white/10 hover:border-pink-500 hover:scale-105 shadow-sm"
                  title="AFWAN TECH on Instagram"
                  aria-label="Instagram"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
                <a
                  href={siteSettings.socials?.facebook || "https://www.facebook.com/share/r/16Vp15WPEqC/"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-[#1877F2] text-gray-300 hover:text-white flex items-center justify-center transition-all border border-white/10 hover:border-[#1877F2] hover:scale-105 shadow-sm"
                  title="AFWAN TECH on Facebook"
                  aria-label="Facebook"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Core Services */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-5">Core Services</h4>
            <ul className="space-y-3 text-sm">
              {services.slice(0, 6).map((service, idx) => (
                <li key={idx}>
                  <Link href={`/services/${service.slug}`} className="hover:text-primary transition-colors">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-black text-sm uppercase tracking-wider mb-5">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><Link href="/about-us" className="hover:text-primary transition-colors">About Agency</Link></li>
              <li><Link href="/pricing" className="hover:text-primary transition-colors">Pricing Plans</Link></li>
              <li><Link href="/portfolio" className="hover:text-primary transition-colors">Case Studies</Link></li>
              <li><Link href="/market-area" className="hover:text-primary transition-colors">Locations Hub (595+ Cities)</Link></li>
              <li><Link href="/contact-us" className="hover:text-primary transition-colors">Contact & Support</Link></li>
              <li><Link href="/admin" className="text-gray-500 hover:text-primary transition-colors text-xs flex items-center gap-1.5 pt-2 border-t border-white/5">Agency Portal Login</Link></li>
            </ul>
          </div>

          {/* Programmatic SEO Network */}
          <div>
            <div className="flex items-center gap-2 mb-5">
              <Globe size={18} className="text-primary" />
              <h4 className="text-white font-black text-sm uppercase tracking-wider">Locations Directory</h4>
            </div>
            <p className="text-gray-400 text-xs mb-3">Serving 595+ cities with hyper-local SEO, custom web architecture & targeted lead generation.</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {popularCities.map((city, idx) => (
                <Link 
                  key={idx} 
                  href={`/location/${city.slug}`}
                  className="hover:text-primary text-gray-400 hover:translate-x-0.5 transition-all truncate"
                >
                  {city.name}
                </Link>
              ))}
            </div>
            <Link 
              href="/market-area" 
              className="inline-flex items-center gap-1 text-xs font-bold text-primary hover:underline mt-4"
            >
              Browse all 595+ cities & states <ArrowRight size={12} />
            </Link>
          </div>
        </div>

        {/* Global Cities Regional Strip */}
        <div className="py-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[11px] text-gray-400">
            <span className="font-bold text-white uppercase tracking-wider">Popular Metro Hubs:</span>
            <Link href="/location/mumbai" className="hover:text-primary transition-colors">Mumbai Web Development</Link>
            <span className="text-gray-600">•</span>
            <Link href="/location/bengaluru" className="hover:text-primary transition-colors">Bengaluru SEO Services</Link>
            <span className="text-gray-600">•</span>
            <Link href="/location/delhi" className="hover:text-primary transition-colors">Delhi NCR Digital Agency</Link>
            <span className="text-gray-600">•</span>
            <Link href="/location/hyderabad" className="hover:text-primary transition-colors">Hyderabad Next.js Agency</Link>
            <span className="text-gray-600">•</span>
            <Link href="/location/chennai" className="hover:text-primary transition-colors">Chennai Performance Marketing</Link>
            <span className="text-gray-600">•</span>
            <Link href="/location/pune" className="hover:text-primary transition-colors">Pune App Development</Link>
            <span className="text-gray-600">•</span>
            <Link href="/location/dubai" className="hover:text-primary transition-colors">Dubai UAE Growth Partner</Link>
            <span className="text-gray-600">•</span>
            <Link href="/market-area" className="text-primary font-bold hover:underline">View All 595+ Locations →</Link>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>{siteSettings.footerCopyright}</p>
          <div className="flex items-center gap-6">
            <span>Powered by Next.js & PHP API</span>
            <span className="flex items-center gap-1"><ShieldCheck size={14} className="text-emerald-400" /> SSL 256-Bit Encrypted</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
