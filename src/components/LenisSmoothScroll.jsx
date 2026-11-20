import { useEffect, useRef, useState } from 'react';
import { ReactLenis } from 'lenis/react';
import { cancelFrame, frame } from 'motion';

const easeOut = (t) => 1 - Math.pow(1 - t, 4);

export default function LenisSmoothScroll({ children }) {
  const lenisRef = useRef(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(mediaQuery.matches);
    updatePreference();
    mediaQuery.addEventListener('change', updatePreference);
    return () => mediaQuery.removeEventListener('change', updatePreference);
  }, []);

  useEffect(() => {
    const updateLenis = ({ timestamp }) => {
      const lenis = lenisRef.current?.lenis;
      if (!lenis) return;

      // React Aria locks document scrolling while a dialog is open. Keep Lenis
      // stopped during that lock so it cannot redirect wheel or touch input
      // from an inside-scrolling modal to the page.
      const modalOpen = document.querySelector('[role="dialog"]');
      if (modalOpen) {
        if (!lenis.isStopped) lenis.stop();
        return;
      }

      if (lenis.isStopped) lenis.start();
      lenis.raf(timestamp);
    };
    frame.setup(updateLenis, true);
    return () => cancelFrame(updateLenis);
  }, []);

  useEffect(() => {
    const navigateToAnchor = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;
      const hash = link.getAttribute('href');
      const target = hash && document.getElementById(hash.slice(1));
      if (!target) return;
      event.preventDefault();
      lenisRef.current?.lenis?.scrollTo(target, {
        duration: reducedMotion ? 0 : 1.4,
        easing: easeOut,
        offset: -80,
        immediate: reducedMotion,
      });
      window.history.replaceState(null, '', hash);
    };
    document.addEventListener('click', navigateToAnchor);
    return () => document.removeEventListener('click', navigateToAnchor);
  }, [reducedMotion]);

  return <ReactLenis ref={lenisRef} root autoRaf={false} options={{ lerp: reducedMotion ? 1 : 0.1, smoothWheel: !reducedMotion, syncTouch: !reducedMotion, touchMultiplier: 1 }}>{children}</ReactLenis>;
}
