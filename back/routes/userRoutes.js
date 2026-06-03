/*
  userRoutes.js — Giftoria
  - GET / (liste tous les users) réservé aux admins.
  - GET /:id, PUT /:id, DELETE /:id pour l'utilisateur lui-même ou un admin.
*/

const express          = require('express');
const router           = express.Router();
const userController   = require('../controllers/userController');
const { authMiddleware }  = require('../middlewares/authMiddleware');
const { adminMiddleware } = require('../middlewares/adminMiddleware');

router.use(authMiddleware);

router.get('/',    adminMiddleware, userController.getUsers);
router.get('/:id', userController.getUserById);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
