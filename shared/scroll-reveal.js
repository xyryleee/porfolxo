// Shared scroll-triggered reveal animation. Elements marked with
// data-reveal fade/slide into place once, the first time they enter
// the viewport. Respects prefers-reduced-motion.
(function () {
  function init() {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!elements.length) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      elements.forEach((el) => el.classList.add('reveal-visible'));
      return;
    }

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    elements.forEach((el) => observer.observe(el));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
