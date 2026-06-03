/*Ce fichier définit le middleware d’authentification de notre site web Giftoria, il vérifie la présence et la validité du token JWT dans l’en-tête de requête, puis autorise ou bloque l’accès aux routes protégées tout en ajoutant les informations de l’utilisateur connecté à la requête.*/
const { verifyToken } = require('../utils/token');

exports.authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Authorization header is missing or invalid.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
