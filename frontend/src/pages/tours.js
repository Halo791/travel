import { createElement } from '../utils/dom.js';
import { api } from '../api.js';
import { formatPrice } from '../utils/format.js';

export class ToursPage {
  constructor() {
    this.tours = [];
    this.loading = true;
    this.searchQuery = '';
    this.selectedCategory = '';
    this.priceMax = 50000000;
  }

  async render() {
    const el = createElement('div', { class: 'container section' });

    // Initial load
    await this.fetchTours();

    // Setup wrapper structure
    const layout = createElement('div', { 
      style: 'display: grid; grid-template-columns: 280px 1fr; gap: var(--space-8); margin-top: var(--space-8);'
    });

    // Sidebar Filter
    const sidebar = this.renderSidebar();
    
    // Main Content Area
    const contentArea = createElement('div', { id: 'tours-content' });
    this.renderToursList(contentArea);

    layout.appendChild(sidebar);
    layout.appendChild(contentArea);

    // Title Section
    const header = createElement('div', { class: 'text-center mb-8' });
    header.innerHTML = `
      <h2 style="font-size: var(--text-3xl); color: var(--color-primary-dark); font-weight: var(--weight-bold);">Paket Tour Wisata</h2>
      <p class="text-muted mt-2">Temukan petualangan terbaik Anda dengan layanan prima kami.</p>
    `;

    el.appendChild(header);
    el.appendChild(layout);

    return el;
  }

  async fetchTours() {
    this.loading = true;
    try {
      const params = new URLSearchParams();
      if (this.searchQuery) params.append('search', this.searchQuery);
      if (this.selectedCategory) params.append('category_id', this.selectedCategory);
      if (this.priceMax) params.append('price_max', this.priceMax);

      const res = await api.get(`/tours?${params.toString()}`);
      if (res && res.success) {
        this.tours = res.data.data || [];
      }
    } catch (e) {
      console.error('Failed to fetch tours', e);
      this.tours = [];
    } finally {
      this.loading = false;
    }
  }

  renderSidebar() {
    const sidebar = createElement('div', {
      class: 'card',
      style: 'padding: var(--space-6); height: fit-content; border: 1px solid var(--color-border);'
    });

    sidebar.innerHTML = `
      <h4 style="font-size: var(--text-base); font-weight: var(--weight-bold); margin-bottom: var(--space-4); color: var(--color-primary-dark); border-bottom: 2px solid var(--color-secondary); padding-bottom: var(--space-2);">Filter Pencarian</h4>
      
      <!-- Search Input -->
      <div style="margin-bottom: var(--space-5);">
        <label style="display: block; font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-2); color: var(--color-text-muted);">Cari Destinasi</label>
        <input type="text" id="filter-search" class="form-input" placeholder="Masukkan nama tempat..." value="${this.searchQuery}" style="width: 100%; padding: var(--space-2) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
      </div>

      <!-- Category Selector -->
      <div style="margin-bottom: var(--space-5);">
        <label style="display: block; font-size: var(--text-xs); font-weight: var(--weight-bold); margin-bottom: var(--space-2); color: var(--color-text-muted);">Kategori Wisata</label>
        <select id="filter-category" class="form-input" style="width: 100%; padding: var(--space-2) var(--space-3); border: 1px solid var(--color-border); border-radius: var(--radius-md); background: white;">
          <option value="">Semua Kategori</option>
          <option value="1" ${this.selectedCategory === '1' ? 'selected' : ''}>Open Trip</option>
          <option value="2" ${this.selectedCategory === '2' ? 'selected' : ''}>Signature Tour</option>
          <option value="3" ${this.selectedCategory === '3' ? 'selected' : ''}>Private Trip</option>
        </select>
      </div>

      <!-- Max Price Slider -->
      <div style="margin-bottom: var(--space-5);">
        <div class="flex-between mb-2">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); color: var(--color-text-muted);">Harga Maksimal</label>
          <span id="price-val" style="font-size: var(--text-xs); font-weight: var(--weight-semibold); color: var(--color-primary);">${formatPrice(this.priceMax)}</span>
        </div>
        <input type="range" id="filter-price" min="100000" max="30000000" step="100000" value="${this.priceMax}" style="width: 100%; cursor: pointer; accent-color: var(--color-primary);">
      </div>

      <button id="btn-apply-filter" class="btn btn-primary btn-sm" style="width: 100%; margin-top: var(--space-2);">Terapkan Filter</button>
    `;

    // Add listeners
    setTimeout(() => {
      const btnApply = document.getElementById('btn-apply-filter');
      const inputSearch = document.getElementById('filter-search');
      const selectCategory = document.getElementById('filter-category');
      const inputPrice = document.getElementById('filter-price');
      const priceVal = document.getElementById('price-val');

      if (inputPrice) {
        inputPrice.addEventListener('input', (e) => {
          if (priceVal) priceVal.textContent = formatPrice(e.target.value);
        });
      }

      if (btnApply) {
        btnApply.addEventListener('click', async () => {
          this.searchQuery = inputSearch ? inputSearch.value : '';
          this.selectedCategory = selectCategory ? selectCategory.value : '';
          this.priceMax = inputPrice ? parseInt(inputPrice.value) : 50000000;
          
          const contentArea = document.getElementById('tours-content');
          if (contentArea) {
            contentArea.innerHTML = '<div class="flex-center" style="min-height: 200px;"><div class="skeleton" style="width: 80px; height: 80px; border-radius: 50%;"></div></div>';
            await this.fetchTours();
            this.renderToursList(contentArea);
          }
        });
      }
    }, 100);

    return sidebar;
  }

  renderToursList(container) {
    container.innerHTML = '';

    if (this.loading) {
      container.innerHTML = `
        <div class="grid grid-3 gap-6">
          <div class="skeleton" style="height: 320px;"></div>
          <div class="skeleton" style="height: 320px;"></div>
          <div class="skeleton" style="height: 320px;"></div>
        </div>
      `;
      return;
    }

    if (this.tours.length === 0) {
      container.innerHTML = `
        <div class="card flex-center flex-col" style="padding: var(--space-12); text-align: center; border: 1px solid var(--color-border);">
          <span style="font-size: var(--text-3xl); margin-bottom: var(--space-4);">🔍</span>
          <h4 style="font-weight: var(--weight-bold); color: var(--color-primary-dark);">Paket Tour Tidak Ditemukan</h4>
          <p class="text-muted text-sm mt-2">Coba ubah kata kunci pencarian atau filter harga Anda.</p>
        </div>
      `;
      return;
    }

    const grid = createElement('div', { class: 'grid grid-3 gap-6' });

    this.tours.forEach(tour => {
      const card = createElement('div', { class: 'card overflow-hidden' });
      const badgeText = tour.is_featured ? 'Signature' : 'Populer';
      const badgeColor = tour.is_featured ? 'var(--color-secondary)' : 'var(--color-primary)';
      const badgeTextColor = tour.is_featured ? 'var(--color-primary-dark)' : 'var(--color-white)';

      card.innerHTML = `
        <div style="height: 180px; background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('${tour.image || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'}') center; background-size: cover; position: relative;">
          <span style="position: absolute; top: var(--space-3); right: var(--space-3); background: ${badgeColor}; color: ${badgeTextColor}; font-weight: var(--weight-bold); font-size: var(--text-xs); padding: 2px 8px; border-radius: var(--radius-full);">${badgeText}</span>
        </div>
        <div class="card-body">
          <span class="text-muted text-xs">🇮🇩 ${tour.departure_city || 'Malang'} • ${tour.duration_days} Hari ${tour.duration_nights || 0} Malam</span>
          <h3 style="font-size: var(--text-base); font-weight: var(--weight-bold); margin-top: var(--space-1); min-height: 48px; line-height: 1.3;">
            <a href="#/checkout?tour=${tour.slug}" style="color: var(--color-primary-dark);">${tour.title}</a>
          </h3>
          <div class="flex-between mt-4" style="border-top: 1px solid var(--color-border); padding-top: var(--space-3);">
            <div>
              ${tour.price_original ? `<span class="text-muted text-xs" style="text-decoration: line-through; display: block;">${formatPrice(tour.price_original)}</span>` : ''}
              <span style="font-weight: var(--weight-bold); color: var(--color-primary); font-size: var(--text-base);">${formatPrice(tour.price)}</span>
            </div>
            <a href="#/checkout?tour=${tour.slug}" class="btn btn-primary btn-sm">Pesan</a>
          </div>
        </div>
      `;
      grid.appendChild(card);
    });

    container.appendChild(grid);
  }
}
