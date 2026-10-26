import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const raw = await request.text();
    const data = JSON.parse(raw || '{}');

    const type = data.type === 'call' ? 'call' : 'whatsapp';
    const clientPath = (data.path || '/').trim();
    const location = data.location || (clientPath.includes('/location/') ? clientPath.split('/location/')[1].replace(/-/g, ' ') : 'Website');
    
    const screenWidth = parseInt(data.screenWidth || '0', 10);
    const device = screenWidth > 0 && screenWidth < 768 ? 'mobile' : screenWidth >= 768 && screenWidth <= 1024 ? 'tablet' : 'desktop';

    const tapRecord = {
      id: `tap_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      type,
      path: clientPath,
      location,
      device,
      referrer: data.referrer || 'Direct',
      created_at: new Date().toISOString()
    };

    // Save to storage
    const dataDir = path.join(process.cwd(), '..', 'backend-php', 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    const tapsFile = path.join(dataDir, 'contact_taps.json');
    let taps = [];
    if (fs.existsSync(tapsFile)) {
      try {
        taps = JSON.parse(fs.readFileSync(tapsFile, 'utf8')) || [];
      } catch (e) {
        taps = [];
      }
    }

    taps.unshift(tapRecord);
    // Keep max 2000 tap records
    if (taps.length > 2000) {
      taps = taps.slice(0, 2000);
    }
    fs.writeFileSync(tapsFile, JSON.stringify(taps, null, 2));

    return NextResponse.json({ success: true, recorded: tapRecord });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), '..', 'backend-php', 'data');
    const tapsFile = path.join(dataDir, 'contact_taps.json');

    let taps = [];
    if (fs.existsSync(tapsFile)) {
      try {
        taps = JSON.parse(fs.readFileSync(tapsFile, 'utf8')) || [];
      } catch (e) {
        taps = [];
      }
    }

    const totalWhatsApp = taps.filter(t => t.type === 'whatsapp').length;
    const totalCalls = taps.filter(t => t.type === 'call').length;

    return NextResponse.json({
      success: true,
      data: {
        total: taps.length,
        whatsapp_taps: totalWhatsApp,
        call_taps: totalCalls,
        recent: taps.slice(0, 50)
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
