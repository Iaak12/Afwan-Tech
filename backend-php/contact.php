<?php
/**
 * Contact Submission API Endpoint
 * Handles lead capture, validation, persistent logging, and email notification.
 */

$config = require_once __DIR__ . '/config.php';
header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method Not Allowed']);
    exit();
}

// Receive payload
$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    // Fallback to standard form POST
    $data = $_POST;
}

// Extract fields
$firstName   = trim($data['firstName'] ?? $data['name'] ?? '');
$lastName    = trim($data['lastName'] ?? '');
$name        = trim($firstName . ' ' . $lastName);
$email       = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$phone       = trim($data['phone'] ?? '');
$service     = trim($data['interestedIn'] ?? $data['service'] ?? 'General Inquiry');
$budget      = trim($data['budget'] ?? 'Not specified');
$message     = trim($data['message'] ?? '');
$location    = trim($data['location'] ?? 'Global / Direct');
$pageSource  = trim($data['pageSource'] ?? $_SERVER['HTTP_REFERER'] ?? 'Website');

if (empty($name) && empty($firstName)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Name is required']);
    exit();
}

if (!$email) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Valid email address is required']);
    exit();
}

// Ensure data directory exists
$dataDir = $config['storage_dir'];
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

// Determine lead origin type
$isLocationLead = (
    stripos($pageSource, '/location/') !== false ||
    stripos($pageSource, '/market-area/') !== false ||
    (!empty($location) && stripos($location, 'Direct') === false && stripos($location, 'Website') === false && stripos($location, 'Global') === false)
);

// Construct inquiry record
$inquiry = [
    'id'         => uniqid('lead_', true),
    'name'       => $name,
    'email'      => $email,
    'phone'      => $phone,
    'service'    => $service,
    'budget'     => $budget,
    'message'    => $message,
    'location'   => $location,
    'source'     => $pageSource,
    'lead_type'  => $isLocationLead ? 'location' : 'website',
    'ip'         => $_SERVER['REMOTE_ADDR'] ?? 'Unknown',
    'created_at' => date('Y-m-d H:i:s')
];

// Append to contacts.json
$contactsFile = $dataDir . '/contacts.json';
$existing = [];
if (file_exists($contactsFile)) {
    $existing = json_decode(file_get_contents($contactsFile), true) ?: [];
}
array_unshift($existing, $inquiry);
file_put_contents($contactsFile, json_encode($existing, JSON_PRETTY_PRINT));

// Send Email Notification
$to = $config['admin_email'];
$subject = "[New Lead] " . $service . " - " . $name . " (" . $location . ")";

$emailBody = "<html><body>";
$emailBody .= "<h2>New Consultation Request - " . htmlspecialchars($config['brand_name']) . "</h2>";
$emailBody .= "<table cellpadding='8' cellspacing='0' style='border:1px solid #ddd; width:100%; max-width:600px; font-family:sans-serif;'>";
$emailBody .= "<tr style='background:#f4f4f4;'><td><strong>Full Name:</strong></td><td>" . htmlspecialchars($name) . "</td></tr>";
$emailBody .= "<tr><td><strong>Email:</strong></td><td><a href='mailto:" . htmlspecialchars($email) . "'>" . htmlspecialchars($email) . "</a></td></tr>";
$emailBody .= "<tr style='background:#f4f4f4;'><td><strong>Phone:</strong></td><td>" . htmlspecialchars($phone) . "</td></tr>";
$emailBody .= "<tr><td><strong>Service Needed:</strong></td><td>" . htmlspecialchars($service) . "</td></tr>";
$emailBody .= "<tr style='background:#f4f4f4;'><td><strong>Estimated Budget:</strong></td><td>" . htmlspecialchars($budget) . "</td></tr>";
$emailBody .= "<tr><td><strong>Target Location:</strong></td><td>" . htmlspecialchars($location) . "</td></tr>";
$emailBody .= "<tr style='background:#f4f4f4;'><td><strong>Page Source:</strong></td><td>" . htmlspecialchars($pageSource) . "</td></tr>";
$emailBody .= "<tr><td><strong>Message:</strong></td><td>" . nl2br(htmlspecialchars($message)) . "</td></tr>";
$emailBody .= "<tr style='background:#f4f4f4;'><td><strong>Submitted On:</strong></td><td>" . date('M d, Y h:i A') . "</td></tr>";
$emailBody .= "</table></body></html>";

$headers = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: " . $config['brand_name'] . " <no-reply@" . ($_SERVER['SERVER_NAME'] ?? 'afwantech.com') . ">\r\n";
$headers .= "Reply-To: " . $email . "\r\n";

@mail($to, $subject, $emailBody, $headers);

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your message has been received. Our team will contact you shortly.',
    'lead_id' => $inquiry['id']
]);
