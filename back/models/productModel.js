/*
  productModel.js — Giftoria
  Requêtes SQL pour la gestion des produits.
  Opérations : liste, recherche par ID, création, mise à jour, suppression,
  et décrémentation du stock.
*/

const db = require('../config/db');

exports.getAllProducts = async () => {
  const [rows] = await db.query(
    'SELECT id, name, description, price, stock, image_url, created_at FROM products ORDER BY id ASC'
  );
  return rows;
};

exports.findProductById = async (id) => {
  const [rows] = await db.query(
    'SELECT id, name, description, price, stock, image_url, created_at FROM products WHERE id = ?',
    [id]
  );
  return rows[0];
};

exports.createProduct = async ({ name, description, price, stock, image_url }) => {
  const [result] = await db.query(
    'INSERT INTO products (name, description, price, stock, image_url) VALUES (?, ?, ?, ?, ?)',
    [name, description, price, stock, image_url || null]
  );
  return exports.findProductById(result.insertId);
};

exports.updateProduct = async (id, { name, description, price, stock, image_url }) => {
  const [result] = await db.query(
    `UPDATE products
     SET name        = COALESCE(?, name),
         description = COALESCE(?, description),
         price       = COALESCE(?, price),
         stock       = COALESCE(?, stock),
         image_url   = COALESCE(?, image_url)
     WHERE id = ?`,
    [name, description, price, stock, image_url, id]
  );
  return result.affectedRows;
};

exports.deleteProduct = async (id) => {
  const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
  return result.affectedRows;
};

/**
 * Décrémente le stock d'un produit d'une quantité donnée.
 * Renvoie 0 si le stock serait insuffisant (protection contre stock négatif).
 */
exports.decrementStock = async (id, quantity) => {
  const [result] = await db.query(
    'UPDATE products SET stock = stock - ? WHERE id = ? AND stock >= ?',
    [quantity, id, quantity]
  );
  return result.affectedRows;
};
