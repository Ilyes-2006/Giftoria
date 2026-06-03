/*
  orderRoutes.js — Giftoria
  Routes utilisateur et admin pour les commandes.
*/

const express           = require('express');
const router            = express.Router();
const orderController   = require('../controllers/orderController');
const { authMiddleware }  = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

// Toutes les routes nécessitent d'être connecté
router.use(authMiddleware);

// Utilisateur
router.post('/checkout', orderController.checkout);
router.get('/',          orderController.getOrders);
router.get('/:id',       orderController.getOrderById);

// Admin
router.get('/admin/all',            adminMiddleware, orderController.getAllOrders);
router.patch('/admin/:id/status',   adminMiddleware, orderController.updateOrderStatus);

module.exports = router;
