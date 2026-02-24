import pool from '@/lib/db';
import EditPropertyClient from '../EditPropertyClient';

// Server-side data fetching
async function getProperty(id) {
  const propertyId = parseInt(id, 10);
  
  if (isNaN(propertyId)) {
    return null;
  }
  
  try {
    const [rows] = await pool.query('SELECT * FROM properties WHERE id = ?', [propertyId]);
    return rows.length > 0 ? rows[0] : null;
  } catch (error) {
    console.error('Error fetching property:', error);
    return null;
  }
}

// Server Component
export default async function EditPropertyPage({ params }) {
  // In Next.js 15+, params is a Promise
  const { id } = await params;
  // Convert params.id to number to ensure consistency
  const propertyId = parseInt(id, 10);
  const property = await getProperty(propertyId);
  
  return <EditPropertyClient property={property} propertyId={propertyId} />;
}
