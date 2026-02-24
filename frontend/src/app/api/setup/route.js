import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function GET(request) {
  try {
    const results = {
      isBestChoice: { exists: false, added: false },
      latitude: { exists: false, added: false },
      longitude: { exists: false, added: false }
    };

    // Check and add isBestChoice column if it doesn't exist
    const [isBestChoiceColumns] = await pool.query("SHOW COLUMNS FROM properties LIKE 'isBestChoice'");
    results.isBestChoice.exists = isBestChoiceColumns.length > 0;
    
    if (isBestChoiceColumns.length === 0) {
      try {
        await pool.query("ALTER TABLE properties ADD COLUMN isBestChoice BOOLEAN DEFAULT FALSE");
        results.isBestChoice.added = true;
      } catch (e) {
        console.error('Error adding isBestChoice column:', e);
      }
    }

    // Check and add latitude column if it doesn't exist
    const [latColumns] = await pool.query("SHOW COLUMNS FROM properties LIKE 'latitude'");
    results.latitude.exists = latColumns.length > 0;
    
    if (latColumns.length === 0) {
      try {
        await pool.query("ALTER TABLE properties ADD COLUMN latitude DECIMAL(10, 8) NULL");
        results.latitude.added = true;
      } catch (e) {
        console.error('Error adding latitude column:', e);
      }
    }

    // Check and add longitude column if it doesn't exist
    const [lngColumns] = await pool.query("SHOW COLUMNS FROM properties LIKE 'longitude'");
    results.longitude.exists = lngColumns.length > 0;
    
    if (lngColumns.length === 0) {
      try {
        await pool.query("ALTER TABLE properties ADD COLUMN longitude DECIMAL(11, 8) NULL");
        results.longitude.added = true;
      } catch (e) {
        console.error('Error adding longitude column:', e);
      }
    }

    // Check and create site_seo table if it doesn't exist (for per-page SEO)
    const [seoTableExists] = await pool.query("SHOW TABLES LIKE 'site_seo'");
    let seoTableCreated = false;
    
    if (seoTableExists.length === 0) {
      try {
        await pool.query(`
          CREATE TABLE site_seo (
            id INT AUTO_INCREMENT PRIMARY KEY,
            page_slug VARCHAR(100) NOT NULL UNIQUE,
            page_name VARCHAR(255) NOT NULL,
            meta_title VARCHAR(255) NOT NULL DEFAULT 'My Website',
            meta_description TEXT,
            meta_keywords VARCHAR(500),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
          )
        `);
        
        // Insert default SEO settings for all pages
        const defaultPages = [
          { slug: 'global', name: 'Global Settings', title: 'My Website', desc: 'Real estate website', keywords: 'real estate, properties, buy, sell, rent' },
          { slug: 'home', name: 'Home Page', title: 'My Website | Real Estate', desc: 'Find your dream property with us. Best real estate deals in Mumbai.', keywords: 'real estate, properties, buy property, rent apartment' },
          { slug: 'about', name: 'About Us', title: 'About Us | My Website', desc: 'Learn more about our real estate company and our services.', keywords: 'about us, real estate company' },
          { slug: 'contact', name: 'Contact Us', title: 'Contact Us | My Website', desc: 'Get in touch with us for property inquiries.', keywords: 'contact, real estate inquiry' },
          { slug: 'map', name: 'Map View', title: 'Map View | My Website', desc: 'Explore properties on map. Find properties near you.', keywords: 'property map, real estate map, property location' },
          { slug: 'properties', name: 'All Properties', title: 'Property Listings | My Website', desc: 'Browse all properties. Find ready to move and under construction properties.', keywords: 'property listings, real estate, buy property' },
          { slug: 'ready-to-move', name: 'Ready to Move', title: 'Ready to Move Properties | My Website', desc: 'Find ready to move properties. Immediate possession available.', keywords: 'ready to move, immediate possession, move in property' },
          { slug: 'under-construction', name: 'Under Construction', title: 'Under Construction Properties | My Website', desc: 'Browse under construction properties with upcoming possession dates.', keywords: 'under construction, upcoming properties, new projects' },
          { slug: 'property-details', name: 'Property Details', title: 'Property Details | My Website', desc: 'View property details, location, price and more.', keywords: 'property details, apartment, flat' }
        ];
        
        for (const page of defaultPages) {
          await pool.query(
            'INSERT INTO site_seo (page_slug, page_name, meta_title, meta_description, meta_keywords) VALUES (?, ?, ?, ?, ?)',
            [page.slug, page.name, page.title, page.desc, page.keywords]
          );
        }
        
        seoTableCreated = true;
      } catch (e) {
        console.error('Error creating site_seo table:', e);
      }
    }

    // Verify columns now exist
    const [verifyLat] = await pool.query("SHOW COLUMNS FROM properties LIKE 'latitude'");
    const [verifyLng] = await pool.query("SHOW COLUMNS FROM properties LIKE 'longitude'");
    
    const allColumnsAdded = verifyLat.length > 0 && verifyLng.length > 0;

    return NextResponse.json({ 
      message: allColumnsAdded 
        ? 'All columns added successfully' 
        : 'Setup completed with some issues',
      success: allColumnsAdded,
      columns: results,
      verify: {
        latitude: verifyLat.length > 0,
        longitude: verifyLng.length > 0
      },
      seo: {
        tableExists: seoTableExists.length > 0,
        tableCreated: seoTableCreated
      }
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
