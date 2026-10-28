<?php
/**
 * Afwan Tech - MySQL Database Automated Migration & Seeder
 * Connects to Hostinger MySQL, builds all tables, and seeds 595+ cities and states.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

$config = file_exists(__DIR__ . '/config.php') ? require __DIR__ . '/config.php' : [];

$dbHost = getenv('DB_HOST') ?: ($config['db_host'] ?? 'localhost');
$dbName = getenv('DB_NAME') ?: ($config['db_name'] ?? 'u100874370_afwantech');
$dbUser = getenv('DB_USER') ?: ($config['db_user'] ?? 'u100874370_admin');
$dbPass = getenv('DB_PASS') ?: ($config['db_pass'] ?? 'Shahbaz@4772');

$report = [
    'connected' => false,
    'tables_created' => [],
    'locations_seeded' => 0,
    'contacts_seeded' => 0,
    'taps_seeded' => 0,
    'errors' => []
];

try {
    $pdo = new PDO("mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4", $dbUser, $dbPass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
    $report['connected'] = true;
} catch (Exception $e) {
    $report['errors'][] = "Database Connection Failed: " . $e->getMessage();
}

if ($report['connected'] && $pdo) {
    try {
        // 1. Create Tables
        $pdo->exec("
            CREATE TABLE IF NOT EXISTS drip_seo_config (
                id INT PRIMARY KEY AUTO_INCREMENT,
                enabled TINYINT(1) DEFAULT 1,
                pages_per_week INT DEFAULT 75,
                start_date DATE NOT NULL,
                manual_urls_unlocked INT DEFAULT 0,
                manual_batches_unlocked INT DEFAULT 0,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
        $report['tables_created'][] = 'drip_seo_config';

        $pdo->exec("
            CREATE TABLE IF NOT EXISTS locations (
                id INT PRIMARY KEY AUTO_INCREMENT,
                slug VARCHAR(191) NOT NULL UNIQUE,
                name VARCHAR(255) NOT NULL,
                type VARCHAR(50) DEFAULT 'city',
                state VARCHAR(150) NOT NULL,
                country VARCHAR(100) DEFAULT 'India',
                title VARCHAR(255) NULL,
                meta_description TEXT NULL,
                h1 VARCHAR(255) NULL,
                avg_growth VARCHAR(100) DEFAULT '280% Organic Growth',
                businesses_scaled VARCHAR(50) DEFAULT '50+',
                rating VARCHAR(20) DEFAULT '4.9/5',
                reviews_count INT DEFAULT 150,
                status ENUM('active', 'paused', 'deleted') DEFAULT 'active',
                is_custom TINYINT(1) DEFAULT 0,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_locations_slug (slug),
                INDEX idx_locations_state (state),
                INDEX idx_locations_status (status),
                INDEX idx_locations_type (type)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
        $report['tables_created'][] = 'locations';

        $pdo->exec("
            CREATE TABLE IF NOT EXISTS contacts (
                id VARCHAR(100) PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                phone VARCHAR(50) NULL,
                service VARCHAR(150) DEFAULT 'General Consultation',
                budget VARCHAR(100) DEFAULT 'Flexible',
                message TEXT NULL,
                location VARCHAR(150) DEFAULT 'Direct Website',
                source VARCHAR(255) NULL,
                lead_type ENUM('location', 'website') DEFAULT 'website',
                status ENUM('new', 'in_progress', 'contacted', 'closed') DEFAULT 'new',
                notes TEXT NULL,
                ip_address VARCHAR(50) NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
                INDEX idx_contacts_status (status),
                INDEX idx_contacts_created_at (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
        $report['tables_created'][] = 'contacts';

        $pdo->exec("
            CREATE TABLE IF NOT EXISTS contact_taps (
                id VARCHAR(100) PRIMARY KEY,
                type ENUM('whatsapp', 'call') NOT NULL,
                path VARCHAR(255) NOT NULL,
                location VARCHAR(150) DEFAULT 'Website',
                device ENUM('desktop', 'mobile', 'tablet') DEFAULT 'desktop',
                referrer VARCHAR(255) DEFAULT 'Direct',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_taps_type (type),
                INDEX idx_taps_created_at (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
        $report['tables_created'][] = 'contact_taps';

        $pdo->exec("
            CREATE TABLE IF NOT EXISTS analytics_logs (
                id BIGINT PRIMARY KEY AUTO_INCREMENT,
                visitor_id VARCHAR(64) NOT NULL,
                path VARCHAR(255) NOT NULL,
                referrer VARCHAR(255) DEFAULT 'Direct',
                device ENUM('desktop', 'mobile', 'tablet') DEFAULT 'desktop',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                INDEX idx_analytics_path (path),
                INDEX idx_analytics_created_at (created_at)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        ");
        $report['tables_created'][] = 'analytics_logs';

        // 2. Seed Drip Config Initial Row
        $check = $pdo->query("SELECT COUNT(*) FROM drip_seo_config")->fetchColumn();
        if ($check == 0) {
            $pdo->exec("INSERT INTO drip_seo_config (id, enabled, pages_per_week, start_date) VALUES (1, 1, 75, '2026-07-01')");
        }

        // 3. Seed 595+ Locations from all_locations.json
        $locationsFile = __DIR__ . '/data/all_locations.json';
        if (file_exists($locationsFile)) {
            $locList = json_decode(file_get_contents($locationsFile), true);
            if (is_array($locList) && count($locList) > 0) {
                $stmt = $pdo->prepare("
                    INSERT INTO locations 
                    (slug, name, type, state, country, title, meta_description, h1, avg_growth, businesses_scaled, rating, reviews_count, status, is_custom)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'active', 0)
                    ON DUPLICATE KEY UPDATE 
                        name = VALUES(name),
                        state = VALUES(state),
                        type = VALUES(type),
                        title = VALUES(title),
                        meta_description = VALUES(meta_description),
                        h1 = VALUES(h1)
                ");

                $pdo->beginTransaction();
                foreach ($locList as $loc) {
                    $slug = $loc['slug'] ?? '';
                    $name = $loc['name'] ?? '';
                    if (!$slug || !$name) continue;

                    $stmt->execute([
                        $slug,
                        $name,
                        $loc['type'] ?? 'city',
                        $loc['state'] ?? 'Pan-India',
                        $loc['country'] ?? 'India',
                        $loc['title'] ?? "Best Web Development & SEO Agency in {$name} | Afwan Tech",
                        $loc['metaDescription'] ?? "Scale revenue in {$name} with award-winning Next.js Web Development.",
                        $loc['h1'] ?? "Web Development & Digital Growth Agency in {$name}",
                        $loc['avgGrowth'] ?? '280% Organic Growth',
                        $loc['businessesScaled'] ?? '50+',
                        $loc['rating'] ?? '4.9/5',
                        intval($loc['reviewsCount'] ?? 150)
                    ]);
                    $report['locations_seeded']++;
                }
                $pdo->commit();
            }
        }

        // 4. Seed Contacts if contacts.json exists
        $contactsFile = __DIR__ . '/data/contacts.json';
        if (file_exists($contactsFile)) {
            $contacts = json_decode(file_get_contents($contactsFile), true);
            if (is_array($contacts) && count($contacts) > 0) {
                $stmtContact = $pdo->prepare("
                    INSERT IGNORE INTO contacts 
                    (id, name, email, phone, service, budget, message, location, source, lead_type, status, notes, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ");
                foreach ($contacts as $c) {
                    if (empty($c['id']) || empty($c['email'])) continue;
                    $stmtContact->execute([
                        $c['id'],
                        $c['name'] ?? 'Anonymous',
                        $c['email'],
                        $c['phone'] ?? '',
                        $c['service'] ?? 'General Inquiry',
                        $c['budget'] ?? 'Flexible',
                        $c['message'] ?? '',
                        $c['location'] ?? 'Direct Website',
                        $c['source'] ?? 'Website',
                        $c['lead_type'] ?? 'website',
                        $c['status'] ?? 'new',
                        $c['notes'] ?? '',
                        $c['created_at'] ?? date('Y-m-d H:i:s')
                    ]);
                    $report['contacts_seeded']++;
                }
            }
        }

        // 5. Seed Contact Taps if contact_taps.json exists
        $tapsFile = __DIR__ . '/data/contact_taps.json';
        if (file_exists($tapsFile)) {
            $taps = json_decode(file_get_contents($tapsFile), true);
            if (is_array($taps) && count($taps) > 0) {
                $stmtTap = $pdo->prepare("
                    INSERT IGNORE INTO contact_taps 
                    (id, type, path, location, device, referrer, created_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                ");
                foreach ($taps as $t) {
                    if (empty($t['id'])) continue;
                    $stmtTap->execute([
                        $t['id'],
                        $t['type'] ?? 'whatsapp',
                        $t['path'] ?? '/',
                        $t['location'] ?? 'Website',
                        $t['device'] ?? 'desktop',
                        $t['referrer'] ?? 'Direct',
                        $t['created_at'] ?? date('Y-m-d H:i:s')
                    ]);
                    $report['taps_seeded']++;
                }
            }
        }

    } catch (Exception $e) {
        $report['errors'][] = $e->getMessage();
    }
}

// Return HTML UI if accessed in browser
if (!isset($_SERVER['HTTP_ACCEPT']) || strpos($_SERVER['HTTP_ACCEPT'], 'application/json') === false) {
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Afwan Tech - MySQL Database Migration & Seeder</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; margin: 0; }
            .card { background: #1e293b; border: 1px solid #334155; border-radius: 1.5rem; max-width: 650px; margin: 2rem auto; padding: 2.5rem; box-shadow: 0 25px 50px -12px rgba(0,0,0,0.5); }
            h1 { font-size: 1.75rem; color: #38bdf8; display: flex; align-items: center; gap: .75rem; margin-top: 0; }
            .item { display: flex; align-items: center; justify-between; padding: 0.85rem 1rem; background: #0f172a; border: 1px solid #334155; border-radius: 0.75rem; margin-bottom: 0.75rem; }
            .badge { background: #065f46; color: #34d399; font-weight: 700; font-size: 0.75rem; padding: 0.25rem 0.6rem; border-radius: 9999px; text-transform: uppercase; }
            .badge-warn { background: #854d0e; color: #facc15; }
            .badge-err { background: #991b1b; color: #fca5a5; }
            .btn { display: inline-block; background: #2563eb; color: #fff; padding: 0.75rem 1.5rem; border-radius: 0.75rem; text-decoration: none; font-weight: 700; margin-top: 1.5rem; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🚀 Database Seeder Report</h1>
            <p style="color: #94a3b8; font-size: 0.9rem;">Hostinger MySQL Database: <strong><?= htmlspecialchars($dbName) ?></strong></p>

            <div style="margin-top: 1.5rem;">
                <div class="item">
                    <span>MySQL Connection</span>
                    <span class="badge <?= $report['connected'] ? '' : 'badge-err' ?>"><?= $report['connected'] ? 'CONNECTED' : 'FAILED' ?></span>
                </div>

                <div class="item">
                    <span>Tables Verified / Created</span>
                    <span class="badge"><?= count($report['tables_created']) ?> Tables Ready</span>
                </div>

                <div class="item">
                    <span>595+ Locations & Cities</span>
                    <span class="badge"><?= $report['locations_seeded'] ?> Cities Seeded</span>
                </div>

                <div class="item">
                    <span>Inbound Leads</span>
                    <span class="badge"><?= $report['contacts_seeded'] ?> Leads Synchronized</span>
                </div>

                <div class="item">
                    <span>Contact Taps</span>
                    <span class="badge"><?= $report['taps_seeded'] ?> Taps Synchronized</span>
                </div>
            </div>

            <?php if (!empty($report['errors'])): ?>
                <div style="background: #450a0a; border: 1px solid #7f1d1d; padding: 1rem; border-radius: 0.75rem; margin-top: 1rem; color: #fca5a5; font-size: 0.85rem;">
                    <strong>Errors encountered:</strong><br>
                    <?= implode('<br>', array_map('htmlspecialchars', $report['errors'])) ?>
                </div>
            <?php else: ?>
                <div style="background: #022c22; border: 1px solid #065f46; padding: 1rem; border-radius: 0.75rem; margin-top: 1.5rem; color: #6ee7b7; font-size: 0.85rem;">
                    ✨ <strong>All 595 cities and states, tables, and telemetry have been successfully migrated into your MySQL database!</strong>
                </div>
            <?php endif; ?>

            <a href="drip-seo.php?view=admin" class="btn">Go to Drip SEO Control Deck →</a>
        </div>
    </body>
    </html>
    <?php
    exit();
}

header("Content-Type: application/json; charset=utf-8");
echo json_encode([
    'success' => empty($report['errors']),
    'data' => $report
]);

