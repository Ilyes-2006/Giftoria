const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Fetch all products from the API
 * @returns {Promise<Array>} Array of product objects
 */
export async function fetchProducts() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

/**
 * Fetch a single product by ID
 * @param {string|number} id - Product ID
 * @returns {Promise<Object>} Product object
 */
export async function fetchProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw error;
  }
}

/**
 * Submit newsletter subscription
 * @param {string} email - Email address
 * @returns {Promise<Object>} Response from server
 */
export async function subscribeNewsletter(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to subscribe to newsletter:', error);
    throw error;
  }
}
