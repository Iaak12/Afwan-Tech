import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function GET(request) {
  try {
    const sessionCookie = request.cookies.get('afwan_admin_session')?.value;

    if (!sessionCookie) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const [encodedPayload, signature] = sessionCookie.split('.');
    if (!encodedPayload || !signature) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const secretKey = process.env.ADMIN_SECRET_KEY || 'afwan_tech_super_secure_session_key_9876543210';
    const payload = Buffer.from(encodedPayload, 'base64').toString('utf8');
    const expectedSignature = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');

    if (signature !== expectedSignature) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    const [username, timestamp] = payload.split(':');
    const expectedUser = process.env.ADMIN_USERNAME || 'admin';

    // Verify username matches expected env
    if (username !== expectedUser) {
      return NextResponse.json({ authenticated: false }, { status: 401 });
    }

    return NextResponse.json({
      authenticated: true,
      user: { username }
    });
  } catch (err) {
    return NextResponse.json({ authenticated: false }, { status: 401 });
  }
}
