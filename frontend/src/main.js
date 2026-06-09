import './styles/main.css';
import { router } from './router.js';
import { createElement, $ } from './utils/dom.js';

// Layout Components
import { Header } from './components/header.js';
import { Footer } from './components/footer.js';
import { MobileNav } from './components/mobile-nav.js';
import { PromoBar } from './components/promo-bar.js';
import { WhatsappFloat } from './components/whatsapp-float.js';

// Page Components
import { HomePage } from './pages/home.js';
import { ToursPage } from './pages/tours.js';
import { FlightsPage } from './pages/flights.js';
import { HotelsPage } from './pages/hotels.js';
import { PackagesPage } from './pages/packages.js';
import { CruisesPage } from './pages/cruises.js';
import { UmrohPage } from './pages/umroh.js';
import { RailPassPage } from './pages/rail-pass.js';
import { PromoPage } from './pages/promo.js';
import { RewardsPage } from './pages/rewards.js';
import { CheckBookingPage } from './pages/check-booking.js';
import { AccountPage } from './pages/account.js';
import { LoginPage } from './pages/login.js';
import { RegisterPage } from './pages/register.js';
import { CheckoutPage } from './pages/checkout.js';

// Setup Application Shell
function setupAppShell() {
  const appEl = $('#app');
  if (!appEl) return;

  appEl.innerHTML = '';

  // Render Promo Bar
  const promoEl = new PromoBar().render();
  if (promoEl) appEl.appendChild(promoEl);

  // Render Header
  const headerEl = new Header().render();
  appEl.appendChild(headerEl);

  // Render Page Content container
  const pageContentEl = createElement('main', { id: 'page-content' });
  appEl.appendChild(pageContentEl);

  // Render Footer
  const footerEl = new Footer().render();
  appEl.appendChild(footerEl);

  // Render Mobile Navigation
  const mobileNavEl = new MobileNav().render();
  appEl.appendChild(mobileNavEl);

  // Render WhatsApp Button
  const waEl = new WhatsappFloat().render();
  appEl.appendChild(waEl);
}

// Register Router Routes
function registerRoutes() {
  router.register('#/', HomePage);
  router.register('#/tours', ToursPage);
  router.register('#/flights', FlightsPage);
  router.register('#/hotels', HotelsPage);
  router.register('#/packages', PackagesPage);
  router.register('#/cruises', CruisesPage);
  router.register('#/umroh', UmrohPage);
  router.register('#/rail-pass', RailPassPage);
  router.register('#/promo', PromoPage);
  router.register('#/rewards', RewardsPage);
  router.register('#/check-booking', CheckBookingPage);
  router.register('#/account', AccountPage);
  router.register('#/login', LoginPage);
  router.register('#/register', RegisterPage);
  router.register('#/checkout', CheckoutPage);
}

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
  setupAppShell();
  registerRoutes();
  router.handleRoute();
});
