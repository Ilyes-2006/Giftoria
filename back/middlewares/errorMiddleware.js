/*Ce fichier gère les erreurs de notre site web Giftoria, en renvoyant une réponse 404 lorsque la route n’existe pas et une réponse 500 en cas d’erreur serveur, tout en assurant un traitement centralisé et propre des exceptions dans l’API.*/
exports.handleNotFound = (req, res) => {
  res.status(404).json({ error: 'Not found' });
};

exports.handleError = (err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
};
