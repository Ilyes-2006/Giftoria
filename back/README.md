# Giftoria — Backend API

Backend REST pour l'application Giftoria, construit avec **Node.js**, **Express** et **MySQL**.

## Stack

| Technologie | Rôle |
|-------------|------|
| Express     | Serveur HTTP & routing |
| mysql2      | Connexion MySQL (pool de connexions) |
| bcrypt      | Hachage des mots de passe |
| jsonwebtoken| Authentification JWT |
| dotenv      | Variables d'environnement |
| nodemon     | Rechargement en développement |

---

## Installation

```bash
cd back
npm install
cp .env.example .env   # Remplir les variables
```

Importer le schéma SQL :

```bash
mysql -u root -p < database.sql
```

Démarrer le serveur :

```bash
npm run dev   # Développement (nodemon)
npm start     # Production
```

Le serveur écoute sur `http://localhost:5000` par défaut.

---

## Variables d'environnement (`.env`)

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=giftoria
JWT_SECRET=replace_with_a_strong_secret
JWT_EXPIRES_IN=1h
PORT=5000
```

---

## Endpoints

### Auth — `/api/auth`

| Méthode | Route       | Description              | Auth |
|---------|-------------|--------------------------|------|
| POST    | `/register` | Inscription              | —    |
| POST    | `/login`    | Connexion → token JWT    | —    |

### Utilisateurs — `/api/users`

| Méthode | Route  | Description                  | Auth   |
|---------|--------|------------------------------|--------|
| GET     | `/`    | Liste tous les utilisateurs  | Admin  |
| GET     | `/:id` | Détail d'un utilisateur      | Auth   |
| PUT     | `/:id` | Modifier (soi-même ou admin) | Auth   |
| DELETE  | `/:id` | Supprimer (soi-même ou admin)| Auth   |

### Produits — `/api/products`

| Méthode | Route  | Description           | Auth   |
|---------|--------|-----------------------|--------|
| GET     | `/`    | Liste tous les produits | —    |
| GET     | `/:id` | Détail d'un produit   | —      |
| POST    | `/`    | Créer un produit      | Admin  |
| PUT     | `/:id` | Modifier un produit   | Admin  |
| DELETE  | `/:id` | Supprimer un produit  | Admin  |

### Panier — `/api/cart`

| Méthode | Route  | Description                    | Auth |
|---------|--------|--------------------------------|------|
| GET     | `/`    | Voir son panier                | Auth |
| POST    | `/`    | Ajouter un produit             | Auth |
| PUT     | `/:id` | Modifier la quantité d'un item | Auth |
| DELETE  | `/:id` | Supprimer un item du panier    | Auth |

Corps POST : `{ "productId": 1, "quantity": 2 }`

### Commandes — `/api/orders`

| Méthode | Route                  | Description                       | Auth   |
|---------|------------------------|-----------------------------------|--------|
| POST    | `/checkout`            | Valider le panier → créer commande | Auth  |
| GET     | `/`                    | Mes commandes                     | Auth   |
| GET     | `/:id`                 | Détail d'une commande             | Auth   |
| GET     | `/admin/all`           | Toutes les commandes              | Admin  |
| PATCH   | `/admin/:id/status`    | Changer le statut d'une commande  | Admin  |

Corps PATCH status : `{ "status": "delivered" }`

---

## Authentification

Ajouter l'en-tête suivant sur les routes protégées :

```
Authorization: Bearer <token>
```

---

## Structure du projet

```
back/
├── config/
│   └── db.js                 # Pool MySQL
├── controllers/
│   ├── authController.js
│   ├── cartController.js
│   ├── orderController.js
│   ├── productController.js
│   └── userController.js
├── middlewares/
│   ├── adminMiddleware.js    # Vérifie le rôle admin
│   ├── authMiddleware.js     # Vérifie le token JWT
│   └── errorMiddleware.js    # Gestion globale des erreurs
├── models/
│   ├── cartModel.js
│   ├── orderModel.js
│   ├── productModel.js
│   └── userModel.js
├── routes/
│   ├── authRoutes.js
│   ├── cartRoutes.js
│   ├── orderRoutes.js
│   ├── productRoutes.js
│   └── userRoutes.js
├── utils/
│   ├── hash.js               # bcrypt
│   └── token.js              # JWT
├── database.sql
├── .env.example
├── package.json
└── server.js
```
