const supabase = require('../config/supabaseClient');

exports.getOrders = async (req, res) => {
  try {
    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createOrder = async (req, res) => {
  const authHeader = req.headers.authorization;
  let userId = null;
  
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    userId = Number(token.replace('mock-jwt-token-', ''));
  }

  const { products, customerName, wilaya, baladiya, deliveryType, homeAddress, phoneNumber, paymentMethod, totalPrice } = req.body;

  try {
    // 1. Insert Order
    const { data: newOrder, error } = await supabase
      .from('orders')
      .insert([{
        user_id: userId || null,
        status: 'Pending',
        products: products, // storing snapshot in JSONB
        customerName: customerName || '',
        wilaya,
        baladiya,
        deliveryType,
        homeAddress,
        phoneNumber,
        paymentMethod: paymentMethod || 'On Delivery',
        totalPrice: Number(totalPrice)
      }])
      .select()
      .single();

    if (error) throw error;

    // 2. Empty Cart logic
    if (userId) {
      await supabase
        .from('cart_items')
        .delete()
        .eq('user_id', userId);
    }

    res.status(201).json({ message: 'Order created successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const orderId = Number(req.params.id);
  const { status } = req.body;

  try {
    const { data: order, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .eq('id', orderId)
      .single();

    if (fetchError || !order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    // If status changes to Confirmed, decrease quantity (assuming JSONB array contains ids & quantity)
    if (status === 'Confirmed' && order.status !== 'Confirmed') {
      if (Array.isArray(order.products)) {
        for (const item of order.products) {
          // get current product qty
          const { data: product } = await supabase
            .from('products')
            .select('quantity')
            .eq('id', item.id)
            .single();

          if (product) {
            const newQty = Math.max(0, (product.quantity || 0) - (item.quantity || 1));
            await supabase
              .from('products')
              .update({ quantity: newQty })
              .eq('id', item.id);
          }
        }
      }
    }

    const { data: updatedOrder, error: updateError } = await supabase
      .from('orders')
      .update({ status })
      .eq('id', orderId)
      .select()
      .single();

    if (updateError) throw updateError;

    res.json({ message: 'Order status updated', order: updatedOrder });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteOrder = async (req, res) => {
  const orderId = Number(req.params.id);

  try {
    const { data, error } = await supabase
      .from('orders')
      .delete()
      .eq('id', orderId)
      .select();

    if (error) throw error;

    if (data.length === 0) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
