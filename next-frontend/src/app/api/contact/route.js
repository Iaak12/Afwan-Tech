import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendSmtpEmail, buildLeadNotificationHtml } from '@/lib/sendEmail';

export async function POST(request) {
  try {
    const body = await request.json();
    const { firstName, lastName, name, email, phone, interestedIn, service, budget, message, location, pageSource } = body;

    const contactName = (firstName ? `${firstName} ${lastName || ''}` : name || 'Anonymous').trim();

    if (!email) {
      return NextResponse.json({ success: false, message: 'Valid email address is required' }, { status: 400 });
    }

    const isLocationLead = Boolean(
      (location && !location.toLowerCase().includes('direct') && !location.toLowerCase().includes('website') && !location.toLowerCase().includes('global')) ||
      (pageSource && (pageSource.includes('/location/') || pageSource.includes('/market-area/')))
    );

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
      lead_type: isLocationLead ? 'location' : 'website',
      created_at: new Date().toISOString()
    };

    // 1. Store in local data file if directory exists
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

    // 2. Send instant email notification via SMTP
    let emailStatus = { success: false, skipped: true };
    try {
      const subject = `🔥 New Lead: ${lead.service} - ${lead.name} (${lead.location})`;
      const html = buildLeadNotificationHtml(lead);
      const text = `New Lead Submission on AFWAN TECH:\n\nName: ${lead.name}\nEmail: ${lead.email}\nPhone: ${lead.phone}\nService: ${lead.service}\nBudget: ${lead.budget}\nTarget Location: ${lead.location}\nPage Source: ${lead.source}\nMessage: ${lead.message}\nDate: ${lead.created_at}`;

      emailStatus = await sendSmtpEmail({
        subject,
        html,
        text
      });

      if (!emailStatus.success && emailStatus.warning) {
        console.warn('[Contact API Email Notice]:', emailStatus.warning);
      }
    } catch (mailErr) {
      console.error('[Contact API Email Error]:', mailErr.message);
    }

    // 3. Mirror lead asynchronously to Hostinger MySQL CRM database
    const phpApi = process.env.PHP_API_URL || process.env.NEXT_PUBLIC_PHP_API_URL || 'https://violet-ibis-402728.hostingersite.com/api/backend-php';
    if (phpApi) {
      try {
        fetch(`${phpApi.replace(/\/$/, '')}/contact.php`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            firstName: firstName || name || 'Anonymous',
            lastName: lastName || '',
            name: contactName,
            email,
            phone: phone || '',
            interestedIn: lead.service,
            service: lead.service,
            budget: lead.budget,
            message: lead.message,
            location: lead.location,
            pageSource: lead.source,
            skip_email: true
          })
        }).catch(e => console.warn('[Hostinger MySQL Sync Notice]:', e.message));
      } catch (syncErr) {
        console.warn('[Hostinger MySQL Sync Notice]:', syncErr.message);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Your consultation request has been submitted. Our growth team will reach out within 24 hours.',
      lead_id: lead.id,
      email_dispatched: emailStatus.success
    });
  } catch (err) {
    return NextResponse.json({ success: false, message: err.message || 'Server error' }, { status: 500 });
  }
}
