import { createElement } from '../utils/dom.js';

export class AccountPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Akun Saya</h2><p class="text-muted mt-2">Kelola profil, riwayat perjalanan, dan data diri Anda di sini.</p>';
    return el;
  }
}
