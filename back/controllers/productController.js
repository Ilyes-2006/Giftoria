/*
  productController.js — Giftoria
  Logique CRUD produits.
  - GET ouvert à tous.
  - POST / PUT / DELETE réservés aux admins (géré dans les routes).
*/

const productModel = require('../models/productModel');

exports.getProducts = async (req, res, next) => {
  try {
    const products = await productModel.getAllProducts();
    res.json(products);
  } catch (error) {
    next(error);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findProductById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, image_url } = req.body;

    if (!name || !description || typeof price !== 'number' || typeof stock !== 'number') {
      return res.status(400).json({ error: 'name, description, price (number) and stock (number) are required.' });
    }
    if (price < 0 || stock < 0) {
      return res.status(400).json({ error: 'price and stock must be non-negative.' });
    }

    const product = await productModel.createProduct({ name, description, price, stock, image_url });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, image_url } = req.body;
    const productId = req.params.id;

    if (price !== undefined && typeof price !== 'number') {
      return res.status(400).json({ error: 'price must be a number.' });
    }
    if (stock !== undefined && typeof stock !== 'number') {
      return res.status(400).json({ error: 'stock must be a number.' });
    }

    const affectedRows = await productModel.updateProduct(productId, { name, description, price, stock, image_url });
    if (!affectedRows) {
      return res.status(404).json({ error: 'Product not found or no changes applied.' });
    }

    const updatedProduct = await productModel.findProductById(productId);
    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const affectedRows = await productModel.deleteProduct(req.params.id);
    if (!affectedRows) {
      return res.status(404).json({ error: 'Product not found.' });
    }
    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
