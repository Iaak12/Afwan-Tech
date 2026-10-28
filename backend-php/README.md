# Afwan Tech - PHP Backend API

Lightweight, blazing-fast, serverless-ready PHP backend for Contact Inquiries, Web Analytics, and Cohort Drip SEO Pacing.

## Files Structure

```
backend-php/
├── .htaccess         # Security, directory indexing block, and CORS headers
├── config.php        # Centralized configuration (email recipients, CORS whitelist)
├── db.php            # PDO Database connection (MySQL with automatic SQLite/JSON fallback)
├── schema.sql        # MySQL table definitions for drip_seo_config
├── drip-seo.php      # Drip SEO Engine endpoint (GET cohort & POST manual release buttons)
├── contact.php       # Lead capture & contact form submission handler
├── analytics.php     # High-speed web analytics event collector
├── stats.php         # Analytics dashboard endpoint
├── README.md         # Deployment instructions
└── data/             # Auto-created runtime storage (contacts.json, analytics logs, summary.json, drip_seo.sqlite)
```

## Features

1. **Drip SEO Engine (`drip-seo.php`, `db.php`, `schema.sql`)**:
   - Paces programmatic SEO indexation of 500+ locations and service pages to prevent crawl budget fatigue.
   - Calculates weekly active cohort vs queued cohort (`unlockedCount` vs `queuedCount`).
   - Supports manual action triggers:
     - `push_urls`: +100 or +200 URLs instantly live into Google index.
     - `release_batch`: release full weekly batch early.
     - `pagesPerWeek`: adjust auto pacing (50 to 150/week).
     - `enabled`: master toggle (Drip mode vs 100% all live).
   - Serves both REST JSON API for Next.js ISR synchronization and a standalone HTML Control Deck (`drip-seo.php?view=admin`).

2. **Lead & Contact Capture (`contact.php`)**:
   - Accepts JSON or standard URL-encoded form submissions from Next.js.
   - Validates email, names, and contact details.
   - Automatically logs inquiries into `data/contacts.json`.
   - Sends formatted HTML email notification using native PHP `mail()`.

3. **Web Analytics Engine (`analytics.php`)**:
   - Collects cookieless, GDPR-friendly pageviews.
   - Tracks paths, device types (desktop, mobile, tablet), and referrers.
   - Generates daily unique visitor metrics with anonymized salt hashing.

4. **Analytics Dashboard API (`stats.php`)**:
   - Returns total views, top pages, device breakdown, and traffic trends.

## MySQL Table Setup (`schema.sql`)

Run this SQL query in your cPanel phpMyAdmin or MySQL console:

```sql
CREATE TABLE IF NOT EXISTS drip_seo_config (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enabled TINYINT(1) DEFAULT 1,
    pages_per_week INT DEFAULT 75,
    start_date DATE NOT NULL,
    manual_urls_unlocked INT DEFAULT 0,
    manual_batches_unlocked INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO drip_seo_config (id, enabled, pages_per_week, start_date, manual_urls_unlocked, manual_batches_unlocked)
SELECT 1, 1, 75, '2026-07-01', 0, 0
WHERE NOT EXISTS (SELECT 1 FROM drip_seo_config WHERE id = 1);
```

## Deployment on cPanel / Shared Hosting / Apache

1. Upload the entire `backend-php/` folder into your `public_html/api/` or subdomain directory (e.g. `api.afwantech.com`).
2. Ensure PHP 7.4, 8.0, 8.1, 8.2, or 8.3 is enabled.
3. Verify that the web server user has write permissions for creating the `data/` directory.
4. Update `config.php` with your preferred recipient email address and allowed domain names.
5. In your Next.js application's environment configuration (`.env.local`), set:
   ```env
   NEXT_PUBLIC_PHP_API_URL=https://api.afwantech.com
   PHP_API_URL=https://api.afwantech.com/drip-seo.php
   ```
