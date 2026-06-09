import { createElement } from '../utils/dom.js';
import { SearchForm } from '../components/search-form.js';
import { api } from '../api.js';
import { formatPrice } from '../utils/format.js';

export class HomePage {
  async render() {
    const container = createElement('div', { class: 'home-page' });

    // Fetch dynamic home data from Laravel backend
    let apiData = null;
    try {
      const response = await api.get('/home');
      if (response && response.success) {
        apiData = response.data;
      }
    } catch (e) {
      console.warn('Backend API not responding, using fallback data.', e);
    }

    // 1. HERO SECTION (Landscape banner featuring executive van)
    const hero = createElement('section', {
      class: 'hero-section',
      style: `
        position: relative;
        height: 500px;
        background: linear-gradient(rgba(107, 11, 59, 0.65), rgba(74, 3, 41, 0.85)), url('/images/2.jpg');
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
        color: var(--color-white);
        padding: 0 var(--space-8);
      `
    });

    hero.innerHTML = `
      <div class="container" style="position: relative; z-index: 2;">
        <div style="max-width: 650px;">
          <span style="background: var(--color-secondary); color: var(--color-primary-dark); font-size: var(--text-xs); font-weight: var(--weight-bold); padding: var(--space-1) var(--space-3); border-radius: var(--radius-full); text-transform: uppercase; letter-spacing: 1px;">THE EXCELLENT SERVICE</span>
          <h1 style="font-size: var(--text-5xl); font-weight: var(--weight-extrabold); line-height: 1.1; margin-top: var(--space-3); font-family: var(--font-heading); text-shadow: 0 4px 10px rgba(0,0,0,0.3);">BHAKTI UTAMA TRAVEL</h1>
          <p style="font-size: var(--text-lg); margin-top: var(--space-4); opacity: 0.95; line-height: 1.6; text-shadow: 0 2px 4px rgba(0,0,0,0.3);">
            Layanan Executive Shuttle & Charter Malang - Surabaya (PP), Bandara Juanda, serta Paket Wisata Premium. Nikmati perjalanan dengan kenyamanan kelas satu.
          </p>
          <div class="flex gap-4 mt-6">
            <a href="#/checkout" class="btn btn-secondary" style="font-weight: var(--weight-bold); box-shadow: 0 4px 14px rgba(216, 168, 72, 0.4);">Pesan Tiket Sekarang</a>
            <a href="https://wa.me/628211998809?text=Halo%20Bhakti%20Utama%20Travel,%20saya%20tertarik%20dengan%20layanan%20shuttle" target="_blank" class="btn btn-outline" style="border-color: var(--color-white); color: var(--color-white);">Hubungi Admin (WA)</a>
          </div>
        </div>
      </div>
      <div style="position: absolute; bottom: 0; left: 0; width: 100%; height: 80px; background: linear-gradient(transparent, var(--color-light));"></div>
    `;

    // 2. SEARCH FORM CONTAINER
    const searchFormEl = new SearchForm().render();

    // 3. FACILITIES SECTION (Icon cards detailing amenities)
    const facilities = createElement('section', {
      class: 'section',
      style: 'background: var(--color-light); padding-top: var(--space-16);'
    });

    facilities.innerHTML = `
      <div class="container">
        <div class="text-center" style="max-width: 600px; margin: 0 auto var(--space-12);">
          <h2 style="font-size: var(--text-3xl); font-weight: var(--weight-bold); color: var(--color-primary-dark);">Fasilitas Kelas Executive</h2>
          <p class="text-muted mt-2">Setiap armada kami dilengkapi dengan fasilitas premium demi menjamin kenyamanan Anda sepanjang perjalanan.</p>
        </div>
        <div class="grid grid-4 gap-6">
          <div class="card card-body text-center flex flex-col items-center gap-2" style="background: var(--color-white); transition: transform var(--transition-base);">
            <div style="background: var(--color-primary-50); color: var(--color-primary); width: 60px; height: 60px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: var(--text-2xl);">🍿</div>
            <h3 style="font-size: var(--text-base); font-weight: var(--weight-bold); margin-top: var(--space-2);">Welcome Snack</h3>
            <p style="font-size: var(--text-xs); color: var(--color-text-secondary);">Snack & air mineral gratis disediakan untuk menemani perjalanan Anda.</p>
          </div>
          <div class="card card-body text-center flex flex-col items-center gap-2" style="background: var(--color-white); transition: transform var(--transition-base);">
            <div style="background: var(--color-primary-50); color: var(--color-primary); width: 60px; height: 60px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: var(--text-2xl);">📺</div>
            <h3 style="font-size: var(--text-base); font-weight: var(--weight-bold); margin-top: var(--space-2);">TV & Audio</h3>
            <p style="font-size: var(--text-xs); color: var(--color-text-secondary);">Hiburan multimedia lengkap agar perjalanan tidak terasa membosankan.</p>
          </div>
          <div class="card card-body text-center flex flex-col items-center gap-2" style="background: var(--color-white); transition: transform var(--transition-base);">
            <div style="background: var(--color-primary-50); color: var(--color-primary); width: 60px; height: 60px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: var(--text-2xl);">⚡</div>
            <h3 style="font-size: var(--text-base); font-weight: var(--weight-bold); margin-top: var(--space-2);">Charger Port</h3>
            <p style="font-size: var(--text-xs); color: var(--color-text-secondary);">Tersedia port charger USB di setiap kursi untuk mengisi baterai gadget Anda.</p>
          </div>
          <div class="card card-body text-center flex flex-col items-center gap-2" style="background: var(--color-white); transition: transform var(--transition-base);">
            <div style="background: var(--color-primary-50); color: var(--color-primary); width: 60px; height: 60px; border-radius: var(--radius-full); display: flex; align-items: center; justify-content: center; font-size: var(--text-2xl);">💺</div>
            <h3 style="font-size: var(--text-base); font-weight: var(--weight-bold); margin-top: var(--space-2);">Reclining Seat</h3>
            <p style="font-size: var(--text-xs); color: var(--color-text-secondary);">Kursi ergonomis yang dapat direbahkan agar Anda dapat beristirahat dengan nyaman.</p>
          </div>
        </div>
      </div>
    `;

    // 4. PRICELIST & FLEET SECTION
    const fleet = createElement('section', { class: 'section container' });
    fleet.innerHTML = `
      <div class="text-center" style="max-width: 600px; margin: 0 auto var(--space-12);">
        <span style="color: var(--color-primary); font-weight: var(--weight-bold); font-size: var(--text-sm); text-transform: uppercase;">Tarif Bersahabat & Layanan Bintang 5</span>
        <h2 style="font-size: var(--text-3xl); font-weight: var(--weight-bold); color: var(--color-primary-dark); margin-top: var(--space-1);">Armada & Rute Pilihan</h2>
      </div>
      <div class="grid grid-2 gap-8">
        <!-- Card 1: Malang Kota -->
        <div class="card overflow-hidden" style="display: flex; flex-direction: column; height: 100%;">
          <div class="card-img-wrapper" style="position: relative; height: 220px; overflow: hidden;">
            <img src="/images/15.jpg" alt="Armada Malang Kota" class="card-img" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
            <span style="position: absolute; top: var(--space-4); left: var(--space-4); background: var(--color-primary); color: var(--color-white); font-weight: var(--weight-bold); font-size: var(--text-xs); padding: 4px 12px; border-radius: var(--radius-full);">EXECUTIVE FLEET</span>
          </div>
          <div class="card-body flex-1 flex flex-col justify-between">
            <div>
              <h3 style="font-size: var(--text-xl); font-weight: var(--weight-bold); color: var(--color-primary-dark);">Armada Malang Kota</h3>
              <p class="text-muted text-sm mt-2">Executive Toyota HiAce Commuter & Premio untuk perjalanan dalam wilayah Malang Raya, Batu, maupun penjemputan door-to-door kota.</p>
              
              <div style="margin: var(--space-4) 0; border-top: 1px solid var(--color-border); padding-top: var(--space-4);">
                <div class="flex-between" style="font-size: var(--text-sm); margin-bottom: var(--space-2);">
                  <span style="font-weight: var(--weight-medium); color: var(--color-text-secondary);">👑 Business Class</span>
                  <span style="font-weight: var(--weight-bold); color: var(--color-primary);">Rp 175.000 / Kursi</span>
                </div>
                <div class="flex-between" style="font-size: var(--text-sm);">
                  <span style="font-weight: var(--weight-medium); color: var(--color-text-secondary);">🛫 Economy Class</span>
                  <span style="font-weight: var(--weight-bold); color: var(--color-text-secondary);">Rp 130.000 / Kursi</span>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <a href="#/checkout" class="btn btn-primary btn-sm flex-1 text-center">Pesan Sekarang</a>
              <a href="https://wa.me/628211998809?text=Halo,%20saya%20ingin%20pesan%20shuttle%20Malang%20Kota" target="_blank" class="btn btn-outline btn-sm">Detail</a>
            </div>
          </div>
        </div>

        <!-- Card 2: Luar Kota -->
        <div class="card overflow-hidden" style="display: flex; flex-direction: column; height: 100%;">
          <div class="card-img-wrapper" style="position: relative; height: 220px; overflow: hidden;">
            <img src="/images/2.jpg" alt="Armada Luar Kota" class="card-img" style="width: 100%; height: 100%; object-fit: cover;" loading="lazy" />
            <span style="position: absolute; top: var(--space-4); left: var(--space-4); background: var(--color-primary); color: var(--color-white); font-weight: var(--weight-bold); font-size: var(--text-xs); padding: 4px 12px; border-radius: var(--radius-full);">LUAR KOTA / CHARTER</span>
          </div>
          <div class="card-body flex-1 flex flex-col justify-between">
            <div>
              <h3 style="font-size: var(--text-xl); font-weight: var(--weight-bold); color: var(--color-primary-dark);">Armada Luar Kota</h3>
              <p class="text-muted text-sm mt-2">Layanan car-charter & drop-off ke luar kota (Surabaya, Sidoarjo, Juanda Airport, Gresik) dengan fleksibilitas jadwal sesuai keinginan Anda.</p>
              
              <div style="margin: var(--space-4) 0; border-top: 1px solid var(--color-border); padding-top: var(--space-4);">
                <div class="flex-between" style="font-size: var(--text-sm); margin-bottom: var(--space-2);">
                  <span style="font-weight: var(--weight-medium); color: var(--color-text-secondary);">👑 Business Class</span>
                  <span style="font-weight: var(--weight-bold); color: var(--color-primary);">Rp 220.000 / Kursi</span>
                </div>
                <div class="flex-between" style="font-size: var(--text-sm);">
                  <span style="font-weight: var(--weight-medium); color: var(--color-text-secondary);">🛫 Economy Class</span>
                  <span style="font-weight: var(--weight-bold); color: var(--color-text-secondary);">Rp 150.000 / Kursi</span>
                </div>
              </div>
            </div>
            <div class="flex gap-2">
              <a href="#/checkout" class="btn btn-primary btn-sm flex-1 text-center">Pesan Sekarang</a>
              <a href="https://wa.me/628211998809?text=Halo,%20saya%20ingin%20charter%20mobil%20luar%20kota" target="_blank" class="btn btn-outline btn-sm">Detail</a>
            </div>
          </div>
        </div>
      </div>
    `;

    // 5. SPLIT SHOWCASE (Flyer 3.jpg & Booking Inquiry Form)
    const flyerSplit = createElement('section', {
      class: 'section',
      style: 'background: var(--color-light-200);'
    });

    // We'll create the split layout
    const splitContainer = createElement('div', { class: 'container grid grid-2 gap-12 items-center' });

    // Left Side: Flyer Image
    const leftCol = createElement('div', { class: 'text-center' });
    leftCol.innerHTML = `
      <div style="position: relative; display: inline-block; box-shadow: var(--shadow-2xl); border-radius: var(--radius-lg); overflow: hidden; max-width: 400px; margin: 0 auto; transition: transform var(--transition-slow);" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
        <img src="/images/3.jpg" alt="Bhakti Utama Travel Flyer" style="width: 100%; height: auto; display: block;" />
        <div style="position: absolute; bottom: 0; left: 0; width: 100%; padding: var(--space-4); background: linear-gradient(transparent, rgba(0,0,0,0.8)); text-align: center;">
          <a href="/images/3.jpg" target="_blank" class="btn btn-secondary btn-sm" style="font-weight: var(--weight-bold);">🔎 Perbesar Brosur</a>
        </div>
      </div>
    `;

    // Right Side: Booking Inquiry Form
    const rightCol = createElement('div', { class: 'card card-body' });
    rightCol.innerHTML = `
      <h3 style="font-size: var(--text-2xl); font-weight: var(--weight-bold); color: var(--color-primary-dark); margin-bottom: var(--space-2);">Form Konsultasi / Pemesanan</h3>
      <p class="text-muted text-sm" style="margin-bottom: var(--space-6);">Kirim formulir ini, admin kami akan langsung menghubungi Anda untuk detail penjemputan dan armada via WhatsApp.</p>
      
      <form id="inquiry-form" class="flex flex-col gap-4">
        <div class="form-group">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); color: var(--color-text-secondary); margin-bottom: 4px; display: block;">NAMA LENGKAP</label>
          <input type="text" class="form-control" id="inquiry-name" required placeholder="Contoh: Budi Santoso" />
        </div>
        
        <div class="form-group">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); color: var(--color-text-secondary); margin-bottom: 4px; display: block;">NO. WHATSAPP (AKTIF)</label>
          <input type="tel" class="form-control" id="inquiry-phone" required placeholder="Contoh: 08123456789" />
        </div>

        <div class="grid grid-2 gap-4">
          <div class="form-group">
            <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); color: var(--color-text-secondary); margin-bottom: 4px; display: block;">PILIH LAYANAN</label>
            <select class="form-select" id="inquiry-service">
              <option value="Malang Kota (Business Class)">Malang Kota - Business Class</option>
              <option value="Malang Kota (Economy Class)">Malang Kota - Economy Class</option>
              <option value="Luar Kota (Business Class)">Luar Kota - Business Class</option>
              <option value="Luar Kota (Economy Class)">Luar Kota - Economy Class</option>
            </select>
          </div>
          <div class="form-group">
            <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); color: var(--color-text-secondary); margin-bottom: 4px; display: block;">JUMLAH KURSI / SEAT</label>
            <input type="number" class="form-control" id="inquiry-seats" min="1" max="15" value="1" />
          </div>
        </div>

        <div class="form-group">
          <label style="font-size: var(--text-xs); font-weight: var(--weight-bold); color: var(--color-text-secondary); margin-bottom: 4px; display: block;">CATATAN PENJEMPUTAN (OPSIONAL)</label>
          <textarea class="form-control" id="inquiry-notes" rows="3" placeholder="Tulis alamat jemput / tujuan detail atau jam keberangkatan..."></textarea>
        </div>

        <button type="submit" class="btn btn-primary w-full mt-2" style="font-weight: var(--weight-bold); height: 44px;">KIRIM PEMESANAN VIA WHATSAPP</button>
      </form>
    `;

    splitContainer.appendChild(leftCol);
    splitContainer.appendChild(rightCol);
    flyerSplit.appendChild(splitContainer);

    // 6. POPULAR INTERNATIONAL TOURS (Travel Collabs Section)
    const toursSection = createElement('section', { class: 'section container' });
    
    let toursListHtml = '';
    if (apiData && apiData.tours && apiData.tours.length > 0) {
      apiData.tours.forEach(tour => {
        const badgeText = tour.is_featured ? 'Signature Tour' : 'Rekomendasi';
        const badgeColor = tour.is_featured ? 'var(--color-secondary)' : 'var(--color-primary)';
        const badgeTextColor = tour.is_featured ? 'var(--color-primary-dark)' : 'var(--color-white)';
        
        toursListHtml += `
          <div class="card overflow-hidden">
            <div style="height: 200px; background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('${tour.image || 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800'}') center; background-size: cover; position: relative;">
              <span style="position: absolute; top: var(--space-4); right: var(--space-4); background: ${badgeColor}; color: ${badgeTextColor}; font-weight: var(--weight-bold); font-size: var(--text-xs); padding: 4px 10px; border-radius: var(--radius-full);">${badgeText}</span>
            </div>
            <div class="card-body">
              <span class="text-muted text-xs">🇮🇩 ${tour.departure_city || 'Malang'} • ${tour.duration_days} Hari ${tour.duration_nights || 0} Malam</span>
              <h3 style="font-size: var(--text-lg); font-weight: var(--weight-bold); margin-top: var(--space-1);"><a href="#/tours" style="color: var(--color-primary-dark);">${tour.title}</a></h3>
              <div class="flex-between mt-4" style="border-top: 1px solid var(--color-border); padding-top: var(--space-3);">
                <div>
                  ${tour.price_original ? `<span class="text-muted text-xs" style="text-decoration: line-through; display: block;">${formatPrice(tour.price_original)}</span>` : ''}
                  <span style="font-weight: var(--weight-bold); color: var(--color-primary);">${formatPrice(tour.price)}</span>
                </div>
                <a href="#/tours" class="btn btn-outline btn-sm">Pesan</a>
              </div>
            </div>
          </div>
        `;
      });
    } else {
      // Fallback Static Tours
      toursListHtml = `
        <!-- Tour 1 -->
        <div class="card overflow-hidden">
          <div style="height: 200px; background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1534447677768-be436bb09401?w=600'); background-size: cover; background-position: center; position: relative;">
            <span style="position: absolute; top: var(--space-4); right: var(--space-4); background: var(--color-secondary); color: var(--color-primary-dark); font-weight: var(--weight-bold); font-size: var(--text-xs); padding: 4px 10px; border-radius: var(--radius-full);">Signature Tour</span>
          </div>
          <div class="card-body">
            <span class="text-muted text-xs">🇯🇵 Jepang • 7 Hari 6 Malam</span>
            <h3 style="font-size: var(--text-lg); font-weight: var(--weight-bold); margin-top: var(--space-1);"><a href="#/tours" style="color: var(--color-primary-dark);">Explore Tokyo, Mt. Fuji & Kyoto</a></h3>
            <div class="flex-between mt-4" style="border-top: 1px solid var(--color-border); padding-top: var(--space-3);">
              <div>
                <span class="text-muted text-xs" style="text-decoration: line-through; display: block;">Rp 24.500.000</span>
                <span style="font-weight: var(--weight-bold); color: var(--color-primary);">Rp 21.900.000</span>
              </div>
              <a href="#/tours" class="btn btn-outline btn-sm">Pesan</a>
            </div>
          </div>
        </div>

        <!-- Tour 2 -->
        <div class="card overflow-hidden">
          <div style="height: 200px; background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=600'); background-size: cover; background-position: center; position: relative;">
            <span style="position: absolute; top: var(--space-4); right: var(--space-4); background: var(--color-primary); color: var(--color-white); font-weight: var(--weight-bold); font-size: var(--text-xs); padding: 4px 10px; border-radius: var(--radius-full);">Super Sale</span>
          </div>
          <div class="card-body">
            <span class="text-muted text-xs">🇸🇬 Singapura • 3 Hari 2 Malam</span>
            <h3 style="font-size: var(--text-lg); font-weight: var(--weight-bold); margin-top: var(--space-1);"><a href="#/tours" style="color: var(--color-primary-dark);">Singapura Fun & USS Tour</a></h3>
            <div class="flex-between mt-4" style="border-top: 1px solid var(--color-border); padding-top: var(--space-3);">
              <div>
                <span class="text-muted text-xs" style="text-decoration: line-through; display: block;">Rp 5.200.000</span>
                <span style="font-weight: var(--weight-bold); color: var(--color-primary);">Rp 3.800.000</span>
              </div>
              <a href="#/tours" class="btn btn-outline btn-sm">Pesan</a>
            </div>
          </div>
        </div>

        <!-- Tour 3 -->
        <div class="card overflow-hidden">
          <div style="height: 200px; background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0.4)), url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600'); background-size: cover; background-position: center; position: relative;">
            <span style="position: absolute; top: var(--space-4); right: var(--space-4); background: var(--color-secondary); color: var(--color-primary-dark); font-weight: var(--weight-bold); font-size: var(--text-xs); padding: 4px 10px; border-radius: var(--radius-full);">Favorite</span>
          </div>
          <div class="card-body">
            <span class="text-muted text-xs">🇮🇩 Bali • 4 Hari 3 Malam</span>
            <h3 style="font-size: var(--text-lg); font-weight: var(--weight-bold); margin-top: var(--space-1);"><a href="#/tours" style="color: var(--color-primary-dark);">Bali Honeymoon & Nusa Penida</a></h3>
            <div class="flex-between mt-4" style="border-top: 1px solid var(--color-border); padding-top: var(--space-3);">
              <div>
                <span class="text-muted text-xs" style="text-decoration: line-through; display: block;">Rp 4.500.000</span>
                <span style="font-weight: var(--weight-bold); color: var(--color-primary);">Rp 3.200.000</span>
              </div>
              <a href="#/tours" class="btn btn-outline btn-sm">Pesan</a>
            </div>
          </div>
        </div>
      `;
    }

    toursSection.innerHTML = `
      <div class="text-center" style="max-width: 600px; margin: 0 auto var(--space-12);">
        <span style="color: var(--color-primary); font-weight: var(--weight-bold); font-size: var(--text-sm); text-transform: uppercase;">Paket Liburan Rekomendasi</span>
        <h2 style="font-size: var(--text-3xl); font-weight: var(--weight-bold); color: var(--color-primary-dark); margin-top: var(--space-1);">Tour Wisata Populer</h2>
      </div>
      <div class="grid grid-3 gap-8">
        ${toursListHtml}
      </div>
    `;

    // Append all sections in correct structural order
    container.appendChild(hero);
    container.appendChild(searchFormEl);
    container.appendChild(facilities);
    container.appendChild(fleet);
    container.appendChild(flyerSplit);
    container.appendChild(toursSection);

    // Setup Inquiry Form Submit handler in afterRender or timeout hook
    setTimeout(() => {
      const form = document.getElementById('inquiry-form');
      if (form) {
        form.addEventListener('submit', (e) => {
          e.preventDefault();
          const name = document.getElementById('inquiry-name').value;
          const phone = document.getElementById('inquiry-phone').value;
          const service = document.getElementById('inquiry-service').value;
          const seats = document.getElementById('inquiry-seats').value;
          const notes = document.getElementById('inquiry-notes').value || 'Tidak ada catatan.';
          
          const waMsg = `Halo Bhakti Utama Travel,\n\nSaya ingin memesan layanan travel:\nNama: ${name}\nNo. WhatsApp: ${phone}\nLayanan: ${service}\nJumlah Seats: ${seats} kursi\nCatatan: ${notes}\n\nMohon konfirmasi ketersediaan armada. Terima kasih!`;
          const waLink = `https://wa.me/628211998809?text=${encodeURIComponent(waMsg)}`;
          window.open(waLink, '_blank');
        });
      }
    }, 200);

    return container;
  }
}
