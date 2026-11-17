// Frontend API service communicating with the Express & SQLite Backend

const API_BASE = '/api';

/**
 * Fetch all products from backend SQLite database
 */
export async function fetchProducts(params = {}) {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'all') query.append('category', params.category);
  if (params.search) query.append('search', params.search);
  if (params.sort) query.append('sort', params.sort);
  if (params.customizable) query.append('customizable', 'true');

  const res = await fetch(`${API_BASE}/products?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch products from backend');
  return res.json();
}

/**
 * Fetch single product details by id
 */
export async function fetchProductById(id) {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) throw new Error(`Product ${id} not found`);
  return res.json();
}

/**
 * Save custom keychain to database
 */
export async function saveCustomKeychain(customData) {
  const res = await fetch(`${API_BASE}/custom-keychains`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(customData),
  });
  if (!res.ok) throw new Error('Failed to save custom keychain');
  return res.json();
}

/**
 * Place a customer order at checkout and persist to SQLite database
 */
export async function placeOrder(orderData) {
  const res = await fetch(`${API_BASE}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to submit order');
  }
  return res.json();
}

/**
 * Fetch all orders for the Admin Dashboard
 */
export async function fetchAdminOrders(params = {}) {
  const query = new URLSearchParams();
  if (params.status && params.status !== 'all') query.append('status', params.status);
  if (params.search) query.append('search', params.search);

  const res = await fetch(`${API_BASE}/orders?${query.toString()}`);
  if (!res.ok) throw new Error('Failed to fetch orders from backend');
  return res.json();
}

/**
 * Update an order's status in SQLite
 */
export async function updateOrderStatus(orderId, status) {
  const res = await fetch(`${API_BASE}/orders/${orderId}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  });
  if (!res.ok) throw new Error('Failed to update order status');
  return res.json();
}

/**
 * Delete an order
 */
export async function deleteOrder(orderId) {
  const res = await fetch(`${API_BASE}/orders/${orderId}`, {
    method: 'DELETE',
  });
  if (!res.ok) throw new Error('Failed to delete order');
  return res.json();
}

/**
 * Fetch Admin metrics and dashboard statistics
 */
export async function fetchDashboardStats() {
  const res = await fetch(`${API_BASE}/stats`);
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

/**
 * Register a new user in SQLite backend
 */
export async function registerUser({ name, email, password, avatar }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, avatar }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Failed to create account');
  }
  return data;
}

/**
 * Login user via SQLite backend
 */
export async function loginUser({ email, password }) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Failed to log in');
  }
  return data;
}

/**
 * Fetch currently logged in user profile
 */
export async function fetchCurrentUser(userId, token) {
  const headers = {};
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const query = userId ? `?userId=${encodeURIComponent(userId)}` : '';
  const res = await fetch(`${API_BASE}/auth/me${query}`, { headers });
  if (!res.ok) throw new Error('Failed to fetch user session');
  return res.json();
}

/**
 * Log out user
 */
export async function logoutUser() {
  const res = await fetch(`${API_BASE}/auth/logout`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });
  return res.json().catch(() => ({ success: true }));
}

/**
 * Local storage authentication helpers
 */
export function getStoredUser() {
  try {
    const raw = localStorage.getItem('chibicharms_user');
    return raw ? JSON.parse(raw) : null;
  } catch (e) {
    return null;
  }
}

export function setStoredUser(user) {
  try {
    if (user) {
      localStorage.setItem('chibicharms_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('chibicharms_user');
    }
  } catch (e) {}
}

export function getStoredToken() {
  try {
    return localStorage.getItem('chibicharms_token') || null;
  } catch (e) {
    return null;
  }
}

export function setStoredToken(token) {
  try {
    if (token) {
      localStorage.setItem('chibicharms_token', token);
    } else {
      localStorage.removeItem('chibicharms_token');
    }
  } catch (e) {}
}

export function clearStoredAuth() {
  try {
    localStorage.removeItem('chibicharms_user');
    localStorage.removeItem('chibicharms_token');
  } catch (e) {}
}
