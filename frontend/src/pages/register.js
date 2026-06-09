import { createElement } from '../utils/dom.js';

export class RegisterPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Daftar Akun Baru</h2><p class="text-muted mt-2">Daftar akun gratis dan nikmati diskon khusus member serta penawaran travel eksklusif.</p>';
    return el;
  }
}
