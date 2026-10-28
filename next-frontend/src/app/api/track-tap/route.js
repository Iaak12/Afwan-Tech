import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

function getStorageLocations() {
  return [
    path.join(process.cwd(), '..', 'backend-php', 'data'),
    path.join(process.cwd(), 'backend-php', 'data'),
    path.join(process.cwd(), 'data')
  ];
}

function loadTaps() {
  for (const dir of getStorageLocations()) {
    const file = path.join(dir, 'contact_taps.json');
    if (fs.existsSync(file)) {
      try {
        const content = fs.readFileSync(file, 'utf8').trim();
        if (content) {
          const parsed = JSON.parse(content);
          if (Array.isArray(parsed)) return parsed;
        }
      } catch (_) {}
    }
  }
  return [];
}

function saveTaps(taps) {
  const serialized = JSON.stringify(taps.slice(0, 2000), null, 2);
  for (const dir of getStorageLocations()) {
    try {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(path.join(dir, 'contact_taps.json'), serialized);
    } catch (_) {}
  }
}

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

    const taps = loadTaps();
    taps.unshift(tapRecord);
    saveTaps(taps);

    return NextResponse.json({ success: true, recorded: tapRecord });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const taps = loadTaps();
    const totalWhatsApp = taps.filter(t => t.type === 'whatsapp').length;
    const totalCalls = taps.filter(t => t.type === 'call').length;

    return NextResponse.json({
      success: true,
      data: {
        total: taps.length,
        whatsapp_taps: totalWhatsApp,
        call_taps: totalCalls,
        recent: taps.slice(0, 200),
        contact_taps: taps
      }
    });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const tapId = searchParams.get('id');

    let body = {};
    try {
      body = await request.json();
    } catch (e) {}

    const taps = loadTaps();

    if (body.action === 'clear_all') {
      saveTaps([]);
      return NextResponse.json({ success: true, message: 'All contact taps cleared.' });
    }

    const idsToDelete = new Set(
      body.ids || (body.id ? [body.id] : (tapId ? [tapId] : []))
    );

    const updated = taps.filter(t => !idsToDelete.has(t.id));
    saveTaps(updated);

    return NextResponse.json({ success: true, message: `Deleted ${taps.length - updated.length} tap(s).` });
  } catch (err) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
