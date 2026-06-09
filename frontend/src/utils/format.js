/**
 * Formatting utility functions
 */

/**
 * Format currency to IDR or other selected currency
 * @param {number} value 
 * @param {string} currencyCode 
 * @returns {string}
 */
export function formatPrice(value, currencyCode = null) {
  const currentCurrency = currencyCode || localStorage.getItem('preferred_currency') || 'IDR';
  
  if (currentCurrency === 'IDR') {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  }

  // Handle other currencies
  const rates = JSON.parse(localStorage.getItem('currency_rates') || '{}');
  const rate = rates[currentCurrency] || 1.0;
  const converted = value * rate;

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currentCurrency,
    minimumFractionDigits: currentCurrency === 'JPY' ? 0 : 2,
    maximumFractionDigits: currentCurrency === 'JPY' ? 0 : 2
  }).format(converted);
}

/**
 * Format date to readable string
 * @param {string|Date} dateVal 
 * @param {string} locale 
 * @returns {string}
 */
export function formatDate(dateVal, locale = 'id') {
  if (!dateVal) return '';
  const date = new Date(dateVal);
  return date.toLocaleDateString(locale === 'id' ? 'id-ID' : 'en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
}

/**
 * Generate slug from string
 * @param {string} text 
 * @returns {string}
 */
export function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start
    .replace(/-+$/, '');            // Trim - from end
}
