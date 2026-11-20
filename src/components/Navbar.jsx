import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import GooeyNav from './GooeyNav';

const links = [
  ['Home', 'home'],
  ['Life', 'life'],
  ['About', 'about'],
  ['Projects', 'projects'],
  ['Contact', 'contact']
];

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const activeIndex = Math.max(0, links.findIndex(([, id]) => id === active));
  const items = links.map(([label, id]) => ({ label, href: `#${id}` }));

  return (
    <header className="fixed top-0 left-0 z-50 w-full h-20 flex items-center bg-surface/70 backdrop-blur-md border-b border-outline-variant/20">
      <nav className="w-full max-w-container-max mx-auto px-gutter flex items-center justify-between" aria-label="Main navigation">
        <a href="#home" onClick={() => setOpen(false)} className="font-display text-headline-md font-extrabold">XYRYLE.</a>
        <div className="hidden md:flex items-center">
          <GooeyNav
            items={items}
            activeIndex={activeIndex}
            theme="dark"
            color="#ffc300"
            size="sm"
            frame={false}
            particleCount={12}
            spread={42}
            animationTime={550}
            timeVariance={250}
            gooeyness={0.55}
            wobble={0.45}
            className="portfolio-gooey-nav"
          />
        </div>
        <button onClick={() => setOpen(!open)} aria-label={open ? 'Close navigation menu' : 'Open navigation menu'} aria-controls="mobile-navigation" aria-expanded={open} className="menu-toggle md:hidden">
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      <div id="mobile-navigation" hidden={!open} className="md:hidden absolute top-20 left-0 w-full bg-surface/95 backdrop-blur-md border-b border-outline-variant/20"><div className="flex flex-col px-gutter py-6 gap-2">{links.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)} aria-current={active === id ? 'location' : undefined} className={`mobile-nav-link nav-link ${active === id ? 'active' : ''}`}>{label}</a>)}</div></div>
    </header>
  );
}
