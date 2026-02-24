import pool from '@/lib/db';

async function getPropertyDetailsSEOSettings() {
  try {
    const [tableExists] = await pool.query("SHOW TABLES LIKE 'site_seo'");
    
    if (tableExists.length === 0) {
      return {
        meta_title: 'Property Details | My Website',
        meta_description: 'View property details, location, price and more.',
        meta_keywords: 'property details, apartment, flat'
      };
    }
    
    const [rows] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', ['property-details']);
    
    if (rows.length > 0) {
      return {
        meta_title: rows[0].meta_title || 'Property Details | My Website',
        meta_description: rows[0].meta_description || 'View property details, location, price and more.',
        meta_keywords: rows[0].meta_keywords || 'property details, apartment, flat'
      };
    }
    
    return {
      meta_title: 'Property Details | My Website',
      meta_description: 'View property details, location, price and more.',
      meta_keywords: 'property details, apartment, flat'
    };
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return {
      meta_title: 'Property Details | My Website',
      meta_description: 'View property details, location, price and more.',
      meta_keywords: 'property details, apartment, flat'
    };
  }
}

export async function generateMetadata() {
  const seo = await getPropertyDetailsSEOSettings();
  
  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
  };
}

export default function PropertyDetailsLayout({ children }) {
  return children;
}
