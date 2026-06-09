import { createElement } from '../utils/dom.js';

export class PackagesPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Paket Liburan</h2><p class="text-muted mt-2">Daftar paket liburan keluarga dan trip domestik maupun internasional.</p>';
    return el;
  }
}
