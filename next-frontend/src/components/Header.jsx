'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  ChevronDown, Menu, X, ArrowRight, Phone, Mail, Globe, Code,
  ShoppingCart, Smartphone, Search, Share2, Palette, TrendingUp,
  Zap, BarChart3, MapPin, Sparkles
} from 'lucide-react';
import { siteSettings, services } from '@/data/siteData';
import { getLocationBySlug } from '@/data/locationsData';
import { trackContactTap } from '@/lib/tracking';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdown, setServicesDropdown] = useState(false);
  const [selectedCitySlug, setSelectedCitySlug] = useState(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync selected location from localStorage & global events
  useEffect(() => {
    try {
      const saved = localStorage.getItem('afwan_selected_location');
      if (saved) {
        setSelectedCitySlug(saved);
      }
    } catch (_) {}

    const handleLocationChange = (e) => {
      if (e?.detail) {
        setSelectedCitySlug(e.detail);
      } else {
        setSelectedCitySlug(null);
      }
    };

    window.addEventListener('afwan_location_changed', handleLocationChange);
    return () => window.removeEventListener('afwan_location_changed', handleLocationChange);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setServicesDropdown(false);
  }, [pathname]);

  // Step 5: Location-Aware Detection ("Service in A")
  const reservedPaths = ['about', 'about-us', 'services', 'pricing', 'portfolio', 'contact', 'contact-us', 'blog', 'market-area', 'admin', 'analytics', 'api'];
  const segments = (pathname || '').split('/').filter(Boolean);

  let urlLocationSlug = null;
  if (pathname?.startsWith('/location/') && segments[1]) {
    urlLocationSlug = segments[1];
  } else if (segments.length >= 1 && !reservedPaths.includes(segments[0])) {
    urlLocationSlug = segments[0];
  }

  // When visiting a city URL directly, update selectedCitySlug and sync to localStorage
  useEffect(() => {
    if (urlLocationSlug) {
      setSelectedCitySlug(urlLocationSlug);
      try {
        localStorage.setItem('afwan_selected_location', urlLocationSlug);
      } catch (_) {}
    }
  }, [urlLocationSlug]);

  const locationSlug = urlLocationSlug || selectedCitySlug;
  let locationName = null;

  if (locationSlug) {
    const matchedLoc = getLocationBySlug(locationSlug);
    if (matchedLoc) {
      locationName = matchedLoc.name;
    } else {
      locationName = locationSlug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    }
  }

  const handleClearLocation = (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setSelectedCitySlug(null);
    try {
      localStorage.removeItem('afwan_selected_location');
    } catch (_) {}
    window.dispatchEvent(new CustomEvent('afwan_location_changed', { detail: null }));
  };

  const serviceCategories = [
    {
      title: 'Engineering & Web',
      items: [
        { name: 'Website Development', slug: 'website-development', href: '/services/website-development', desc: 'Fast, high-converting Next.js websites' },
        { name: 'Custom Web Dev', slug: 'custom-web-development', href: '/services/custom-web-development', desc: 'Bespoke full-stack web applications' },
        { name: 'E-commerce Dev', slug: 'ecommerce-development', href: '/services/ecommerce-development', desc: 'Shopify & headless commerce engines' },
        { name: 'Mobile App Development', slug: 'app-development', href: '/services/app-development', desc: 'Cross-platform iOS & Android apps' },
        { name: 'CRM Software', slug: 'crm-software', href: '/services/crm-software', desc: 'Custom CRM development & automation' }
      ]
    },
    {
      title: 'Organic & AI Search Growth',
      items: [
        { name: 'SEO Services', slug: 'seo-services', href: '/services/seo-services', desc: 'Page 1 organic rankings & authority' },
        { name: 'AEO Services', slug: 'aeo-services', href: '/services/aeo-services', desc: 'AI Overviews, ChatGPT & Perplexity citations' },
        { name: 'GEO Services', slug: 'geo-services', href: '/services/geo-services', desc: 'Generative Engine Optimization for AI Search' },
        { name: 'Performance Marketing', slug: 'ppc-paid-ads', href: '/services/ppc-paid-ads', desc: 'Google & Meta high-ROAS ads' },
        { name: 'Social Media Growth', slug: 'social-media-management', href: '/services/social-media-management', desc: 'Community & creative advocacy' },
        { name: 'Branding & UI/UX', slug: 'graphic-design', href: '/services/graphic-design', desc: 'Distinctive brand design systems' }
      ]
    }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro bar */}
      <div className="bg-[#0f172a] text-white/80 text-xs py-1.5 px-4 hidden md:block border-b border-white/10">
        <div className="max-w-container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <a 
              href={`tel:${siteSettings.contactPhone}`} 
              onClick={() => trackContactTap('call', { location: 'Header Topbar' })}
              className="hover:text-primary transition-colors flex items-center gap-1.5"
            >
              <Phone size={12} className="text-primary" /> {siteSettings.contactPhone}
            </a>
            <a href={`mailto:${siteSettings.contactEmail}`} className="hover:text-primary transition-colors flex items-center gap-1.5">
              <Mail size={12} className="text-primary" /> {siteSettings.contactEmail}
            </a>
          </div>
          <div className="flex items-center gap-4">
            {locationName ? (
              <span className="flex items-center gap-1.5 text-white/90">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                Active Region: <strong className="text-white bg-white/10 px-2 py-0.5 rounded border border-white/20">📍 {locationName}</strong>
                <button
                  onClick={handleClearLocation}
                  className="text-white/60 hover:text-white hover:bg-white/20 px-1.5 py-0.2 rounded ml-1 text-[11px] transition-colors"
                  title="Reset to all regions"
                >
                  ✕
                </button>
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-white/90">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                Serving <strong className="text-white">500+ Cities</strong> Across India & Worldwide
              </span>
            )}
            <span className="text-gray-400">|</span>
            <span className="text-white/80 font-medium">Digital Engineering & SEO</span>
            <span className="text-gray-400">|</span>
            <div className="flex items-center gap-3 pl-1">
              <a 
                href={siteSettings.socials?.linkedin || "https://www.linkedin.com/company/afwan-tech"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#0077b5] text-gray-300 transition-colors"
                title="AFWAN TECH on LinkedIn"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                </svg>
              </a>
              <a 
                href={siteSettings.socials?.youtube || "https://youtube.com/@afwantechservices?si=C1yL9fv94A6gaKy5"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#ff0000] text-gray-300 transition-colors"
                title="AFWAN TECH on YouTube"
                aria-label="YouTube"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a 
                href={siteSettings.socials?.instagram || "https://www.instagram.com/afwan.tech?cplk=MTB0cXN5amZ0dzVpNA=="} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#E4405F] text-gray-300 transition-colors"
                title="AFWAN TECH on Instagram"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a 
                href={siteSettings.socials?.facebook || "https://www.facebook.com/share/r/16Vp15WPEqC/"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-[#1877F2] text-gray-300 transition-colors"
                title="AFWAN TECH on Facebook"
                aria-label="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <nav className={`transition-all duration-300 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-white/80 backdrop-blur-sm py-4'} border-b border-gray-100`}>
        <div className="max-w-container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center group py-0.5" aria-label="Afwan Tech Home">
              <div className="relative h-10 sm:h-12 w-[150px] sm:w-[185px] flex items-center">
                <Image
                  src={siteSettings.headerLogo || "/afwan.png"}
                  alt={siteSettings.siteName || "Afwan Tech"}
                  width={185}
                  height={54}
                  className="w-auto h-full max-h-10 sm:max-h-12 object-contain object-left group-hover:scale-105 transition-transform"
                  priority
                />
              </div>
            </Link>

            {/* Location Badge (when on a location or city/service page) */}
            {locationName && (
              <div className="hidden xl:inline-flex items-center gap-1.5 bg-blue-50 text-primary text-xs font-bold px-3 py-1 rounded-full border border-blue-200">
                <Link 
                  href={locationSlug ? `/location/${locationSlug}` : '#'}
                  className="hover:underline flex items-center gap-1"
                  title={`Currently exploring services in ${locationName}`}
                >
                  <MapPin size={12} className="text-primary" /> {locationName}
                </Link>
                <button
                  onClick={handleClearLocation}
                  className="text-primary/50 hover:text-red-500 ml-1 text-xs transition-colors"
                  title="Reset region"
                >
                  ✕
                </button>
              </div>
            )}
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-[14px] font-semibold text-gray-700">
            <Link href="/" className={`hover:text-primary transition-colors ${pathname === '/' ? 'text-primary' : ''}`}>
              Home
            </Link>

            {/* Services Dropdown (Hover opens, Click visits /services) */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <Link 
                href="/services"
                className={`flex items-center gap-1 hover:text-primary transition-colors py-2 cursor-pointer ${pathname.startsWith('/services') ? 'text-primary' : ''}`}
              >
                Services {locationName ? <span className="text-primary font-bold">in {locationName}</span> : ''} <ChevronDown size={15} className={`transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-primary' : ''}`} />
              </Link>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-[680px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
                  {serviceCategories.map((cat, idx) => (
                    <div key={idx}>
                      <h4 className="text-[11px] font-black uppercase tracking-wider text-primary mb-3">
                        {cat.title}
                      </h4>
                      <div className="space-y-2">
                        {cat.items.map((item, i) => {
                          const targetHref = locationSlug ? `/${locationSlug}/services/${item.slug}` : item.href;
                          return (
                            <Link 
                              key={i} 
                              href={targetHref}
                              className="block p-2.5 rounded-xl hover:bg-blue-50/60 transition-colors group"
                            >
                              <span className="block font-bold text-gray-900 group-hover:text-primary text-sm transition-colors">
                                {item.name}
                                {locationName && (
                                  <span className="text-primary font-semibold ml-1.5 text-xs inline-block bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                                    in {locationName}
                                  </span>
                                )}
                              </span>
                              <span className="block text-xs text-gray-500 line-clamp-1">
                                {locationName ? `Premium ${item.name} tailored for ${locationName}` : item.desc}
                              </span>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                  <div className="col-span-2 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-gray-500">Need a bespoke solution?</span>
                    <Link href="/services" className="font-bold text-primary hover:underline flex items-center gap-1">
                      View all services <ArrowRight size={13} />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link href="/pricing" className={`hover:text-primary transition-colors ${pathname === '/pricing' ? 'text-primary' : ''}`}>
              Pricing
            </Link>

            <Link href="/portfolio" className={`hover:text-primary transition-colors ${pathname === '/portfolio' ? 'text-primary' : ''}`}>
              Portfolio
            </Link>

            <Link href="/about-us" className={`hover:text-primary transition-colors ${pathname === '/about-us' ? 'text-primary' : ''}`}>
              About
            </Link>

            <Link href="/blog" className={`hover:text-primary transition-colors ${pathname.startsWith('/blog') ? 'text-primary' : ''}`}>
              Blog
            </Link>

            <Link href="/contact-us" className={`hover:text-primary transition-colors ${pathname === '/contact-us' ? 'text-primary' : ''}`}>
              Contact
            </Link>
          </div>

          {/* CTA & Mobile Menu Button */}
          <div className="flex items-center gap-4">
            <Link 
              href="/contact-us"
              className="hidden sm:inline-flex btn-primary px-6 py-2.5 text-xs uppercase tracking-wider font-bold"
            >
              Get Free Audit
            </Link>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-gray-200 px-6 py-6 space-y-4 shadow-xl">
            {locationName && (
              <div className="p-3 bg-blue-50 rounded-xl border border-blue-100 flex items-center gap-2 text-xs font-bold text-primary">
                <MapPin size={14} /> Current Market Area: <strong>{locationName}</strong>
              </div>
            )}
            <Link href="/" className="block py-2 font-bold text-gray-800 hover:text-primary">Home</Link>
            <div className="py-2 border-y border-gray-100">
              <Link href="/services" className="flex items-center justify-between text-xs font-black uppercase text-gray-700 hover:text-primary mb-2">
                <span>Services {locationName ? `in ${locationName}` : ''}</span>
                <span className="text-[10px] text-primary font-bold">View all &rarr;</span>
              </Link>
              <div className="grid grid-cols-1 gap-2 pl-2 max-h-64 overflow-y-auto pr-1">
                {services.map((s, idx) => {
                  const targetHref = locationSlug ? `/${locationSlug}/services/${s.slug}` : `/services/${s.slug}`;
                  return (
                    <Link key={idx} href={targetHref} className="text-sm font-semibold text-gray-700 hover:text-primary flex items-center justify-between py-0.5">
                      <span>{s.title}</span>
                      {locationName && (
                        <span className="text-xs text-primary font-bold">in {locationName}</span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
            <Link href="/pricing" className="block py-2 font-bold text-gray-800 hover:text-primary">Pricing</Link>
            <Link href="/portfolio" className="block py-2 font-bold text-gray-800 hover:text-primary">Portfolio</Link>
            <Link href="/about-us" className="block py-2 font-bold text-gray-800 hover:text-primary">About Us</Link>
            <Link href="/blog" className="block py-2 font-bold text-gray-800 hover:text-primary">Blog</Link>
            <Link href="/contact-us" className="block py-2 font-bold text-gray-800 hover:text-primary">Contact Us</Link>
            <Link href="/contact-us" className="block text-center btn-primary w-full py-3 text-xs uppercase tracking-wider mt-4">
              Get Started Now
            </Link>

            {/* Mobile Social Links */}
            <div className="pt-3 border-t border-gray-100 flex items-center justify-center gap-4">
              <a 
                href={siteSettings.socials?.linkedin || "https://www.linkedin.com/company/afwan-tech"} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 rounded-xl bg-blue-50 text-[#0077b5] flex items-center justify-center border border-blue-100"
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
                className="w-10 h-10 rounded-xl bg-red-50 text-[#ff0000] flex items-center justify-center border border-red-100"
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
                className="w-10 h-10 rounded-xl bg-pink-50 text-[#E4405F] flex items-center justify-center border border-pink-100"
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
                className="w-10 h-10 rounded-xl bg-blue-50 text-[#1877F2] flex items-center justify-center border border-blue-100"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
