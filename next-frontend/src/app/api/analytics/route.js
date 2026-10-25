import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { path: pagePath, referrer, screenWidth } = body;

    const dataDir = path.join(process.cwd(), '..', 'backend-php', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const summaryFile = path.join(dataDir, 'summary.json');
    let summary = {};
    if (fs.existsSync(summaryFile)) {
      try {
        summary = JSON.parse(fs.readFileSync(summaryFile, 'utf8')) || {};
      } catch (e) {
        summary = {};
      }
    }

    const today = new Date().toISOString().split('T')[0];
    if (!summary[today]) {
      summary[today] = {
        pageviews: 0,
        unique_visitors: [],
        devices: { desktop: 0, mobile: 0, tablet: 0 },
        pages: {},
        referrers: {}
      };
    }

    let device = 'desktop';
    if (screenWidth > 0 && screenWidth < 768) device = 'mobile';
    else if (screenWidth >= 768 && screenWidth <= 1024) device = 'tablet';

    summary[today].pageviews = (summary[today].pageviews || 0) + 1;
    summary[today].devices[device] = (summary[today].devices[device] || 0) + 1;

    const p = pagePath || '/';
    summary[today].pages[p] = (summary[today].pages[p] || 0) + 1;

    const ref = referrer ? (referrer.replace(/^https?:\/\//, '').split('/')[0] || 'Direct') : 'Direct';
    summary[today].referrers[ref] = (summary[today].referrers[ref] || 0) + 1;

    fs.writeFileSync(summaryFile, JSON.stringify(summary, null, 2));

    return NextResponse.json({ success: true, tracked: true });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
