import 'dotenv/config';
import mysql from 'mysql2/promise';

// MySQL Connection Pool for CakeBites database
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'cakebite_react',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  decimalNumbers: true
});

// Test connection function
export async function testDbConnection() {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT 1 as connected');
    connection.release();
    return { ok: true, message: `Connected to MySQL: ${process.env.DB_NAME || 'cakebite_react'}`, rows };
  } catch (err) {
    console.error('MySQL connection error:', err.message);
    return { ok: false, message: err.message };
  }
}

export default pool;
