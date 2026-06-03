/*Ce fichier contient une liste de produits fictifs utilisés dans notre site web Giftoria, servant de données de test pour afficher des articles avec leurs informations (nom, prix, catégorie, image et description) avant l’intégration d’une base de données réelle.*/

const products = [
  {
    id: 1,
    name: 'Giftoria Signature Candle',
    price: 24.99,
    category: 'Home',
    image: '/assets/candle.jpg',
    description: 'A scented candle made for cozy evenings and thoughtful gifts.'
  },
  {
    id: 2,
    name: 'Luxury Gift Box',
    price: 49.99,
    category: 'Gift Sets',
    image: '/assets/gift-box.jpg',
    description: 'A curated box with premium treats and keepsakes.'
  },
  {
    id: 3,
    name: 'Personalized Mug',
    price: 19.99,
    category: 'Accessories',
    image: '/assets/mug.jpg',
    description: 'Customizable mug for coffee lovers and special occasions.'
  },
  {
    id: 4,
    name: 'Weekend Relax Kit',
    price: 34.99,
    category: 'Wellness',
    image: '/assets/relax-kit.jpg',
    description: 'A relaxing gift set with wellness essentials for self-care.'
  }
];

module.exports = products;
