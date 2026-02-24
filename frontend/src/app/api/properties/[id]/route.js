import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET single property by ID
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const [rows] = await pool.query('SELECT * FROM properties WHERE id = ?', [id]);
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }
    
    return NextResponse.json({ property: rows[0] });
  } catch (error) {
    console.error('Error fetching property:', error);
    return NextResponse.json({ error: 'Failed to fetch property' }, { status: 500 });
  }
}

// UPDATE property
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    const sql = `
      UPDATE properties 
      SET name = ?, location = ?, image = ?, images = ?, video = ?, pricePerSqFt = ?, 
          areaMin = ?, areaMax = ?, possessionDate = ?, description = ?, category = ?, 
          status = ?, isBestChoice = ?, latitude = ?, longitude = ?
      WHERE id = ?
    `;
    
    const values = [
      body.name,
      body.location,
      body.image,
      body.images || null,
      body.video || null,
      body.pricePerSqFt,
      body.areaMin,
      body.areaMax,
      body.possessionDate || null,
      body.description,
      body.category,
      body.status,
      body.isBestChoice || false,
      body.latitude || null,
      body.longitude || null,
      id
    ];
    
    await pool.query(sql, values);
    
    const [updatedProperty] = await pool.query('SELECT * FROM properties WHERE id = ?', [id]);
    
    return NextResponse.json({ property: updatedProperty[0], message: 'Property updated successfully' });
  } catch (error) {
    console.error('Error updating property:', error);
    return NextResponse.json({ error: 'Failed to update property' }, { status: 500 });
  }
}

// DELETE property
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    
    console.log('DELETE: ID =', id);
    
    if (!id) {
      return NextResponse.json({ error: 'No ID provided' }, { status: 400 });
    }
    
    // Use parameterized query
    const [before] = await pool.query('SELECT * FROM properties WHERE id = ?', [id]);
    console.log('DELETE: Found:', before);
    
    if (!before || before.length === 0) {
      return NextResponse.json({ message: 'Property not found' }, { status: 404 });
    }
    
    // Execute delete
    await pool.query('DELETE FROM properties WHERE id = ?', [id]);
    
    // Verify
    const [after] = await pool.query('SELECT * FROM properties WHERE id = ?', [id]);
    console.log('DELETE: After delete:', after);
    
    return NextResponse.json({ 
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    console.error('DELETE: Error:', error);
    return NextResponse.json({ error: 'Failed: ' + error.message }, { status: 500 });
  }
}
