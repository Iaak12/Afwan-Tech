<?php
/**
 * Backend Configuration for Afwan Tech PHP API
 * Compatible with Hostinger hPanel, cPanel, Apache, Nginx, Shared Hosting, and VPS.
 */

// Allow cross-origin requests
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, PATCH, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

return [
    // Notification Email where contact requests will be sent
    'admin_email' => 'contactafwantech@gmail.com',
    'admin_name'  => 'Afwan Tech Leads',
    
    // Website brand name
    'brand_name'  => 'AFWAN TECH',
    
    // Storage directory for runtime data logs (Auto-created automatically)
    'storage_dir' => __DIR__ . '/data',
    
    // Secret token for viewing the web analytics backend API
    'analytics_key' => 'afwantech_analytics_secret_2026',

    // MySQL Database Settings (Hostinger hPanel)
    'db_host' => 'localhost',
    'db_name' => 'u100874370_afwantech',
    'db_user' => 'u100874370_admin',
    'db_pass' => 'Shahbaz@4772',
    
    // CORS Allowed Domains
    'allowed_origins' => [
        'http://localhost:3000',
        'http://localhost:5173',
        'https://afwantech.com',
        'https://www.afwantech.com'
    ]
];
