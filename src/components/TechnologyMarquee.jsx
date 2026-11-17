import ScrollReveal from './ScrollReveal';

const groups = [
  ['Programming Languages', [['Python', 'python'], ['HTML5', 'html5'], ['CSS3', 'css3'], ['JavaScript', 'javascript'], ['C', 'c'], ['SQL', 'mysql'], ['PHP', 'php']]],
  ['Frameworks', [['Express.js', 'express'], ['Tailwind CSS', 'tailwindcss'], ['Bootstrap 5', 'bootstrap']]],
  ['Developer Tools', [['Git', 'git'], ['GitHub', 'github'], ['Trello', 'trello'], ['Firebase', 'firebase'], ['Figma', 'figma'], ['Vite', 'vite']]],
  ['Digital Design Tools', [['Adobe Photoshop', 'adobephotoshop'], ['Adobe Illustrator', 'adobeillustrator'], ['Canva', 'canva']]],
  ['Libraries', [['AR.js', 'ardotjs'], ['Three.js', 'threedotjs'], ['Leaflet.js', 'leaflet']]],
  ['Databases', [['MySQL', 'mysql'], ['Firestore', 'firebase']]],
  ['Mapping & Geospatial', [['OpenStreetMap', 'openstreetmap'], ['OSRM', 'osrm']]],
  ['Blockchain', [['Avalanche', 'avalanche'], ['Remix', 'remix']]],
];
const technologies = groups.flatMap(([, items]) => items);

function Logo({ name, slug }) {
  return <div className="tech-logo" title={name} aria-label={name} role="img"><img src={`https://cdn.simpleicons.org/${slug}`} alt="" loading="lazy"/><span>{name}</span></div>;
}

export default function TechnologyMarquee() {
  return <section id="technologies" className="technology-marquee-section section-spacing overflow-hidden bg-inverse-surface text-inverse-on-surface"><div className="max-w-container-max mx-auto px-gutter"><ScrollReveal><div className="technology-marquee-heading"><span className="font-label-caps text-primary-fixed-dim">BUILT WITH</span><h2 className="font-display text-headline-lg-mobile md:text-headline-lg mt-2 text-white">Technologies &amp; Tools</h2><p className="text-surface-variant mt-3 max-w-2xl">Technologies, frameworks, and tools I use to build, design, and develop.</p></div></ScrollReveal></div><div className="marquee-shell" aria-label="Technology stack"><div className="marquee-track">{[0,1].map(copy=><div className="marquee-group" key={copy} aria-hidden={copy===1}>{technologies.map(([name,slug])=><Logo key={`${copy}-${name}`} name={name} slug={slug}/>)}</div>)}</div></div><div className="max-w-container-max mx-auto px-gutter mt-8"><p className="font-label-code text-xs text-surface-variant/70">{technologies.length} tools in the stack · hover to pause</p></div></section>;
}
