/**
 * Alisa Tech Studio - Common Header & Navigation Component
 * Provides unified multi-page header, dynamic active link detection, and accessible mobile menu.
 */
(function () {
  'use strict';

  function getBasePrefix() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('/articles/')) {
      return '../';
    }
    return '';
  }

  function getHeaderHtml(activePage) {
    const prefix = getBasePrefix();
    return `
      <!-- Skip Link for Keyboard Accessibility -->
      <a href="#main-content" class="skip-link">Skip to main content</a>

      <div class="top-accent-bar" aria-hidden="true"></div>

      <!-- Main Site Header -->
      <header class="site-header" id="siteHeader">
        <div class="nav-container-wrapper">
          <a href="${prefix}index.html" class="site-logo" aria-label="Alisa Tech Studio Homepage">
            <img src="${prefix}assets/icons/site-icon.png" alt="Alisa Tech Studio Logo" width="38" height="38">
            <span>Alisa Tech Studio</span>
          </a>
          <button class="menu-toggle" id="menuToggle" aria-label="Toggle Navigation Menu" aria-expanded="false" aria-controls="mainNav">
            <span class="hamburger-icon" aria-hidden="true">
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
              <span class="hamburger-bar"></span>
            </span>
          </button>
          <nav class="main-nav" id="mainNav" aria-label="Primary Navigation">
            <ul class="nav-links" id="navLinks">
              <li><a href="${prefix}index.html" class="nav-item ${activePage === 'home' ? 'active' : ''}" data-nav="home">Home</a></li>
              <li><a href="${prefix}services.html" class="nav-item ${activePage === 'services' ? 'active' : ''}" data-nav="services">Services</a></li>
              <li><a href="${prefix}portfolio.html" class="nav-item ${activePage === 'portfolio' ? 'active' : ''}" data-nav="portfolio">Portfolio</a></li>
              <li><a href="${prefix}about.html" class="nav-item ${activePage === 'about' ? 'active' : ''}" data-nav="about">About</a></li>
              <li><a href="${prefix}articles.html" class="nav-item ${activePage === 'articles' ? 'active' : ''}" data-nav="articles">Articles</a></li>
              <li><a href="${prefix}faq.html" class="nav-item ${activePage === 'faq' ? 'active' : ''}" data-nav="faq">FAQ</a></li>
              <li><a href="${prefix}contact.html" class="nav-item nav-btn ${activePage === 'contact' ? 'active' : ''}" data-nav="contact">Contact Us</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }

  function detectActivePage() {
    const path = window.location.pathname.toLowerCase();
    if (path.endsWith('/services.html') || path.includes('/services')) return 'services';
    if (path.endsWith('/portfolio.html') || path.endsWith('/apps.html') || path.includes('/portfolio')) return 'portfolio';
    if (path.endsWith('/about.html') || path.includes('/about')) return 'about';
    if (path.endsWith('/articles.html') || path.includes('/articles')) return 'articles';
    if (path.endsWith('/faq.html') || path.includes('/faq')) return 'faq';
    if (path.endsWith('/contact.html') || path.includes('/contact')) return 'contact';
    if (path.endsWith('/privacy_policy.html') || path.endsWith('/terms.html')) return '';
    return 'home';
  }

  function initHeader() {
    const activePage = detectActivePage();

    // Check if there is an injection container
    const headerContainer = document.querySelector('site-header, #site-header, #site-header-container, [data-common-header]');
    if (headerContainer) {
      headerContainer.innerHTML = getHeaderHtml(activePage);
    } else {
      // If header is already static in HTML, update the active state
      const navLinks = document.querySelectorAll('.nav-links a');
      navLinks.forEach(link => {
        const href = (link.getAttribute('href') || '').toLowerCase();
        link.classList.remove('active');
        if (
          (activePage === 'home' && (href === 'index.html' || href === '/' || href.includes('#home'))) ||
          (activePage === 'services' && href.includes('services')) ||
          (activePage === 'portfolio' && (href.includes('portfolio') || href.includes('apps'))) ||
          (activePage === 'about' && href.includes('about')) ||
          (activePage === 'articles' && href.includes('articles')) ||
          (activePage === 'faq' && href.includes('faq')) ||
          (activePage === 'contact' && href.includes('contact'))
        ) {
          link.classList.add('active');
        }
      });
    }

    // Initialize Mobile Menu Interactions
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    if (menuToggle && mainNav) {
      function setNavOpen(isOpen) {
        menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        if (isOpen) {
          mainNav.classList.add('active');
        } else {
          mainNav.classList.remove('active');
        }
      }

      menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
        setNavOpen(!isOpen);
      });

      mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          setNavOpen(false);
        });
      });

      document.addEventListener('click', (e) => {
        const header = document.getElementById('siteHeader');
        if (header && !header.contains(e.target)) {
          setNavOpen(false);
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
          setNavOpen(false);
          menuToggle.focus();
        }
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHeader);
  } else {
    initHeader();
  }
})();
