<?php
/**
 * Analytics & Growth Telemetry Dashboard API (MySQL Powered)
 * Returns live counts from Hostinger MySQL (contacts, locations, taps, views).
 */

$config = require_once __DIR__ . '/config.php';
$pdo = require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataDir = $config['storage_dir'] ?? (__DIR__ . '/data');
$summaryFile = $dataDir . '/summary.json';
$contactsFile = $dataDir . '/contacts.json';
$tapsFile = $dataDir . '/contact_taps.json';

$contacts = [];
$taps = [];
$totalLocations = 595;

if ($pdo) {
    try {
        $contacts = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC")->fetchAll(PDO::FETCH_ASSOC);
        $taps = $pdo->query("SELECT * FROM contact_taps ORDER BY created_at DESC LIMIT 100")->fetchAll(PDO::FETCH_ASSOC);
        $totalLocations = (int)$pdo->query("SELECT COUNT(*) FROM locations WHERE status = 'active'")->fetchColumn() ?: 595;
    } catch (Exception $e) {
        // fallback
    }
}

if (empty($contacts) && file_exists($contactsFile)) {
    $contacts = json_decode(file_get_contents($contactsFile), true) ?: [];
}

if (empty($taps) && file_exists($tapsFile)) {
    $taps = json_decode(file_get_contents($tapsFile), true) ?: [];
}

$summary = file_exists($summaryFile) ? (json_decode(file_get_contents($summaryFile), true) ?: []) : [];

$totalPageviews = 0;
$deviceTotals = ['desktop' => 0, 'mobile' => 0, 'tablet' => 0];
$pageCounts = [];
$referrerCounts = [];
$dailyTrends = [];

foreach ($summary as $date => $dayData) {
    $views = $dayData['pageviews'] ?? 0;
    $uniques = count($dayData['unique_visitors'] ?? []);
    $totalPageviews += $views;

    $dailyTrends[] = [
        'date' => $date,
        'views' => $views,
        'visitors' => $uniques
    ];

    if (isset($dayData['devices'])) {
        foreach ($dayData['devices'] as $dev => $cnt) {
            $deviceTotals[$dev] = ($deviceTotals[$dev] ?? 0) + $cnt;
        }
    }

    if (isset($dayData['pages'])) {
        foreach ($dayData['pages'] as $p => $cnt) {
            $pageCounts[$p] = ($pageCounts[$p] ?? 0) + $cnt;
        }
    }

    if (isset($dayData['referrers'])) {
        foreach ($dayData['referrers'] as $r => $cnt) {
            $referrerCounts[$r] = ($referrerCounts[$r] ?? 0) + $cnt;
        }
    }
}

arsort($pageCounts);
$topPages = [];
$rank = 1;
foreach (array_slice($pageCounts, 0, 10, true) as $path => $count) {
    $topPages[] = [
        'rank' => $rank++,
        'path' => $path,
        'views' => $count
    ];
}

arsort($referrerCounts);
$topReferrers = [];
foreach (array_slice($referrerCounts, 0, 8, true) as $ref => $count) {
    $topReferrers[] = [
        'referrer' => $ref,
        'count' => $count
    ];
}

$whatsappTaps = count(array_filter($taps, fn($t) => ($t['type'] ?? '') === 'whatsapp'));
$callTaps = count(array_filter($taps, fn($t) => ($t['type'] ?? '') === 'call'));

echo json_encode([
    'success' => true,
    'data' => [
        'overview' => [
            'total_pageviews' => $totalPageviews,
            'total_leads'     => count($contacts),
            'total_taps'      => count($taps),
            'whatsapp_taps'   => $whatsappTaps,
            'call_taps'       => $callTaps,
            'active_locations'=> $totalLocations,
            'device_breakdown'=> $deviceTotals
        ],
        'trends'          => array_slice($dailyTrends, -14),
        'top_pages'       => $topPages,
        'top_referrers'   => $topReferrers,
        'recent_leads'    => array_slice($contacts, 0, 10),
        'all_leads'       => $contacts,
        'contact_taps'    => array_slice($taps, 0, 50)
    ]
]);
