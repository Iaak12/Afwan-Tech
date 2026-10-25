import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request) {
  try {
    const { username, password } = await request.json();

    const expectedUser = process.env.ADMIN_USERNAME || 'admin';
    const expectedPass = process.env.ADMIN_PASSWORD || 'admin@afwantech2026';
    const secretKey = process.env.ADMIN_SECRET_KEY || 'afwan_tech_super_secure_session_key_9876543210';

    if (username === expectedUser && password === expectedPass) {
      // Generate a signed session token
      const timestamp = Date.now();
      const payload = `${username}:${timestamp}`;
      const signature = crypto.createHmac('sha256', secretKey).update(payload).digest('hex');
      const token = `${Buffer.from(payload).toString('base64')}.${signature}`;

      const response = NextResponse.json({
        success: true,
        message: 'Authentication successful',
        user: { username }
      });

      // Set secure HTTP-only cookie
      response.cookies.set('afwan_admin_session', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });

      return response;
    } else {
      return NextResponse.json(
        { success: false, message: 'Invalid admin username or password' },
        { status: 401 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { success: false, message: 'Authentication processing failed' },
      { status: 500 }
    );
  }
}
