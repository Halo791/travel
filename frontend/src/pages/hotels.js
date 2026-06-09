import { createElement } from '../utils/dom.js';

export class HotelsPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Hotel & Akomodasi</h2><p class="text-muted mt-2">Cari hotel, villa, dan resort premium dengan harga bersahabat.</p>';
    return el;
  }
}
