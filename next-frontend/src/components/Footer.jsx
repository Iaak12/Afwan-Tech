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
