/*Ce fichier contient les fonctions de sécurité de notre site web Giftoria, en permettant de hacher les mots de passe lors de l’inscription et de les comparer lors de la connexion, afin de garantir une authentification sécurisée des utilisateurs.*/
const bcrypt = require('bcrypt');

exports.hashPassword = async (password) => {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
};

exports.comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
