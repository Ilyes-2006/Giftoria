/*
  database.sql — Giftoria
  Crée la base de données, les tables et insère des données d'exemple.
  Exécuter une seule fois lors de l'initialisation du projet.
*/

CREATE DATABASE IF NOT EXISTS giftoria DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE giftoria;

-- Utilisateurs
CREATE TABLE IF NOT EXISTS users (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100)  NOT NULL,
  email      VARCHAR(150)  NOT NULL UNIQUE,
  password   VARCHAR(255)  NOT NULL,
  role       ENUM('user','admin') NOT NULL DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Produits
CREATE TABLE IF NOT EXISTS products (
  id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(150)   NOT NULL,
  description TEXT           NOT NULL,
  price       DECIMAL(10, 2) NOT NULL DEFAULT 0.00,
  stock       INT UNSIGNED   NOT NULL DEFAULT 0,
  image_url   VARCHAR(500)   DEFAULT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Panier
CREATE TABLE IF NOT EXISTS cart_items (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id    INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  quantity   INT UNSIGNED NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY uq_cart_user_product (user_id, product_id),
  FOREIGN KEY (user_id)    REFERENCES users(id)    ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Commandes
CREATE TABLE IF NOT EXISTS orders (
  id           INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id      INT UNSIGNED NOT NULL,
  status       ENUM('not delivered','delivered') NOT NULL DEFAULT 'not delivered',
  total_amount DECIMAL(10,2) NOT NULL DEFAULT 0.00,
  created_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Lignes de commande
CREATE TABLE IF NOT EXISTS order_items (
  id         INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id   INT UNSIGNED NOT NULL,
  product_id INT UNSIGNED NOT NULL,
  quantity   INT UNSIGNED NOT NULL DEFAULT 1,
  price      DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id)   REFERENCES orders(id)   ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

-- Données d'exemple
INSERT INTO products (name, description, price, stock, image_url) VALUES
('Bougie parfumée',    'Bougie artisanale aux notes de vanille.',             12.90, 18, NULL),
('Tasse personnalisée','Tasse en céramique avec un message offert.',          14.50, 34, NULL),
('Coffret cadeau',     'Sélection de petits cadeaux pour toutes occasions.', 29.99, 12, NULL);
