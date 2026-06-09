import { createElement } from '../utils/dom.js';

export class PromoPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Promo & Voucher Diskon</h2><p class="text-muted mt-2">Dapatkan diskon harga tiket shuttle dan paket tour terbaik untuk liburan Anda.</p>';
    return el;
  }
}
