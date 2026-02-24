import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// Static pages configuration
const STATIC_PAGES = [
  { page_slug: 'global', page_name: 'Global Settings' },
  { page_slug: 'home', page_name: 'Home Page' },
  { page_slug: 'about', page_name: 'About Us' },
  { page_slug: 'contact', page_name: 'Contact Us' },
  { page_slug: 'map', page_name: 'Map View' },
  { page_slug: 'properties', page_name: 'All Properties' },
  { page_slug: 'ready-to-move', page_name: 'Ready to Move' },
  { page_slug: 'under-construction', page_name: 'Under Construction' }
];

// Helper function to ensure table exists and has correct schema
async function ensureSEOTable() {
  try {
    // Check if table exists
    const [tableExists] = await pool.query("SHOW TABLES LIKE 'site_seo'");
    
    if (tableExists.length === 0) {
      // Create the table with correct schema
      await pool.query(`
        CREATE TABLE IF NOT EXISTS site_seo (
          id INT AUTO_INCREMENT PRIMARY KEY,
          page_slug VARCHAR(100) NOT NULL UNIQUE,
          page_name VARCHAR(255) NOT NULL,
          meta_title VARCHAR(255),
          meta_description TEXT,
          meta_keywords VARCHAR(500),
          featured_image VARCHAR(500),
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log('Created site_seo table');
    } else {
      // Table exists, check and add missing columns
      try {
        await pool.query("ALTER TABLE site_seo ADD COLUMN page_slug VARCHAR(100) NULL");
      } catch (e) {
        // Column might already exist
      }
      
      try {
        await pool.query("ALTER TABLE site_seo ADD COLUMN page_name VARCHAR(255) NULL");
      } catch (e) {
        // Column might already exist
      }
      
      try {
        await pool.query("ALTER TABLE site_seo ADD COLUMN featured_image VARCHAR(500) NULL");
      } catch (e) {
        // Column might already exist
      }
      
      console.log('Checked/added missing columns to site_seo table');
    }
    
  } catch (error) {
    console.error('Error ensuring SEO table:', error);
    throw error;
  }
}

// GET all SEO settings including dynamic property pages
export async function GET(request) {
  try {
    // Ensure table exists
    await ensureSEOTable();
    
    // Get static page SEO data
    const [staticSeo] = await pool.query('SELECT * FROM site_seo WHERE page_slug NOT LIKE "property-%" ORDER BY id ASC');
    
    // Get all properties for dynamic SEO
    const [properties] = await pool.query('SELECT id, name FROM properties ORDER BY created_at DESC');
    
    // Build the response with static pages + dynamic property pages
    let seoList = [];
    
    // Add static pages
    for (const staticPage of STATIC_PAGES) {
      const existingSeo = staticSeo.find(s => s.page_slug === staticPage.page_slug);
      if (existingSeo) {
        seoList.push(existingSeo);
      } else {
        // Insert default for static pages if not exists
        seoList.push({
          page_slug: staticPage.page_slug,
          page_name: staticPage.page_name,
          meta_title: '',
          meta_description: '',
          meta_keywords: '',
          featured_image: ''
        });
      }
    }
    
    // Add dynamic property pages
    for (const property of properties) {
      const propSlug = `property-${property.id}`;
      const propSeo = staticSeo.find(s => s.page_slug === propSlug);
      
      if (propSeo) {
        seoList.push({
          ...propSeo,
          page_name: `Property: ${property.name}`
        });
      } else {
        seoList.push({
          page_slug: propSlug,
          page_name: `Property: ${property.name}`,
          meta_title: property.name,
          meta_description: '',
          meta_keywords: '',
          featured_image: ''
        });
      }
    }
    
    return NextResponse.json({ seo: seoList });
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return NextResponse.json({ error: 'Failed to fetch SEO settings' }, { status: 500 });
  }
}

// PUT update SEO settings
export async function PUT(request) {
  try {
    // First ensure table exists
    await ensureSEOTable();
    
    const body = await request.json();
    console.log('SEO PUT body:', body);
    const { page_slug, meta_title, meta_description, meta_keywords, featured_image } = body;
    
    if (!page_slug) {
      return NextResponse.json({ error: 'Page slug is required' }, { status: 400 });
    }
    
    // Check if record exists
    const [existing] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', [page_slug]);
    console.log('Existing record:', existing);
    
    if (existing.length === 0) {
      // Insert new record
      // Get page_name from body or use slug as fallback
      const page_name = body.page_name || page_slug;
      await pool.query(
        'INSERT INTO site_seo (page_slug, page_name, meta_title, meta_description, meta_keywords, featured_image) VALUES (?, ?, ?, ?, ?, ?)',
        [page_slug, page_name, meta_title || '', meta_description || '', meta_keywords || '', featured_image || '']
      );
    } else {
      // Update existing record
      await pool.query(
        'UPDATE site_seo SET meta_title = ?, meta_description = ?, meta_keywords = ?, featured_image = ? WHERE page_slug = ?',
        [meta_title || '', meta_description || '', meta_keywords || '', featured_image || '', page_slug]
      );
    }
    
    const [updatedSeo] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', [page_slug]);
    
    return NextResponse.json({ 
      seo: updatedSeo[0], 
      message: 'SEO settings saved successfully' 
    });
  } catch (error) {
    console.error('Error updating SEO settings:', error);
    return NextResponse.json({ error: 'Failed to update SEO settings: ' + error.message }, { status: 500 });
  }
}
