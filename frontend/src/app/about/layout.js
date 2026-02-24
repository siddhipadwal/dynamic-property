import pool from '@/lib/db';

async function getAboutSEOSettings() {
  try {
    const [tableExists] = await pool.query("SHOW TABLES LIKE 'site_seo'");
    
    if (tableExists.length === 0) {
      return {
        meta_title: 'About Us | My Website',
        meta_description: 'Learn more about our real estate company and our services.',
        meta_keywords: 'about us, real estate company'
      };
    }
    
    const [rows] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', ['about']);
    
    if (rows.length > 0) {
      return {
        meta_title: rows[0].meta_title || 'About Us | My Website',
        meta_description: rows[0].meta_description || 'Learn more about our real estate company and our services.',
        meta_keywords: rows[0].meta_keywords || 'about us, real estate company'
      };
    }
    
    return {
      meta_title: 'About Us | My Website',
      meta_description: 'Learn more about our real estate company and our services.',
      meta_keywords: 'about us, real estate company'
    };
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return {
      meta_title: 'About Us | My Website',
      meta_description: 'Learn more about our real estate company and our services.',
      meta_keywords: 'about us, real estate company'
    };
  }
}

export async function generateMetadata() {
  const seo = await getAboutSEOSettings();
  
  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
  };
}

export default function AboutLayout({ children }) {
  return children;
}
