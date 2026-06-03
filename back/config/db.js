/*Ce fichier configure la connexion à la base de données MySQL de notre site web Giftoria en utilisant un pool de connexions pour optimiser les performances, tout en récupérant les informations sensibles depuis les variables d’environnement.*/

const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'giftoria',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;
