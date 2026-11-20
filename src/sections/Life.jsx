import AccordionGallery from '../components/AccordionGallery';

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

const moments = [
  { image: asset('presenting-a-project.png'), label: 'Presenting a project', alt: 'Presenting a tourism project in class' },
  { image: asset('technology-event-award.png'), label: 'Technology event award', alt: 'Holding certificates at a technology event' },
  { image: asset('reading-at-the-library.png'), label: 'Reading at the library', alt: 'Reading magazines in a library' },
  { image: asset('mountain-trip.png'), label: 'Mountain trip', alt: 'Travel portrait with a mountain landscape' },
  { image: asset('shrek-selfie.png'), label: 'Shrek selfie', alt: 'Selfie with a Shrek filter' },
];

export default function Life() {
  return <section id="life" className="life-section">
    <div className="life-gallery-shell">
      <div className="life-gallery-heading">
        <span className="life-gallery-kicker">A LITTLE BEYOND THE ROLE</span>
        <h2>Life in motion<span>.</span></h2>
        <p>Small moments, side quests, and things I love making.</p>
      </div>
      <AccordionGallery
        items={moments}
        defaultIndex={2}
        height={420}
        gap={12}
        radius={18}
        expandRatio={0.48}
        accentColor="var(--color-primary)"
        overlayColor="#18002f"
        textColor="var(--color-on-background)"
        className="life-accordion-gallery"
        ariaLabel="Life moments gallery"
      />
      <span className="life-gallery-hint">HOVER OR TAP TO EXPLORE</span>
    </div>
  </section>;
}

