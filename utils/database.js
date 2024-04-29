
import sql from 'your-sql-library';

const pool = sql.createPool({
  user: 'your-db-user',
  password: 'your-db-password',
  host: 'your-db-host',
  database: 'your-db-name',
});

export async function savePostToDatabase(postId, userToken) {
  await pool.query('INSERT INTO handlingsplan (post_id, user_token) VALUES (?, ?)', [postId, userToken]);
}
