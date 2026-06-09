import { createElement } from '../utils/dom.js';

export class CruisesPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Kapal Pesiar (Cruises)</h2><p class="text-muted mt-2">Rasakan sensasi liburan mewah mengarungi samudera dengan kapal pesiar bintang 5.</p>';
    return el;
  }
}
