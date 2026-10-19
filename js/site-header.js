/**
 * Alisa Tech Studio - Common Header & Navigation Component
 * Provides unified multi-page header with dropdown menus for all 13 pages,
 * dynamic active link detection, and accessible mobile navigation.
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

  function detectActivePage() {
    const path = window.location.pathname.toLowerCase();
    if (path.includes('flutter-mobile-app-performance')) return 'flutter-guide';
    if (path.includes('sudoku-mastery-guide')) return 'sudoku-guide';
    if (path.includes('effective-language-learning')) return 'language-guide';
    if (path.includes('mobile-app-security-privacy')) return 'security-guide';
    if (path.endsWith('/articles.html') || path.endsWith('/articles/') || path.includes('/articles.html')) return 'articles';
    if (path.includes('/services')) return 'services';
    if (path.includes('/portfolio') || path.includes('/apps')) return 'portfolio';
    if (path.includes('/about')) return 'about';
    if (path.includes('/faq')) return 'faq';
    if (path.includes('privacy_policy')) return 'privacy';
    if (path.includes('terms')) return 'terms';
    if (path.includes('/contact')) return 'contact';
    if (path.endsWith('/') || path.endsWith('/index.html') || path === '') return 'home';
    return 'home';
  }

  function getHeaderHtml(activePage) {
    const prefix = getBasePrefix();
    const articleLinkPrefix = prefix ? '' : 'articles/';
    const isArticlesActive = ['articles', 'flutter-guide', 'sudoku-guide', 'language-guide', 'security-guide'].includes(activePage);
    const isLegalActive = ['privacy', 'terms'].includes(activePage);

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

              <!-- Articles & Guides Dropdown (5 pages) -->
              <li class="nav-dropdown" data-dropdown="articles">
                <button type="button" class="nav-item nav-dropdown-toggle ${isArticlesActive ? 'active' : ''}" id="articlesDropdownToggle" aria-expanded="false" aria-haspopup="true">
                  <span>Articles &amp; Guides</span>
                  <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div class="nav-dropdown-menu" aria-labelledby="articlesDropdownToggle" role="menu">
                  <div class="dropdown-menu-header">
                    <span class="dropdown-category">Knowledge Base &amp; Deep Dives</span>
                  </div>
                  <a href="${prefix}articles.html" class="dropdown-link ${activePage === 'articles' ? 'active' : ''}" role="menuitem">
                    <span class="dropdown-icon" aria-hidden="true">📚</span>
                    <div class="dropdown-link-body">
                      <span class="dropdown-link-title">Articles Hub</span>
                      <span class="dropdown-link-desc">All engineering articles, tech analysis &amp; guides</span>
                    </div>
                  </a>
                  <div class="dropdown-divider" role="separator"></div>
                  <a href="${articleLinkPrefix}flutter-mobile-app-performance.html" class="dropdown-link ${activePage === 'flutter-guide' ? 'active' : ''}" role="menuitem">
                    <span class="dropdown-icon" aria-hidden="true">⚡</span>
                    <div class="dropdown-link-body">
                      <span class="dropdown-link-title">Flutter App Performance</span>
                      <span class="dropdown-link-desc">120 FPS rendering, frame budgets &amp; optimization</span>
                    </div>
                  </a>
                  <a href="${articleLinkPrefix}sudoku-mastery-guide.html" class="dropdown-link ${activePage === 'sudoku-guide' ? 'active' : ''}" role="menuitem">
                    <span class="dropdown-icon" aria-hidden="true">🧩</span>
                    <div class="dropdown-link-body">
                      <span class="dropdown-link-title">Sudoku Mastery Guide</span>
                      <span class="dropdown-link-desc">Solving techniques from Naked Pairs to X-Wing</span>
                    </div>
                  </a>
                  <a href="${articleLinkPrefix}effective-language-learning.html" class="dropdown-link ${activePage === 'language-guide' ? 'active' : ''}" role="menuitem">
                    <span class="dropdown-icon" aria-hidden="true">🗣️</span>
                    <div class="dropdown-link-body">
                      <span class="dropdown-link-title">Language Learning Guide</span>
                      <span class="dropdown-link-desc">Spaced repetition, dual-coding &amp; retention</span>
                    </div>
                  </a>
                  <a href="${articleLinkPrefix}mobile-app-security-privacy.html" class="dropdown-link ${activePage === 'security-guide' ? 'active' : ''}" role="menuitem">
                    <span class="dropdown-icon" aria-hidden="true">🔒</span>
                    <div class="dropdown-link-body">
                      <span class="dropdown-link-title">Security &amp; Privacy Practices</span>
                      <span class="dropdown-link-desc">Zero-trust architecture, Keystore &amp; compliance</span>
                    </div>
                  </a>
                </div>
              </li>

              <li><a href="${prefix}faq.html" class="nav-item ${activePage === 'faq' ? 'active' : ''}" data-nav="faq">FAQ</a></li>

              <!-- Legal Dropdown (2 pages) -->
              <li class="nav-dropdown" data-dropdown="legal">
                <button type="button" class="nav-item nav-dropdown-toggle ${isLegalActive ? 'active' : ''}" id="legalDropdownToggle" aria-expanded="false" aria-haspopup="true">
                  <span>Legal</span>
                  <svg class="dropdown-chevron" width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </button>
                <div class="nav-dropdown-menu nav-dropdown-menu-sm" aria-labelledby="legalDropdownToggle" role="menu">
                  <div class="dropdown-menu-header">
                    <span class="dropdown-category">Governance &amp; Terms</span>
                  </div>
                  <a href="${prefix}privacy_policy.html" class="dropdown-link ${activePage === 'privacy' ? 'active' : ''}" role="menuitem">
                    <span class="dropdown-icon" aria-hidden="true">🛡️</span>
                    <div class="dropdown-link-body">
                      <span class="dropdown-link-title">Privacy Policy</span>
                      <span class="dropdown-link-desc">GDPR, CCPA &amp; user data governance</span>
                    </div>
                  </a>
                  <a href="${prefix}terms.html" class="dropdown-link ${activePage === 'terms' ? 'active' : ''}" role="menuitem">
                    <span class="dropdown-icon" aria-hidden="true">📜</span>
                    <div class="dropdown-link-body">
                      <span class="dropdown-link-title">Terms of Service</span>
                      <span class="dropdown-link-desc">Acceptable use, licensing &amp; agreements</span>
                    </div>
                  </a>
                </div>
              </li>

              <li><a href="${prefix}contact.html" class="nav-item nav-btn ${activePage === 'contact' ? 'active' : ''}" data-nav="contact">Contact Us</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }

  function initHeader() {
    const activePage = detectActivePage();

    // Check if there is an injection container
    const headerContainer = document.querySelector('site-header, #site-header, #site-header-container, [data-common-header]');
    if (headerContainer) {
      headerContainer.innerHTML = getHeaderHtml(activePage);
    }

    // Initialize Dropdowns
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dd => {
      const toggle = dd.querySelector('.nav-dropdown-toggle');
      if (!toggle) return;

      toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dd.classList.contains('open');

        // Close other open dropdowns
        dropdowns.forEach(other => {
          if (other !== dd) {
            other.classList.remove('open');
            const otherToggle = other.querySelector('.nav-dropdown-toggle');
            if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
          }
        });

        if (isOpen) {
          dd.classList.remove('open');
          toggle.setAttribute('aria-expanded', 'false');
        } else {
          dd.classList.add('open');
          toggle.setAttribute('aria-expanded', 'true');
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      dropdowns.forEach(dd => {
        if (!dd.contains(e.target)) {
          dd.classList.remove('open');
          const toggle = dd.querySelector('.nav-dropdown-toggle');
          if (toggle) toggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close dropdowns on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdowns.forEach(dd => {
          if (dd.classList.contains('open')) {
            dd.classList.remove('open');
            const toggle = dd.querySelector('.nav-dropdown-toggle');
            if (toggle) {
              toggle.setAttribute('aria-expanded', 'false');
              toggle.focus();
            }
          }
        });
      }
    });

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
          dropdowns.forEach(dd => {
            dd.classList.remove('open');
            const toggle = dd.querySelector('.nav-dropdown-toggle');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
          });
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
