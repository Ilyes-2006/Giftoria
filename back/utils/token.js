/*Ce fichier gère la création et la vérification des tokens JWT de notre site web Giftoria, en permettant de générer un token lors de la connexion utilisateur et de vérifier sa validité pour sécuriser l’accès aux routes protégées de l’API.*/
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '1h';

exports.createToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
