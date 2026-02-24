import { NextResponse } from 'next/server';
import pool from '@/lib/db';
import nodemailer from 'nodemailer';
import * as XLSX from 'xlsx';

// Email configuration - you can change these settings
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT) || 587,
  secure: process.env.SMTP_PORT === '465', // Use SSL for port 465
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || ''
  }
};

// Email addresses
const FROM_EMAIL = process.env.FROM_EMAIL || 'dynamicpropertiesseo@gmail.com';
const TO_EMAIL = process.env.TO_EMAIL || 'dynamicpropertiesseo@gmail.com';
const TO_EMAIL_2 = process.env.TO_EMAIL_2 || 'info@dynamicproperties.in';

// Create transporter
const createTransporter = () => {
  if (!EMAIL_CONFIG.auth.user || !EMAIL_CONFIG.auth.pass) {
    console.log('Email credentials not configured, skipping email sending');
    console.log('SMTP_USER:', EMAIL_CONFIG.auth.user ? 'set' : 'NOT SET');
    console.log('SMTP_PASS:', EMAIL_CONFIG.auth.pass ? 'set' : 'NOT SET');
    return null;
  }
  console.log('Email configuration:', { host: EMAIL_CONFIG.host, port: EMAIL_CONFIG.port, secure: EMAIL_CONFIG.secure });
  return nodemailer.createTransport(EMAIL_CONFIG);
};

// Get database name from environment
const DB_NAME = process.env.DB_NAME || 'property_db';

// Function to create database and table if they don't exist
async function ensureTableExists(connection) {
  try {
    // First create the database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\``);
    // Use the database
    await connection.execute(`USE \`${DB_NAME}\``);
  } catch (e) {
    console.log('Database creation skipped:', e.message);
  }
  
  // Create table if it doesn't exist
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS contact_inquiries (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      message TEXT NOT NULL,
      is_read BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('Table contact_inquiries created or already exists');
  
  // Check if is_read column exists, if not add it
  try {
    const [columns] = await connection.execute('SHOW COLUMNS FROM contact_inquiries LIKE "is_read"');
    if (columns.length === 0) {
      await connection.execute('ALTER TABLE contact_inquiries ADD COLUMN is_read BOOLEAN DEFAULT FALSE');
      console.log('Added is_read column to contact_inquiries table');
    }
  } catch (colError) {
    console.log('Column check skipped:', colError.message);
  }
}

// POST contact form submission
export async function POST(request) {
  let connection;
  
  try {
    const body = await request.json();
    
    const { name, email, phone, message } = body;
    
    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      );
    }
    
    // Get connection from pool
    connection = await pool.getConnection();
    
    // Create database and table if they don't exist
    await ensureTableExists(connection);
    
    // Save to database
    const [result] = await connection.execute(
      'INSERT INTO contact_inquiries (name, email, phone, message) VALUES (?, ?, ?, ?)',
      [name, email, phone || '', message]
    );
    
    console.log('Contact form submission saved:', { name, email, id: result.insertId });
    
    // Send email notification (if configured)
    try {
      const transporter = createTransporter();
      
      if (transporter) {
        const mailOptions = {
          from: FROM_EMAIL,
          replyTo: email,
          to: [TO_EMAIL, TO_EMAIL_2],
          subject: `New Contact Form Submission - ${name}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
              <h2 style="color: #02333B;">New Contact Form Submission</h2>
              <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="mailto:${email}">${email}</a></td>
                </tr>
                ${phone ? `
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;"><a href="tel:${phone}">${phone}</a></td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0;" valign="top"><strong>Message:</strong></td>
                  <td style="padding: 10px 0;">${message.replace(/\n/g, '<br/>')}</td>
                </tr>
              </table>
              <p style="margin-top: 30px; color: #666; font-size: 12px;">This was sent from the Dynamic Properties website.</p>
            </div>
          `
        };
        
        await transporter.sendMail(mailOptions);
        console.log('Email notification sent successfully to:', [TO_EMAIL, TO_EMAIL_2]);
      } else {
        console.log('Email transporter not configured, skipping email send');
      }
    } catch (emailError) {
      console.error('Error sending email:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for contacting us! We will get back to you soon.'
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    return NextResponse.json(
      { error: 'Failed to process contact form: ' + error.message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// GET - Export to Excel OR get enquiries as JSON
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format'); // 'excel' or null for JSON
  let connection;

  try {
    connection = await pool.getConnection();

    // Create database and table if they don't exist
    await ensureTableExists(connection);

    const [inquiries] = await connection.execute(
      'SELECT id, name, email, phone, message, is_read, created_at FROM contact_inquiries ORDER BY created_at DESC'
    );

    // If format=excel, export to Excel
    if (format === 'excel') {
      if (inquiries.length === 0) {
        return NextResponse.json(
          { message: 'No inquiries found', data: [] },
          { status: 200 }
        );
      }

      // Create Excel workbook
      const worksheetData = [
        ['ID', 'Name', 'Email', 'Phone', 'Message', 'Date'],
        ...inquiries.map(item => [
          item.id,
          item.name,
          item.email,
          item.phone || '',
          item.message,
          new Date(item.created_at).toLocaleString()
        ])
      ];

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);

      // Set column widths
      worksheet['!cols'] = [
        { wch: 5 },
        { wch: 25 },
        { wch: 35 },
        { wch: 15 },
        { wch: 50 },
        { wch: 20 }
      ];

      XLSX.utils.book_append_sheet(workbook, worksheet, 'Contact Inquiries');

      // Generate buffer
      const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

      return new NextResponse(buffer, {
        headers: {
          'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          'Content-Disposition': `attachment; filename=contact_inquiries_${new Date().toISOString().split('T')[0]}.xlsx`
        }
      });
    }

    // Default: return JSON for admin panel
    // Get count of unread enquiries
    const unreadCount = inquiries.filter(i => !i.is_read).length;
    
    return NextResponse.json({
      success: true,
      enquiries: inquiries,
      unreadCount: unreadCount
    });
  } catch (error) {
    console.error('Error fetching inquiries:', error);
    return NextResponse.json(
      { error: 'Failed to fetch inquiries: ' + error.message },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}

// PATCH - Mark enquiry as read
export async function PATCH(request) {
  let connection;
  
  try {
    const body = await request.json();
    const { id } = body;
    
    if (!id) {
      return NextResponse.json(
        { error: 'Enquiry ID is required' },
        { status: 400 }
      );
    }
    
    connection = await pool.getConnection();
    
    await ensureTableExists(connection);
    
    await connection.execute(
      'UPDATE contact_inquiries SET is_read = TRUE WHERE id = ?',
      [id]
    );
    
    return NextResponse.json({
      success: true,
      message: 'Enquiry marked as read'
    });
  } catch (error) {
    console.error('Error marking enquiry as read:', error);
    return NextResponse.json(
      { error: 'Failed to mark enquiry as read' },
      { status: 500 }
    );
  } finally {
    if (connection) {
      connection.release();
    }
  }
}
