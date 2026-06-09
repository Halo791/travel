import { createElement } from '../utils/dom.js';

export class SearchForm {
  render() {
    const container = createElement('div', {
      class: 'search-form-container card',
      style: `
        max-width: 1000px;
        margin: -60px auto 0;
        position: relative;
        z-index: 10;
        background: var(--color-white);
        border-radius: var(--radius-xl);
        box-shadow: var(--shadow-xl);
        overflow: hidden;
      `
    });

    // Navigation Tabs
    const tabsContainer = createElement('div', {
      class: 'flex border-b',
      style: 'background: var(--color-light-200);'
    });

    const tabs = [
      { id: 'shuttle', label: '🚐 Travel Shuttle', active: true },
      { id: 'tours', label: '✈️ Tour Wisata', active: false },
      { id: 'flights', label: '🛫 Tiket Pesawat', active: false },
      { id: 'hotels', label: '🏨 Hotel', active: false }
    ];

    const tabContents = {};

    tabs.forEach(tab => {
      const tabEl = createElement('button', {
        class: `search-tab ${tab.active ? 'active' : ''}`,
        style: `
          flex: 1;
          padding: var(--space-4) var(--space-6);
          font-family: var(--font-heading);
          font-size: var(--text-sm);
          font-weight: var(--weight-semibold);
          color: ${tab.active ? 'var(--color-primary-dark)' : 'var(--color-text-secondary)'};
          background: ${tab.active ? 'var(--color-white)' : 'transparent'};
          border: none;
          border-bottom: ${tab.active ? '3px solid var(--color-secondary)' : 'none'};
          cursor: pointer;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--space-2);
        `,
        onClick: (e) => {
          // Deactivate all
          document.querySelectorAll('.search-tab').forEach(el => {
            el.style.background = 'transparent';
            el.style.color = 'var(--color-text-secondary)';
            el.style.borderBottom = 'none';
          });
          document.querySelectorAll('.search-content-panel').forEach(el => {
            el.style.display = 'none';
          });

          // Activate this
          e.currentTarget.style.background = 'var(--color-white)';
          e.currentTarget.style.color = 'var(--color-primary-dark)';
          e.currentTarget.style.borderBottom = '3px solid var(--color-secondary)';
          
          const targetPanel = document.getElementById(`panel-${tab.id}`);
          if (targetPanel) targetPanel.style.display = 'block';
        }
      });
      tabEl.innerText = tab.label;
      tabEl.classList.add('search-tab');
      tabsContainer.appendChild(tabEl);
    });

    // Content Panels Container
    const panelsContainer = createElement('div', {
      style: 'padding: var(--space-6) var(--space-8);'
    });

    // Panel 1: Shuttle (Malang - Surabaya)
    const shuttlePanel = createElement('div', {
      id: 'panel-shuttle',
      class: 'search-content-panel',
      style: 'display: block;'
    });
    shuttlePanel.innerHTML = `
      <form class="grid grid-4 gap-4" onsubmit="event.preventDefault(); window.location.hash='#/checkout';">
        <div class="form-group">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-1); display: block; color: var(--color-text-secondary);">ASAL</label>
          <select class="form-select">
            <option value="malang">Malang Kota</option>
            <option value="surabaya">Surabaya / Juanda</option>
          </select>
        </div>
        <div class="form-group">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-1); display: block; color: var(--color-text-secondary);">TUJUAN</label>
          <select class="form-select">
            <option value="surabaya">Surabaya / Juanda</option>
            <option value="malang">Malang Kota</option>
          </select>
        </div>
        <div class="form-group">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-1); display: block; color: var(--color-text-secondary);">TANGGAL PERJALANAN</label>
          <input type="date" class="form-control" value="${new Date().toISOString().split('T')[0]}" />
        </div>
        <div class="form-group flex items-end">
          <button type="submit" class="btn btn-primary w-full" style="height: 42px;">CARI SHUTTLE</button>
        </div>
      </form>
    `;

    // Panel 2: Tours
    const toursPanel = createElement('div', {
      id: 'panel-tours',
      class: 'search-content-panel',
      style: 'display: none;'
    });
    toursPanel.innerHTML = `
      <form class="grid grid-4 gap-4" onsubmit="event.preventDefault(); window.location.hash='#/tours';">
        <div class="form-group col-span-2">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-1); display: block; color: var(--color-text-secondary);">CARI DESTINASI ATAU TEMA TOUR</label>
          <input type="text" class="form-control" placeholder="Contoh: Bali, Labuan Bajo, Jepang..." />
        </div>
        <div class="form-group">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-1); display: block; color: var(--color-text-secondary);">BULAN KEBERANGKATAN</label>
          <select class="form-select">
            <option value="">Semua Bulan</option>
            <option value="06">Juni 2026</option>
            <option value="07">Juli 2026</option>
            <option value="08">Agustus 2026</option>
          </select>
        </div>
        <div class="form-group flex items-end">
          <button type="submit" class="btn btn-primary w-full" style="height: 42px;">CARI TOUR</button>
        </div>
      </form>
    `;

    // Panel 3: Flights
    const flightsPanel = createElement('div', {
      id: 'panel-flights',
      class: 'search-content-panel',
      style: 'display: none;'
    });
    flightsPanel.innerHTML = `
      <form class="grid grid-4 gap-4" onsubmit="event.preventDefault(); window.location.hash='#/flights';">
        <div class="form-group">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-1); display: block; color: var(--color-text-secondary);">DARI</label>
          <input type="text" class="form-control" value="Jakarta (JKTA)" />
        </div>
        <div class="form-group">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-1); display: block; color: var(--color-text-secondary);">KE</label>
          <input type="text" class="form-control" placeholder="Kota Tujuan" />
        </div>
        <div class="form-group">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-1); display: block; color: var(--color-text-secondary);">PERGI</label>
          <input type="date" class="form-control" value="${new Date().toISOString().split('T')[0]}" />
        </div>
        <div class="form-group flex items-end">
          <button type="submit" class="btn btn-primary w-full" style="height: 42px;">CARI PENERBANGAN</button>
        </div>
      </form>
    `;

    // Panel 4: Hotels
    const hotelsPanel = createElement('div', {
      id: 'panel-hotels',
      class: 'search-content-panel',
      style: 'display: none;'
    });
    hotelsPanel.innerHTML = `
      <form class="grid grid-4 gap-4" onsubmit="event.preventDefault(); window.location.hash='#/hotels';">
        <div class="form-group col-span-2">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-1); display: block; color: var(--color-text-secondary);">CARI HOTEL ATAU TUJUAN staycation</label>
          <input type="text" class="form-control" placeholder="Tujuan, nama hotel, atau landmark..." />
        </div>
        <div class="form-group">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-1); display: block; color: var(--color-text-secondary);">DURASI MALAM</label>
          <select class="form-select">
            <option value="1">1 Malam</option>
            <option value="2">2 Malam</option>
            <option value="3">3 Malam</option>
            <option value="4">4 Malam</option>
          </select>
        </div>
        <div class="form-group flex items-end">
          <button type="submit" class="btn btn-primary w-full" style="height: 42px;">CARI HOTEL</button>
        </div>
      </form>
    `;

    panelsContainer.appendChild(shuttlePanel);
    panelsContainer.appendChild(toursPanel);
    panelsContainer.appendChild(flightsPanel);
    panelsContainer.appendChild(hotelsPanel);

    container.appendChild(tabsContainer);
    container.appendChild(panelsContainer);

    return container;
  }
}
