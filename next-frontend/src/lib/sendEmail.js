import tls from 'tls';

/**
 * Send an email via secure SMTP (Port 465 SSL/TLS) using Node.js native TLS socket.
 * Zero external packages required.
 *
 * Configured via .env.local:
 *   SMTP_HOST = smtp.gmail.com (or smtp.hostinger.com)
 *   SMTP_PORT = 465
 *   SMTP_USER = your-email@gmail.com
 *   SMTP_PASS = your-app-password (or hostinger email password)
 *   SMTP_FROM = "AFWAN TECH Leads" <your-email@gmail.com>
 *   ADMIN_EMAIL = recipient-email@gmail.com
 */
export async function sendSmtpEmail({ to, subject, html, text }) {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER ? process.env.SMTP_USER.trim() : '';
  const pass = process.env.SMTP_PASS ? process.env.SMTP_PASS.replace(/\s+/g, '') : '';
  const from = process.env.SMTP_FROM || user || 'contactafwantech@gmail.com';
  const recipient = to || process.env.ADMIN_EMAIL || 'contactafwantech@gmail.com';

  if (!user || !pass) {
    console.warn('[SMTP Notice] SMTP_USER or SMTP_PASS not set in environment. Skipping email dispatch.');
    return { 
      success: false, 
      warning: 'SMTP credentials missing. Please set SMTP_USER and SMTP_PASS in next-frontend/.env.local' 
    };
  }

  return new Promise((resolve) => {
    let socket;
    let step = 0;
    let buffer = '';
    let isDone = false;

    const finalize = (result) => {
      if (isDone) return;
      isDone = true;
      try {
        if (socket && !socket.destroyed) {
          socket.write('QUIT\r\n');
          socket.destroy();
        }
      } catch (_) {}
      resolve(result);
    };

    const sendCmd = (cmd) => {
      try {
        socket.write(cmd + '\r\n');
      } catch (err) {
        finalize({ success: false, error: err.message });
      }
    };

    const handleCode = (code, line) => {
      if (code >= 400) {
        return finalize({ success: false, error: `SMTP server returned error ${code}: ${line}` });
      }

      switch (step) {
        case 0: // Waiting for 220 banner on connect
          if (code === 220) {
            step = 1;
            sendCmd(`EHLO localhost`);
          }
          break;

        case 1: // After EHLO, send AUTH LOGIN
          if (code === 250) {
            step = 2;
            sendCmd('AUTH LOGIN');
          }
          break;

        case 2: // Server asks for username (334)
          if (code === 334) {
            step = 3;
            sendCmd(Buffer.from(user).toString('base64'));
          }
          break;

        case 3: // Server asks for password (334)
          if (code === 334) {
            step = 4;
            sendCmd(Buffer.from(pass).toString('base64'));
          }
          break;

        case 4: // Authenticated (235), send MAIL FROM
          if (code === 235) {
            step = 5;
            sendCmd(`MAIL FROM:<${user}>`);
          }
          break;

        case 5: // Sender accepted (250), send RCPT TO
          if (code === 250) {
            step = 6;
            sendCmd(`RCPT TO:<${recipient}>`);
          }
          break;

        case 6: // Recipient accepted (250), send DATA
          if (code === 250) {
            step = 7;
            sendCmd('DATA');
          }
          break;

        case 7: // Ready for data (354)
          if (code === 354) {
            step = 8;
            const messageId = `<lead-${Date.now()}-${Math.random().toString(36).substring(2, 8)}@afwantech.com>`;
            const emailData = [
              `From: ${from}`,
              `To: ${recipient}`,
              `Subject: ${subject}`,
              `Message-ID: ${messageId}`,
              `Date: ${new Date().toUTCString()}`,
              `MIME-Version: 1.0`,
              `Content-Type: text/html; charset=UTF-8`,
              `Content-Transfer-Encoding: 7bit`,
              '',
              html || `<p>${text || ''}</p>`,
              '.',
            ].join('\r\n');

            socket.write(emailData + '\r\n');
          }
          break;

        case 8: // Email queued for delivery (250)
          if (code === 250) {
            step = 9;
            return finalize({ success: true, message: 'Email sent successfully via SMTP' });
          }
          break;
      }
    };

    try {
      socket = tls.connect({
        host,
        port,
        minVersion: 'TLSv1.2',
        servername: host,
        rejectUnauthorized: false // avoids strict certificate chain blocks on custom mail hosts
      });

      socket.setEncoding('utf8');
      socket.setTimeout(12000); // 12 second network timeout

      socket.on('data', (chunk) => {
        buffer += chunk;
        const lines = buffer.split('\r\n');
        buffer = lines.pop(); // keep trailing incomplete segment
        for (const line of lines) {
          if (line.length >= 3) {
            const code = parseInt(line.substring(0, 3), 10);
            // In SMTP multiline responses, only lines where 4th char is space ' ' indicate completion
            if (!isNaN(code) && (line.length === 3 || line[3] === ' ')) {
              handleCode(code, line.substring(4));
            }
          }
        }
      });

      socket.on('timeout', () => {
        finalize({ success: false, error: 'SMTP connection timeout' });
      });

      socket.on('error', (err) => {
        finalize({ success: false, error: err.message });
      });
    } catch (e) {
      finalize({ success: false, error: e.message });
    }
  });
}

/**
 * Helper to build high-end responsive HTML email template for new inquiries
 */
export function buildLeadNotificationHtml(lead) {
  const brandName = 'AFWAN TECH';
  const name = lead.name || 'Anonymous';
  const email = lead.email || 'N/A';
  const phone = lead.phone || 'N/A';
  const service = lead.service || 'General Inquiry';
  const budget = lead.budget || 'Flexible';
  const location = lead.location || 'Direct Website';
  const message = lead.message || 'No additional note provided';
  const source = lead.source || 'Website';
  const dateFormatted = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });

  // Clean phone number for direct WhatsApp tap link
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const waLink = cleanPhone ? `https://wa.me/${cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone}` : null;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Lead - ${brandName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f1f5f9; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; padding: 30px 15px;">
    <tr>
      <td align="center">
        <!-- Main Container -->
        <table width="100%" max-width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">
          
          <!-- Header Bar -->
          <tr>
            <td style="background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 35px; text-align: left;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td>
                    <span style="display: inline-block; background-color: rgba(32, 129, 211, 0.2); color: #38bdf8; font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.15em; padding: 4px 10px; rounded-md; border-radius: 6px; margin-bottom: 8px;">
                      🔥 Instant Lead Notification
                    </span>
                    <h1 style="color: #ffffff; font-size: 22px; font-weight: 800; margin: 0; letter-spacing: -0.02em;">
                      ${service}
                    </h1>
                    <p style="color: #94a3b8; font-size: 13px; margin: 4px 0 0 0;">
                      Submitted via ${brandName} from ${location}
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Contact Quick Action Buttons -->
          <tr>
            <td style="padding: 20px 35px; background-color: #f8fafc; border-bottom: 1px solid #e2e8f0;">
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  ${phone !== 'N/A' ? `
                  <td style="padding-right: 10px;">
                    <a href="tel:${phone}" style="display: block; text-align: center; background-color: #2081D3; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; padding: 12px 18px; border-radius: 8px;">
                      📞 Call ${phone}
                    </a>
                  </td>
                  ` : ''}
                  ${waLink ? `
                  <td style="padding-right: 10px;">
                    <a href="${waLink}" style="display: block; text-align: center; background-color: #16a34a; color: #ffffff; text-decoration: none; font-size: 13px; font-weight: 700; padding: 12px 18px; border-radius: 8px;">
                      💬 WhatsApp
                    </a>
                  </td>
                  ` : ''}
                  <td>
                    <a href="mailto:${email}" style="display: block; text-align: center; background-color: #ffffff; color: #0f172a; border: 1px solid #cbd5e1; text-decoration: none; font-size: 13px; font-weight: 700; padding: 12px 18px; border-radius: 8px;">
                      ✉️ Reply Email
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Lead Details Table -->
          <tr>
            <td style="padding: 30px 35px;">
              <table width="100%" cellpadding="10" cellspacing="0" style="border-collapse: collapse; font-size: 14px;">
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td width="35%" style="color: #64748b; font-weight: 600;">Prospect Name:</td>
                  <td width="65%" style="color: #0f172a; font-weight: 700;">${name}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600;">Email Address:</td>
                  <td style="color: #2081D3; font-weight: 600;"><a href="mailto:${email}" style="color: #2081D3; text-decoration: none;">${email}</a></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600;">Phone Number:</td>
                  <td style="color: #0f172a; font-weight: 700;">${phone}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600;">Interested Service:</td>
                  <td><span style="background-color: #e0f2fe; color: #0369a1; font-weight: 700; padding: 3px 8px; border-radius: 4px; font-size: 13px;">${service}</span></td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600;">Estimated Budget:</td>
                  <td style="color: #059669; font-weight: 700;">${budget}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600;">Target Region:</td>
                  <td style="color: #0f172a;">📍 ${location}</td>
                </tr>
                <tr style="border-bottom: 1px solid #f1f5f9;">
                  <td style="color: #64748b; font-weight: 600;">Submitted Time:</td>
                  <td style="color: #64748b; font-size: 13px;">${dateFormatted} (IST)</td>
                </tr>
                <tr>
                  <td style="color: #64748b; font-weight: 600; vertical-align: top; padding-top: 14px;">Source Page:</td>
                  <td style="color: #64748b; font-size: 12px; word-break: break-all; padding-top: 14px;">
                    <a href="${source}" style="color: #64748b; text-decoration: underline;">${source}</a>
                  </td>
                </tr>
              </table>

              <!-- Message Section -->
              <div style="margin-top: 25px; padding: 20px; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #2081D3;">
                <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; letter-spacing: 0.1em; color: #64748b; margin-bottom: 6px;">
                  Message / Client Requirement
                </div>
                <div style="font-size: 14px; line-height: 1.6; color: #1e293b; white-space: pre-wrap;">
                  ${message}
                </div>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 20px 35px; text-align: center; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;">
              This inquiry was captured live by <strong>${brandName} Lead Engine</strong>.<br>
              Direct contact: contactafwantech@gmail.com | +91 7979850684
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

