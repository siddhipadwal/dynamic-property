import mysql from 'mysql2/promise';

// Get database configuration from environment variables
const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'property_db',
};

console.log('Database config:', {
  host: dbConfig.host,
  user: dbConfig.user,
  database: dbConfig.database,
});

const pool = mysql.createPool({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000,
});

// Initialize database and table on startup
const initDatabase = async () => {
  let connection;
  try {
    const tempPool = mysql.createPool({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password,
      waitForConnections: true,
      connectionLimit: 2,
      queueLimit: 0,
      connectTimeout: 10000,
    });
    
    connection = await tempPool.getConnection();
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${dbConfig.database}\``);
    console.log(`Database ${dbConfig.database} created or already exists`);
    connection.release();
    await tempPool.end();
  } catch (error) {
    console.error('Error creating database:', error.message);
  }

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
    console.error('Error creating table:', error.message);
  } finally {
    if (connection) {
      connection.release();
    }
  }
};

initDatabase().then(() => {
  console.log('Database initialization completed');
}).catch(err => {
  console.error('Database initialization failed:', err.message);
});

export default pool;
