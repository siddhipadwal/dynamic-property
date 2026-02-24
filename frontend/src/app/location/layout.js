import pool from '@/lib/db';

async function getMapSEOSettings() {
  try {
    const [tableExists] = await pool.query("SHOW TABLES LIKE 'site_seo'");
    
    if (tableExists.length === 0) {
      return {
        meta_title: 'Map View | My Website',
        meta_description: 'Explore properties on map. Find properties near you.',
        meta_keywords: 'property map, real estate map, property location'
      };
    }
    
    const [rows] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', ['map']);
    
    if (rows.length > 0) {
      return {
        meta_title: rows[0].meta_title || 'Map View | My Website',
        meta_description: rows[0].meta_description || 'Explore properties on map. Find properties near you.',
        meta_keywords: rows[0].meta_keywords || 'property map, real estate map, property location'
      };
    }
    
    return {
      meta_title: 'Map View | My Website',
      meta_description: 'Explore properties on map. Find properties near you.',
      meta_keywords: 'property map, real estate map, property location'
    };
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return {
      meta_title: 'Map View | My Website',
      meta_description: 'Explore properties on map. Find properties near you.',
      meta_keywords: 'property map, real estate map, property location'
    };
  }
}

export async function generateMetadata() {
  const seo = await getMapSEOSettings();
  
  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
  };
}

export default function MapLayout({ children }) {
  return children;
}
