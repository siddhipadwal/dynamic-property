import pool from '@/lib/db';

async function getUnderConstructionSEOSettings() {
  try {
    const [tableExists] = await pool.query("SHOW TABLES LIKE 'site_seo'");
    
    if (tableExists.length === 0) {
      return {
        meta_title: 'Under Construction Properties | My Website',
        meta_description: 'Browse under construction properties with upcoming possession dates.',
        meta_keywords: 'under construction, upcoming properties, new projects'
      };
    }
    
    const [rows] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', ['under-construction']);
    
    if (rows.length > 0) {
      return {
        meta_title: rows[0].meta_title || 'Under Construction Properties | My Website',
        meta_description: rows[0].meta_description || 'Browse under construction properties with upcoming possession dates.',
        meta_keywords: rows[0].meta_keywords || 'under construction, upcoming properties, new projects'
      };
    }
    
    return {
      meta_title: 'Under Construction Properties | My Website',
      meta_description: 'Browse under construction properties with upcoming possession dates.',
      meta_keywords: 'under construction, upcoming properties, new projects'
    };
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return {
      meta_title: 'Under Construction Properties | My Website',
      meta_description: 'Browse under construction properties with upcoming possession dates.',
      meta_keywords: 'under construction, upcoming properties, new projects'
    };
  }
}

export async function generateMetadata() {
  const seo = await getUnderConstructionSEOSettings();
  
  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
  };
}

export default function UnderConstructionLayout({ children }) {
  return children;
}
