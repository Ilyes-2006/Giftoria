const supabase = require('../config/supabaseClient');

exports.getProducts = async (req, res) => {
  try {
    let query = supabase.from('products').select('*').order('created_at', { ascending: false });
    
    // Support limit for home page products
    if (req.query.limit) {
      query = query.limit(Number(req.query.limit));
    }
    
    const { data: products, error } = await query;
    
    if (error) throw error;
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { data: product, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', Number(req.params.id))
      .single();

    if (error || !product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price, category, image, description, quantity } = req.body;
  if (!name || price === undefined) {
    return res.status(400).json({ error: 'Name and price are required fields' });
  }
  if (Number(price) < 0 || (quantity !== undefined && Number(quantity) < 0)) {
    return res.status(400).json({ error: 'Price and Quantity cannot be negative values' });
  }

  try {
    const { data: newProduct, error } = await supabase
      .from('products')
      .insert([{
        name,
        price: Number(price),
        category: category || 'General',
        image: image || '/assets/default-product.jpg',
        description: description || '',
        quantity: quantity !== undefined ? Number(quantity) : 0
      }])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateProduct = async (req, res) => {
  const productId = Number(req.params.id);
  const { name, price, category, image, description, quantity } = req.body;

  if ((price !== undefined && Number(price) < 0) || (quantity !== undefined && Number(quantity) < 0)) {
    return res.status(400).json({ error: 'Price and Quantity cannot be negative values' });
  }

  try {
    const updates = {};
    if (name) updates.name = name;
    if (price !== undefined) updates.price = Number(price);
    if (category) updates.category = category;
    if (image) updates.image = image;
    if (description !== undefined) updates.description = description;
    if (quantity !== undefined) updates.quantity = Number(quantity);

    const { data: updatedProduct, error } = await supabase
      .from('products')
      .update(updates)
      .eq('id', productId)
      .select()
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return res.status(404).json({ error: 'Product not found' });
      }
      throw error;
    }

    res.json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  const productId = Number(req.params.id);

  try {
    const { data, error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId)
      .select();

    if (error) throw error;
    
    if (data.length === 0) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
