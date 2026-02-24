import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all properties
export async function GET(request) {
  try {
    const [rows] = await pool.query('SELECT * FROM properties ORDER BY created_at DESC');
    return NextResponse.json({ properties: rows }, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    });
  } catch (error) {
    console.error('Error fetching properties:', error);
    return NextResponse.json({ error: 'Failed to fetch properties' }, { status: 500 });
  }
}

// POST new property
export async function POST(request) {
  try {
    const body = await request.json();
    
    const sql = `
      INSERT INTO properties (name, location, image, images, video, pricePerSqFt, areaMin, areaMax, possessionDate, description, category, status, addedDate, isBestChoice, latitude, longitude)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    
    const values = [
      body.name,
      body.location,
      body.image || '/assets/images/latest-properties/properties1.jpg',
      body.images || null,
      body.video || null,
      body.pricePerSqFt,
      body.areaMin,
      body.areaMax,
      body.possessionDate || null,
      body.description,
      body.category || 'Residential',
      body.status || 'Under Construction',
      new Date().toISOString().split('T')[0],
      body.isBestChoice || false,
      body.latitude || null,
      body.longitude || null
    ];
    
    const [result] = await pool.query(sql, values);
    
    const [newProperty] = await pool.query('SELECT * FROM properties WHERE id = ?', [result.insertId]);
    
    return NextResponse.json({ property: newProperty[0], message: 'Property created successfully' });
  } catch (error) {
    console.error('Error creating property:', error);
    return NextResponse.json({ error: 'Failed to create property' }, { status: 500 });
  }
}
