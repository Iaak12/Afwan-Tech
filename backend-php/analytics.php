<?php
/**
 * Lightweight Privacy-Friendly Web Analytics Ingestion Endpoint
 * Collects visits, path, referrer, device category, anonymized IP hash.
 */

$config = require_once __DIR__ . '/config.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit();
}

$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true) ?: [];

$path       = trim($payload['path'] ?? '/');
$referrer   = trim($payload['referrer'] ?? '');
$screenWidth= intval($payload['screenWidth'] ?? 0);
$userAgent  = $_SERVER['HTTP_USER_AGENT'] ?? '';
$ip         = $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1';

// Anonymize IP (one-way salt hash for daily unique visitor calculation)
$dateStr    = date('Y-m-d');
$visitorHash= hash('sha256', $ip . $userAgent . $dateStr . 'ezrank_salt');

// Device category detection
$device = 'desktop';
if (preg_match('/(android|iphone|ipad|mobile)/i', $userAgent) || ($screenWidth > 0 && $screenWidth < 768)) {
    $device = 'mobile';
} elseif ($screenWidth >= 768 && $screenWidth <= 1024) {
    $device = 'tablet';
}

$dataDir = $config['storage_dir'];
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$analyticsFile = $dataDir . '/analytics_' . date('Y_m') . '.json';
$dailyStatsFile = $dataDir . '/summary.json';

// Log event
$event = [
    'time'        => time(),
    'date'        => date('Y-m-d H:i:s'),
    'visitor_id'  => substr($visitorHash, 0, 16),
    'path'        => $path,
    'referrer'    => $referrer ? parse_url($referrer, PHP_URL_HOST) ?? $referrer : 'Direct',
    'device'      => $device
];

// Append to current monthly log (compact JSON line format for high speed)
file_put_contents($analyticsFile, json_encode($event) . PHP_EOL, FILE_APPEND | LOCK_EX);

// Update live aggregated summary
$summary = file_exists($dailyStatsFile) ? (json_decode(file_get_contents($dailyStatsFile), true) ?: []) : [];

$today = date('Y-m-d');
if (!isset($summary[$today])) {
    $summary[$today] = [
        'pageviews' => 0,
        'unique_visitors' => [],
        'devices' => ['desktop' => 0, 'mobile' => 0, 'tablet' => 0],
        'pages' => [],
        'referrers' => []
    ];
}

$summary[$today]['pageviews']++;
$summary[$today]['devices'][$device] = ($summary[$today]['devices'][$device] ?? 0) + 1;

if (!in_array($visitorHash, $summary[$today]['unique_visitors'])) {
    // Keep max 5000 visitor hashes per day to avoid huge memory
    if (count($summary[$today]['unique_visitors']) < 5000) {
        $summary[$today]['unique_visitors'][] = $visitorHash;
    }
}

// Top pages count
$summary[$today]['pages'][$path] = ($summary[$today]['pages'][$path] ?? 0) + 1;

// Referrers count
$refDomain = $event['referrer'] ?: 'Direct';
$summary[$today]['referrers'][$refDomain] = ($summary[$today]['referrers'][$refDomain] ?? 0) + 1;

// Keep only the last 30 days of summaries
if (count($summary) > 30) {
    $keys = array_keys($summary);
    sort($keys);
    unset($summary[$keys[0]]);
}

file_put_contents($dailyStatsFile, json_encode($summary, JSON_PRETTY_PRINT));

echo json_encode(['success' => true, 'tracked' => true]);
