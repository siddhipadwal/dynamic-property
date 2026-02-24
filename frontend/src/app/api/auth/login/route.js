import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// POST admin login
export async function POST(request) {
  try {
    const body = await request.json();
    const { username, password } = body;
    
    const [rows] = await pool.query('SELECT * FROM admin WHERE username = ?', [username]);
    
    if (rows.length === 0) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
    
    const admin = rows[0];
    
    // Check password
    if (password === admin.password) {
      // In a real app, you'd use JWT or sessions
      return NextResponse.json({ 
        success: true, 
        message: 'Login successful',
        admin: { username: admin.username }
      });
    } else {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Login failed' }, { status: 500 });
  }
}
