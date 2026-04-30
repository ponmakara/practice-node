import mysql from 'mysql2/promise';

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'node_makara',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

/**
 * Create database connection pool
 */
const pool = mysql.createPool(dbConfig);

/**
 * Initialize database and create tables if they don't exist
 */
export async function initDatabase() {
  try {
    const connection = await pool.getConnection();
    console.info('✓ Database connection successful');
    connection.release();

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      )
    `);

    const [createdAtRows] = await pool.query(
      "SHOW COLUMNS FROM users LIKE 'created_at'"
    );
    if (createdAtRows.length === 0) {
      await pool.query(
        "ALTER TABLE users ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP"
      );
    }

    const [updatedAtRows] = await pool.query(
      "SHOW COLUMNS FROM users LIKE 'updated_at'"
    );
    if (updatedAtRows.length === 0) {
      await pool.query(
        "ALTER TABLE users ADD COLUMN updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      );
    }

    console.info('✓ Users table ready');
  } catch (error) {
    console.error('Database initialization failed:', error);
    throw error;
  }
}

export default pool;
