const mysql = require('mysql2/promise');

async function main() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'giftoria'
    });

    console.log('Connected to MySQL successfully.');

    // Check columns
    const [columns] = await connection.execute('SHOW COLUMNS FROM users');
    console.log('Columns in users table:');
    console.log(columns.map(c => c.Field));

    // Drop role if exists
    if (columns.some(c => c.Field === 'role')) {
      console.log('Dropping role column...');
      await connection.execute('ALTER TABLE users DROP COLUMN role');
      console.log('Dropped role column.');
    }

    // Check data
    const [rows] = await connection.execute('SELECT id, username, email FROM users');
    console.log('Users in database:', rows);

    // If mohammed is an admin somewhere... wait, if role is dropped he can't be admin based on role!
    // What if there is an is_superuser column?
    if (columns.some(c => c.Field === 'is_superuser' || c.Field === 'isSuperuser')) {
       console.log('Found is_superuser column!');
       await connection.execute('ALTER TABLE users DROP COLUMN is_superuser');
    }

    // Let's also check if admin@giftoria.com exists and remove it if the user wants it to be registerable
    await connection.execute('DELETE FROM users WHERE email = ?', ['admin@giftoria.com']);
    console.log('Deleted admin@giftoria.com if it existed so they can register manually.');

    await connection.end();
  } catch (error) {
    console.error('MySQL connection or query failed:', error.message);
  }
}

main();
