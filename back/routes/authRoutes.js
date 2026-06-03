/*Ce fichier définit les routes d’authentification de notre site web Giftoria avec Express, en reliant les endpoints /register et /login aux fonctions du contrôleur authController pour gérer l’inscription et la connexion des utilisateurs.*/
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
