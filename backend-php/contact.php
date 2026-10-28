<?php
/**
 * Contact Submission & CRM API Endpoint (MySQL Powered)
 * Saves all leads into Hostinger MySQL contacts table, sends email, and supports CRM tracking.
 */

$config = require_once __DIR__ . '/config.php';
$pdo = require_once __DIR__ . '/db.php';

header('Content-Type: application/json; charset=utf-8');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$dataDir = $config['storage_dir'] ?? (__DIR__ . '/data');
$contactsFile = $dataDir . '/contacts.json';

$method = $_SERVER['REQUEST_METHOD'];

// GET: Return all submissions from MySQL
if ($method === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC");
            $leads = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo json_encode(['success' => true, 'data' => $leads]);
            exit();
        } catch (Exception $e) {
            // fallback below
        }
    }

    $contacts = file_exists($contactsFile) ? (json_decode(file_get_contents($contactsFile), true) ?: []) : [];
    echo json_encode(['success' => true, 'data' => $contacts]);
    exit();
}

// Parse JSON body once if available
$rawInput = file_get_contents('php://input');
$jsonInput = json_decode($rawInput, true) ?: [];

// Check if DELETE action (via HTTP DELETE verb or POST fallback)
$isDeleteAction = ($method === 'DELETE') ||
    ($method === 'POST' && (
        (isset($_GET['action']) && $_GET['action'] === 'delete') ||
        (isset($jsonInput['action']) && $jsonInput['action'] === 'delete') ||
        (isset($jsonInput['_method']) && strtoupper($jsonInput['_method']) === 'DELETE') ||
        (isset($_POST['action']) && $_POST['action'] === 'delete')
    ));

// Check if PATCH action (via HTTP PATCH verb or POST fallback)
$isPatchAction = ($method === 'PATCH') ||
    ($method === 'POST' && (
        (isset($_GET['action']) && in_array($_GET['action'], ['patch', 'update'])) ||
        (isset($jsonInput['action']) && in_array($jsonInput['action'], ['patch', 'update'])) ||
        (isset($jsonInput['_method']) && strtoupper($jsonInput['_method']) === 'PATCH') ||
        (isset($_POST['action']) && in_array($_POST['action'], ['patch', 'update']))
    ));

// DELETE: Delete lead by ID or bulk IDs from MySQL
if ($isDeleteAction) {
    $id = $jsonInput['id'] ?? $_POST['id'] ?? $_GET['id'] ?? null;
    $rawIds = $jsonInput['ids'] ?? $_POST['ids'] ?? ($id ? [$id] : []);
    $ids = array_values(array_filter(array_map('trim', array_map('strval', (array)$rawIds))));

    if ($pdo && !empty($ids)) {
        try {
            $inClause = implode(',', array_fill(0, count($ids), '?'));
            $stmt = $pdo->prepare("DELETE FROM contacts WHERE id IN ($inClause)");
            $stmt->execute(array_values($ids));

            echo json_encode(['success' => true, 'message' => count($ids) . ' submission(s) deleted from MySQL successfully!']);
            exit();
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            exit();
        }
    }

    if (file_exists($contactsFile) && !empty($ids)) {
        $contacts = json_decode(file_get_contents($contactsFile), true) ?: [];
        $contacts = array_values(array_filter($contacts, fn($l) => !in_array(strval($l['id'] ?? ''), $ids)));
        file_put_contents($contactsFile, json_encode($contacts, JSON_PRETTY_PRINT));
        echo json_encode(['success' => true, 'message' => 'Submission(s) deleted from storage']);
        exit();
    }

    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'No ID provided to delete']);
    exit();
}

// PATCH: Update lead status or internal notes in MySQL
if ($isPatchAction) {
    $input = !empty($jsonInput) ? $jsonInput : $_POST;
    $id = $input['id'] ?? $_GET['id'] ?? null;

    if (!$id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'ID is required']);
        exit();
    }

    if ($pdo) {
        try {
            $fields = [];
            $params = [];
            if (isset($input['status'])) {
                $fields[] = "status = ?";
                $params[] = $input['status'];
            }
            if (isset($input['notes'])) {
                $fields[] = "notes = ?";
                $params[] = $input['notes'];
            }
            if (!empty($fields)) {
                $params[] = $id;
                $sql = "UPDATE contacts SET " . implode(', ', $fields) . ", updated_at = NOW() WHERE id = ?";
                $stmt = $pdo->prepare($sql);
                $stmt->execute($params);
                echo json_encode(['success' => true, 'message' => 'Submission status updated in MySQL!']);
                exit();
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(['success' => false, 'message' => $e->getMessage()]);
            exit();
        }
    }

    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Update failed']);
    exit();
}

// POST: Lead Capture into MySQL
if ($method === 'POST') {
    $rawInput = file_get_contents('php://input');
    $data = json_decode($rawInput, true) ?: $_POST;

    $firstName   = trim($data['firstName'] ?? $data['name'] ?? '');
    $lastName    = trim($data['lastName'] ?? '');
    $name        = trim($firstName . ' ' . $lastName);
    $email       = filter_var(trim($data['email'] ?? ''), FILTER_VALIDATE_EMAIL);
    $phone       = trim($data['phone'] ?? '');
    $service     = trim($data['interestedIn'] ?? $data['service'] ?? 'General Consultation');
    $budget      = trim($data['budget'] ?? 'Flexible');
    $message     = trim($data['message'] ?? '');
    $location    = trim($data['location'] ?? 'Direct Website');
    $pageSource  = trim($data['pageSource'] ?? $_SERVER['HTTP_REFERER'] ?? 'Website');
    $ip          = $_SERVER['REMOTE_ADDR'] ?? 'Unknown';

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

    $isLocationLead = (
        stripos($pageSource, '/location/') !== false ||
        stripos($pageSource, '/market-area/') !== false ||
        (!empty($location) && stripos($location, 'Direct') === false && stripos($location, 'Website') === false && stripos($location, 'Global') === false)
    );

    $leadId = uniqid('lead_', true);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO contacts 
                (id, name, email, phone, service, budget, message, location, source, lead_type, status, notes, ip_address, created_at)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'new', '', ?, NOW())
            ");
            $stmt->execute([
                $leadId,
                $name,
                $email,
                $phone,
                $service,
                $budget,
                $message,
                $location,
                $pageSource,
                $isLocationLead ? 'location' : 'website',
                $ip
            ]);
        } catch (Exception $e) {
            // continue to email
        }
    }

    // Mirror to contacts.json backup
    if (is_dir($dataDir)) {
        $contacts = file_exists($contactsFile) ? (json_decode(file_get_contents($contactsFile), true) ?: []) : [];
        array_unshift($contacts, [
            'id' => $leadId,
            'name' => $name,
            'email' => $email,
            'phone' => $phone,
            'service' => $service,
            'budget' => $budget,
            'message' => $message,
            'location' => $location,
            'source' => $pageSource,
            'lead_type' => $isLocationLead ? 'location' : 'website',
            'status' => 'new',
            'created_at' => date('Y-m-d H:i:s')
        ]);
        @file_put_contents($contactsFile, json_encode($contacts, JSON_PRETTY_PRINT));
    }

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

    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your message has been received. Our team will contact you shortly.',
        'lead_id' => $leadId
    ]);
    exit();
}
