import { createElement } from '../utils/dom.js';

export class RailPassPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Tiket Kereta & JR Pass</h2><p class="text-muted mt-2">Beli JR Pass Jepang dan tiket kereta mancanegara dengan mudah dan cepat.</p>';
    return el;
  }
}
