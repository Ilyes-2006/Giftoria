/*Ce fichier contient la logique métier de gestion des utilisateurs de notre site web Giftoria, en permettant de récupérer, modifier et supprimer des utilisateurs avec contrôle d’accès (utilisateur ou admin), ainsi qu’une gestion des permissions et des erreurs pour sécuriser les opérations sur la base de données. */
const userModel = require('../models/userModel');

exports.getUsers = async (req, res, next) => {
  try {
    const users = await userModel.getAllUsers();
    res.json(users);
  } catch (error) {
    next(error);
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await userModel.findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    const { name, email, role } = req.body;
    const userId = req.params.id;

    if (req.user.id !== Number(userId) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden.' });
    }

    const affectedRows = await userModel.updateUser(userId, { name, email, role });
    if (!affectedRows) {
      return res.status(404).json({ error: 'User not found or no changes applied.' });
    }

    const updatedUser = await userModel.findUserById(userId);
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;

    if (req.user.id !== Number(userId) && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden.' });
    }

    const affectedRows = await userModel.deleteUser(userId);
    if (!affectedRows) {
      return res.status(404).json({ error: 'User not found.' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
