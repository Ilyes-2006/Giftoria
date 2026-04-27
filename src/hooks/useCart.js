import { useState, useEffect } from 'react';

/**
 * Custom hook for managing shopping cart
 * @returns {Object} Cart state and methods
 */
export function useCart() {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('giftoria-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('giftoria-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  /**
   * Add a product to cart
   * @param {Object} product - Product to add
   */
  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        // If product already in cart, increase quantity
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity || 1) + 1 }
            : item
        );
      }
      // Add new product to cart
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  /**
   * Remove product from cart
   * @param {string|number} productId - Product ID to remove
   */
  const removeFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  /**
   * Update quantity of a cart item
   * @param {string|number} productId - Product ID
   * @param {number} quantity - New quantity
   */
  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  /**
   * Clear all items from cart
   */
  const clearCart = () => {
    setCartItems([]);
  };

  /**
   * Calculate total price of cart
   * @returns {number} Total price
   */
  const getTotal = () => {
    return cartItems.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  };

  /**
   * Get total number of items in cart
   * @returns {number} Total items count
   */
  const getItemCount = () => {
    return cartItems.reduce((count, item) => count + (item.quantity || 1), 0);
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };
}
