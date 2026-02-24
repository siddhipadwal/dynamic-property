import pool from '@/lib/db';

async function getPropertiesSEOSettings() {
  try {
    const [tableExists] = await pool.query("SHOW TABLES LIKE 'site_seo'");
    
    if (tableExists.length === 0) {
      return {
        meta_title: 'Property Listings | My Website',
        meta_description: 'Browse all properties. Find ready to move and under construction properties.',
        meta_keywords: 'property listings, real estate, buy property'
      };
    }
    
    const [rows] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', ['properties']);
    
    if (rows.length > 0) {
      return {
        meta_title: rows[0].meta_title || 'Property Listings | My Website',
        meta_description: rows[0].meta_description || 'Browse all properties. Find ready to move and under construction properties.',
        meta_keywords: rows[0].meta_keywords || 'property listings, real estate, buy property'
      };
    }
    
    return {
      meta_title: 'Property Listings | My Website',
      meta_description: 'Browse all properties. Find ready to move and under construction properties.',
      meta_keywords: 'property listings, real estate, buy property'
    };
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return {
      meta_title: 'Property Listings | My Website',
      meta_description: 'Browse all properties. Find ready to move and under construction properties.',
      meta_keywords: 'property listings, real estate, buy property'
    };
  }
}

export async function generateMetadata() {
  const seo = await getPropertiesSEOSettings();
  
  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
  };
}

export default function PropertiesLayout({ children }) {
  return children;
}
