import pool from '@/lib/db';

async function getReadyToMoveSEOSettings() {
  try {
    const [tableExists] = await pool.query("SHOW TABLES LIKE 'site_seo'");
    
    if (tableExists.length === 0) {
      return {
        meta_title: 'Ready to Move Properties | My Website',
        meta_description: 'Find ready to move properties. Immediate possession available.',
        meta_keywords: 'ready to move, immediate possession, move in property'
      };
    }
    
    const [rows] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', ['ready-to-move']);
    
    if (rows.length > 0) {
      return {
        meta_title: rows[0].meta_title || 'Ready to Move Properties | My Website',
        meta_description: rows[0].meta_description || 'Find ready to move properties. Immediate possession available.',
        meta_keywords: rows[0].meta_keywords || 'ready to move, immediate possession, move in property'
      };
    }
    
    return {
      meta_title: 'Ready to Move Properties | My Website',
      meta_description: 'Find ready to move properties. Immediate possession available.',
      meta_keywords: 'ready to move, immediate possession, move in property'
    };
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return {
      meta_title: 'Ready to Move Properties | My Website',
      meta_description: 'Find ready to move properties. Immediate possession available.',
      meta_keywords: 'ready to move, immediate possession, move in property'
    };
  }
}

export async function generateMetadata() {
  const seo = await getReadyToMoveSEOSettings();
  
  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
  };
}

export default function ReadyToMoveLayout({ children }) {
  return children;
}
