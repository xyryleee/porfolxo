import ScrollReveal from './ScrollReveal';

const technologies = [
  ['Python', 'python'],
  ['HTML5', 'html5'],
  ['JavaScript', 'javascript'],
  ['C', 'c'],
  ['SQL', 'mysql'],
  ['PHP', 'php'],
  ['Express.js', 'express'],
  ['Tailwind CSS', 'tailwindcss'],
  ['Bootstrap 5', 'bootstrap'],
  ['Git', 'git'],
  ['GitHub', 'github'],
  ['Trello', 'trello'],
  ['Firebase', 'firebase'],
  ['Figma', 'figma'],
  ['Vite', 'vite'],
  ['Three.js', 'threedotjs'],
  ['Leaflet.js', 'leaflet'],
  ['MySQL', 'mysql'],
  ['Firestore', 'firebase'],
  ['OpenStreetMap', 'openstreetmap'],
  ['Remix', 'remix'],
];

function Logo({ name, slug }) {
  return (
    <div className="tech-logo" title={name} aria-label={name} role="img">
      <img src={`https://cdn.simpleicons.org/${slug}`} alt="" loading="lazy" />
      <span>{name}</span>
    </div>
  );
}

export default function TechnologyMarquee() {
  return (
    <section
      id="technologies"
      className="technology-marquee-section section-spacing overflow-hidden bg-inverse-surface text-inverse-on-surface"
    >
      <div className="max-w-container-max mx-auto px-gutter">
        <ScrollReveal>
          <div className="technology-marquee-heading">
            <span className="font-label-caps font-semibold text-primary-fixed-dim">BUILT WITH</span>
            <h2 className="font-display font-bold text-headline-lg-mobile md:text-headline-lg mt-2 text-white">
              Technologies &amp; Tools
            </h2>
            <p className="text-surface-variant mt-3 max-w-2xl">
              Technologies, frameworks, and tools I use to build, design, and develop.
            </p>
          </div>
        </ScrollReveal>
      </div>
      <div className="marquee-shell" aria-label="Technology stack">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <div className="marquee-group" key={copy} aria-hidden={copy === 1}>
              {technologies.map(([name, slug]) => (
                <Logo key={`${copy}-${name}`} name={name} slug={slug} />
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="max-w-container-max mx-auto px-gutter mt-8">
        <p className="font-label-code text-sm font-medium text-surface-variant/90">
          {technologies.length} tools in the stack · hover to pause
        </p>
      </div>
    </section>
  );
}
