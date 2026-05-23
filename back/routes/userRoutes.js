const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getCurrentUser, updateUser, getUsers, deleteUser } = require('../controllers/userController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', getCurrentUser);
router.put('/me', updateUser);
router.get('/', getUsers);
router.delete('/:id', deleteUser);

module.exports = router;
