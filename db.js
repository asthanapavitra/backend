import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})
pool.connect((err)=>{
  if(err) throw err
  console.log("Connect to PostgreSQL successfully")
})
export default pool;
