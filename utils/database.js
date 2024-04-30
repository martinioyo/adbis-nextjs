
import { Pool } from 'pg';

// Configure your database connection here
const pool = new Pool({
  host: 'ep-blue-cell-a2wdg7nu-pooler.eu-central-1.aws.neon.tech',
  user: 'default',
  password: 'fbdTKOvw8o1p',
  database: 'verceldb',
  port: 5432,  // Default PostgreSQL port
  ssl: {
    rejectUnauthorized: false  // Necessary if using self-signed certificates, adjust as needed for your security requirements
  }
});

export async function savePostToDatabase(postId, userToken) {
  try {
    const query = 'INSERT INTO saved_posts (post_id, user_token) VALUES ($1, $2)';
    const result = await pool.query(query, [postId, userToken]);
    return result;
  } catch (error) {
    // Log error in your server logs for debugging
    console.error('Database Error:', error);
    throw new Error('Failed to save post to the database');
  }
}
