/**
 * WhatsApp and Phone Call Tap Telemetry Tracker
 * Safely dispatches tap events via sendBeacon or fetch to persist in backend
 */

export const trackContactTap = (type = 'whatsapp', extra = {}) => {
  if (typeof window === 'undefined') return;

  try {
    const payload = {
      type, // 'whatsapp' | 'call'
      path: window.location.pathname,
      url: window.location.href,
      referrer: document.referrer || 'Direct',
      screenWidth: window.innerWidth,
      location: extra.location || 'Direct Website',
      timestamp: Date.now(),
      created_at: new Date().toISOString()
    };

    const phpApi = process.env.NEXT_PUBLIC_PHP_API_URL;
    const targetUrl = phpApi ? `${phpApi.replace(/\/$/, '')}/track_tap.php` : '/api/track-tap';
    const jsonStr = JSON.stringify(payload);

    // Send via fetch with keepalive first (reliable, handles JSON without CORS preflight/adblock beacon restrictions)
    if (typeof fetch === 'function') {
      fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: jsonStr,
        keepalive: true
      }).catch(() => {
        if (navigator.sendBeacon) {
          try {
            navigator.sendBeacon(targetUrl, new Blob([jsonStr], { type: 'text/plain' }));
          } catch (_) {}
        }
      });
    } else if (navigator.sendBeacon) {
      try {
        navigator.sendBeacon(targetUrl, new Blob([jsonStr], { type: 'text/plain' }));
      } catch (_) {}
    }
  } catch (e) {
    // Non-blocking telemetry
    console.debug('Tap tracking error:', e);
  }
};
