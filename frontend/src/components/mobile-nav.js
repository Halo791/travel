import { createElement } from '../utils/dom.js';

export class MobileNav {
  render() {
    const tabs = [
      { name: 'Beranda', hash: '#/', icon: 'home' },
      { name: 'Rewards', hash: '#/rewards', icon: 'gift' },
      { name: 'Cek Booking', hash: '#/check-booking', icon: 'clipboard-list' },
      { name: 'Akun', hash: '#/account', icon: 'user' }
    ];

    const container = createElement('nav', {
      class: 'mobile-nav hide-desktop',
      style: `
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
        height: var(--mobile-nav-height);
        background: var(--color-white);
        border-top: 1px solid var(--color-border);
        display: flex;
        align-items: center;
        justify-content: space-around;
        z-index: var(--z-fixed);
        box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
      `
    });

    // Simple Lucide icons mapping in SVG to avoid complex dependency loaders
    const icons = {
      home: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>`,
      gift: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="8" width="18" height="4" rx="1"/><path d="M12 8V4H8.5a2.5 2.5 0 0 1 0-5C11 1 12 3 12 4s1 2 3.5 2a2.5 2.5 0 1 1 0 5H12z"/><path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"/><path d="M12 12v9"/></svg>`,
      'clipboard-list': `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg>`,
      user: `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`
    };

    tabs.forEach(tab => {
      const isCurrent = window.location.hash === tab.hash || (tab.hash === '#/' && !window.location.hash);
      
      const tabEl = createElement('a', {
        href: tab.hash,
        class: `mobile-nav-tab ${isCurrent ? 'active' : ''}`,
        style: `
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: var(--space-1);
          color: ${isCurrent ? 'var(--color-primary)' : 'var(--color-text-muted)'};
          font-size: 10px;
          font-weight: ${isCurrent ? 'var(--weight-semibold)' : 'var(--weight-medium)'};
          width: 25%;
          height: 100%;
          transition: color var(--transition-fast);
        `
      });

      const iconWrapper = createElement('span', {
        style: 'display: flex;'
      });
      iconWrapper.innerHTML = icons[tab.icon];

      const labelEl = createElement('span', {}, tab.name);

      tabEl.appendChild(iconWrapper);
      tabEl.appendChild(labelEl);
      container.appendChild(tabEl);
    });

    // Update active tab styles on routing changes
    window.addEventListener('hashchange', () => {
      const currentHash = window.location.hash || '#/';
      const links = container.querySelectorAll('.mobile-nav-tab');
      links.forEach((link, idx) => {
        const tab = tabs[idx];
        const isCurrent = (tab.hash === '#/' && currentHash === '#/') || (tab.hash !== '#/' && currentHash.startsWith(tab.hash));
        if (isCurrent) {
          link.style.color = 'var(--color-primary)';
          link.style.fontWeight = 'var(--weight-semibold)';
        } else {
          link.style.color = 'var(--color-text-muted)';
          link.style.fontWeight = 'var(--weight-medium)';
        }
      });
    });

    document.body.classList.add('has-mobile-nav');
    return container;
  }
}
