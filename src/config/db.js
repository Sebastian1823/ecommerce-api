const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log('\x1b[32m✓ Conexión exitosa a MySQL\x1b[0m');
    connection.release();
  } catch (error) {
    console.error('\x1b[31m✗ Error al conectar a MySQL:', error.message, '\x1b[0m');
  }
};

module.exports = { pool, testConnection };
