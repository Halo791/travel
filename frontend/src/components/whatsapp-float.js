import { createElement } from '../utils/dom.js';

export class WhatsappFloat {
  render() {
    const waNumber = '628211998809'; // Bhakti Utama Travel Hotline
    const waText = encodeURIComponent('Halo, saya ingin bertanya tentang layanan travel/armada Bhakti Utama.');
    const waLink = `https://wa.me/${waNumber}?text=${waText}`;

    const container = createElement('a', {
      href: waLink,
      target: '_blank',
      rel: 'noopener noreferrer',
      class: 'whatsapp-float',
      style: `
        position: fixed;
        bottom: var(--space-6);
        right: var(--space-6);
        background: #25D366;
        color: var(--color-white);
        width: 56px;
        height: 56px;
        border-radius: var(--radius-full);
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: var(--shadow-lg);
        z-index: var(--z-fixed);
        transition: transform var(--transition-base), box-shadow var(--transition-base);
      `,
      onMouseOver: (e) => {
        e.currentTarget.style.transform = 'scale(1.1)';
        e.currentTarget.style.boxShadow = '0 12px 28px rgba(37, 211, 102, 0.4)';
      },
      onMouseOut: (e) => {
        e.currentTarget.style.transform = 'scale(1)';
        e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
      }
    });

    // Simple WA SVG icon
    container.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" viewBox="0 0 16 16">
        <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.97h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.69-4.294c-.202-.101-1.192-.589-1.378-.656-.185-.067-.32-.1-.455.1-.136.2-.524.656-.642.791-.118.136-.237.153-.439.052-.2-.101-.845-.312-1.611-.995-.597-.533-.999-1.192-1.116-1.392-.118-.2-.013-.308.088-.409.091-.09.202-.237.303-.355.101-.118.136-.2.203-.336.067-.136.034-.254-.017-.355-.05-.1-.455-1.1-.642-1.55-.182-.437-.367-.378-.503-.385-.13-.006-.28-.007-.43-.007a.89.89.89 0 0 0-.646.3c-.22.241-.84.821-.84 2.002 0 1.184.862 2.329.982 2.492.12.163 1.693 2.581 4.1 3.622.572.248 1.02.395 1.368.505.575.183 1.097.157 1.51.096.46-.068 1.192-.489 1.36-1.011.168-.523.168-.971.118-1.062-.05-.09-.185-.141-.387-.242z"/>
      </svg>
    `;

    return container;
  }
}
