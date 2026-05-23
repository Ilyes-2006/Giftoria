const supabase = require('../config/supabaseClient');

exports.getCart = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const userId = Number(token.replace('mock-jwt-token-', ''));

  try {
    // We join cart_items with products
    const { data: cartItems, error } = await supabase
      .from('cart_items')
      .select(`
        quantity,
        products (
          id,
          name,
          price,
          image,
          description,
          quantity
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;

    // Map it to match the frontend shape
    const formattedCart = cartItems.map(item => ({
      ...item.products,
      stock: item.products.quantity, // original quantity in db is the stock
      quantity: item.quantity // cart quantity
    }));

    res.json(formattedCart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.addToCart = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const userId = Number(token.replace('mock-jwt-token-', ''));
  const { productId, quantity } = req.body;

  try {
    // Upsert equivalent: check if exists, then update or insert
    const { data: existing, error: fetchError } = await supabase
      .from('cart_items')
      .select('id, quantity')
      .eq('user_id', userId)
      .eq('product_id', productId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      throw fetchError;
    }

    if (existing) {
      // update
      const { data, error } = await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + (quantity || 1) })
        .eq('id', existing.id)
        .select()
        .single();
        
      if (error) throw error;
      res.json({ message: 'Cart updated', item: data });
    } else {
      // insert
      const { data, error } = await supabase
        .from('cart_items')
        .insert([{
          user_id: userId,
          product_id: productId,
          quantity: quantity || 1
        }])
        .select()
        .single();
        
      if (error) throw error;
      res.status(201).json({ message: 'Added to cart', item: data });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.removeFromCart = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const userId = Number(token.replace('mock-jwt-token-', ''));
  const productId = Number(req.params.id);

  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId)
      .eq('product_id', productId);

    if (error) throw error;
    res.json({ message: 'Removed from cart' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCartQuantity = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const userId = Number(token.replace('mock-jwt-token-', ''));
  const productId = Number(req.params.id);
  const { quantity } = req.body;

  try {
    if (quantity <= 0) {
      await supabase.from('cart_items').delete().eq('user_id', userId).eq('product_id', productId);
      return res.json({ message: 'Removed from cart' });
    }

    const { data, error } = await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', userId)
      .eq('product_id', productId)
      .select()
      .single();

    if (error) throw error;
    res.json({ message: 'Quantity updated', item: data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.clearCart = async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  const userId = Number(token.replace('mock-jwt-token-', ''));

  try {
    const { error } = await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', userId);

    if (error) throw error;
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
