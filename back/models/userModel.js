/*Ce fichier représente le modèle utilisateur de notre site web Giftoria,
 il contient toutes les requêtes SQL nécessaires pour gérer les utilisateurs, comme la recherche par email ou ID, la création, la mise à jour, la suppression et la récupération de la liste complète des utilisateurs dans la base de données.*/

const db = require('../config/db');

exports.findUserByEmail = async (email) => {
  const [rows] = await db.query('SELECT id, name, email, password, role FROM users WHERE email = ?', [email]);
  return rows[0];
};

exports.findUserById = async (id) => {
  const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
  return rows[0];
};

exports.createUser = async ({ name, email, passwordHash }) => {
  const [result] = await db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, passwordHash]
  );

  return {
    id: result.insertId,
    name,
    email,
    role: 'user',
  };
};

exports.getAllUsers = async () => {
  const [rows] = await db.query('SELECT id, name, email, role, created_at FROM users ORDER BY id ASC');
  return rows;
};

exports.updateUser = async (id, { name, email, role }) => {
  const [result] = await db.query(
    'UPDATE users SET name = COALESCE(?, name), email = COALESCE(?, email), role = COALESCE(?, role) WHERE id = ?',
    [name, email, role, id]
  );
  return result.affectedRows;
};

exports.deleteUser = async (id) => {
  const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
  return result.affectedRows;
};
