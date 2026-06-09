import { createElement } from '../utils/dom.js';

export class CheckBookingPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Cek Status Pemesanan</h2><p class="text-muted mt-2">Masukkan kode booking Anda untuk melihat status pemesanan tiket shuttle atau tour.</p>';
    return el;
  }
}
