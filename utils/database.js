import { Pool } from 'pg';

// Configuration af databaseforbindelse
const pool = new Pool({
  host: 'ep-blue-cell-a2wdg7nu-pooler.eu-central-1.aws.neon.tech',
  user: 'default',
  password: 'fbdTKOvw8o1p',
  database: 'verceldb',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Denne funktion gemmer en handlingsplan til tabellen "handlingsplaner"
export async function savePostToDatabase(title, description, tags) {
  const query =
    'INSERT INTO public.handlingsplaner (title, beskrivelse, tags) VALUES ($1, $2, $3) RETURNING id';
  const values = [title, description, tags];
  try {
    const result = await pool.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to save post to the database');
  }
}
