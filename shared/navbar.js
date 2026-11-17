// Shared top navigation bar. Single source of truth for the navbar markup
// and behavior across every page (About page design is canonical).
(function () {
  document.documentElement.classList.remove('dark');
  document.documentElement.classList.add('light');

  // ---------------------------------------
  // Nav data
  // ---------------------------------------
  const NAV_LINKS = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  function renderLinks(mobile) {
    return NAV_LINKS.map((link) => {
      return `<a href="${link.href}" class="font-body-md text-body-md ${
        mobile
          ? 'text-on-background dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors pl-3 border-l-2 border-transparent'
          : 'text-on-background dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors'
      }">${link.label}</a>`;
    }).join('');
  }

  // ---------------------------------------
  // Rendering
  // ---------------------------------------
  function render() {
    const mount = document.getElementById('site-header-mount');
    if (!mount) return;

    mount.innerHTML = `
      <header id="site-header" class="fixed top-0 left-0 w-full z-50 h-20 flex items-center bg-surface/70 dark:bg-inverse-surface/70 backdrop-blur-md border-b border-outline-variant/20 transition-shadow duration-300">
        <nav class="w-full max-w-container-max mx-auto px-gutter flex items-center justify-between">
          <a href="#home" class="font-display text-headline-md font-extrabold text-on-background dark:text-on-surface">XYRYLE.</a>
          <div class="hidden md:flex items-center gap-8">${renderLinks(false)}</div>
          <div class="flex items-center gap-2">
            <button id="mobile-menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" class="md:hidden material-symbols-outlined p-2 rounded-full text-on-background dark:text-on-surface hover:bg-surface-container transition-colors">menu</button>
          </div>
        </nav>
        <div id="mobile-menu" class="md:hidden hidden absolute top-20 left-0 w-full bg-surface/95 dark:bg-inverse-surface/95 backdrop-blur-md border-b border-outline-variant/20 shadow-lg">
          <div class="flex flex-col px-gutter py-stack-md gap-stack-md">${renderLinks(true)}</div>
        </div>
      </header>`;

    wireInteractions();
  }

  // ---------------------------------------
  // Interactions
  // ---------------------------------------
  function wireInteractions() {
    const header = document.getElementById('site-header');
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      menuToggle.textContent = isOpen ? 'menu' : 'close';
      menuToggle.setAttribute('aria-expanded', String(!isOpen));
    });

    mobileMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuToggle.textContent = 'menu';
        menuToggle.setAttribute('aria-expanded', 'false');
      });
    });

    window.addEventListener('scroll', () => {
      header.classList.toggle('shadow-md', window.scrollY > 20);
    }, { passive: true });

    // Intersection Observer for active navigation states
    const navLinks = document.querySelectorAll('#site-header a, #mobile-menu a');
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver((entries) => {
      let current = '';

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          current = entry.target.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        if (current && link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    }, {
      rootMargin: '-70px 0px 0px 0px',
      threshold: 0.3
    });

    sections.forEach(section => {
      observer.observe(section);
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
