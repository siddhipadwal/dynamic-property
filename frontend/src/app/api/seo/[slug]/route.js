import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET SEO settings by page slug
export async function GET(request, { params }) {
  try {
    const { slug } = await params;
    
    // First check if the table exists
    const [tableExists] = await pool.query("SHOW TABLES LIKE 'site_seo'");
    
    if (tableExists.length === 0) {
      return NextResponse.json({ 
        seo: {
          meta_title: 'My Website',
          meta_description: 'Real estate website',
          meta_keywords: 'real estate, properties, buy, sell, rent'
        }
      });
    }
    
    // Fetch SEO settings for specific page
    const [rows] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', [slug]);
    
    if (rows.length > 0) {
      return NextResponse.json({ seo: rows[0] });
    }
    
    // If no specific page SEO, try to get global settings
    const [globalRows] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', ['global']);
    
    if (globalRows.length > 0) {
      return NextResponse.json({ seo: globalRows[0] });
    }
    
    // Default fallback
    return NextResponse.json({ 
      seo: {
        meta_title: 'My Website',
        meta_description: 'Real estate website',
        meta_keywords: 'real estate, properties, buy, sell, rent'
      }
    });
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return NextResponse.json({ 
      seo: {
        meta_title: 'My Website',
        meta_description: 'Real estate website',
        meta_keywords: 'real estate, properties, buy, sell, rent'
      }
    });
  }
}
