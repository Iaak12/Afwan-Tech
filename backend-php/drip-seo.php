<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$pdo = require_once __DIR__ . '/db.php';
$configApp = file_exists(__DIR__ . '/config.php') ? require __DIR__ . '/config.php' : [];
$dataDir = $configApp['storage_dir'] ?? (__DIR__ . '/data');
$jsonFile = $dataDir . '/drip_seo_config.json';

// Helper to get fallback data
function getDripConfigFallback($file) {
    if (file_exists($file)) {
        $data = json_decode(file_get_contents($file), true);
        if ($data) return $data;
    }
    return [
        'enabled' => 1,
        'pages_per_week' => 75,
        'start_date' => '2026-07-01',
        'manual_urls_unlocked' => 0,
        'manual_batches_unlocked' => 0,
        'updated_at' => date('Y-m-d H:i:s')
    ];
}

function saveDripConfigFallback($file, $data) {
    $data['updated_at'] = date('Y-m-d H:i:s');
    file_put_contents($file, json_encode($data, JSON_PRETTY_PRINT));
}

// Total locations count default is 595 (from Afwan Tech directory)
$totalLocations = 595;

// Load Config
if ($pdo) {
    try {
        $stmt = $pdo->query("SELECT * FROM drip_seo_config LIMIT 1");
        $config = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$config) {
            $config = getDripConfigFallback($jsonFile);
        }
        
        // Try getting real locations count if table exists
        try {
            $locCount = $pdo->query("SELECT COUNT(*) FROM locations WHERE status = 'active'")->fetchColumn();
            if ($locCount && $locCount > 0) {
                $totalLocations = (int)$locCount;
            }
        } catch (Exception $e) {
            // locations table does not exist, use 595
        }
    } catch (Exception $e) {
        $config = getDripConfigFallback($jsonFile);
    }
} else {
    $config = getDripConfigFallback($jsonFile);
}

$method = $_SERVER['REQUEST_METHOD'];

// Handle POST actions
if ($method === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true);
    if (!$input) {
        $input = $_POST;
    }

    $action = $input['action'] ?? '';
    $message = '';

    if ($action === 'push_urls') {
        $count = (int)($input['count'] ?? 100);
        if ($pdo) {
            $pdo->prepare("UPDATE drip_seo_config SET manual_urls_unlocked = manual_urls_unlocked + ?")->execute([$count]);
        } else {
            $config['manual_urls_unlocked'] = (int)$config['manual_urls_unlocked'] + $count;
            saveDripConfigFallback($jsonFile, $config);
        }
        $message = "Successfully pushed +{$count} URLs into live indexing cohort!";
    } elseif ($action === 'release_batch') {
        $batches = (int)($input['count'] ?? 1);
        if ($pdo) {
            $pdo->prepare("UPDATE drip_seo_config SET manual_batches_unlocked = manual_batches_unlocked + ?")->execute([$batches]);
        } else {
            $config['manual_batches_unlocked'] = (int)$config['manual_batches_unlocked'] + $batches;
            saveDripConfigFallback($jsonFile, $config);
        }
        $message = "Released {$batches} batch(es) ahead of schedule!";
    } elseif ($action === 'reset_cohort' || $action === 'reset') {
        $today = date('Y-m-d');
        if ($pdo) {
            $pdo->prepare("UPDATE drip_seo_config SET start_date = ?, manual_urls_unlocked = 0, manual_batches_unlocked = 0, enabled = 1")->execute([$today]);
        } else {
            $config['start_date'] = $today;
            $config['manual_urls_unlocked'] = 0;
            $config['manual_batches_unlocked'] = 0;
            $config['enabled'] = 1;
            saveDripConfigFallback($jsonFile, $config);
        }
        $message = "Drip cohort reset successfully! Fresh weekly pacing active starting today ($today).";
    } elseif (isset($input['startDate'])) {
        $newStart = date('Y-m-d', strtotime($input['startDate']));
        if ($pdo) {
            $pdo->prepare("UPDATE drip_seo_config SET start_date = ?")->execute([$newStart]);
        } else {
            $config['start_date'] = $newStart;
            saveDripConfigFallback($jsonFile, $config);
        }
        $message = "Cohort start date updated to $newStart!";
    } elseif (isset($input['pagesPerWeek'])) {
        $speed = max(10, min(1000, (int)$input['pagesPerWeek']));
        if ($pdo) {
            $pdo->prepare("UPDATE drip_seo_config SET pages_per_week = ?")->execute([$speed]);
        } else {
            $config['pages_per_week'] = $speed;
            saveDripConfigFallback($jsonFile, $config);
        }
        $message = "Crawl speed updated to {$speed} URLs/week!";
    } elseif (isset($input['enabled'])) {
        $en = $input['enabled'] ? 1 : 0;
        if ($pdo) {
            $pdo->prepare("UPDATE drip_seo_config SET enabled = ?")->execute([$en]);
        } else {
            $config['enabled'] = $en;
            saveDripConfigFallback($jsonFile, $config);
        }
        $message = $en ? "Drip SEO pacing enabled (safe drip crawl active)" : "Drip disabled: 100% pages live immediately!";
    }

    // If request was from an HTML form, redirect or show confirmation
    if (!isset($_SERVER['HTTP_ACCEPT']) || strpos($_SERVER['HTTP_ACCEPT'], 'application/json') === false) {
        if (!empty($_SERVER['HTTP_REFERER'])) {
            header("Location: " . $_SERVER['HTTP_REFERER']);
            exit();
        }
    }

    header("Content-Type: application/json; charset=utf-8");
    echo json_encode(["success" => true, "message" => $message ?: "Drip SEO configuration updated!"]);
    exit();
}

// Calculate Drip Math
$startMs = strtotime($config['start_date'] ?? '2026-07-01');
if (!$startMs || $startMs < 0) $startMs = strtotime('2026-07-01');
$weeksElapsed = max(0, floor((time() - $startMs) / (7 * 86400)));
$manualBatches = (int)($config['manual_batches_unlocked'] ?? 0);
$manualBonus = (int)($config['manual_urls_unlocked'] ?? 0);
$pagesPerWeek = (int)($config['pages_per_week'] ?? 75);
$activeBatches = 1 + $weeksElapsed + $manualBatches;

$isEnabled = (bool)($config['enabled'] ?? 1);

if ($isEnabled) {
    $unlocked = min($totalLocations, ($activeBatches * $pagesPerWeek) + $manualBonus);
    $queued = max(0, $totalLocations - $unlocked);
} else {
    $unlocked = $totalLocations;
    $queued = 0;
}

$nextBatchTime = $startMs + (($weeksElapsed + 1) * 7 * 86400);

// Check if browser HTML admin view requested
if (isset($_GET['view']) && $_GET['view'] === 'admin') {
    header("Content-Type: text/html; charset=utf-8");
    ?>
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Afwan Tech - Drip SEO Control Deck</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body { font-family: system-ui, -apple-system, sans-serif; background: #0f172a; color: #f8fafc; padding: 2rem; margin: 0; }
            .card { background: #1e293b; border: 1px solid #334155; border-radius: 1rem; max-width: 650px; margin: 0 auto; padding: 2rem; box-shadow: 0 20px 25px -5px rgba(0,0,0,0.5); }
            h1 { font-size: 1.5rem; margin-top: 0; color: #38bdf8; display: flex; align-items: center; gap: .5rem; }
            .grid { display: grid; grid-cols: 2; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; margin: 1.5rem 0; }
            .stat { background: #0f172a; padding: 1rem; border-radius: .75rem; border: 1px solid #334155; }
            .stat-num { font-size: 1.75rem; font-weight: 800; color: #fff; }
            .stat-lbl { font-size: 0.75rem; text-transform: uppercase; color: #94a3b8; font-weight: 600; margin-top: .25rem; }
            .btn { background: #2563eb; color: #fff; border: 0; padding: .75rem 1.25rem; border-radius: .5rem; font-weight: 700; cursor: pointer; transition: background .2s; }
            .btn:hover { background: #1d4ed8; }
            .btn-accent { background: #0284c7; }
            .btn-accent:hover { background: #0369a1; }
            .btn-group { display: flex; gap: .75rem; flex-wrap: wrap; margin-top: 1.5rem; }
            .progress-bar { background: #334155; border-radius: 9999px; height: 10px; overflow: hidden; margin-top: 1rem; }
            .progress-fill { background: linear-gradient(90deg, #38bdf8, #2563eb); height: 100%; transition: width 0.3s; }
        </style>
    </head>
    <body>
        <div class="card">
            <h1>🚀 Drip SEO Control Deck</h1>
            <p style="color: #94a3b8; font-size: 0.875rem;">Controls programmatic Google indexing pace to protect domain crawl budget and domain authority.</p>

            <div class="progress-bar">
                <div class="progress-fill" style="width: <?= round(($unlocked / $totalLocations) * 100) ?>%;"></div>
            </div>

            <div class="grid">
                <div class="stat">
                    <div class="stat-num" style="color: #4ade80;"><?= $unlocked ?></div>
                    <div class="stat-lbl">Active Unlocked URLs</div>
                </div>
                <div class="stat">
                    <div class="stat-num" style="color: #fbbf24;"><?= $queued ?></div>
                    <div class="stat-lbl">Queued (Noindex) URLs</div>
                </div>
                <div class="stat">
                    <div class="stat-num"><?= $pagesPerWeek ?>/wk</div>
                    <div class="stat-lbl">Release Pace</div>
                </div>
                <div class="stat">
                    <div class="stat-num"><?= date('M d, Y', $nextBatchTime) ?></div>
                    <div class="stat-lbl">Next Auto Batch</div>
                </div>
            </div>

            <form method="POST" action="drip-seo.php">
                <div class="btn-group">
                    <button type="submit" name="action" value="push_urls" class="btn">🚀 Push +100 URLs Live</button>
                    <button type="submit" name="action" value="push_urls" class="btn btn-accent" onclick="this.form.querySelector('[name=count]').value = 200;">🚀 Push +200 URLs Live</button>
                    <input type="hidden" name="count" value="100">
                </div>
            </form>
        </div>
    </body>
    </html>
    <?php
    exit();
}

// Return JSON Response
$servicesPerLocation = 8;
$otherPages = 22;
$totalCityServiceUrls = (int)$totalLocations * $servicesPerLocation;
$totalUrls = (int)$totalLocations + $totalCityServiceUrls + $otherPages;
$unlockedCityServiceUrls = (int)$unlocked * $servicesPerLocation;
$unlockedUrls = (int)$unlocked + $unlockedCityServiceUrls + $otherPages;
$queuedCityServiceUrls = (int)$queued * $servicesPerLocation;
$queuedUrls = (int)$queued + $queuedCityServiceUrls;

header("Content-Type: application/json; charset=utf-8");
echo json_encode([
    "success" => true,
    "data" => [
        "enabled" => $isEnabled,
        "pagesPerWeek" => $pagesPerWeek,
        "startDate" => $config['start_date'] ?? '2026-07-01',
        "totalLocations" => (int)$totalLocations,
        "servicesPerLocation" => $servicesPerLocation,
        "totalCityServiceUrls" => $totalCityServiceUrls,
        "otherPages" => $otherPages,
        "totalUrls" => $totalUrls,
        "unlockedCount" => (int)$unlocked,
        "queuedCount" => (int)$queued,
        "unlockedUrls" => $unlockedUrls,
        "queuedUrls" => $queuedUrls,
        "manualUrlsUnlocked" => (int)$manualBonus,
        "manualBatchesUnlocked" => (int)$manualBatches,
        "nextBatchDate" => date("Y-m-d", $nextBatchTime)
    ]
]);
