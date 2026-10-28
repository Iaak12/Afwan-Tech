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
        { name: 'Mobile App Development', slug: 'app-development', href: '/services/app-development', desc: 'Cross-platform iOS & Android apps' }
      ]
    },
    {
      title: 'Organic & Paid Growth',
      items: [
        { name: 'SEO Services', slug: 'seo-services', href: '/services/seo-services', desc: 'Page 1 organic rankings & authority' },
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

            {/* Services Dropdown (Location-Aware) */}
            <div 
              className="relative"
              onMouseEnter={() => setServicesDropdown(true)}
              onMouseLeave={() => setServicesDropdown(false)}
            >
              <button className="flex items-center gap-1 hover:text-primary transition-colors py-2 cursor-pointer">
                Services {locationName ? <span className="text-primary font-bold">in {locationName}</span> : ''} <ChevronDown size={15} className={`transition-transform duration-200 ${servicesDropdown ? 'rotate-180 text-primary' : ''}`} />
              </button>

              {servicesDropdown && (
                <div className="absolute top-full left-0 w-[620px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6 grid grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-200">
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
              <span className="block text-xs font-black uppercase text-gray-400 mb-2">
                Services {locationName ? `in ${locationName}` : ''}
              </span>
              <div className="grid grid-cols-1 gap-2 pl-2">
                {services.slice(0, 8).map((s, idx) => {
                  const targetHref = locationSlug ? `/${locationSlug}/services/${s.slug}` : `/services/${s.slug}`;
                  return (
                    <Link key={idx} href={targetHref} className="text-sm font-semibold text-gray-700 hover:text-primary flex items-center justify-between">
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
          </div>
        )}
      </nav>
    </header>
  );
}
