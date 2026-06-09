import { createElement } from '../utils/dom.js';

export class UmrohPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Paket Umroh Eksklusif</h2><p class="text-muted mt-2">Perjalanan ibadah Umroh aman, nyaman, dan terbimbing bersama pembimbing berpengalaman.</p>';
    return el;
  }
}
