// Shared top navigation bar. Single source of truth for the navbar markup
// and behavior across every page (About page design is canonical).
(function () {
  // ----------------------------------------
  // Nav data
  // ----------------------------------------
  const NAV_LINKS = [
    { label: 'Home', href: 'index.html' },
    { label: 'About', href: 'about.html' },
    { label: 'Projects', href: 'projects.html' },
    { label: 'Contact', href: 'contact.html' },
  ];

  function currentPage() {
    const path = window.location.pathname.split('/').pop();
    return path === '' ? 'index.html' : path;
  }

  function linkClasses(isActive, mobile) {
    if (isActive) {
      return mobile
        ? 'text-primary dark:text-inverse-primary font-bold pl-3 border-l-2 border-primary'
        : 'text-primary dark:text-inverse-primary font-bold border-b-2 border-primary pb-1';
    }
    return mobile
      ? 'text-on-background dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors pl-3 border-l-2 border-transparent'
      : 'text-on-background dark:text-on-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors';
  }

  function renderLinks(mobile) {
    const page = currentPage();
    return NAV_LINKS.map((link) => {
      const isActive = link.href === page;
      return `<a href="${link.href}" class="font-body-md text-body-md ${linkClasses(isActive, mobile)}"${isActive ? ' aria-current="page"' : ''}>${link.label}</a>`;
    }).join('');
  }

  // ----------------------------------------
  // Rendering
  // ----------------------------------------
  function render() {
    const mount = document.getElementById('site-header-mount');
    if (!mount) return;

    mount.innerHTML = `
      <header id="site-header" class="fixed top-0 left-0 w-full z-50 h-20 flex items-center bg-surface/70 dark:bg-inverse-surface/70 backdrop-blur-md border-b border-outline-variant/20 transition-shadow duration-300">
        <nav class="w-full max-w-container-max mx-auto px-gutter flex items-center justify-between">
          <a href="index.html" class="font-display text-headline-md font-extrabold text-on-background dark:text-on-surface">XYRYLE.</a>
          <div class="hidden md:flex items-center gap-8">${renderLinks(false)}</div>
          <div class="flex items-center gap-2">
            <button id="theme-toggle" type="button" aria-label="Toggle dark mode" class="material-symbols-outlined p-2 rounded-full text-primary hover:bg-surface-container transition-colors">dark_mode</button>
            <button id="mobile-menu-toggle" type="button" aria-label="Toggle menu" aria-expanded="false" class="md:hidden material-symbols-outlined p-2 rounded-full text-on-background dark:text-on-surface hover:bg-surface-container transition-colors">menu</button>
          </div>
        </nav>
        <div id="mobile-menu" class="md:hidden hidden absolute top-20 left-0 w-full bg-surface/95 dark:bg-inverse-surface/95 backdrop-blur-md border-b border-outline-variant/20 shadow-lg">
          <div class="flex flex-col px-gutter py-stack-md gap-stack-md">${renderLinks(true)}</div>
        </div>
      </header>`;

    wireInteractions();
  }

  // ----------------------------------------
  // Interactions
  // ----------------------------------------
  function wireInteractions() {
    const header = document.getElementById('site-header');
    const menuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const themeToggle = document.getElementById('theme-toggle');

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

    themeToggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('dark');
      themeToggle.textContent = document.documentElement.classList.contains('dark') ? 'light_mode' : 'dark_mode';
    });

    window.addEventListener('scroll', () => {
      header.classList.toggle('shadow-md', window.scrollY > 20);
    }, { passive: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
