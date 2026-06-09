import { createElement } from '../utils/dom.js';

export class LoginPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Masuk ke Akun</h2><p class="text-muted mt-2">Masuk untuk melihat tiket shuttle, riwayat transaksi, dan mengumpulkan poin reward.</p>';
    return el;
  }
}
