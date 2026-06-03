/*
  cartController.js — Giftoria
  Gestion du panier : récupération, ajout, mise à jour, suppression.
  - Vérifie que le produit existe et que le stock est suffisant.
  - Vérifie que l'item appartient bien à l'utilisateur connecté avant toute modification.
*/

const cartModel  = require('../models/cartModel');
const productModel = require('../models/productModel');

exports.getCart = async (req, res, next) => {
  try {
    const cart = await cartModel.getCartItemsByUser(req.user.id);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

exports.addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { productId, quantity } = req.body;

    if (!productId || typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ error: 'productId and a positive quantity are required.' });
    }

    const product = await productModel.findProductById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }

    // Vérification du stock disponible
    const existingItem = await cartModel.findCartItem(userId, productId);
    const alreadyInCart = existingItem ? existingItem.quantity : 0;
    if (product.stock < alreadyInCart + quantity) {
      return res.status(400).json({ error: `Insufficient stock. Available: ${product.stock}.` });
    }

    if (existingItem) {
      await cartModel.updateCartItem(existingItem.id, existingItem.quantity + quantity);
    } else {
      await cartModel.addCartItem(userId, productId, quantity);
    }

    const cart = await cartModel.getCartItemsByUser(userId);
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

exports.updateCartItem = async (req, res, next) => {
  try {
    const userId  = req.user.id;
    const itemId  = req.params.id;
    const { quantity } = req.body;

    if (typeof quantity !== 'number' || quantity <= 0) {
      return res.status(400).json({ error: 'Quantity must be a positive number.' });
    }

    // Vérification que l'item appartient à cet utilisateur
    const [rows] = await require('../config/db').query(
      'SELECT ci.id, ci.product_id, ci.quantity FROM cart_items ci WHERE ci.id = ? AND ci.user_id = ?',
      [itemId, userId]
    );
    if (!rows.length) {
      return res.status(404).json({ error: 'Cart item not found.' });
    }

    const item = rows[0];
    const product = await productModel.findProductById(item.product_id);
    if (product.stock < quantity) {
      return res.status(400).json({ error: `Insufficient stock. Available: ${product.stock}.` });
    }

    await cartModel.updateCartItem(itemId, quantity);
    const cart = await cartModel.getCartItemsByUser(userId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};

exports.removeCartItem = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const itemId = req.params.id;

    // Vérification que l'item appartient à cet utilisateur
    const [rows] = await require('../config/db').query(
      'SELECT id FROM cart_items WHERE id = ? AND user_id = ?',
      [itemId, userId]
    );
    if (!rows.length) {
      return res.status(404).json({ error: 'Cart item not found.' });
    }

    await cartModel.deleteCartItem(itemId);
    const cart = await cartModel.getCartItemsByUser(userId);
    res.json(cart);
  } catch (error) {
    next(error);
  }
};
