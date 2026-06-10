/**
 * Simple SPA Hash Router
 */
export class Router {
  constructor() {
    this.routes = {};
    this.currentPage = null;
    this.renderToken = 0;
    
    window.addEventListener('hashchange', () => this.handleRoute());
  }

  register(path, pageComponent) {
    this.routes[path] = pageComponent;
  }

  getCurrentRoute() {
    const hash = window.location.hash || '#/';
    // Handle dynamic paths like #/tours/slug
    // Simple matching: replace exact matches first, then patterns
    return hash;
  }

  async handleRoute() {
    const renderToken = ++this.renderToken;
    let hash = window.location.hash || '#/';
    let pageComponent = this.routes[hash];
    let params = {};

    // Pattern matching for dynamic routes like #/tours/:slug or #/tours/area/:region
    if (!pageComponent) {
      for (const routePath of Object.keys(this.routes)) {
        if (routePath.includes('/:')) {
          const routeRegexPath = routePath.replace(/\/:[^\/]+/g, '/([^/]+)');
          const regex = new RegExp(`^${routeRegexPath}$`);
          const match = hash.match(regex);
          
          if (match) {
            pageComponent = this.routes[routePath];
            // Extract parameter names
            const paramNames = [...routePath.matchAll(/:([^\/]+)/g)].map(m => m[1]);
            paramNames.forEach((name, index) => {
              params[name] = match[index + 1];
            });
            break;
          }
        }
      }
    }

    // Default to home or 404
    if (!pageComponent) {
      if (this.routes['#/404']) {
        pageComponent = this.routes['#/404'];
      } else {
        console.error(`Route not found: ${hash}`);
        const contentDiv = document.getElementById('page-content');
        if (contentDiv) {
          contentDiv.innerHTML = '<div class="container section text-center"><h1>404</h1><p>Halaman tidak ditemukan.</p><a href="#/" class="btn btn-primary mt-4">Kembali ke Beranda</a></div>';
        }
        return;
      }
    }

    const contentDiv = document.getElementById('page-content');
    if (contentDiv) {
      // Scroll to top
      window.scrollTo(0, 0);
      
      // Close mobile menu if open
      document.body.classList.remove('mobile-menu-open');

      try {
        // Instantiate and render page
        const page = new pageComponent(params);
        this.currentPage = page;
        contentDiv.innerHTML = '';
        const renderedEl = await page.render();
        if (renderToken !== this.renderToken) return;

        contentDiv.innerHTML = '';
        if (typeof renderedEl === 'string') {
          contentDiv.innerHTML = renderedEl;
        } else if (renderedEl instanceof HTMLElement) {
          contentDiv.appendChild(renderedEl);
        }
        
        // Run post-render lifecycle hook if exists
        if (page.afterRender && typeof page.afterRender === 'function') {
          page.afterRender();
        }
      } catch (err) {
        console.error('Error rendering page:', err);
        contentDiv.innerHTML = `<div class="container section text-center"><p class="text-error">Terjadi kesalahan saat memuat halaman.</p></div>`;
      }
    }
  }

  navigate(hash) {
    window.location.hash = hash;
  }
}

export const router = new Router();
