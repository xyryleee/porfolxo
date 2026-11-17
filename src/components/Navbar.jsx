import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar({ active }) {
  const [open, setOpen] = useState(false);
  const links = [['Home', 'home'], ['About', 'about'], ['Projects', 'projects'], ['Contact', 'contact']];
  const go = id => { setOpen(false); document.querySelector(`a[href="#${id}"]`)?.click(); };
  return <header className="fixed top-0 left-0 z-50 w-full h-20 flex items-center bg-surface/70 backdrop-blur-md border-b border-outline-variant/20"><nav className="w-full max-w-container-max mx-auto px-gutter flex items-center justify-between"><a href="#home" onClick={() => setOpen(false)} className="font-display text-headline-md font-extrabold">XYRYLE.</a><div className="hidden md:flex items-center gap-8">{links.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)} className={`nav-link ${active === id ? 'active' : ''}`}>{label}</a>)}</div><button onClick={() => setOpen(!open)} aria-label="Toggle menu" className="md:hidden p-2">{open ? <X /> : <Menu />}</button></nav>{open && <div className="md:hidden absolute top-20 left-0 w-full bg-surface/95 backdrop-blur-md border-b border-outline-variant/20"><div className="flex flex-col px-gutter py-6 gap-5">{links.map(([label, id]) => <a href={`#${id}`} key={id} onClick={() => setOpen(false)} className={`text-left nav-link ${active === id ? 'active' : ''}`}>{label}</a>)}</div></div>}</header>;
}
