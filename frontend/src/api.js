/**
 * API Client wrapper for Fetch requests
 */
const BASE_URL = 'http://localhost:8000/api';

async function request(endpoint, options = {}) {
  const token = localStorage.getItem('auth_token');
  const currency = localStorage.getItem('preferred_currency') || 'IDR';
  const language = localStorage.getItem('preferred_language') || 'id';

  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'X-Currency': currency,
    'X-Language': language,
    ...options.headers,
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    ...options,
    headers,
  };

  if (options.body && typeof options.body === 'object' && !(options.body instanceof FormData)) {
    config.body = JSON.stringify(options.body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      // Auto-logout if token is expired or invalid
      if (response.status === 401) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
        window.dispatchEvent(new Event('auth-change'));
      }
      throw { status: response.status, ...data };
    }

    return data;
  } catch (error) {
    console.error(`API Error on ${endpoint}:`, error);
    throw error;
  }
}

export const api = {
  get: (endpoint, headers = {}) => request(endpoint, { method: 'GET', headers }),
  post: (endpoint, body, headers = {}) => request(endpoint, { method: 'POST', body, headers }),
  put: (endpoint, body, headers = {}) => request(endpoint, { method: 'PUT', body, headers }),
  delete: (endpoint, headers = {}) => request(endpoint, { method: 'DELETE', headers }),
};
