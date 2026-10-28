<?php
/**
 * Database Connection & Drip SEO Data Storage
 * Supports MySQL (PDO) with automatic fallback to SQLite or JSON data storage.
 */

$config = file_exists(__DIR__ . '/config.php') ? require __DIR__ . '/config.php' : [];
$dataDir = $config['storage_dir'] ?? (__DIR__ . '/data');

if (!is_dir($dataDir)) {
    @mkdir($dataDir, 0755, true);
}

// Check MySQL environment variables or config
$dbHost = getenv('DB_HOST') ?: ($config['db_host'] ?? null);
$dbName = getenv('DB_NAME') ?: ($config['db_name'] ?? null);
$dbUser = getenv('DB_USER') ?: ($config['db_user'] ?? null);
$dbPass = getenv('DB_PASS') ?: ($config['db_pass'] ?? null);

$pdo = null;

if ($dbHost && $dbName && $dbUser) {
    try {
        $dsn = "mysql:host={$dbHost};dbname={$dbName};charset=utf8mb4";
        $pdo = new PDO($dsn, $dbUser, $dbPass, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);
        
        // Ensure table exists in MySQL
        $pdo->exec("CREATE TABLE IF NOT EXISTS drip_seo_config (
            id INT PRIMARY KEY AUTO_INCREMENT,
            enabled TINYINT(1) DEFAULT 1,
            pages_per_week INT DEFAULT 75,
            start_date DATE NOT NULL,
            manual_urls_unlocked INT DEFAULT 0,
            manual_batches_unlocked INT DEFAULT 0,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )");

        $check = $pdo->query("SELECT COUNT(*) FROM drip_seo_config")->fetchColumn();
        if ($check == 0) {
            $pdo->exec("INSERT INTO drip_seo_config (enabled, pages_per_week, start_date) VALUES (1, 75, '2026-07-01')");
        }
    } catch (Exception $e) {
        $pdo = null; // Will fallback below
    }
}

// Fallback to SQLite if MySQL is not available
if (!$pdo && extension_loaded('pdo_sqlite')) {
    try {
        $sqliteFile = $dataDir . '/drip_seo.sqlite';
        $pdo = new PDO("sqlite:" . $sqliteFile, null, null, [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]);

        $pdo->exec("CREATE TABLE IF NOT EXISTS drip_seo_config (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            enabled INTEGER DEFAULT 1,
            pages_per_week INTEGER DEFAULT 75,
            start_date TEXT NOT NULL,
            manual_urls_unlocked INTEGER DEFAULT 0,
            manual_batches_unlocked INTEGER DEFAULT 0,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )");

        $check = $pdo->query("SELECT COUNT(*) FROM drip_seo_config")->fetchColumn();
        if ($check == 0) {
            $pdo->exec("INSERT INTO drip_seo_config (enabled, pages_per_week, start_date) VALUES (1, 75, '2026-07-01')");
        }
    } catch (Exception $e) {
        $pdo = null;
    }
}

return $pdo;
