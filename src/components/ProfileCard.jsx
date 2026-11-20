import { useEffect, useRef } from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import './ProfileCard.css';
import BorderGlow from './BorderGlow';

export default function ProfileCard({
  name,
  title,
  handle,
  status,
  avatarUrl,
  contactHref = '#contact',
  showUserInfo = true,
}) {
  const cardRef = useRef(null);

  useEffect(() => {
    const card = cardRef.current;
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!card || !finePointer.matches || reducedMotion.matches) return undefined;

    const reset = () => {
      card.style.setProperty('--rotate-x', '0deg');
      card.style.setProperty('--rotate-y', '0deg');
      card.style.setProperty('--pointer-x', '50%');
      card.style.setProperty('--pointer-y', '50%');
      card.style.setProperty('--glare-opacity', '0');
    };
    const onPointerMove = (event) => {
      const bounds = card.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      card.style.setProperty('--rotate-y', `${(x - 0.5) * 9}deg`);
      card.style.setProperty('--rotate-x', `${(0.5 - y) * 9}deg`);
      card.style.setProperty('--pointer-x', `${x * 100}%`);
      card.style.setProperty('--pointer-y', `${y * 100}%`);
      card.style.setProperty('--glare-opacity', '1');
    };
    const onPointerLeave = () => reset();
    card.addEventListener('pointermove', onPointerMove);
    card.addEventListener('pointerleave', onPointerLeave);
    return () => {
      card.removeEventListener('pointermove', onPointerMove);
      card.removeEventListener('pointerleave', onPointerLeave);
    };
  }, []);

  return (
    <BorderGlow className="profile-card-glow" backgroundColor="#160b20" borderRadius={20} glowRadius={30}>
    <article ref={cardRef} className="profile-card" aria-label={`${name}, ${title}`}>
      <div className="profile-card__photo-wrap">
        <img className="profile-card__photo" src={avatarUrl} alt={`Portrait of ${name}`} />
        <span className="profile-card__availability"><span />{status}</span>
        <span className="profile-card__index" aria-hidden="true">ID · 01</span>
      </div>
      {showUserInfo && (
        <div className="profile-card__info">
          <div className="profile-card__identity">
            <div>
              <p className="profile-card__eyebrow">DIGITAL PROFILE</p>
              <h2>{name}</h2>
              <p className="profile-card__title">{title}</p>
            </div>
            <span className="profile-card__handle">@{handle}</span>
          </div>
          <div className="profile-card__footer">
            <a className="profile-card__contact" href="#contact">
              Let's Connect
              <ArrowUpRight size={17} strokeWidth={1.8} />
            </a>
            <div className="profile-card__socials" aria-label="Social links">
              <a href="https://github.com/xyryleee" target="_blank" rel="noreferrer" aria-label="GitHub"><span className="profile-card__social-letter">GH</span></a>
              <a href="https://www.linkedin.com/in/catorxy/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><span className="profile-card__social-letter">in</span></a>
              <a href="mailto:xyryle.cator@gmail.com" aria-label="Email"><Mail size={17} strokeWidth={1.7} /></a>
            </div>
          </div>
        </div>
      )}
      <span className="profile-card__glare" aria-hidden="true" />
    </article>
    </BorderGlow>
  );
}
