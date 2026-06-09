import { createElement } from '../utils/dom.js';

export class FlightsPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Tiket Pesawat</h2><p class="text-muted mt-2">Temukan penawaran tiket pesawat terbaik ke berbagai destinasi.</p>';
    return el;
  }
}
