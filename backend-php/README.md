# Afwan Tech - PHP Backend API

Lightweight, blazing-fast, serverless-ready PHP backend for Contact Inquiries and Privacy-Focused Web Analytics.

## Files Structure

```
backend-php/
├── .htaccess         # Security, directory indexing block, and CORS headers
├── config.php        # Centralized configuration (email recipients, CORS whitelist)
├── contact.php       # Lead capture & contact form submission handler
├── analytics.php     # High-speed web analytics event collector
├── stats.php         # Analytics dashboard endpoint
├── README.md         # Deployment instructions
└── data/             # Auto-created runtime storage (contacts.json, analytics logs, summary.json)
```

## Features

1. **Lead & Contact Capture (`contact.php`)**:
   - Accepts JSON or standard URL-encoded form submissions from Next.js.
   - Validates email, names, and contact details.
   - Automatically logs inquiries into `data/contacts.json`.
   - Sends formatted HTML email notification using native PHP `mail()`.
   - Returns structured JSON response with instant HTTP status codes.

2. **Web Analytics Engine (`analytics.php`)**:
   - Collects cookieless, GDPR-friendly pageviews.
   - Tracks paths, device types (desktop, mobile, tablet), and referrers.
   - Generates daily unique visitor metrics with anonymized salt hashing.
   - Automatically aggregates stats in `data/summary.json` without requiring heavyweight SQL databases.

3. **Analytics Dashboard API (`stats.php`)**:
   - Returns total views, top pages, device breakdown, and traffic trends.
   - Powering the Next.js `/analytics` dashboard.

## Deployment on cPanel / Shared Hosting / Apache

1. Upload the entire `backend-php/` folder into your `public_html/api/` or subdomain directory (e.g. `api.afwantech.com`).
2. Ensure PHP 7.4, 8.0, 8.1, 8.2, or 8.3 is enabled.
3. Verify that the web server user has write permissions for creating the `data/` directory.
4. Update `config.php` with your preferred recipient email address and allowed domain names.
5. In your Next.js application's environment configuration (`.env.local`), set:
   ```env
   NEXT_PUBLIC_PHP_API_URL=https://api.afwantech.com
   ```
