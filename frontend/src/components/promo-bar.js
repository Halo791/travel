import { createElement, $ } from '../utils/dom.js';

export class PromoBar {
  render() {
    const isClosed = sessionStorage.getItem('promo_bar_closed');
    if (isClosed) return '';

    const promoText = 'Nikmati Diskon Hingga 15% untuk Paket Tour Signature Eropa! Gunakan kode: EUR15';
    
    const container = createElement('div', { 
      class: 'promo-bar hide-mobile',
      style: `
        height: var(--promo-bar-height);
        background: var(--color-sale);
        color: var(--color-white);
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        z-index: var(--z-fixed);
        font-family: var(--font-heading);
        font-size: var(--text-xs);
        font-weight: var(--weight-medium);
        padding: 0 var(--space-4);
      `
    });

    const textEl = createElement('span', {}, promoText);
    const linkEl = createElement('a', { 
      href: '#/promo',
      style: 'margin-left: var(--space-2); text-decoration: underline; font-weight: var(--weight-bold); color: var(--color-white);'
    }, 'Lihat Detail');

    const closeBtn = createElement('button', {
      style: 'position: absolute; right: var(--space-4); color: var(--color-white); font-size: var(--text-sm); line-height: 1; cursor: pointer;',
      onClick: () => {
        container.remove();
        document.body.classList.remove('has-promo');
        sessionStorage.setItem('promo_bar_closed', 'true');
      }
    }, '✕');

    container.appendChild(textEl);
    container.appendChild(linkEl);
    container.appendChild(closeBtn);

    document.body.classList.add('has-promo');
    return container;
  }
}
