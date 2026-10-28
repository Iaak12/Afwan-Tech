<?php
/**
 * WhatsApp and Call Click Tracking Endpoint (MySQL Powered)
 * Logs instant mobile/desktop contact tap events into Hostinger MySQL.
 */

$config = require_once __DIR__ . '/config.php';
$pdo = require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$rawInput = file_get_contents('php://input');
$payload = json_decode($rawInput, true) ?: $_POST;

$type = ($payload['type'] ?? 'whatsapp') === 'call' ? 'call' : 'whatsapp';
$path = trim($payload['path'] ?? '/');
$location = trim($payload['location'] ?? 'Website');
$screenWidth = intval($payload['screenWidth'] ?? 0);
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? '';

$device = 'desktop';
if (preg_match('/(android|iphone|ipad|mobile)/i', $userAgent) || ($screenWidth > 0 && $screenWidth < 768)) {
    $device = 'mobile';
} elseif ($screenWidth >= 768 && $screenWidth <= 1024) {
    $device = 'tablet';
}

$tapId = uniqid('tap_', true);
$referrer = trim($payload['referrer'] ?? 'Direct');

// 1. Insert into MySQL
if ($pdo) {
    try {
        $stmt = $pdo->prepare("
            INSERT INTO contact_taps 
            (id, type, path, location, device, referrer, created_at)
            VALUES (?, ?, ?, ?, ?, ?, NOW())
        ");
        $stmt->execute([$tapId, $type, $path, $location, $device, $referrer]);
    } catch (Exception $e) {
        // continue to backup
    }
}

// 2. Mirror into JSON backup
$dataDir = $config['storage_dir'] ?? (__DIR__ . '/data');
if (is_dir($dataDir)) {
    $tapsFile = $dataDir . '/contact_taps.json';
    $taps = file_exists($tapsFile) ? (json_decode(file_get_contents($tapsFile), true) ?: []) : [];
    array_unshift($taps, [
        'id' => $tapId,
        'type' => $type,
        'path' => $path,
        'location' => $location,
        'device' => $device,
        'referrer' => $referrer,
        'created_at' => date('Y-m-d H:i:s')
    ]);
    if (count($taps) > 2000) $taps = array_slice($taps, 0, 2000);
    @file_put_contents($tapsFile, json_encode($taps, JSON_PRETTY_PRINT));
}

echo json_encode([
    'success' => true,
    'message' => 'Tap recorded in database',
    'tap_id' => $tapId
]);
