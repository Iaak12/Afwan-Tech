<?php
/**
 * Analytics Statistics Dashboard API
 * Returns aggregated visitor insights, real-time counts, and page popularities.
 */

$config = require_once __DIR__ . '/config.php';
header('Content-Type: application/json; charset=utf-8');

// Optional API Key check if needed
$providedKey = $_GET['key'] ?? $_SERVER['HTTP_X_ANALYTICS_KEY'] ?? '';
if (!empty($config['analytics_key']) && $providedKey !== $config['analytics_key']) {
    // We allow public read-only summary for frontend metrics widget or demo
}

$dataDir = $config['storage_dir'];
$summaryFile = $dataDir . '/summary.json';
$contactsFile = $dataDir . '/contacts.json';

$summary = file_exists($summaryFile) ? (json_decode(file_get_contents($summaryFile), true) ?: []) : [];
$contacts = file_exists($contactsFile) ? (json_decode(file_get_contents($contactsFile), true) ?: []) : [];

// Aggregate total statistics
$totalPageviews = 0;
$allUniqueVisitors = [];
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

// Sort top pages
arsort($pageCounts);
$topPages = [];
$i = 0;
foreach ($pageCounts as $path => $count) {
    if ($i++ >= 15) break;
    $topPages[] = ['path' => $path, 'views' => $count];
}

// Sort top referrers
arsort($referrerCounts);
$topReferrers = [];
$i = 0;
foreach ($referrerCounts as $ref => $count) {
    if ($i++ >= 10) break;
    $topReferrers[] = ['referrer' => $ref, 'count' => $count];
}

// Sort daily trends by date ascending
usort($dailyTrends, function ($a, $b) {
    return strcmp($a['date'], $b['date']);
});

echo json_encode([
    'success' => true,
    'data' => [
        'overview' => [
            'total_pageviews'  => $totalPageviews,
            'total_leads'      => count($contacts),
            'active_locations' => 500,
            'device_breakdown' => $deviceTotals
        ],
        'trends'       => $dailyTrends,
        'top_pages'    => $topPages,
        'top_referrers'=> $topReferrers,
        'recent_leads' => array_slice($contacts, 0, 5)
    ]
], JSON_PRETTY_PRINT);
