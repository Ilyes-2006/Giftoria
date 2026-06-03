const db = require('../config/db');

exports.getCartItemsByUser = async (userId) => {
  const [rows] = await db.query(
    `SELECT ci.id AS cart_item_id, ci.product_id, p.name, p.description, p.price, p.stock, ci.quantity
     FROM cart_items ci
     JOIN products p ON ci.product_id = p.id
     WHERE ci.user_id = ?
     ORDER BY ci.id ASC`,
    [userId]
  );
  return rows;
};

exports.findCartItem = async (userId, productId) => {
  const [rows] = await db.query(
    'SELECT id, user_id, product_id, quantity FROM cart_items WHERE user_id = ? AND product_id = ?',
    [userId, productId]
  );
  return rows[0];
};

exports.addCartItem = async (userId, productId, quantity) => {
  const [result] = await db.query(
    'INSERT INTO cart_items (user_id, product_id, quantity) VALUES (?, ?, ?)',
    [userId, productId, quantity]
  );
  return result.insertId;
};

exports.updateCartItem = async (id, quantity) => {
  const [result] = await db.query(
    'UPDATE cart_items SET quantity = ? WHERE id = ?',
    [quantity, id]
  );
  return result.affectedRows;
};

exports.deleteCartItem = async (id) => {
  const [result] = await db.query('DELETE FROM cart_items WHERE id = ?', [id]);
  return result.affectedRows;
};

exports.clearCart = async (userId) => {
  const [result] = await db.query('DELETE FROM cart_items WHERE user_id = ?', [userId]);
  return result.affectedRows;
};
