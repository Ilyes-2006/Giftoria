/*
  productRoutes.js — Giftoria
  - GET ouvert à tous.
  - POST / PUT / DELETE réservés aux admins.
*/

const express           = require('express');
const router            = express.Router();
const productController = require('../controllers/productController');
const { authMiddleware }  = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

router.get('/',    productController.getProducts);
router.get('/:id', productController.getProductById);

router.post('/',    authMiddleware, adminMiddleware, productController.createProduct);
router.put('/:id',  authMiddleware, adminMiddleware, productController.updateProduct);
router.delete('/:id', authMiddleware, adminMiddleware, productController.deleteProduct);

module.exports = router;
