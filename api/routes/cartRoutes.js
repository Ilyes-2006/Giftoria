const express = require('express');
const router = express.Router();
const { getCart, addToCart, removeFromCart, updateCartQuantity, clearCart } = require('../controllers/cartController');

router.get('/', getCart);
router.post('/add', addToCart);
router.patch('/:id', updateCartQuantity);
router.delete('/:id', removeFromCart);
router.delete('/', clearCart);

module.exports = router;
