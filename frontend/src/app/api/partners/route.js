import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET all partners
export async function GET(request) {
  try {
    const [rows] = await pool.query('SELECT * FROM partners ORDER BY created_at DESC');
    return NextResponse.json({ partners: rows });
  } catch (error) {
    console.error('Error fetching partners:', error);
    return NextResponse.json({ error: 'Failed to fetch partners' }, { status: 500 });
  }
}

// POST new partner
export async function POST(request) {
  try {
    const body = await request.json();
    
    const sql = `
      INSERT INTO partners (name, logo)
      VALUES (?, ?)
    `;
    
    const values = [
      body.name,
      body.logo || '/assets/images/brands/brand1.png'
    ];
    
    const [result] = await pool.query(sql, values);
    
    const [newPartner] = await pool.query('SELECT * FROM partners WHERE id = ?', [result.insertId]);
    
    return NextResponse.json({ partner: newPartner[0], message: 'Partner created successfully' });
  } catch (error) {
    console.error('Error creating partner:', error);
    return NextResponse.json({ error: 'Failed to create partner' }, { status: 500 });
  }
}

// DELETE a partner
export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'Partner ID is required' }, { status: 400 });
    }
    
    // Delete the partner
    await pool.query('DELETE FROM partners WHERE id = ?', [id]);
    
    return NextResponse.json({ message: 'Partner deleted successfully' });
  } catch (error) {
    console.error('Error deleting partner:', error);
    return NextResponse.json({ error: 'Failed to delete partner' }, { status: 500 });
  }
}
