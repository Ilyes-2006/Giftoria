/*
  orderController.js — Giftoria
  Gestion des commandes : checkout, consultation utilisateur, administration.
  - Vérifie le stock avant de créer la commande.
  - Décrémente le stock après validation.
  - L'admin peut voir toutes les commandes et changer leur statut.
*/

const cartModel    = require('../models/cartModel');
const orderModel   = require('../models/orderModel');
const productModel = require('../models/productModel');

/* ── Utilisateur ─────────────────────────────────────────────── */

exports.checkout = async (req, res, next) => {
  try {
    const userId   = req.user.id;
    const cartItems = await cartModel.getCartItemsByUser(userId);

    if (!cartItems.length) {
      return res.status(400).json({ error: 'Cart is empty.' });
    }

    // Vérification du stock pour chaque produit avant de créer la commande
    for (const item of cartItems) {
      const product = await productModel.findProductById(item.product_id);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({
          error: `Insufficient stock for "${item.name}". Available: ${product ? product.stock : 0}.`,
        });
      }
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const orderId     = await orderModel.createOrder(userId, totalAmount);

    for (const item of cartItems) {
      await orderModel.createOrderItem(orderId, {
        product_id: item.product_id,
        quantity:   item.quantity,
        price:      item.price,
      });

      // Décrémentation du stock
      await productModel.decrementStock(item.product_id, item.quantity);
    }

    await cartModel.clearCart(userId);

    const orderDetails = await orderModel.findOrderById(orderId);
    const orderItems   = await orderModel.getOrderItems(orderId);

    res.status(201).json({ order: orderDetails, items: orderItems });
  } catch (error) {
    next(error);
  }
};

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.getOrdersByUser(req.user.id);
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const order   = await orderModel.findOrderById(orderId);

    if (!order || order.user_id !== req.user.id) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    const items = await orderModel.getOrderItems(orderId);
    res.json({ order, items });
  } catch (error) {
    next(error);
  }
};

/* ── Admin ──────────────────────────────────────────────────── */

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await orderModel.getAllOrders();
    res.json(orders);
  } catch (error) {
    next(error);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const orderId = req.params.id;
    const { status } = req.body;

    const validStatuses = ['not delivered', 'delivered'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: `Status must be one of: ${validStatuses.join(', ')}.` });
    }

    const order = await orderModel.findOrderById(orderId);
    if (!order) {
      return res.status(404).json({ error: 'Order not found.' });
    }

    await orderModel.updateOrderStatus(orderId, status);
    const updatedOrder = await orderModel.findOrderById(orderId);
    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
};
