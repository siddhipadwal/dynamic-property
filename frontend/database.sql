-- Database Schema for Property Management System

-- Create database
CREATE DATABASE IF NOT EXISTS property_db;
USE property_db;

-- Create properties table
CREATE TABLE IF NOT EXISTS properties (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    image VARCHAR(500) NOT NULL,
    pricePerSqFt INT NOT NULL,
    areaMin INT NOT NULL,
    areaMax INT NOT NULL,
    possessionDate DATE NOT NULL,
    description TEXT,
    category VARCHAR(100) NOT NULL,
    status VARCHAR(50) NOT NULL,
    addedDate DATE NOT NULL,
    isBestChoice BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Create admin table
CREATE TABLE IF NOT EXISTS admin (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert default admin user (password: admin123)
INSERT INTO admin (username, password) VALUES ('admin', 'admin123')
ON DUPLICATE KEY UPDATE username = username;

-- Insert sample properties
INSERT INTO properties (name, location, image, pricePerSqFt, areaMin, areaMax, possessionDate, description, category, status, addedDate) VALUES
('ALPINE PRIMO', 'Andheri West, Mumbai', '/assets/images/latest-properties/properties1.jpg', 25000, 650, 1200, '2025-12-31', 'Luxury residential project in the heart of Andheri West', 'Residential', 'Under Construction', '2024-01-15'),
('SAYBA NOOR 2.0', 'Jogeshwari, Mumbai', '/assets/images/latest-properties/properties2.jpg', 22000, 500, 950, '2024-06-30', 'Modern apartments with premium amenities', 'Residential', 'Ready to Move', '2024-02-20'),
('LODHA CELESTIA', 'Powai, Mumbai', '/assets/images/latest-properties/properties3.jpg', 28000, 800, 1500, '2025-03-31', 'Ultra-luxury towers with world-class facilities', 'Residential', 'Under Construction', '2024-03-10');

-- Create contact_inquiries table
CREATE TABLE IF NOT EXISTS contact_inquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Add is_read column if it doesn't exist (for existing tables)
ALTER TABLE contact_inquiries ADD COLUMN is_read BOOLEAN DEFAULT FALSE;

-- Add additional image columns to properties table if they don't exist
ALTER TABLE properties ADD COLUMN image2 VARCHAR(500) NULL;
ALTER TABLE properties ADD COLUMN image3 VARCHAR(500) NULL;

-- Create partners table
CREATE TABLE IF NOT EXISTS partners (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample partners
INSERT INTO partners (name, logo) VALUES
('Lodha', 'assets/images/img/partners/lodha.png'),
('Elegant', 'assets/images/img/partners/elegant.png'),
('Verdant Ventures', 'assets/images/img/partners/Verdant+Ventures.png'),
('Alpine', 'assets/images/img/partners/alpine.png'),
('Sayba', 'assets/images/img/partners/sayba.png'),
('Dream India Builders', 'assets/images/img/partners/dream-india-builders.png'),
('Gurukrupa', 'assets/images/img/partners/gurukrupa.png'),
('Chandiwala', 'assets/images/img/partners/chandiwala.png'),
('Neelyog', 'assets/images/img/partners/neelyog.png'),
('DLF', 'assets/images/img/partners/dlf.png'),
('Godrej', 'assets/images/img/partners/godrej.png'),
('Hiranandani', 'assets/images/img/partners/hiranandani.png'),
('Crystal', 'assets/images/img/partners/crystal.png'),
('Kalptaru', 'assets/images/img/partners/kalptaru.png'),
('Naman', 'assets/images/img/partners/naman.png'),
('Mahindra', 'assets/images/img/partners/mahindra.png'),
('Oberoi', 'assets/images/img/partners/oberoi.png'),
('Park City', 'assets/images/img/partners/park-city.png'),
('Prestige', 'assets/images/img/partners/prestige.png'),
('Runwal', 'assets/images/img/partners/runwal.png'),
('Ruparel', 'assets/images/img/partners/ruparel.png'),
('Rustamjee', 'assets/images/img/partners/rustamjee.png'),
('Sunteck', 'assets/images/img/partners/sunteck.png'),
('Wadhwa', 'assets/images/img/partners/wadhwa.png');

-- Create site_seo table for SEO settings (supports both global and per-page)
CREATE TABLE IF NOT EXISTS site_seo (
    id INT AUTO_INCREMENT PRIMARY KEY,
    page_slug VARCHAR(100) NOT NULL UNIQUE,
    page_name VARCHAR(255) NOT NULL,
    meta_title VARCHAR(255) NOT NULL DEFAULT 'My Website',
    meta_description TEXT,
    meta_keywords VARCHAR(500),
    featured_image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Add featured_image column if it doesn't exist (for existing tables)
ALTER TABLE site_seo ADD COLUMN featured_image VARCHAR(500) NULL;

-- Insert default SEO settings for all pages
INSERT INTO site_seo (page_slug, page_name, meta_title, meta_description, meta_keywords) VALUES
('global', 'Global Settings', 'My Website', 'Real estate website', 'real estate, properties, buy, sell, rent'),
('home', 'Home Page', 'My Website | Real Estate', 'Find your dream property with us. Best real estate deals in Mumbai.', 'real estate, properties, buy property, rent apartment'),
('about', 'About Us', 'About Us | My Website', 'Learn more about our real estate company and our services.', 'about us, real estate company'),
('contact', 'Contact Us', 'Contact Us | My Website', 'Get in touch with us for property inquiries.', 'contact, real estate inquiry'),
('map', 'Map View', 'Map View | My Website', 'Explore properties on map. Find properties near you.', 'property map, real estate map, property location'),
('properties', 'All Properties', 'Property Listings | My Website', 'Browse all properties. Find ready to move and under construction properties.', 'property listings, real estate, buy property'),
('ready-to-move', 'Ready to Move', 'Ready to Move Properties | My Website', 'Find ready to move properties. Immediate possession available.', 'ready to move, immediate possession, move in property'),
('under-construction', 'Under Construction', 'Under Construction Properties | My Website', 'Browse under construction properties with upcoming possession dates.', 'under construction, upcoming properties, new projects'),
('property-details', 'Property Details', 'Property Details | My Website', 'View property details, location, price and more.', 'property details, apartment, flat')
ON DUPLICATE KEY UPDATE page_name = page_name;
