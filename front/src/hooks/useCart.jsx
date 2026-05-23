import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchCart, addToCartAPI, removeFromCartAPI, updateCartQuantityAPI, clearCartAPI } from '../services/api';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(false);

  const isLoggedIn = () => !!localStorage.getItem('token');

  // Load cart: from Supabase if logged in, else from localStorage
  const loadCart = useCallback(async () => {
    if (isLoggedIn()) {
      try {
        setCartLoading(true);
        const data = await fetchCart();
        setCartItems(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('Failed to load cart from backend:', err);
        // Fallback to localStorage
        const saved = localStorage.getItem('giftoria-cart');
        if (saved) setCartItems(JSON.parse(saved));
      } finally {
        setCartLoading(false);
      }
    } else {
      const saved = localStorage.getItem('giftoria-cart');
      if (saved) {
        try { setCartItems(JSON.parse(saved)); } catch (e) { setCartItems([]); }
      }
    }
  }, []);

  // Load on mount
  useEffect(() => {
    loadCart();
  }, [loadCart]);

  // Keep localStorage in sync for guest users
  useEffect(() => {
    if (!isLoggedIn()) {
      localStorage.setItem('giftoria-cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const addToCart = async (product) => {
    if (isLoggedIn()) {
      try {
        await addToCartAPI(product.id, 1);
        // Optimistic update
        setCartItems(prev => {
          const existing = prev.find(i => i.id === product.id);
          if (existing) {
            return prev.map(i => i.id === product.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
          }
          return [...prev, { ...product, quantity: 1 }];
        });
      } catch (err) {
        console.error('Failed to add to cart via API:', err);
        // Still update locally so UX doesn't break
        setCartItems(prev => {
          const existing = prev.find(i => i.id === product.id);
          if (existing) {
            return prev.map(i => i.id === product.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
          }
          return [...prev, { ...product, quantity: 1 }];
        });
      }
    } else {
      setCartItems(prev => {
        const existing = prev.find(i => i.id === product.id);
        if (existing) {
          return prev.map(i => i.id === product.id ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
        }
        return [...prev, { ...product, quantity: 1 }];
      });
    }
  };

  const removeFromCart = async (productId) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
    if (isLoggedIn()) {
      try { await removeFromCartAPI(productId); } catch (err) { console.error('Failed to remove from cart:', err); }
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) { removeFromCart(productId); return; }
    setCartItems(prev => prev.map(i => i.id === productId ? { ...i, quantity } : i));
    if (isLoggedIn()) {
      try { await updateCartQuantityAPI(productId, quantity); } catch (err) { console.error('Failed to update cart qty:', err); }
    }
  };

  const clearCart = async () => {
    setCartItems([]);
    localStorage.removeItem('giftoria-cart');
    if (isLoggedIn()) {
      try { await clearCartAPI(); } catch (err) { console.error('Failed to clear cart via API:', err); }
    }
  };

  const getTotal = () => cartItems.reduce((t, i) => t + i.price * (i.quantity || 1), 0);
  const getItemCount = () => cartItems.reduce((c, i) => c + (i.quantity || 1), 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      cartLoading,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      refreshCart: loadCart,
      getTotal,
      getItemCount
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
}
