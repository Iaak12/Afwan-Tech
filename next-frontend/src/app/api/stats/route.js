import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { getPhpApiUrl } from '@/lib/apiConfig';

function findDataFile(filename) {
  const dirs = [
    path.join(process.cwd(), '..', 'backend-php', 'data'),
    path.join(process.cwd(), 'backend-php', 'data'),
    path.join(process.cwd(), 'data')
  ];
  for (const dir of dirs) {
    const file = path.join(dir, filename);
    if (fs.existsSync(file)) return file;
  }
  return path.join(dirs[0], filename);
}

export async function GET() {
  try {
    // 1. Primary: Fetch live telemetry from Hostinger MySQL via PHP API
    const phpApi = getPhpApiUrl();
    if (phpApi) {
      try {
        const liveRes = await fetch(`${phpApi}/stats.php`, {
          cache: 'no-store',
          headers: { Accept: 'application/json' }
        });
        if (liveRes.ok) {
          const liveJson = await liveRes.json();
          if (liveJson.success && liveJson.data) {
            return NextResponse.json(liveJson);
          }
        }
      } catch (e) {
        // Fallback to local files below
      }
    }

    const summaryFile = findDataFile('summary.json');
    const contactsFile = findDataFile('contacts.json');
    const tapsFile = findDataFile('contact_taps.json');

    let summary = {};
    let contacts = [];
    let taps = [];

    if (fs.existsSync(summaryFile)) {
      try {
        summary = JSON.parse(fs.readFileSync(summaryFile, 'utf8')) || {};
      } catch (e) {
        summary = {};
      }
    }

    if (fs.existsSync(contactsFile)) {
      try {
        contacts = JSON.parse(fs.readFileSync(contactsFile, 'utf8')) || [];
      } catch (e) {
        contacts = [];
      }
    }

    if (fs.existsSync(tapsFile)) {
      try {
        taps = JSON.parse(fs.readFileSync(tapsFile, 'utf8')) || [];
      } catch (e) {
        taps = [];
      }
    }

    let totalPageviews = 0;
    const deviceTotals = { desktop: 0, mobile: 0, tablet: 0 };
    const pageCounts = {};
    const referrerCounts = {};
    const trends = [];

    for (const [date, val] of Object.entries(summary)) {
      const views = val.pageviews || 0;
      totalPageviews += views;
      trends.push({
        date,
        views,
        visitors: (val.unique_visitors || []).length || Math.floor(views * 0.7)
      });
      if (val.devices) {
        deviceTotals.desktop += val.devices.desktop || 0;
        deviceTotals.mobile += val.devices.mobile || 0;
        deviceTotals.tablet += val.devices.tablet || 0;
      }
      if (val.pages) {
        for (const [p, c] of Object.entries(val.pages)) {
          pageCounts[p] = (pageCounts[p] || 0) + c;
        }
      }
      if (val.referrers) {
        for (const [r, c] of Object.entries(val.referrers)) {
          referrerCounts[r] = (referrerCounts[r] || 0) + c;
        }
      }
    }

    // Sort trends by date ascending
    trends.sort((a, b) => a.date.localeCompare(b.date));

    const topPages = Object.entries(pageCounts)
      .map(([p, views]) => ({ path: p, views }))
      .sort((a, b) => b.views - a.views)
      .slice(0, 10);

    const topReferrers = Object.entries(referrerCounts)
      .map(([referrer, count]) => ({ referrer, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 8);

    const whatsappTaps = taps.filter(t => t.type === 'whatsapp').length;
    const callTaps = taps.filter(t => t.type === 'call').length;

    return NextResponse.json({
      success: true,
      data: {
        overview: {
          total_pageviews: totalPageviews,
          total_leads: contacts.length,
          total_taps: taps.length,
          whatsapp_taps: whatsappTaps,
          call_taps: callTaps,
          active_locations: 595,
          device_breakdown: deviceTotals
        },
        trends,
        top_pages: topPages,
        top_referrers: topReferrers,
        recent_leads: contacts.slice(0, 10),
        all_leads: contacts,
        contact_taps: taps.slice(0, 50)
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
