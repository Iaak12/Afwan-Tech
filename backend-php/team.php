<?php
/**
 * Team Members & Leadership API (MySQL & SQLite DB Powered)
 * Supports full CRUD: Add, Update, Delete, Reorder, Image update.
 * Synchronizes with database and local teamData.json.
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
$jsonBackupFile = $dataDir . '/teamData.json';
$frontendJsonFile = dirname(__DIR__) . '/next-frontend/src/data/teamData.json';

// Auto-create team_members table in DB if not exists
if ($pdo) {
    try {
        $pdo->exec("CREATE TABLE IF NOT EXISTS team_members (
            id VARCHAR(100) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            role VARCHAR(255) NOT NULL,
            category VARCHAR(50) DEFAULT 'leadership',
            bio TEXT NULL,
            expertise TEXT NULL,
            initials VARCHAR(10) NULL,
            image VARCHAR(500) NULL,
            linkedin VARCHAR(500) NULL,
            location VARCHAR(255) DEFAULT 'Bengaluru, Karnataka, India',
            is_ceo TINYINT(1) DEFAULT 0,
            display_order INT DEFAULT 99,
            status VARCHAR(20) DEFAULT 'active',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )");

        // Check if table is empty, seed defaults
        $count = $pdo->query("SELECT COUNT(*) FROM team_members")->fetchColumn();
        if ($count == 0) {
            $defaultSeed = [
                [
                    'id' => 'ayaz-khan',
                    'name' => 'Ayaz Khan',
                    'role' => 'Founder & CEO',
                    'category' => 'leadership',
                    'bio' => 'Visionary entrepreneur and digital architect leading AFWAN TECH with a singular mission — building high-performance web engineering and Page 1 organic SEO systems for ambitious businesses worldwide.',
                    'expertise' => json_encode(['Executive Leadership', 'Growth Strategy', 'SEO Architecture', 'Business Scaling']),
                    'initials' => 'AK',
                    'image' => '',
                    'linkedin' => '',
                    'location' => 'Bengaluru, Karnataka, India',
                    'is_ceo' => 1,
                    'display_order' => 1
                ],
                [
                    'id' => 'aaliya-behal',
                    'name' => 'Aaliya Behal',
                    'role' => 'Co-Founder',
                    'category' => 'leadership',
                    'bio' => 'Co-founder steering operational velocity, strategic client partnerships, and cross-functional brand expansion across India, Middle East, and global markets.',
                    'expertise' => json_encode(['Operations Strategy', 'Client Partnerships', 'Brand Scaling', 'Organizational Growth']),
                    'initials' => 'AB',
                    'image' => '',
                    'linkedin' => '',
                    'location' => 'Bengaluru, Karnataka, India',
                    'is_ceo' => 0,
                    'display_order' => 2
                ],
                [
                    'id' => 'shahbaz-ahmad',
                    'name' => 'Shahbaz Ahmad',
                    'role' => 'Lead Software Engineer & Platform Architect',
                    'category' => 'leadership',
                    'bio' => 'Lead software engineer and platform architect specializing in React 19, Next.js App Router, scalable cloud architectures, and high-performance web systems with sub-second response times.',
                    'expertise' => json_encode(['React / Next.js', 'Full Stack Architecture', 'Node.js & PHP APIs', 'Performance & Caching']),
                    'initials' => 'SA',
                    'image' => '',
                    'linkedin' => 'https://www.linkedin.com/in/shahbaz-ahmad-react/',
                    'location' => 'Bengaluru, Karnataka, India',
                    'is_ceo' => 0,
                    'display_order' => 3
                ]
            ];

            $stmt = $pdo->prepare("INSERT INTO team_members (id, name, role, category, bio, expertise, initials, image, linkedin, location, is_ceo, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
            foreach ($defaultSeed as $item) {
                $stmt->execute([
                    $item['id'],
                    $item['name'],
                    $item['role'],
                    $item['category'],
                    $item['bio'],
                    $item['expertise'],
                    $item['initials'],
                    $item['image'],
                    $item['linkedin'],
                    $item['location'],
                    $item['is_ceo'],
                    $item['display_order']
                ]);
            }
        }
    } catch (Exception $e) {
        // Table creation / check failed, fallback to JSON
    }
}

function syncToFiles($teamList, $jsonBackupFile, $frontendJsonFile) {
    $raw = json_encode($teamList, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    @file_put_contents($jsonBackupFile, $raw);
    if (file_exists(dirname($frontendJsonFile))) {
        @file_put_contents($frontendJsonFile, $raw);
    }
}

function formatRow($r) {
    $expertise = [];
    if (!empty($r['expertise'])) {
        $decoded = json_decode($r['expertise'], true);
        $expertise = is_array($decoded) ? $decoded : array_map('trim', explode(',', $r['expertise']));
    }
    return [
        'id' => $r['id'],
        'name' => $r['name'],
        'role' => $r['role'],
        'category' => $r['category'] ?? 'leadership',
        'bio' => $r['bio'] ?? '',
        'expertise' => $expertise,
        'initials' => $r['initials'] ?? '',
        'image' => $r['image'] ?? '',
        'linkedin' => $r['linkedin'] ?? '',
        'location' => $r['location'] ?? 'Bengaluru, Karnataka, India',
        'isCEO' => !empty($r['is_ceo']),
        'order' => (int)($r['display_order'] ?? 99)
    ];
}

$method = $_SERVER['REQUEST_METHOD'];

// GET: Fetch team
if ($method === 'GET') {
    if ($pdo) {
        try {
            $stmt = $pdo->query("SELECT * FROM team_members WHERE status = 'active' ORDER BY display_order ASC, created_at ASC");
            $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $team = array_map('formatRow', $rows);
            syncToFiles($team, $jsonBackupFile, $frontendJsonFile);
            echo json_encode(['success' => true, 'team' => $team]);
            exit();
        } catch (Exception $e) {
            // fallback to file
        }
    }

    $fallback = file_exists($jsonBackupFile) ? json_decode(file_get_contents($jsonBackupFile), true) : [];
    if (empty($fallback) && file_exists($frontendJsonFile)) {
        $fallback = json_decode(file_get_contents($frontendJsonFile), true);
    }
    echo json_encode(['success' => true, 'team' => $fallback ?: []]);
    exit();
}

// POST: Add, Update, or Reorder team
if ($method === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['team']) && is_array($input['team'])) {
        // Bulk update / reorder
        if ($pdo) {
            try {
                $pdo->beginTransaction();
                foreach ($input['team'] as $idx => $m) {
                    $order = $m['order'] ?? ($idx + 1);
                    $stmt = $pdo->prepare("UPDATE team_members SET display_order = ? WHERE id = ?");
                    $stmt->execute([$order, $m['id']]);
                }
                $pdo->commit();
            } catch (Exception $e) {
                if ($pdo->inTransaction()) $pdo->rollBack();
            }
        }
        syncToFiles($input['team'], $jsonBackupFile, $frontendJsonFile);
        echo json_encode(['success' => true, 'team' => $input['team']]);
        exit();
    }

    $m = $input['member'] ?? $input;
    if (empty($m['name']) || empty($m['role'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'Name and Role are required']);
        exit();
    }

    $id = !empty($m['id']) ? $m['id'] : strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $m['name']), '-'));
    $name = trim($m['name']);
    $role = trim($m['role']);
    $category = $m['category'] ?? 'leadership';
    $bio = $m['bio'] ?? '';
    $expertise = is_array($m['expertise'] ?? null) ? json_encode($m['expertise']) : json_encode([]);
    $initials = !empty($m['initials']) ? $m['initials'] : strtoupper(substr($name, 0, 2));
    $image = $m['image'] ?? '';
    $linkedin = $m['linkedin'] ?? '';
    $location = $m['location'] ?? 'Bengaluru, Karnataka, India';
    $is_ceo = !empty($m['isCEO']) ? 1 : 0;
    $order = (int)($m['order'] ?? 99);

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("INSERT INTO team_members (id, name, role, category, bio, expertise, initials, image, linkedin, location, is_ceo, display_order)
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                ON DUPLICATE KEY UPDATE 
                name = VALUES(name), role = VALUES(role), category = VALUES(category), bio = VALUES(bio), 
                expertise = VALUES(expertise), initials = VALUES(initials), image = VALUES(image), 
                linkedin = VALUES(linkedin), location = VALUES(location), is_ceo = VALUES(is_ceo), display_order = VALUES(display_order)");
            $stmt->execute([$id, $name, $role, $category, $bio, $expertise, $initials, $image, $linkedin, $location, $is_ceo, $order]);

            $stmtFetch = $pdo->query("SELECT * FROM team_members WHERE status = 'active' ORDER BY display_order ASC, created_at ASC");
            $rows = $stmtFetch->fetchAll(PDO::FETCH_ASSOC);
            $updatedTeam = array_map('formatRow', $rows);
            syncToFiles($updatedTeam, $jsonBackupFile, $frontendJsonFile);
            echo json_encode(['success' => true, 'team' => $updatedTeam, 'member' => $m]);
            exit();
        } catch (Exception $e) {
            // fallback to file below
        }
    }

    // JSON file fallback
    $current = file_exists($frontendJsonFile) ? json_decode(file_get_contents($frontendJsonFile), true) : [];
    $found = false;
    foreach ($current as &$item) {
        if ($item['id'] === $id) {
            $item = array_merge($item, $m, ['id' => $id, 'initials' => $initials]);
            $found = true;
            break;
        }
    }
    if (!$found) {
        $m['id'] = $id;
        $m['initials'] = $initials;
        $current[] = $m;
    }
    syncToFiles($current, $jsonBackupFile, $frontendJsonFile);
    echo json_encode(['success' => true, 'team' => $current, 'member' => $m]);
    exit();
}

// DELETE: Remove team member
if ($method === 'DELETE') {
    $id = $_GET['id'] ?? null;
    if (!$id) {
        http_response_code(400);
        echo json_encode(['success' => false, 'error' => 'ID required']);
        exit();
    }

    if ($pdo) {
        try {
            $stmt = $pdo->prepare("DELETE FROM team_members WHERE id = ?");
            $stmt->execute([$id]);

            $stmtFetch = $pdo->query("SELECT * FROM team_members WHERE status = 'active' ORDER BY display_order ASC, created_at ASC");
            $rows = $stmtFetch->fetchAll(PDO::FETCH_ASSOC);
            $updatedTeam = array_map('formatRow', $rows);
            syncToFiles($updatedTeam, $jsonBackupFile, $frontendJsonFile);
            echo json_encode(['success' => true, 'team' => $updatedTeam]);
            exit();
        } catch (Exception $e) {
            // fallback
        }
    }

    $current = file_exists($frontendJsonFile) ? json_decode(file_get_contents($frontendJsonFile), true) : [];
    $filtered = array_values(array_filter($current, function($item) use ($id) {
        return $item['id'] !== $id;
    }));
    syncToFiles($filtered, $jsonBackupFile, $frontendJsonFile);
    echo json_encode(['success' => true, 'team' => $filtered]);
    exit();
}

