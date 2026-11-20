import { useEffect, useState } from 'react';
import { useActiveSection } from './hooks/useActiveSection';
import Navbar from './components/Navbar';
import Home from './sections/Home';
import Life from './sections/Life';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import LenisSmoothScroll from './components/LenisSmoothScroll';

export default function App() {
  const active = useActiveSection(['home', 'life', 'about', 'projects', 'contact']);
  const [asciiComplete, setAsciiComplete] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('ascii-intro-pending', !asciiComplete);
    return () => document.documentElement.classList.remove('ascii-intro-pending');
  }, [asciiComplete]);
  useEffect(() => {
    if (asciiComplete) return undefined;
    const timer = window.setTimeout(() => setAsciiComplete(true), 2400);
    return () => window.clearTimeout(timer);
  }, [asciiComplete]);
  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  return (
    <LenisSmoothScroll>
      {asciiComplete && (
        <>
          <a className="skip-link" href="#main-content">Skip to content</a>
          <Navbar active={active} />
        </>
      )}
      <main id="main-content" tabIndex={-1}>
        <Home
          onAsciiComplete={() => setAsciiComplete(true)}
          heroVisible={asciiComplete}
        />
        {asciiComplete && (
          <>
            <Life />
            <About />
            <Projects />
            <Contact />
          </>
        )}
      </main>
      {asciiComplete && (
        <footer className="bg-surface-container-lowest border-t border-outline-variant">
          <div className="flex flex-col md:flex-row justify-between items-center max-w-container-max mx-auto px-gutter py-8">
            <div className="font-display text-headline-md font-bold text-primary">XYRYLE.</div>
            <p className="text-on-surface-variant">
              © 2026 Xyryle Adrian B. Cator. All rights reserved.
            </p>
          </div>
        </footer>
      )}
    </LenisSmoothScroll>
  );
}
