import { createElement, $, $$ } from '../utils/dom.js';

export class CheckoutPage {
  constructor() {
    this.selectedSeats = [];
    this.seatPrice = 175000; // Business class default
    this.selectedClass = 'business';
    this.origin = 'Malang';
    this.destination = 'Surabaya';
    this.travelDate = new Date().toISOString().split('T')[0];
  }

  render() {
    const container = createElement('div', { class: 'container section' });

    // Page Header
    const header = createElement('div', {
      style: 'margin-bottom: var(--space-8);'
    });
    header.innerHTML = `
      <div style="border-bottom: 1px solid var(--color-border); padding-bottom: var(--space-4); margin-bottom: var(--space-6);">
        <h1 style="font-size: var(--text-3xl); font-weight: var(--weight-bold); color: var(--color-primary-dark); font-family: var(--font-heading);">Pemesanan Tiket Shuttle</h1>
        <p class="text-muted text-sm">Silakan pilih kursi, lengkapi detail penumpang, dan selesaikan pembayaran.</p>
      </div>

      <!-- Progress Bar -->
      <div class="flex-between" style="max-width: 600px; margin: 0 auto var(--space-8); position: relative;">
        <div style="position: absolute; top: 15px; left: 10%; right: 10%; height: 2px; background: var(--color-border); z-index: 1;"></div>
        <div id="prog-line" style="position: absolute; top: 15px; left: 10%; width: 0%; height: 2px; background: var(--color-primary); z-index: 2; transition: width 0.3s ease;"></div>
        
        <!-- Step 1 -->
        <div class="flex flex-col items-center" style="z-index: 3; position: relative; width: 25%;">
          <div id="step-1-circle" class="flex-center" style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-primary); color: white; font-weight: bold; font-size: var(--text-sm);">1</div>
          <span style="font-size: 11px; font-weight: var(--weight-semibold); margin-top: 6px; color: var(--color-primary-dark);">Pilih Kursi</span>
        </div>
        
        <!-- Step 2 -->
        <div class="flex flex-col items-center" style="z-index: 3; position: relative; width: 25%;">
          <div id="step-2-circle" class="flex-center" style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-white); border: 2px solid var(--color-border); color: var(--color-text-muted); font-weight: bold; font-size: var(--text-sm); transition: all 0.3s;">2</div>
          <span id="step-2-label" style="font-size: 11px; font-weight: var(--weight-medium); margin-top: 6px; color: var(--color-text-muted); transition: all 0.3s;">Data Diri</span>
        </div>

        <!-- Step 3 -->
        <div class="flex flex-col items-center" style="z-index: 3; position: relative; width: 25%;">
          <div id="step-3-circle" class="flex-center" style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-white); border: 2px solid var(--color-border); color: var(--color-text-muted); font-weight: bold; font-size: var(--text-sm); transition: all 0.3s;">3</div>
          <span id="step-3-label" style="font-size: 11px; font-weight: var(--weight-medium); margin-top: 6px; color: var(--color-text-muted); transition: all 0.3s;">Pembayaran</span>
        </div>

        <!-- Step 4 -->
        <div class="flex flex-col items-center" style="z-index: 3; position: relative; width: 25%;">
          <div id="step-4-circle" class="flex-center" style="width: 32px; height: 32px; border-radius: 50%; background: var(--color-white); border: 2px solid var(--color-border); color: var(--color-text-muted); font-weight: bold; font-size: var(--text-sm);">4</div>
          <span style="font-size: 11px; font-weight: var(--weight-medium); margin-top: 6px; color: var(--color-text-muted);">Selesai</span>
        </div>
      </div>
    `;

    // Content Grid
    const grid = createElement('div', { class: 'grid grid-3 gap-8' });

    // Left 2 Columns: Seat Selection & Passenger Info
    const mainCol = createElement('div', { class: 'col-span-2 flex flex-col gap-6' });

    // 1. Rute & Jadwal Card
    const routeCard = createElement('div', { class: 'card card-body flex flex-col gap-4' });
    routeCard.innerHTML = `
      <h3 style="font-size: var(--text-lg); font-weight: var(--weight-bold); color: var(--color-primary-dark);">1. Detail Perjalanan</h3>
      <div class="grid grid-3 gap-4">
        <div class="form-group">
          <label class="text-xs font-bold text-muted">ASAL / PENJEMPUTAN</label>
          <select id="co-origin" class="form-select">
            <option value="Malang">Malang Kota</option>
            <option value="Surabaya">Surabaya / Juanda</option>
          </select>
        </div>
        <div class="form-group">
          <label class="text-xs font-bold text-muted">TUJUAN / DROP-OFF</label>
          <select id="co-destination" class="form-select">
            <option value="Surabaya" selected>Surabaya / Juanda</option>
            <option value="Malang">Malang Kota</option>
          </select>
        </div>
        <div class="form-group">
          <label class="text-xs font-bold text-muted">TANGGAL PERJALANAN</label>
          <input type="date" id="co-date" class="form-control" value="${this.travelDate}" />
        </div>
      </div>
      <div class="grid grid-2 gap-4 mt-2">
        <div class="form-group">
          <label class="text-xs font-bold text-muted">KELAS ARMADA</label>
          <select id="co-class" class="form-select">
            <option value="business">Business Class (Rp 175.000 / kursi)</option>
            <option value="economy">Economy Class (Rp 130.000 / kursi)</option>
          </select>
        </div>
        <div class="form-group">
          <label class="text-xs font-bold text-muted">JADWAL KEBERANGKATAN</label>
          <select id="co-time" class="form-select">
            <option value="05:00">Pagi - 05:00 WIB</option>
            <option value="09:00">Pagi - 09:00 WIB</option>
            <option value="13:00">Siang - 13:00 WIB</option>
            <option value="17:00">Sore - 17:00 WIB</option>
            <option value="21:00">Malam - 21:00 WIB</option>
          </select>
        </div>
      </div>
    `;

    // 2. Seat Map Card (Toyota HiAce style grid)
    const seatCard = createElement('div', { class: 'card card-body' });
    seatCard.innerHTML = `
      <h3 style="font-size: var(--text-lg); font-weight: var(--weight-bold); color: var(--color-primary-dark); margin-bottom: var(--space-4);">2. Pilih Kursi</h3>
      <p class="text-muted text-xs mb-4">Klik pada nomor kursi kosong untuk memilih. Kursi berwarna merah sudah dipesan.</p>
      
      <div style="display: flex; gap: var(--space-8); justify-content: center; align-items: flex-start; max-width: 400px; margin: 0 auto; padding: var(--space-4); border: 2px solid var(--color-border); border-radius: var(--radius-lg); background: var(--color-light);">
        <!-- Driver Column -->
        <div class="flex flex-col gap-3" style="width: 80px;">
          <div class="flex-center" style="height: 40px; font-weight: bold; background: #CBD5E1; border-radius: var(--radius-sm); font-size: var(--text-xs); color: #475569;">🚐 Kemudi</div>
          <div id="seat-driver" class="flex-center" style="height: 40px; font-weight: bold; background: #E2E8F0; border-radius: var(--radius-sm); font-size: var(--text-xs); opacity: 0.5; cursor: not-allowed;">Supir</div>
        </div>

        <!-- Passenger Grid (HiAce Layout) -->
        <div class="flex-1 flex flex-col gap-3">
          <!-- Row 1 -->
          <div class="flex gap-3">
            <div class="seat flex-center" data-seat="1A" style="flex: 1; height: 40px; font-weight: bold; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast);">1A</div>
            <div class="seat flex-center" data-seat="1B" style="flex: 1; height: 40px; font-weight: bold; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast);">1B</div>
          </div>
          <!-- Row 2 -->
          <div class="flex gap-3">
            <div class="seat flex-center" data-seat="2A" style="flex: 1; height: 40px; font-weight: bold; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast);">2A</div>
            <div class="seat flex-center" data-seat="2B" style="flex: 1; height: 40px; font-weight: bold; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast);">2B</div>
            <div class="seat flex-center" data-seat="2C" style="flex: 1; height: 40px; font-weight: bold; background: #EF4444; color: white; border-radius: var(--radius-sm); cursor: not-allowed; opacity: 0.8;">2C</div>
          </div>
          <!-- Row 3 -->
          <div class="flex gap-3">
            <div class="seat flex-center" data-seat="3A" style="flex: 1; height: 40px; font-weight: bold; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast);">3A</div>
            <div class="seat flex-center" data-seat="3B" style="flex: 1; height: 40px; font-weight: bold; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast);">3B</div>
            <div class="seat flex-center" data-seat="3C" style="flex: 1; height: 40px; font-weight: bold; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast);">3C</div>
          </div>
          <!-- Row 4 -->
          <div class="flex gap-3">
            <div class="seat flex-center" data-seat="4A" style="flex: 1; height: 40px; font-weight: bold; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast);">4A</div>
            <div class="seat flex-center" data-seat="4B" style="flex: 1; height: 40px; font-weight: bold; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast);">4B</div>
            <div class="seat flex-center" data-seat="4C" style="flex: 1; height: 40px; font-weight: bold; background: var(--color-white); border: 1px solid var(--color-border); border-radius: var(--radius-sm); cursor: pointer; transition: all var(--transition-fast);">4C</div>
          </div>
        </div>
      </div>
      
      <div class="flex gap-4 justify-center mt-4" style="font-size: var(--text-xs);">
        <div class="flex items-center gap-1"><span style="width: 12px; height: 12px; display: inline-block; background: var(--color-white); border: 1px solid var(--color-border); border-radius: 2px;"></span> Tersedia</div>
        <div class="flex items-center gap-1"><span style="width: 12px; height: 12px; display: inline-block; background: var(--color-primary); border-radius: 2px;"></span> Dipilih</div>
        <div class="flex items-center gap-1"><span style="width: 12px; height: 12px; display: inline-block; background: #EF4444; border-radius: 2px;"></span> Terisi</div>
      </div>
    `;

    // 3. Passenger Info Card
    const passengerCard = createElement('div', { class: 'card card-body' });
    passengerCard.innerHTML = `
      <h3 style="font-size: var(--text-lg); font-weight: var(--weight-bold); color: var(--color-primary-dark); margin-bottom: var(--space-4);">3. Informasi Kontak & Penumpang</h3>
      
      <!-- Buyer Contact Details -->
      <div style="margin-bottom: var(--space-6); border-bottom: 1px solid var(--color-border); padding-bottom: var(--space-5);">
        <h4 style="font-size: var(--text-sm); font-weight: var(--weight-bold); color: var(--color-text); margin-bottom: var(--space-3);">Kontak Pemesan (Untuk Pengiriman E-Tiket)</h4>
        <div class="grid grid-2 gap-4">
          <div class="form-group">
            <label class="text-xs font-bold text-muted" style="display:block; margin-bottom:4px;">EMAIL PEMESAN</label>
            <input type="email" id="buyer-email" class="form-control" required placeholder="budi@example.com" style="height:38px; font-size:var(--text-xs);" />
          </div>
          <div class="form-group">
            <label class="text-xs font-bold text-muted" style="display:block; margin-bottom:4px;">NO. WHATSAPP</label>
            <input type="tel" id="buyer-phone" class="form-control" required placeholder="081234567890" inputmode="tel" style="height:38px; font-size:var(--text-xs);" />
          </div>
        </div>
      </div>

      <h4 style="font-size: var(--text-sm); font-weight: var(--weight-bold); color: var(--color-text); margin-bottom: var(--space-3);">Detail Identitas Penumpang</h4>
      <div id="passenger-fields" class="flex flex-col gap-4">
        <p class="text-muted text-xs">Silakan pilih kursi terlebih dahulu.</p>
      </div>
    `;

    mainCol.appendChild(routeCard);
    mainCol.appendChild(seatCard);
    mainCol.appendChild(passengerCard);

    // Right Column: Summary & Payment
    const sidebarCol = createElement('div', { class: 'flex flex-col gap-6' });
    const summaryCard = createElement('div', { class: 'card card-body', style: 'position: sticky; top: calc(var(--header-height) + 20px);' });
    summaryCard.innerHTML = `
      <h3 style="font-size: var(--text-lg); font-weight: var(--weight-bold); color: var(--color-primary-dark); border-bottom: 1px solid var(--color-border); padding-bottom: var(--space-3); margin-bottom: var(--space-4);">Ringkasan Pemesanan</h3>
      
      <div class="flex flex-col gap-3" style="font-size: var(--text-sm);">
        <div class="flex-between">
          <span class="text-muted">Rute</span>
          <span id="sum-route" style="font-weight: var(--weight-bold);">Malang ➔ Surabaya</span>
        </div>
        <div class="flex-between">
          <span class="text-muted">Jadwal</span>
          <span id="sum-date" style="font-weight: var(--weight-semibold);">${this.travelDate} (05:00 WIB)</span>
        </div>
        <div class="flex-between">
          <span class="text-muted">Kelas</span>
          <span id="sum-class" style="font-weight: var(--weight-semibold); text-transform: uppercase;">Business</span>
        </div>
        <div class="flex-between">
          <span class="text-muted">Kursi Dipilih</span>
          <span id="sum-seats" style="font-weight: var(--weight-bold); color: var(--color-primary);">-</span>
        </div>
        
        <div style="border-top: 1px solid var(--color-border); margin: var(--space-2) 0; padding-top: var(--space-3);">
          <div class="flex-between" style="margin-bottom: var(--space-2);">
            <span class="text-muted">Harga Tiket</span>
            <span id="sum-base-price">Rp 0</span>
          </div>
          <div class="flex-between" style="margin-bottom: var(--space-2); color: var(--color-success);">
            <span class="text-muted">Promo Diskon</span>
            <span>- Rp 0</span>
          </div>
          <div class="flex-between" style="font-size: var(--text-base); font-weight: var(--weight-extrabold); color: var(--color-primary-dark); border-top: 1px dashed var(--color-border); padding-top: var(--space-3);">
            <span>Total Bayar</span>
            <span id="sum-total-price">Rp 0</span>
          </div>
        </div>
      </div>

      <div style="margin-top: var(--space-6);">
        <button id="btn-pay" class="btn btn-primary w-full" style="height: 46px; font-weight: var(--weight-bold);" disabled>PROSES PEMBAYARAN</button>
        <p class="text-center text-muted text-xs mt-2">Dengan mengklik tombol, Anda menyetujui syarat & ketentuan Bhakti Utama Travel.</p>
      </div>
    `;

    sidebarCol.appendChild(summaryCard);

    container.appendChild(header);
    grid.appendChild(mainCol);
    grid.appendChild(sidebarCol);
    container.appendChild(grid);

    // Dynamic state management helpers
    setTimeout(() => {
      this.initInteractiveHandlers();
    }, 200);

    return container;
  }

  initInteractiveHandlers() {
    const updateSummary = () => {
      // Route labels
      const origin = document.getElementById('co-origin').value;
      const dest = document.getElementById('co-destination').value;
      const date = document.getElementById('co-date').value;
      const time = document.getElementById('co-time').value;
      const cls = document.getElementById('co-class').value;

      document.getElementById('sum-route').innerText = `${origin} ➔ ${dest}`;
      document.getElementById('sum-date').innerText = `${date} (${time} WIB)`;
      document.getElementById('sum-class').innerText = cls;

      // Price calculation
      this.seatPrice = cls === 'business' ? 175000 : 130000;
      const count = this.selectedSeats.length;
      const basePrice = count * this.seatPrice;
      const discount = 0; // future discount rules
      const total = basePrice - discount;

      document.getElementById('sum-seats').innerText = count > 0 ? this.selectedSeats.join(', ') : '-';
      document.getElementById('sum-base-price').innerText = `Rp ${basePrice.toLocaleString('id-ID')}`;
      document.getElementById('sum-total-price').innerText = `Rp ${total.toLocaleString('id-ID')}`;

      // Progress Bar updates
      const progLine = document.getElementById('prog-line');
      const step2Circle = document.getElementById('step-2-circle');
      const step2Label = document.getElementById('step-2-label');
      
      if (count > 0) {
        if (progLine) progLine.style.width = '33%';
        if (step2Circle) {
          step2Circle.style.background = 'var(--color-primary)';
          step2Circle.style.borderColor = 'var(--color-primary)';
          step2Circle.style.color = 'var(--color-white)';
        }
        if (step2Label) {
          step2Label.style.color = 'var(--color-primary-dark)';
          step2Label.style.fontWeight = 'var(--weight-semibold)';
        }
      } else {
        if (progLine) progLine.style.width = '0%';
        if (step2Circle) {
          step2Circle.style.background = 'var(--color-white)';
          step2Circle.style.borderColor = 'var(--color-border)';
          step2Circle.style.color = 'var(--color-text-muted)';
        }
        if (step2Label) {
          step2Label.style.color = 'var(--color-text-muted)';
          step2Label.style.fontWeight = 'var(--weight-medium)';
        }
      }

      // Enable/Disable pay button
      const payBtn = document.getElementById('btn-pay');
      if (payBtn) {
        payBtn.disabled = count === 0;
      }

      // Update Passenger input fields
      const fieldsContainer = document.getElementById('passenger-fields');
      if (fieldsContainer) {
        if (count === 0) {
          fieldsContainer.innerHTML = '<p class="text-muted text-xs">Silakan pilih kursi terlebih dahulu.</p>';
        } else {
          fieldsContainer.innerHTML = '';
          this.selectedSeats.forEach((seat, idx) => {
            const row = createElement('div', {
              style: 'border: 1px solid var(--color-border); padding: var(--space-3); border-radius: var(--radius-md); background: var(--color-white); margin-bottom: var(--space-2);'
            });
            row.innerHTML = `
              <div class="flex-between mb-2">
                <span style="font-weight: var(--weight-bold); font-size: var(--text-sm); color: var(--color-primary);">Penumpang untuk Kursi ${seat}</span>
                <span class="badge badge-info" style="font-size: 10px;">Seat ${seat}</span>
              </div>
              <div class="grid grid-2 gap-3">
                <div class="form-group">
                  <input type="text" class="form-control passenger-name" placeholder="Nama Penumpang ${idx + 1}" required style="height: 36px; font-size: var(--text-xs);" />
                </div>
                <div class="form-group">
                  <input type="text" class="form-control passenger-ktp" placeholder="No. KTP / ID Card (16 Digit)" required inputmode="numeric" pattern="[0-9]{16}" title="KTP harus 16 digit angka" style="height: 36px; font-size: var(--text-xs);" />
                </div>
              </div>
            `;
            fieldsContainer.appendChild(row);
          });
        }
      }
    };

    // Class selection changes
    document.getElementById('co-class').addEventListener('change', (e) => {
      this.selectedClass = e.target.value;
      updateSummary();
    });

    // Date/Route selection changes
    document.getElementById('co-origin').addEventListener('change', updateSummary);
    document.getElementById('co-destination').addEventListener('change', updateSummary);
    document.getElementById('co-date').addEventListener('change', updateSummary);
    document.getElementById('co-time').addEventListener('change', updateSummary);

    // Seat Click Selection
    document.querySelectorAll('.seat').forEach(seatEl => {
      seatEl.addEventListener('click', (e) => {
        const seatNum = e.currentTarget.getAttribute('data-seat');
        if (e.currentTarget.style.background === 'rgb(239, 68, 68)') {
          // Already taken
          return;
        }

        if (this.selectedSeats.includes(seatNum)) {
          // Deselect
          this.selectedSeats = this.selectedSeats.filter(s => s !== seatNum);
          e.currentTarget.style.background = 'var(--color-white)';
          e.currentTarget.style.color = 'var(--color-text)';
        } else {
          // Select
          this.selectedSeats.push(seatNum);
          e.currentTarget.style.background = 'var(--color-primary)';
          e.currentTarget.style.color = 'var(--color-white)';
        }

        updateSummary();
      });
    });

    const checkFormValidity = () => {
      const emailInput = document.getElementById('buyer-email');
      const phoneInput = document.getElementById('buyer-phone');
      const names = document.querySelectorAll('.passenger-name');
      const ktps = document.querySelectorAll('.passenger-ktp');
      
      let allValid = true;
      if (emailInput && !emailInput.checkValidity()) allValid = false;
      if (phoneInput && !phoneInput.checkValidity()) allValid = false;
      
      names.forEach(input => {
        if (!input.value.trim()) allValid = false;
      });
      ktps.forEach(input => {
        if (!input.checkValidity()) allValid = false;
      });
      
      const progLine = document.getElementById('prog-line');
      const step3Circle = document.getElementById('step-3-circle');
      const step3Label = document.getElementById('step-3-label');
      
      if (this.selectedSeats.length > 0 && allValid) {
        if (progLine) progLine.style.width = '66%';
        if (step3Circle) {
          step3Circle.style.background = 'var(--color-primary)';
          step3Circle.style.borderColor = 'var(--color-primary)';
          step3Circle.style.color = 'var(--color-white)';
        }
        if (step3Label) {
          step3Label.style.color = 'var(--color-primary-dark)';
          step3Label.style.fontWeight = 'var(--weight-semibold)';
        }
      } else if (this.selectedSeats.length > 0) {
        if (progLine) progLine.style.width = '33%';
        if (step3Circle) {
          step3Circle.style.background = 'var(--color-white)';
          step3Circle.style.borderColor = 'var(--color-border)';
          step3Circle.style.color = 'var(--color-text-muted)';
        }
        if (step3Label) {
          step3Label.style.color = 'var(--color-text-muted)';
          step3Label.style.fontWeight = 'var(--weight-medium)';
        }
      }
    };

    // Attach validation listeners
    setTimeout(() => {
      const emailInput = document.getElementById('buyer-email');
      const phoneInput = document.getElementById('buyer-phone');
      const fieldsContainer = document.getElementById('passenger-fields');
      
      if (emailInput) emailInput.addEventListener('input', checkFormValidity);
      if (phoneInput) phoneInput.addEventListener('input', checkFormValidity);
      if (fieldsContainer) fieldsContainer.addEventListener('input', checkFormValidity);
    }, 100);

    // Process payment click
    document.getElementById('btn-pay').addEventListener('click', () => {
      // Validate buyer details
      const emailInput = document.getElementById('buyer-email');
      const phoneInput = document.getElementById('buyer-phone');
      
      if (emailInput && !emailInput.checkValidity()) {
        alert('Format Email Pemesan tidak valid.');
        emailInput.focus();
        return;
      }
      if (phoneInput && !phoneInput.checkValidity()) {
        alert('Nomor WhatsApp Pemesan tidak valid.');
        phoneInput.focus();
        return;
      }

      // Validate passengers
      let valid = true;
      const names = document.querySelectorAll('.passenger-name');
      const ktps = document.querySelectorAll('.passenger-ktp');
      
      for (let i = 0; i < names.length; i++) {
        if (!names[i].value.trim()) {
          alert(`Nama Penumpang ${i + 1} tidak boleh kosong.`);
          names[i].focus();
          valid = false;
          break;
        }
      }
      
      if (!valid) return;
      
      for (let i = 0; i < ktps.length; i++) {
        if (!ktps[i].checkValidity()) {
          alert(`No. KTP Penumpang ${i + 1} harus berupa 16 digit angka.`);
          ktps[i].focus();
          valid = false;
          break;
        }
      }
      
      if (!valid) return;

      alert('Pemesanan Anda berhasil diproses! Silakan melakukan pembayaran ke No. Rekening PT. Bhakti Utama Travel.');
      window.location.hash = '#/';
    });
  }
}
