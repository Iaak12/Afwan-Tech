<?php
/**
 * WhatsApp and Call Click Tracking Endpoint
 * Logs instant mobile/desktop contact tap events
 */

$config = require_once __DIR__ . '/config.php';
header('Content-Type: application/json; charset=utf-8');

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

$dataDir = $config['storage_dir'];
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$tapsFile = $dataDir . '/contact_taps.json';
$taps = [];
if (file_exists($tapsFile)) {
    $taps = json_decode(file_get_contents($tapsFile), true) ?: [];
}

$tapRecord = [
    'id'         => uniqid('tap_', true),
    'type'       => $type,
    'path'       => $path,
    'location'   => $location,
    'device'     => $device,
    'referrer'   => trim($payload['referrer'] ?? 'Direct'),
    'ip'         => $_SERVER['REMOTE_ADDR'] ?? 'Unknown',
    'created_at' => date('Y-m-d H:i:s')
];

array_unshift($taps, $tapRecord);
if (count($taps) > 2000) {
    $taps = array_slice($taps, 0, 2000);
}
file_put_contents($tapsFile, json_encode($taps, JSON_PRETTY_PRINT));

echo json_encode(['success' => true, 'recorded' => $tapRecord]);
