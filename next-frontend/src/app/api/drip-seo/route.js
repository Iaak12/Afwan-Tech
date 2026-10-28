import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'drip_seo.json');

function getFallbackConfig() {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const content = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(content);
    }
  } catch (e) {
    // ignore
  }

  return {
    enabled: true,
    pages_per_week: 75,
    start_date: '2026-07-01',
    manual_urls_unlocked: 0,
    manual_batches_unlocked: 0,
    updated_at: new Date().toISOString()
  };
}

function saveFallbackConfig(config) {
  try {
    const dir = path.dirname(DATA_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    config.updated_at = new Date().toISOString();
    fs.writeFileSync(DATA_FILE, JSON.stringify(config, null, 2), 'utf-8');
  } catch (e) {
    console.error('Error saving drip_seo.json', e);
  }
}

function computeDripMath(config) {
  const totalLocations = 595;
  const startMs = new Date(config.start_date || '2026-07-01').getTime();
  const weeksElapsed = Math.max(0, Math.floor((Date.now() - startMs) / (7 * 86400 * 1000)));
  const manualBatches = Number(config.manual_batches_unlocked || 0);
  const manualBonus = Number(config.manual_urls_unlocked || 0);
  const pagesPerWeek = Number(config.pages_per_week || 75);
  const activeBatches = 1 + weeksElapsed + manualBatches;

  const isEnabled = Boolean(config.enabled ?? true);
  let unlocked = totalLocations;
  let queued = 0;

  if (isEnabled) {
    unlocked = Math.min(totalLocations, activeBatches * pagesPerWeek + manualBonus);
    queued = Math.max(0, totalLocations - unlocked);
  }

  const nextBatchTime = new Date(startMs + (weeksElapsed + 1) * 7 * 86400 * 1000);

  return {
    enabled: isEnabled,
    pagesPerWeek,
    startDate: config.start_date || '2026-07-01',
    totalLocations,
    unlockedCount: unlocked,
    queuedCount: queued,
    manualUrlsUnlocked: manualBonus,
    manualBatchesUnlocked: manualBatches,
    nextBatchDate: nextBatchTime.toISOString().split('T')[0]
  };
}

export async function GET() {
  const phpUrl = process.env.PHP_API_URL || process.env.NEXT_PUBLIC_PHP_API_URL;
  if (phpUrl) {
    try {
      const target = `${phpUrl.replace(/\/$/, '')}/drip-seo.php`;
      const res = await fetch(target, { cache: 'no-store' });
      if (res.ok) {
        const json = await res.json();
        return NextResponse.json(json);
      }
    } catch (e) {
      // fallback
    }
  }

  const config = getFallbackConfig();
  const data = computeDripMath(config);
  return NextResponse.json({ success: true, data });
}

export async function POST(req) {
  try {
    const body = await req.json();
    const phpUrl = process.env.PHP_API_URL || process.env.NEXT_PUBLIC_PHP_API_URL;

    if (phpUrl) {
      try {
        const target = `${phpUrl.replace(/\/$/, '')}/drip-seo.php`;
        const res = await fetch(target, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });
        if (res.ok) {
          const json = await res.json();
          return NextResponse.json(json);
        }
      } catch (e) {
        // fallback
      }
    }

    const config = getFallbackConfig();
    const action = body.action || '';
    let message = '';

    if (action === 'push_urls') {
      const count = Number(body.count || 100);
      config.manual_urls_unlocked = (config.manual_urls_unlocked || 0) + count;
      message = `Pushed +${count} URLs into live indexing!`;
    } else if (action === 'release_batch') {
      const count = Number(body.count || 1);
      config.manual_batches_unlocked = (config.manual_batches_unlocked || 0) + count;
      message = `Released ${count} batch(es)!`;
    } else if (body.pagesPerWeek !== undefined) {
      config.pages_per_week = Math.max(10, Math.min(1000, Number(body.pagesPerWeek)));
      message = `Speed updated to ${config.pages_per_week}/week`;
    } else if (body.enabled !== undefined) {
      config.enabled = Boolean(body.enabled);
      message = config.enabled ? 'Drip enabled' : '100% pages live!';
    }

    saveFallbackConfig(config);
    const updatedData = computeDripMath(config);

    return NextResponse.json({ success: true, message, data: updatedData });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
