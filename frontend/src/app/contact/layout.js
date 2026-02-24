import pool from '@/lib/db';

async function getContactSEOSettings() {
  try {
    const [tableExists] = await pool.query("SHOW TABLES LIKE 'site_seo'");
    
    if (tableExists.length === 0) {
      return {
        meta_title: 'Contact Us | My Website',
        meta_description: 'Get in touch with us for property inquiries.',
        meta_keywords: 'contact, real estate inquiry'
      };
    }
    
    const [rows] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', ['contact']);
    
    if (rows.length > 0) {
      return {
        meta_title: rows[0].meta_title || 'Contact Us | My Website',
        meta_description: rows[0].meta_description || 'Get in touch with us for property inquiries.',
        meta_keywords: rows[0].meta_keywords || 'contact, real estate inquiry'
      };
    }
    
    return {
      meta_title: 'Contact Us | My Website',
      meta_description: 'Get in touch with us for property inquiries.',
      meta_keywords: 'contact, real estate inquiry'
    };
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return {
      meta_title: 'Contact Us | My Website',
      meta_description: 'Get in touch with us for property inquiries.',
      meta_keywords: 'contact, real estate inquiry'
    };
  }
}

export async function generateMetadata() {
  const seo = await getContactSEOSettings();
  
  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
  };
}

export default function ContactLayout({ children }) {
  return children;
}
