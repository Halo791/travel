import { createElement, $, $$ } from '../utils/dom.js';
import { getPreferredCurrency, setPreferredCurrency, getPreferredLanguage, setPreferredLanguage, getUser, setToken, setUser } from '../utils/storage.js';

export class Header {
  constructor() {
    this.user = getUser();
    this.currencies = ['IDR', 'USD', 'EUR', 'SGD', 'MYR', 'AUD', 'JPY', 'GBP', 'HKD', 'CAD'];
    this.languages = [
      { code: 'id', name: 'Bahasa ID' },
      { code: 'en', name: 'English EN' }
    ];
    
    // Listen to changes
    window.addEventListener('auth-change', () => {
      this.user = getUser();
      this.updateUserNav();
    });
  }

  render() {
    const activeCurrency = getPreferredCurrency();
    const activeLang = getPreferredLanguage();

    const header = createElement('header', {
      class: 'header',
      style: `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: var(--header-height);
        background: var(--color-white);
        border-bottom: 1px solid var(--color-border);
        z-index: var(--z-sticky);
        display: flex;
        align-items: center;
        transition: top var(--transition-base), background var(--transition-base);
      `
    });

    // Handle sticky top adjustments when promo bar is visible
    window.addEventListener('scroll', () => {
      const hasPromo = document.body.classList.contains('has-promo') && !sessionStorage.getItem('promo_bar_closed');
      const promoBarHeight = 40;
      if (window.scrollY > 10) {
        header.style.boxShadow = 'var(--shadow-sm)';
        if (hasPromo) {
          header.style.top = '0';
        }
      } else {
        header.style.boxShadow = 'none';
        if (hasPromo) {
          header.style.top = `${promoBarHeight}px`;
        }
      }
    });

    // Make initial placement adjustments if promo is active
    setTimeout(() => {
      const hasPromo = document.body.classList.contains('has-promo') && !sessionStorage.getItem('promo_bar_closed');
      if (hasPromo) {
        header.style.top = '40px';
      } else {
        header.style.top = '0';
      }
    }, 100);

    const inner = createElement('div', {
      class: 'container-wide flex-between',
      style: 'width: 100%; height: 100%;'
    });

    // Brand Logo
    const logo = createElement('a', {
      href: '#/',
      style: 'display: flex; align-items: center; justify-content: center; height: 100%;'
    });
    logo.innerHTML = `<img src="/images/11.jpg" alt="Bhakti Utama Travel Logo" style="height: 52px; width: auto; object-fit: contain;" />`;

    // Main Navigation (Desktop)
    const nav = createElement('nav', {
      class: 'hide-mobile',
      style: 'display: flex; gap: var(--space-5); height: 100%; align-items: center;'
    });

    const menuItems = [
      { name: 'Tour Wisata', hash: '#/tours' },
      { name: 'Tiket Pesawat', hash: '#/flights' },
      { name: 'Hotel', hash: '#/hotels' },
      { name: 'Paket Liburan', hash: '#/packages' },
      { name: 'Kapal Pesiar', hash: '#/cruises' },
      { name: 'Umroh', hash: '#/umroh' },
      { name: 'JR Pass', hash: '#/rail-pass' },
      { name: 'Promo', hash: '#/promo' },
    ];

    menuItems.forEach(item => {
      const isCurrent = window.location.hash.startsWith(item.hash.substring(1)) && item.hash !== '#/';
      const link = createElement('a', {
        href: item.hash,
        style: `
          font-family: var(--font-heading);
          font-size: var(--text-sm);
          font-weight: ${isCurrent ? 'var(--weight-bold)' : 'var(--weight-medium)'};
          color: ${isCurrent ? 'var(--color-primary)' : 'var(--color-text-secondary)'};
          position: relative;
          padding: var(--space-2) 0;
          transition: color var(--transition-fast);
        `,
        onMouseOver: (e) => { e.target.style.color = 'var(--color-primary)'; },
        onMouseOut: (e) => { if (!isCurrent) e.target.style.color = 'var(--color-text-secondary)'; }
      }, item.name);

      if (isCurrent) {
        const line = createElement('span', {
          style: `
            position: absolute;
            bottom: -4px;
            left: 0;
            width: 100%;
            height: 2px;
            background: var(--color-primary);
            border-radius: var(--radius-full);
          `
        });
        link.appendChild(line);
      }

      nav.appendChild(link);
    });

    // Right Actions Menu (Desktop)
    const rightActions = createElement('div', {
      style: 'display: flex; align-items: center; gap: var(--space-4);'
    });

    // Currency Selector
    const currencySelect = createElement('select', {
      class: 'form-select',
      style: 'padding: var(--space-1) var(--space-6) var(--space-1) var(--space-2); font-size: var(--text-xs); width: auto; height: 32px; background-position: right 6px center;',
      onChange: (e) => setPreferredCurrency(e.target.value)
    });
    this.currencies.forEach(cur => {
      const opt = createElement('option', { value: cur }, cur);
      if (cur === activeCurrency) opt.setAttribute('selected', 'selected');
      currencySelect.appendChild(opt);
    });

    // Language Selector
    const langSelect = createElement('select', {
      class: 'form-select',
      style: 'padding: var(--space-1) var(--space-6) var(--space-1) var(--space-2); font-size: var(--text-xs); width: auto; height: 32px; background-position: right 6px center;',
      onChange: (e) => setPreferredLanguage(e.target.value)
    });
    this.languages.forEach(lang => {
      const opt = createElement('option', { value: lang.code }, lang.name.split(' ')[1]);
      if (lang.code === activeLang) opt.setAttribute('selected', 'selected');
      langSelect.appendChild(opt);
    });

    // User Profile / Login trigger
    this.userNavContainer = createElement('div', { id: 'user-nav-container', class: 'flex-center gap-2' });
    this.updateUserNav();

    // Hamburger Mobile Menu Button
    const menuBtn = createElement('button', {
      class: 'hide-desktop btn-icon',
      style: 'color: var(--color-dark);',
      onClick: () => {
        document.body.classList.toggle('mobile-menu-open');
        this.toggleMobileMenu();
      }
    });
    menuBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>`;

    rightActions.appendChild(currencySelect);
    rightActions.appendChild(langSelect);
    rightActions.appendChild(this.userNavContainer);
    rightActions.appendChild(menuBtn);

    inner.appendChild(logo);
    inner.appendChild(nav);
    inner.appendChild(rightActions);
    header.appendChild(inner);

    return header;
  }

  updateUserNav() {
    if (!this.userNavContainer) return;
    this.userNavContainer.innerHTML = '';

    if (this.user) {
      // Rewards Points Badge
      const rewardsEl = createElement('a', {
        href: '#/rewards',
        class: 'hide-mobile badge badge-info',
        style: 'cursor: pointer; height: 32px; font-weight: var(--weight-semibold); gap: var(--space-1); border: 1px solid var(--color-primary-100);'
      });
      rewardsEl.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
        <span>${this.user.points || 0} Pts</span>
      `;

      // Profile avatar dropdown
      const profileBtn = createElement('a', {
        href: '#/account',
        class: 'btn-icon flex-center',
        style: 'background: var(--color-primary-50); border: 1px solid var(--color-primary-100); overflow: hidden; width: 36px; height: 36px;'
      });
      profileBtn.innerHTML = `
        <span style="font-family: var(--font-heading); font-size: var(--text-sm); font-weight: var(--weight-bold); color: var(--color-primary);">
          ${this.user.name.charAt(0).toUpperCase()}
        </span>
      `;

      this.userNavContainer.appendChild(rewardsEl);
      this.userNavContainer.appendChild(profileBtn);
    } else {
      const loginBtn = createElement('a', {
        href: '#/login',
        class: 'btn btn-primary btn-sm hide-mobile',
        style: 'height: 32px;'
      }, 'Masuk');

      const registerBtn = createElement('a', {
        href: '#/register',
        class: 'btn btn-outline btn-sm hide-mobile',
        style: 'height: 32px; border-width: 1px;'
      }, 'Daftar');

      const loginIconMobile = createElement('a', {
        href: '#/login',
        class: 'hide-desktop btn-icon',
        style: 'color: var(--color-text-secondary); width: 36px; height: 36px;'
      });
      loginIconMobile.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>`;

      this.userNavContainer.appendChild(loginBtn);
      this.userNavContainer.appendChild(registerBtn);
      this.userNavContainer.appendChild(loginIconMobile);
    }
  }

  toggleMobileMenu() {
    let mobileOverlay = $('.mobile-menu-overlay');
    if (!mobileOverlay) {
      mobileOverlay = createElement('div', {
        class: 'mobile-menu-overlay',
        style: `
          position: fixed;
          top: var(--header-height);
          left: 0;
          width: 100%;
          height: calc(100vh - var(--header-height));
          background: var(--color-white);
          z-index: var(--z-modal);
          display: flex;
          flex-direction: column;
          padding: var(--space-6);
          gap: var(--space-4);
          transform: translateX(100%);
          transition: transform var(--transition-base);
        `,
        onClick: (e) => {
          if (e.target.tagName === 'A') {
            document.body.classList.remove('mobile-menu-open');
            mobileOverlay.style.transform = 'translateX(100%)';
          }
        }
      });

      const items = [
        { name: 'Paket Tour Wisata', hash: '#/tours' },
        { name: 'Tiket Pesawat', hash: '#/flights' },
        { name: 'Hotel', hash: '#/hotels' },
        { name: 'Paket Liburan', hash: '#/packages' },
        { name: 'Kapal Pesiar (Cruises)', hash: '#/cruises' },
        { name: 'Paket Umroh', hash: '#/umroh' },
        { name: 'JR Pass / Rail Pass', hash: '#/rail-pass' },
        { name: 'Promo & Diskon', hash: '#/promo' },
        { name: 'Hubungi Kami', hash: '#/contact' },
      ];

      items.forEach(item => {
        const link = createElement('a', {
          href: item.hash,
          style: 'font-family: var(--font-heading); font-size: var(--text-lg); font-weight: var(--weight-semibold); color: var(--color-dark); padding: var(--space-2) 0; border-bottom: 1px solid var(--color-border-light);'
        }, item.name);
        mobileOverlay.appendChild(link);
      });

      document.body.appendChild(mobileOverlay);
    }

    if (document.body.classList.contains('mobile-menu-open')) {
      mobileOverlay.style.transform = 'translateX(0)';
    } else {
      mobileOverlay.style.transform = 'translateX(100%)';
    }
  }
}
