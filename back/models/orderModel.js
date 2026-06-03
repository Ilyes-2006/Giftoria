/*
  orderModel.js — Giftoria
  Requêtes SQL pour la gestion des commandes.
  Inclut les opérations utilisateur et admin.
*/

const db = require('../config/db');

exports.createOrder = async (userId, totalAmount) => {
  const [result] = await db.query(
    'INSERT INTO orders (user_id, status, total_amount) VALUES (?, ?, ?)',
    [userId, 'not delivered', totalAmount]
  );
  return result.insertId;
};

exports.createOrderItem = async (orderId, { product_id, quantity, price }) => {
  await db.query(
    'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
    [orderId, product_id, quantity, price]
  );
};

exports.getOrdersByUser = async (userId) => {
  const [rows] = await db.query(
    'SELECT id, user_id, status, total_amount, created_at FROM orders WHERE user_id = ? ORDER BY id DESC',
    [userId]
  );
  return rows;
};

exports.findOrderById = async (orderId) => {
  const [rows] = await db.query(
    'SELECT id, user_id, status, total_amount, created_at FROM orders WHERE id = ?',
    [orderId]
  );
  return rows[0];
};

exports.getOrderItems = async (orderId) => {
  const [rows] = await db.query(
    `SELECT oi.id, oi.product_id, p.name, p.description, oi.price, oi.quantity
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`,
    [orderId]
  );
  return rows;
};

/* ── Admin ──────────────────────────────────────────────────── */

exports.getAllOrders = async () => {
  const [rows] = await db.query(
    `SELECT o.id, o.user_id, u.name AS user_name, u.email AS user_email,
            o.status, o.total_amount, o.created_at
     FROM orders o
     JOIN users u ON o.user_id = u.id
     ORDER BY o.id DESC`
  );
  return rows;
};

exports.updateOrderStatus = async (orderId, status) => {
  const [result] = await db.query(
    'UPDATE orders SET status = ? WHERE id = ?',
    [status, orderId]
  );
  return result.affectedRows;
};
