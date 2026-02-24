import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'property_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database and table on startup
const initDatabase = async () => {
  let connection;
  try {
    // First connect without database to create it
    const tempPool = mysql.createPool({
      host: 'localhost',
      user: 'root',
      password: '',
      waitForConnections: true,
      connectionLimit: 2,
      queueLimit: 0
    });
    
    connection = await tempPool.getConnection();
    await connection.execute('CREATE DATABASE IF NOT EXISTS property_db');
    console.log('Database property_db created or already exists');
    connection.release();
    await tempPool.end();
  } catch (error) {
    console.error('Error creating database:', error);
  }

  // Now connect to the database and create table
  try {
    connection = await pool.getConnection();
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
  } catch (error) {
    console.error('Error creating table:', error);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

// Run initialization
initDatabase();

export default pool;
