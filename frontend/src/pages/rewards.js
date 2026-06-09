import { createElement } from '../utils/dom.js';

export class RewardsPage {
  render() {
    const el = createElement('div', { class: 'container section text-center' });
    el.innerHTML = '<h2>Loyalty & Poin Reward</h2><p class="text-muted mt-2">Kumpulkan poin perjalanan dan tukarkan dengan voucher diskon menarik.</p>';
    return el;
  }
}
