import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json({ success: false, error: 'No file uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/svg+xml'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ success: false, error: 'Invalid file type. Please upload a JPG, PNG, WEBP, or SVG image.' }, { status: 400 });
    }

    // Determine extension
    let ext = '.jpg';
    if (file.type === 'image/png') ext = '.png';
    else if (file.type === 'image/webp') ext = '.webp';
    else if (file.type === 'image/svg+xml') ext = '.svg';
    else if (file.type === 'image/gif') ext = '.gif';

    const safeName = file.name ? file.name.replace(/[^a-zA-Z0-9.-]/g, '_') : 'avatar';
    const filename = `team_${Date.now()}_${safeName.endsWith(ext) ? safeName : safeName + ext}`;

    const uploadDir = path.join(process.cwd(), 'public', 'team');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    await fs.promises.writeFile(filePath, buffer);

    const imageUrl = `/team/${filename}`;
    return NextResponse.json({ success: true, imageUrl, filename });
  } catch (err) {
    console.error('Team image upload error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

