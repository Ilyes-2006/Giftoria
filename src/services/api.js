const API_BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.PROD ? '' : 'http://localhost:5000');

// Helper: returns headers with Authorization token if logged in
function getAuthHeaders() {
  const token = localStorage.getItem('token');
  return token
    ? { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
    : { 'Content-Type': 'application/json' };
}

// === Products ===

/**
 * Fetch products. Pass limit to restrict results (e.g. home page uses limit=4)
 */
export async function fetchProducts(limit) {
  try {
    const url = limit
      ? `${API_BASE_URL}/api/products?limit=${limit}`
      : `${API_BASE_URL}/api/products`;
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch products:', error);
    throw error;
  }
}

export async function fetchProductById(id) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/products/${id}`);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    throw error;
  }
}

// === Newsletter ===

export async function subscribeNewsletter(email) {
  try {
    const response = await fetch(`${API_BASE_URL}/api/newsletter`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error('Failed to subscribe to newsletter:', error);
    throw error;
  }
}

// === Authentication ===

export async function loginUser(email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function registerUser(username, email, password) {
  const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function fetchCurrentUser(token) {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

export async function updateProfile(token, data) {
  const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// === Cart ===

export async function fetchCart() {
  const response = await fetch(`${API_BASE_URL}/api/cart`, {
    headers: getAuthHeaders(),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

export async function addToCartAPI(productId, quantity = 1) {
  const response = await fetch(`${API_BASE_URL}/api/cart/add`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function updateCartQuantityAPI(productId, quantity) {
  const response = await fetch(`${API_BASE_URL}/api/cart/${productId}`, {
    method: 'PATCH',
    headers: getAuthHeaders(),
    body: JSON.stringify({ quantity }),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function removeFromCartAPI(productId) {
  const response = await fetch(`${API_BASE_URL}/api/cart/${productId}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function clearCartAPI() {
  const response = await fetch(`${API_BASE_URL}/api/cart`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// === Orders ===

export async function createOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/api/orders`, {
    method: 'POST',
    headers: getAuthHeaders(), // includes Authorization token so backend can clear the cart
    body: JSON.stringify(orderData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function fetchOrders() {
  const response = await fetch(`${API_BASE_URL}/api/orders`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

export async function updateOrderStatus(orderId, status) {
  const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

export async function deleteOrder(orderId) {
  const response = await fetch(`${API_BASE_URL}/api/orders/${orderId}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

// === Products Admin CRUD ===

export async function createProduct(productData) {
  const response = await fetch(`${API_BASE_URL}/api/products`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function updateProduct(productId, productData) {
  const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(productData),
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function deleteProduct(productId) {
  const response = await fetch(`${API_BASE_URL}/api/products/${productId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

// === Users Admin CRUD ===

export async function fetchUsers() {
  const response = await fetch(`${API_BASE_URL}/api/auth`);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

export async function deleteUser(userId) {
  const response = await fetch(`${API_BASE_URL}/api/auth/${userId}`, {
    method: 'DELETE',
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
  }
  return await response.json();
}
