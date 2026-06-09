/**
 * LocalStorage Helpers
 */

export function getToken() {
  return localStorage.getItem('auth_token');
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('auth_token', token);
  } else {
    localStorage.removeItem('auth_token');
  }
}

export function getUser() {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
}

export function setUser(user) {
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  } else {
    localStorage.removeItem('user');
  }
}

export function getPreferredCurrency() {
  return localStorage.getItem('preferred_currency') || 'IDR';
}

export function setPreferredCurrency(currency) {
  localStorage.setItem('preferred_currency', currency);
  window.dispatchEvent(new Event('currency-change'));
}

export function getPreferredLanguage() {
  return localStorage.getItem('preferred_language') || 'id';
}

export function setPreferredLanguage(lang) {
  localStorage.setItem('preferred_language', lang);
  window.dispatchEvent(new Event('language-change'));
}
