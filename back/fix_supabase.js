const { Client } = require('pg');

async function main() {
  const client = new Client({
    host: 'localhost',
    port: 54322,
    user: 'postgres',
    password: 'postgres', // default local supabase password
    database: 'postgres',
  });

  try {
    await client.connect();
    console.log('Connected to Local Supabase Postgres!');

    // Check if users table exists and get columns
    const res = await client.query(`
      SELECT column_name 
      FROM information_schema.columns 
      WHERE table_schema = 'public' AND table_name = 'users';
    `);

    const columns = res.rows.map(r => r.column_name);
    console.log('Columns in public.users:', columns);

    if (columns.includes('role')) {
      console.log('Dropping role column...');
      await client.query('ALTER TABLE public.users DROP COLUMN role;');
      console.log('Role column dropped successfully!');
    } else {
      console.log('No role column found in public.users.');
    }

  } catch (err) {
    console.error('Error:', err.message);
  } finally {
    await client.end();
  }
}

main();
