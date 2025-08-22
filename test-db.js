require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // Supabase requires SSL
});

client.connect()
  .then(() => console.log('✅ Database connection successful!'))
  .catch(err => console.error('❌ Database connection failed:', err))
  .finally(() => client.end());
