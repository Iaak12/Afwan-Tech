import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, name, email, phone, interestedIn, service, budget, message, location, pageSource } = body;

    const contactName = (firstName ? `${firstName} ${lastName || ''}` : name || 'Anonymous').trim();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Valid email address is required' }, { status: 400 });
    }

    const lead = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: contactName,
      email,
      phone: phone || '',
      service: interestedIn || service || 'General Consultation',
      budget: budget || 'Flexible',
      message: message || '',
      location: location || 'Direct Website',
      source: pageSource || 'Website',
      createdAt: new Date().toISOString()
    };

    // Store in local data file if directory exists
    try {
      const dataDir = path.join(process.cwd(), '..', 'backend-php', 'data');
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true });
      }
      const contactsFile = path.join(dataDir, 'contacts.json');
      let contacts = [];
      if (fs.existsSync(contactsFile)) {
        try {
          contacts = JSON.parse(fs.readFileSync(contactsFile, 'utf8')) || [];
        } catch (e) {
          contacts = [];
        }
      }
      contacts.unshift(lead);
      fs.writeFileSync(contactsFile, JSON.stringify(contacts, null, 2));
    } catch (err) {
      console.warn('Local file write notice:', err.message);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your consultation request has been submitted. Our growth team will reach out within 24 hours.',
      lead_id: lead.id
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message || 'Server error' }, { status: 500 });
  }
}
