import { createElement } from '../utils/dom.js';

export class Footer {
  render() {
    const container = createElement('footer', {
      class: 'footer section-dark',
      style: `
        padding: var(--space-16) 0 var(--space-8);
        border-top: 1px solid var(--color-dark-700);
        margin-top: auto;
      `
    });

    const innerContainer = createElement('div', { class: 'container' });

    // Grid row
    const grid = createElement('div', {
      class: 'grid',
      style: 'margin-bottom: var(--space-12);'
    });

    // Col 1: Brand Info
    const col1 = createElement('div', { class: 'flex flex-col gap-4' });
    col1.innerHTML = `
      <h3 style="color: var(--color-white); font-weight: var(--weight-extrabold); letter-spacing: 0.5px;">Bhakti Utama<span style="color: var(--color-secondary);">TRAVEL</span></h3>
      <p style="color: var(--color-text-light); font-size: var(--text-sm); line-height: var(--leading-relaxed); max-width: 280px;">
        Berpengalaman melayani perjalanan executive shuttle Malang - Surabaya dan paket wisata premium dengan pelayanan terbaik.
      </p>
      <div class="flex gap-3 mt-2">
        <!-- Social Media Icons (Simple SVGs) -->
        <a href="#" style="color: var(--color-text-light);" onmouseover="this.style.color='var(--color-secondary)'" onmouseout="this.style.color='var(--color-text-light)'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/></svg>
        </a>
        <a href="#" style="color: var(--color-text-light);" onmouseover="this.style.color='var(--color-secondary)'" onmouseout="this.style.color='var(--color-text-light)'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0H8zm-.085 4.485c2.25 0 4.074 1.824 4.074 4.075 0 2.25-1.824 4.075-4.074 4.075-2.25 0-4.075-1.824-4.075-4.075 0-2.25 1.824-4.075 4.075-4.075zm0 1.356a2.72 2.72 0 1 0 0 5.438 2.72 2.72 0 0 0 0-5.438zm5.621-1.29a.96.96 0 1 0 0-1.92.96.96 0 0 0 0 1.92z"/></svg>
        </a>
        <a href="#" style="color: var(--color-text-light);" onmouseover="this.style.color='var(--color-secondary)'" onmouseout="this.style.color='var(--color-text-light)'">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16"><path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/></svg>
        </a>
      </div>
    `;

    // Col 2: Products
    const col2 = createElement('div', { class: 'flex flex-col gap-3' });
    col2.innerHTML = `
      <h4 style="color: var(--color-white); font-size: var(--text-base); font-weight: var(--weight-semibold);">Produk Populer</h4>
      <ul style="display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--text-sm); color: var(--color-text-light);">
        <li><a href="#/tours">Paket Tour Wisata</a></li>
        <li><a href="#/flights">Tiket Pesawat Murah</a></li>
        <li><a href="#/hotels">Hotel & Penginapan</a></li>
        <li><a href="#/cruises">Kapal Pesiar (Cruise)</a></li>
        <li><a href="#/umroh">Paket Umroh Eksklusif</a></li>
        <li><a href="#/rail-pass">JR Pass & Rail Pass</a></li>
      </ul>
    `;

    // Col 3: Customer Support
    const col3 = createElement('div', { class: 'flex flex-col gap-3' });
    col3.innerHTML = `
      <h4 style="color: var(--color-white); font-size: var(--text-base); font-weight: var(--weight-semibold);">Layanan Pelanggan</h4>
      <ul style="display: flex; flex-direction: column; gap: var(--space-2); font-size: var(--text-sm); color: var(--color-text-light);">
        <li><a href="#/visa">Layanan Visa & Dokumen</a></li>
        <li><a href="#/insurance">Asuransi Perjalanan</a></li>
        <li><a href="#/check-booking">Cek Status Pemesanan</a></li>
        <li><a href="#/faq">Pertanyaan Umum (FAQ)</a></li>
        <li><a href="#/contact">Hubungi Kami</a></li>
        <li><a href="#/rewards">Reward & Poin Bhakti Utama</a></li>
      </ul>
    `;

    // Col 4: Contact & Verification
    const col4 = createElement('div', { class: 'flex flex-col gap-3' });
    col4.innerHTML = `
      <h4 style="color: var(--color-white); font-size: var(--text-base); font-weight: var(--weight-semibold);">Hubungi Kami</h4>
      <p style="color: var(--color-text-light); font-size: var(--text-sm); line-height: 1.6;">
        📞 Hotline: 082 1199 8809<br>
        📧 Email: info@bhaktiutamatravel.id<br>
        📍 Malang, Jawa Timur
      </p>
      <!-- Certifications -->
      <div style="display: flex; align-items: center; gap: var(--space-3); margin-top: var(--space-2);">
        <span style="font-size: var(--text-xs); color: var(--color-text-light); font-weight: var(--weight-bold); border: 1px solid var(--color-text-light); padding: 2px 6px; border-radius: var(--radius-sm);">IATA</span>
        <span style="font-size: var(--text-xs); color: var(--color-text-light); font-weight: var(--weight-bold); border: 1px solid var(--color-text-light); padding: 2px 6px; border-radius: var(--radius-sm);">ASITA</span>
      </div>
    `;

    grid.appendChild(col1);
    grid.appendChild(col2);
    grid.appendChild(col3);
    grid.appendChild(col4);

    innerContainer.appendChild(grid);

    // Divider
    innerContainer.appendChild(createElement('div', { 
      style: 'height: 1px; background: var(--color-dark-700); margin: var(--space-6) 0;' 
    }));

    // Bottom Footer (Payments + Legal)
    const bottomRow = createElement('div', {
      style: 'display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);'
    });

    const paymentLogos = createElement('div', {
      style: 'display: flex; align-items: center; gap: var(--space-3); opacity: 0.7;'
    });
    paymentLogos.innerHTML = `
      <!-- Payment gateway SVG logos (Visa, MC, JCB, Bank Transfer) -->
      <span style="font-size: 10px; color: var(--color-text-light); text-transform: uppercase;">Pembayaran Aman:</span>
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="20" rx="3" fill="#1A1F71"/><path d="M12.9231 13.9142L14.7384 5.37891H17.6369L15.8215 13.9142H12.9231Z" fill="#F7B600"/><path d="M23.9485 5.56846C23.3323 5.33411 22.4631 5.12781 21.4646 5.12781C19.0185 5.12781 17.2923 6.32626 17.2769 8.04368C17.2615 9.31792 18.5 10.0267 19.4354 10.4578C20.3954 10.9004 20.7185 11.176 20.7062 11.5645C20.6923 12.162 19.9277 12.4278 19.2231 12.4278C18.1754 12.4278 17.5846 12.1554 17.1108 11.9613L16.5185 14.5422C17.2708 14.8631 18.6185 15.1436 20.0031 15.1436C22.5846 15.1436 24.2692 13.9749 24.3 12.1648C24.3231 10.6558 23.3231 9.9482 21.8462 9.29419C20.9538 8.89886 20.5 8.62562 20.5 8.19917C20.5 7.80931 20.9846 7.39121 22.0462 7.39121C22.9538 7.39121 23.6308 7.57449 24.1169 7.76615L24.6923 5.30902C24.5077 5.23351 24.2262 5.16335 23.9485 5.56846Z" fill="white"/><path d="M11.6667 5.37891H8.89539C8.0441 5.37891 7.35334 5.84589 7.03282 6.55627L4.13539 13.9142H7.20359L7.81436 12.3312H11.5692L11.9672 13.9142H14.6738L12.3082 5.37891H11.6667ZM8.69436 10.0211L10.0231 6.5516L10.7856 10.0211H8.69436Z" fill="white"/><path d="M29.5 5.37891L26.6856 13.9142H29.5L32.3144 5.37891H29.5Z" fill="#F7B600"/></svg>
      <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg"><rect width="32" height="20" rx="3" fill="#222222"/><path d="M12 10C12 7.79 13.79 6 16 6C17.21 6 18.29 6.54 19.02 7.39C17.75 8.62 16.58 9.5 16 10C15.42 10.5 14.25 11.38 12.98 12.61C12.36 11.89 12 10.99 12 10Z" fill="#EB001B"/><path d="M20 10C20 12.21 18.21 14 16 14C14.79 14 13.71 13.46 12.98 12.61C14.25 11.38 15.42 10.5 16 10C16.58 9.5 17.75 8.62 19.02 7.39C19.64 8.11 20 9.01 20 10Z" fill="#F79E1B"/></svg>
    `;

    const copyright = createElement('span', {
      style: 'color: var(--color-text-light); font-size: var(--text-xs);'
    }, `© ${new Date().getFullYear()} PT. Bhakti Utama Travel. The Excellent Service.`);

    bottomRow.appendChild(paymentLogos);
    bottomRow.appendChild(copyright);
    innerContainer.appendChild(bottomRow);

    container.appendChild(innerContainer);
    return container;
  }
}
