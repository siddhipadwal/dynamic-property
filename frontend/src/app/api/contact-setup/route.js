import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// This endpoint ensures the contact_inquiries table has the required columns
export async function GET(request) {
  let connection;
  
  try {
    connection = await pool.getConnection();
    
    // Create database if not exists
    await connection.execute('CREATE DATABASE IF NOT EXISTS property_db');
    await connection.execute('USE property_db');
    
    // Check if is_read column exists
    const [columns] = await connection.execute('SHOW COLUMNS FROM contact_inquiries LIKE "is_read"');
    
    if (columns.length === 0) {
      // Add is_read column
      await connection.execute(
        'ALTER TABLE contact_inquiries ADD COLUMN is_read BOOLEAN DEFAULT FALSE'
      );
      return NextResponse.json({ 
        success: true, 
        message: 'Added is_read column to contact_inquiries table' 
      });
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Table contact_inquiries already has is_read column' 
    });
    
  } catch (error) {
    console.error('Error setting up contact_inquiries table:', error);
    return NextResponse.json(
      { error: 'Failed to setup table: ' + error.message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
