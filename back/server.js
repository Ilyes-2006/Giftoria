require('dotenv').config();
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const cartRoutes = require('./routes/cartRoutes');
const contactRoutes = require('./routes/contactRoutes');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/contact', contactRoutes);

app.get('/', (req, res) => {
  res.send({ message: 'Giftoria backend is running.' });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`Giftoria backend listening on http://localhost:${port}`);
});
