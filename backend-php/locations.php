<?php
/**
 * Locations & Programmatic Cities API (MySQL Powered)
 * Supports dynamic querying, adding new cities, updating metadata, and deleting locations.
 */

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$pdo = require_once __DIR__ . '/db.php';
$config = file_exists(__DIR__ . '/config.php') ? require __DIR__ . '/config.php' : [];
$dataDir = $config['storage_dir'] ?? (__DIR__ . '/data');
$customLocationsFile = $dataDir . '/customLocations.json';

$method = $_SERVER['REQUEST_METHOD'];

// Helper to fallback to JSON if MySQL table not yet ready
function getFallbackLocations($file) {
    $all = file_exists(__DIR__ . '/data/all_locations.json') ? json_decode(file_get_contents(__DIR__ . '/data/all_locations.json'), true) : [];
    $custom = file_exists($file) ? json_decode(file_get_contents($file), true) : ['added' => [], 'deletedSlugs' => []];
    $deleted = array_flip($custom['deletedSlugs'] ?? []);
    $filtered = array_values(array_filter($all, function($l) use ($deleted) {
        return !isset($deleted[$l['slug']]);
    }));
    if (!empty($custom['added'])) {
        $filtered = array_merge($custom['added'], $filtered);
    }
    return $filtered;
}

// GET: Fetch all active locations
if ($method === 'GET') {
    $query = strtolower(trim($_GET['q'] ?? ''));
    $stateFilter = trim($_GET['state'] ?? '');
    $typeFilter = trim($_GET['type'] ?? '');

    if ($pdo) {
        try {
            $sql = "SELECT * FROM locations WHERE status = 'active'";
            $params = [];

            if (!empty($query)) {
                $sql .= " AND (LOWER(name) LIKE ? OR LOWER(slug) LIKE ? OR LOWER(state) LIKE ?)";
                $like = "%{$query}%";
                $params[] = $like;
                $params[] = $like;
                $params[] = $like;
            }

            if (!empty($stateFilter)) {
                $sql .= " AND state = ?";
                $params[] = $stateFilter;
            }

            if (!empty($typeFilter)) {
                $sql .= " AND type = ?";
                $params[] = $typeFilter;
            }

            $sql .= " ORDER BY (type = 'state') DESC, name ASC";
            $stmt = $pdo->prepare($sql);
            $stmt->execute($params);
            $locations = $stmt->fetchAll(PDO::FETCH_ASSOC);

            // Fetch distinct states
            $statesStmt = $pdo->query("SELECT DISTINCT state FROM locations WHERE status = 'active' AND state IS NOT NULL ORDER BY state ASC");
            $states = $statesStmt->fetchAll(PDO::FETCH_COLUMN);

            header("Content-Type: application/json; charset=utf-8");
            echo json_encode([
                "success" => true,
                "data" => [
                    "locations" => $locations,
                    "stats" => [
                        "total" => count($locations),
                        "cities" => count(array_filter($locations, fn($l) => ($l['type'] ?? '') === 'city')),
                        "states" => count(array_filter($locations, fn($l) => ($l['type'] ?? '') === 'state')),
                        "customAdded" => count(array_filter($locations, fn($l) => !empty($l['is_custom']))),
                    ],
                    "states" => $states
                ]
            ]);
            exit();
        } catch (Exception $e) {
            // fallback
        }
    }

    $locations = getFallbackLocations($customLocationsFile);
    header("Content-Type: application/json; charset=utf-8");
    echo json_encode([
        "success" => true,
        "data" => [
            "locations" => $locations,
            "stats" => ["total" => count($locations)]
        ]
    ]);
    exit();
}

// POST: Add new City / Location into MySQL
if ($method === 'POST') {
    $input = json_decode(file_get_contents("php://input"), true) ?: $_POST;
    $name = trim($input['name'] ?? '');

    if (empty($name)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "City name is required"]);
        exit();
    }

    $slug = trim($input['slug'] ?? strtolower(preg_replace('/[^a-zA-Z0-9]+/', '-', $name)));
    $slug = trim($slug, '-');
    $state = trim($input['state'] ?? 'Pan-India');
    $type = trim($input['type'] ?? 'city');
    $country = trim($input['country'] ?? 'India');
    $title = trim($input['title'] ?? "Best Web Development & SEO Agency in {$name}, {$state} | Afwan Tech");
    $metaDescription = trim($input['metaDescription'] ?? "Scale revenue in {$name} with award-winning Next.js Web Development by AFWAN TECH.");
    $h1 = trim($input['h1'] ?? "Web Development & Digital Growth Agency in {$name}");

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("
                INSERT INTO locations 
                (slug, name, type, state, country, title, meta_description, h1, status, is_custom)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, 'active', 1)
                ON DUPLICATE KEY UPDATE 
                    name = VALUES(name),
                    state = VALUES(state),
                    type = VALUES(type),
                    title = VALUES(title),
                    meta_description = VALUES(meta_description),
                    status = 'active'
            ");
            $stmt->execute([$slug, $name, $type, $state, $country, $title, $metaDescription, $h1]);

            header("Content-Type: application/json; charset=utf-8");
            echo json_encode([
                "success" => true,
                "message" => "City '{$name}' ({$slug}) added to MySQL database successfully!",
                "location" => [
                    "slug" => $slug,
                    "name" => $name,
                    "state" => $state,
                    "type" => $type
                ]
            ]);
            exit();
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
            exit();
        }
    }
}

// DELETE: Delete City from MySQL
if ($method === 'DELETE') {
    $input = json_decode(file_get_contents("php://input"), true) ?: [];
    $slug = trim($input['slug'] ?? $_GET['slug'] ?? '');

    if (empty($slug)) {
        http_response_code(400);
        echo json_encode(["success" => false, "message" => "Slug is required"]);
        exit();
    }

    if ($pdo) {
        try {
            // Soft delete by updating status to 'deleted'
            $stmt = $pdo->prepare("UPDATE locations SET status = 'deleted' WHERE slug = ?");
            $stmt->execute([$slug]);

            header("Content-Type: application/json; charset=utf-8");
            echo json_encode([
                "success" => true,
                "message" => "Location '{$slug}' deleted from MySQL database successfully!"
            ]);
            exit();
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
            exit();
        }
    }
}

// PATCH: Restore deleted city
if ($method === 'PATCH') {
    $input = json_decode(file_get_contents("php://input"), true) ?: [];
    $slug = trim($input['slug'] ?? '');

    if ($pdo && !empty($slug)) {
        try {
            $stmt = $pdo->prepare("UPDATE locations SET status = 'active' WHERE slug = ?");
            $stmt->execute([$slug]);

            header("Content-Type: application/json; charset=utf-8");
            echo json_encode([
                "success" => true,
                "message" => "Location '{$slug}' restored to active status in MySQL!"
            ]);
            exit();
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(["success" => false, "message" => $e->getMessage()]);
            exit();
        }
    }
}
