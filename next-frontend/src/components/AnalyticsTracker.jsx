'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const lastTrackedPath = useRef('');

  useEffect(() => {
    // Only track if pathname actually changed
    if (pathname === lastTrackedPath.current) return;
    lastTrackedPath.current = pathname;

    const payload = {
      path: pathname,
      referrer: typeof document !== 'undefined' ? document.referrer : '',
      screenWidth: typeof window !== 'undefined' ? window.innerWidth : 0,
      timestamp: Date.now()
    };

    // Determine target URL (Use PHP server if configured, else Next.js internal API route)
    const phpApi = process.env.NEXT_PUBLIC_PHP_API_URL;
    const targetUrl = phpApi ? `${phpApi.replace(/\/$/, '')}/analytics.php` : '/api/analytics';

    try {
      fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        mode: 'cors',
        keepalive: true
      }).catch(() => {
        // Silently tolerate if offline or tracking blocked
      });
    } catch (e) {
      // Ignore
    }
  }, [pathname]);

  return null;
}
