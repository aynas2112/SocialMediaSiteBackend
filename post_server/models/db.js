// db.js
import pg from 'pg'
const { Pool } = pg
// Create a new pool instance to manage connections
const pool = new Pool({
  user: process.env.PGUSER || 'akshats911',
  host: process.env.PGHOST || 'localhost',
  database: process.env.PGDATABASE || 'users',
  password: process.env.PGPASSWORD || 'Tacmpp@123',
  port: 5431,
});

export default pool;
