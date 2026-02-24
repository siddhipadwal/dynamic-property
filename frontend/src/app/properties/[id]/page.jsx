import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import PropertyDetailClient from './PropertyDetailClient';

// Generate dynamic metadata for SEO including canonical URL
export async function generateMetadata({ params }) {
  try {
    // In Next.js 15+, params is a Promise
    const { id } = await params;
    const propertyId = parseInt(id, 10);
    
    if (isNaN(propertyId)) {
      return {
        title: 'Property Not Found',
        description: 'The requested property could not be found.'
      };
    }
    
    const [rows] = await pool.query('SELECT * FROM properties WHERE id = ?', [propertyId]);
    
    if (rows.length === 0) {
      return {
        title: 'Property Not Found',
        description: 'The requested property could not be found.'
      };
    }
    
    const property = rows[0];
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://yourdomain.com';
    const canonicalUrl = `${baseUrl}/properties/${id}`;
    
    return {
      title: `${property.name} - ${property.location} | My Website`,
      description: property.description || `View details for ${property.name} located in ${property.location}. Price: ₹${property.pricePerSqFt.toLocaleString()} per sq.ft.`,
      openGraph: {
        title: property.name,
        description: property.description || `View details for ${property.name} located in ${property.location}.`,
        images: property.image ? [{ url: property.image }] : [],
        type: 'website',
      },
      alternates: {
        canonical: canonicalUrl,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'Property Details',
      description: 'View property details'
    };
  }
}

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
export default async function PropertyDetailPage({ params }) {
  const { id } = await params;
  const property = await getProperty(id);
  
  // Pass data to client component
  return <PropertyDetailClient property={property} />;
}
