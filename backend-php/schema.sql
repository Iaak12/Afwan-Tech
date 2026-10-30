-- ==============================================================================
-- Afwan Tech - Comprehensive MySQL Database Schema
-- Hostinger MySQL Database: u100874370_afwantech
-- ==============================================================================

SET FOREIGN_KEY_CHECKS = 0;

-- 1. Drip SEO Pacing Engine Table
CREATE TABLE IF NOT EXISTS drip_seo_config (
    id INT PRIMARY KEY AUTO_INCREMENT,
    enabled TINYINT(1) DEFAULT 1,
    pages_per_week INT DEFAULT 75,
    start_date DATE NOT NULL,
    manual_urls_unlocked INT DEFAULT 0,
    manual_batches_unlocked INT DEFAULT 0,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Seed for Drip Config
INSERT INTO drip_seo_config (id, enabled, pages_per_week, start_date, manual_urls_unlocked, manual_batches_unlocked)
SELECT 1, 1, 75, '2026-07-01', 0, 0
WHERE NOT EXISTS (SELECT 1 FROM drip_seo_config WHERE id = 1);

-- 2. Locations & Programmatic SEO Cities Table
CREATE TABLE IF NOT EXISTS locations (
    id INT PRIMARY KEY AUTO_INCREMENT,
    slug VARCHAR(191) NOT NULL UNIQUE,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) DEFAULT 'city',
    state VARCHAR(150) NOT NULL,
    country VARCHAR(100) DEFAULT 'India',
    title VARCHAR(255) NULL,
    meta_description TEXT NULL,
    h1 VARCHAR(255) NULL,
    avg_growth VARCHAR(100) DEFAULT '280% Organic Growth',
    businesses_scaled VARCHAR(50) DEFAULT '50+',
    rating VARCHAR(20) DEFAULT '4.9/5',
    reviews_count INT DEFAULT 150,
    status ENUM('active', 'paused', 'deleted') DEFAULT 'active',
    is_custom TINYINT(1) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_locations_slug (slug),
    INDEX idx_locations_state (state),
    INDEX idx_locations_status (status),
    INDEX idx_locations_type (type)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. Inbound Submissions & Leads Table
CREATE TABLE IF NOT EXISTS contacts (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NULL,
    service VARCHAR(150) DEFAULT 'General Consultation',
    budget VARCHAR(100) DEFAULT 'Flexible',
    message TEXT NULL,
    location VARCHAR(150) DEFAULT 'Direct Website',
    source VARCHAR(255) NULL,
    lead_type ENUM('location', 'website') DEFAULT 'website',
    status ENUM('new', 'in_progress', 'contacted', 'closed') DEFAULT 'new',
    notes TEXT NULL,
    ip_address VARCHAR(50) NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_contacts_status (status),
    INDEX idx_contacts_created_at (created_at),
    INDEX idx_contacts_email (email)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. Contact Taps Telemetry (WhatsApp & Direct Call Clicks)
CREATE TABLE IF NOT EXISTS contact_taps (
    id VARCHAR(100) PRIMARY KEY,
    type ENUM('whatsapp', 'call') NOT NULL,
    path VARCHAR(255) NOT NULL,
    location VARCHAR(150) DEFAULT 'Website',
    device ENUM('desktop', 'mobile', 'tablet') DEFAULT 'desktop',
    referrer VARCHAR(255) DEFAULT 'Direct',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_taps_type (type),
    INDEX idx_taps_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. Web Analytics Events Table
CREATE TABLE IF NOT EXISTS analytics_logs (
    id BIGINT PRIMARY KEY AUTO_INCREMENT,
    visitor_id VARCHAR(64) NOT NULL,
    path VARCHAR(255) NOT NULL,
    referrer VARCHAR(255) DEFAULT 'Direct',
    device ENUM('desktop', 'mobile', 'tablet') DEFAULT 'desktop',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_analytics_path (path),
    INDEX idx_analytics_created_at (created_at)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. Team Members & Executive Leadership Table
CREATE TABLE IF NOT EXISTS team_members (
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
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_team_category (category),
    INDEX idx_team_order (display_order),
    INDEX idx_team_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Initial Seed for Core Leadership
INSERT INTO team_members (id, name, role, category, bio, expertise, initials, image, linkedin, location, is_ceo, display_order)
SELECT 'ayaz-khan', 'Ayaz Khan', 'Founder & CEO', 'leadership', 'Visionary entrepreneur and digital architect leading AFWAN TECH with a singular mission — building high-performance web engineering and Page 1 organic SEO systems for ambitious businesses worldwide.', '["Executive Leadership", "Growth Strategy", "SEO Architecture", "Business Scaling"]', 'AK', '', '', 'Bengaluru, Karnataka, India', 1, 1
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE id = 'ayaz-khan');

INSERT INTO team_members (id, name, role, category, bio, expertise, initials, image, linkedin, location, is_ceo, display_order)
SELECT 'aaliya-behal', 'Aaliya Behal', 'Co-Founder', 'leadership', 'Co-founder steering operational velocity, strategic client partnerships, and cross-functional brand expansion across India, Middle East, and global markets.', '["Operations Strategy", "Client Partnerships", "Brand Scaling", "Organizational Growth"]', 'AB', '', '', 'Bengaluru, Karnataka, India', 0, 2
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE id = 'aaliya-behal');

INSERT INTO team_members (id, name, role, category, bio, expertise, initials, image, linkedin, location, is_ceo, display_order)
SELECT 'shahbaz-ahmad', 'Shahbaz Ahmad', 'Lead Software Engineer & Platform Architect', 'leadership', 'Lead software engineer and platform architect specializing in React 19, Next.js App Router, scalable cloud architectures, and high-performance web systems with sub-second response times.', '["React / Next.js", "Full Stack Architecture", "Node.js & PHP APIs", "Performance & Caching"]', 'SA', '', 'https://www.linkedin.com/in/shahbaz-ahmad-react/', 'Bengaluru, Karnataka, India', 0, 3
WHERE NOT EXISTS (SELECT 1 FROM team_members WHERE id = 'shahbaz-ahmad');

SET FOREIGN_KEY_CHECKS = 1;
