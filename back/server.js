/*Ce code, c’est le point d’entrée principal (server.js) d’un backend Node.js avec Express. Il sert à démarrer ton serveur API et organiser toutes les routes.*/

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const { handleNotFound, handleError } = require('./middlewares/errorMiddleware');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Giftoria backend is running.' });
});

app.use(handleNotFound);
app.use(handleError);

app.listen(port, () => {
  console.log(`Giftoria backend listening on http://localhost:${port}`);
});
