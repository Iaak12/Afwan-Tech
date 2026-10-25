'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, BarChart3, Mail, MapPin, Globe, 
  Settings, ArrowLeft, ShieldCheck, ExternalLink, Menu, X, LogOut, Loader2 
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // If we are directly on /admin/login, don't show the dashboard shell
  const isLoginPage = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginPage) {
      setCheckingAuth(false);
      return;
    }

    const verifySession = async () => {
      try {
        const res = await fetch('/api/admin/check');
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          router.replace('/admin/login');
        }
      } catch (err) {
        router.replace('/admin/login');
      } finally {
        setCheckingAuth(false);
      }
    };

    verifySession();
  }, [pathname, isLoginPage, router]);

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/logout', { method: 'POST' });
    } catch (e) {
      console.error(e);
    }
    router.replace('/admin/login');
    router.refresh();
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col items-center justify-center text-white gap-3 font-inter">
        <Loader2 size={32} className="text-primary animate-spin" />
        <span className="text-xs font-semibold tracking-wider text-gray-400 uppercase">
          Verifying Admin Credentials...
        </span>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  const navItems = [
    { label: 'Overview Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Web Analytics (Pages/Users)', href: '/admin/analytics', icon: BarChart3 },
    { label: 'Inbound Leads / Inquiries', href: '/admin/contacts', icon: Mail },
    { label: '500+ SEO Locations', href: '/market-area', icon: MapPin },
  ];

  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-inter text-[#0f172a]">
      {/* Sidebar Desktop */}
      <aside className="hidden lg:flex w-64 bg-[#0f172a] text-white flex-col justify-between fixed inset-y-0 left-0 z-40 p-6">
        <div>
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 mb-8 pb-6 border-b border-white/10 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image
                src="/afwan.png"
                alt="Afwan Tech Logo"
                width={40}
                height={40}
                className="w-full h-full object-contain"
                priority
              />
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white block leading-none">
                AFWAN<span className="text-[#2081D3]">.TECH</span>
              </span>
              <span className="text-[9px] uppercase font-bold tracking-widest text-primary block mt-1">
                Admin Control Deck
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${isActive ? 'bg-primary text-white shadow-lg shadow-primary/30' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <span className="flex items-center gap-2"><Globe size={14} /> View Live Website</span>
            <ExternalLink size={12} />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-bold text-rose-400 hover:text-white hover:bg-rose-500/20 transition-all cursor-pointer"
          >
            <span className="flex items-center gap-2"><LogOut size={14} /> Sign Out</span>
          </button>

          <div className="px-4 py-1 text-[10px] text-gray-500 font-mono">
            Environment Auth (.env)
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Admin Top Navbar */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-700">Admin Live Telemetry Deck</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="hidden sm:inline-flex btn btn-outline !px-4 !py-2 text-xs font-bold items-center gap-1.5"
            >
              <ArrowLeft size={13} /> Return to Site
            </Link>

            <button
              onClick={handleLogout}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-gray-600 hover:text-rose-600 hover:bg-rose-50 transition-colors flex items-center gap-1.5 cursor-pointer border border-gray-200"
            >
              <LogOut size={13} />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {sidebarOpen && (
          <div className="lg:hidden bg-[#0f172a] text-white p-6 space-y-4 border-b border-white/10 shadow-xl">
            <nav className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold ${isActive ? 'bg-primary text-white' : 'text-gray-400'}`}
                  >
                    <Icon size={16} />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link href="/" target="_blank" className="text-xs text-primary font-bold">
                View Site →
              </Link>
              <button onClick={handleLogout} className="text-xs text-rose-400 font-bold">
                Sign Out
              </button>
            </div>
          </div>
        )}

        {/* Main Body */}
        <main className="p-6 md:p-10 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}
