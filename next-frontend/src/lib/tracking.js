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

    if (navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
      navigator.sendBeacon(targetUrl, blob);
    } else {
      fetch(targetUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(() => {});
    }
  } catch (e) {
    // Non-blocking telemetry
    console.debug('Tap tracking error:', e);
  }
};
