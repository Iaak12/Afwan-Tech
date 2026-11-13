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
  // Paced release: 35 Tier-1 hubs in Week 1, then +33 locations (~360 URLs) every week
  // Spreads all 595 locations (6,500+ URLs) smoothly across 4 months (18 weeks)
  const totalLocations = 595;
  const locationsPerWeek = 33;
  const startDate = '2026-11-14';
  const startMs = new Date(startDate).getTime();
  const weeksElapsed = Math.max(0, Math.floor((Date.now() - startMs) / (7 * 86400 * 1000)));
  const unlocked = Math.min(totalLocations, 35 + (weeksElapsed * locationsPerWeek));

  return {
    enabled: true,
    pagesPerWeek: locationsPerWeek * 11,
    startDate,
    totalLocations,
    unlockedCount: unlocked,
    queuedCount: Math.max(0, totalLocations - unlocked),
    manualUrlsUnlocked: 0,
    manualBatchesUnlocked: 0,
    nextBatchDate: new Date(startMs + (weeksElapsed + 1) * 7 * 86400 * 1000).toISOString().split('T')[0]
  };
}

export const PRIORITY_TECH_HUBS = [
  'bengaluru', 'mumbai', 'delhi-ncr', 'new-delhi', 'noida', 'gurugram',
  'hyderabad', 'pune', 'chennai', 'kolkata', 'ahmedabad', 'jaipur',
  'chandigarh', 'indore', 'kochi', 'lucknow', 'navi-mumbai', 'thane',
  'karnataka', 'maharashtra', 'tamil-nadu', 'gujarat', 'telangana',
  'west-bengal', 'rajasthan', 'kerala', 'uttar-pradesh', 'delhi'
];

/**
 * Splits any item list (cities, services, or URLs) into active cohort (unlocked) and queued cohort.
 * Prioritizes high-intent commercial tech hubs to prevent index bloat and doorway penalties.
 */
export function calculateActiveCohort(totalItems = [], unlockedCount = 35, enabled = true) {
  if (!enabled || unlockedCount >= totalItems.length) {
    return { unlocked: totalItems, queued: [] };
  }

  // Sort priority tech hubs to the front
  const prioritySet = new Set(PRIORITY_TECH_HUBS);
  const prioritized = [];
  const regular = [];

  for (const item of totalItems) {
    const slug = typeof item === 'string' ? item.toLowerCase().trim() : (item.slug || '').toLowerCase().trim();
    if (prioritySet.has(slug)) {
      prioritized.push(item);
    } else {
      regular.push(item);
    }
  }

  const combined = [...prioritized, ...regular];
  return {
    unlocked: combined.slice(0, unlockedCount),
    queued: combined.slice(unlockedCount),
  };
}

/**
 * Checks whether a specific location slug is currently unlocked in the active cohort.
 */
export function isLocationUnlocked(slug, allLocations = [], unlockedCount = 35, enabled = true) {
  if (!enabled) return true;
  if (!slug) return true;
  const target = slug.toLowerCase().trim();

  // Tier 1 tech hubs and primary states are always unlocked
  if (PRIORITY_TECH_HUBS.includes(target)) {
    return true;
  }

  const { unlocked } = calculateActiveCohort(allLocations, unlockedCount, enabled);
  return unlocked.some(l => {
    const s = typeof l === 'string' ? l : l.slug;
    return s && s.toLowerCase() === target;
  });
}
