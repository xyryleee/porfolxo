import { HugeiconsIcon } from '@hugeicons/react';
import {
  Facebook01Icon,
  GithubIcon,
  InstagramIcon,
  Linkedin01Icon,
  NewTwitterIcon,
  RedditIcon,
} from '@hugeicons/core-free-icons';
import './AnimatedList.css';
import { useEffect, useRef, useState } from 'react';

const SOCIALS = [
  { title: 'GitHub', description: 'Code, projects, and open source', href: 'https://github.com/xyryleee', icon: GithubIcon },
  { title: 'LinkedIn', description: 'Professional profile and updates', href: 'https://www.linkedin.com/in/catorxy/', icon: Linkedin01Icon },
  { title: 'Facebook', description: 'Social profile', href: 'https://www.facebook.com/kalanxy', icon: Facebook01Icon },
  { title: 'X', description: 'Posts and updates', href: 'https://x.com/kalanxy_', icon: NewTwitterIcon },
  { title: 'Instagram', description: 'Photos and stories', href: 'https://www.instagram.com/zyrxle', icon: InstagramIcon },
  { title: 'Reddit', description: 'Posts and discussions', href: 'https://www.reddit.com/user/mrxyryle/', icon: RedditIcon },
];

export default function AnimatedList() {
  const listRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = listRef.current;
    if (!node) return undefined;

    if (matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.15 });

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={listRef}
      className={`social-list${visible ? ' is-visible' : ''}`}
      aria-label="Social profiles"
    >
      {SOCIALS.map(({ title, description, href, icon }, index) => {
        const content = (
          <>
            <span className="social-list__icon" aria-hidden="true">
              <HugeiconsIcon icon={icon} size={21} strokeWidth={1.8} />
            </span>
            <span className="social-list__copy">
              <span className="social-list__title">{title}</span>
              <span className="social-list__description">{description}</span>
            </span>
            {href && <span className="social-list__arrow" aria-hidden="true">↗</span>}
          </>
        );
        const itemStyle = { '--item-index': index };

        return href ? (
          <a
            key={title}
            className="social-list__item"
            href={href}
            target="_blank"
            rel="noreferrer"
            style={itemStyle}
          >
            {content}
          </a>
        ) : (
          <div
            key={title}
            className="social-list__item social-list__item--pending"
            aria-disabled="true"
            style={itemStyle}
          >
            {content}
          </div>
        );
      })}
    </div>
  );
}
