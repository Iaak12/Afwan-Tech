/**
 * Drip SEO Configuration & Cohort Pacing Engine
 * Manages incremental Google Search indexing for 500+ programmatic location and service pages.
 */

const PHP_API_URL = process.env.PHP_API_URL || process.env.NEXT_PUBLIC_PHP_API_URL || 'https://api.afwantech.com/drip-seo.php';

/**
 * Fetches current Drip SEO indexing status with hourly cache (ISR).
 */
export async function fetchDripStatus() {
  try {
    // 1. Try PHP API endpoint first
    const res = await fetch(PHP_API_URL, {
      next: { revalidate: 3600 }, // Hourly ISR cache
    });

    if (res.ok) {
      const json = await res.json();
      if (json && json.data) {
        return json.data;
      }
    }
  } catch (err) {
    // PHP API down or unreachable in local dev
  }

  // 2. Try internal Next.js API route if running in app runtime
  try {
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
    const localRes = await fetch(`${siteUrl}/api/drip-seo`, {
      next: { revalidate: 3600 },
    });
    if (localRes.ok) {
      const localJson = await localRes.json();
      if (localJson && localJson.data) {
        return localJson.data;
      }
    }
  } catch (e) {
    // ignore
  }

  // 3. Fallback defaults if APIs are temporarily down
  const totalLocations = 595;
  const pagesPerWeek = 75;
  const startDate = '2026-07-01';
  const startMs = new Date(startDate).getTime();
  const weeksElapsed = Math.max(0, Math.floor((Date.now() - startMs) / (7 * 86400 * 1000)));
  const unlocked = Math.min(totalLocations, (1 + weeksElapsed) * pagesPerWeek);

  return {
    enabled: true,
    pagesPerWeek,
    startDate,
    totalLocations,
    unlockedCount: unlocked,
    queuedCount: Math.max(0, totalLocations - unlocked),
    manualUrlsUnlocked: 0,
    manualBatchesUnlocked: 0,
    nextBatchDate: new Date(Date.now() + 7 * 86400 * 1000).toISOString().split('T')[0]
  };
}

/**
 * Splits any item list (cities, services, or URLs) into active cohort (unlocked) and queued cohort.
 */
export function calculateActiveCohort(totalItems = [], unlockedCount = 200, enabled = true) {
  if (!enabled || unlockedCount >= totalItems.length) {
    return { unlocked: totalItems, queued: [] };
  }
  return {
    unlocked: totalItems.slice(0, unlockedCount),
    queued: totalItems.slice(unlockedCount),
  };
}

/**
 * Checks whether a specific location slug is currently unlocked in the active cohort.
 */
export function isLocationUnlocked(slug, allLocations = [], unlockedCount = 200, enabled = true) {
  if (!enabled) return true;
  if (!slug) return true;
  const target = slug.toLowerCase().trim();
  const index = allLocations.findIndex(l => {
    const s = typeof l === 'string' ? l : l.slug;
    return s && s.toLowerCase() === target;
  });

  if (index === -1) {
    // If not found in primary list, don't accidentally block
    return true;
  }

  return index < unlockedCount;
}
