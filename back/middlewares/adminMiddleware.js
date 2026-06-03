/*
  adminMiddleware.js — Giftoria
  Doit être utilisé APRÈS authMiddleware.
  Bloque l'accès si l'utilisateur connecté n'a pas le rôle 'admin'.
*/

exports.adminMiddleware = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ error: 'Access denied. Admin only.' });
  }
  next();
};
