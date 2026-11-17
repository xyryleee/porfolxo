import DriftWall from '../components/DriftWall';

const moments = [
  { image: '/assets/xy.png', title: 'A new chapter' },
  { image: '/assets/ka-kalakbay.png', title: 'Out exploring' },
  { image: '/assets/taskalinga.png', title: 'Building with purpose' },
  { image: '/assets/landr.png', title: 'Late-night ideas' },
  { image: '/assets/transpogapo.png', title: 'Making things move' },
  { image: '/assets/xy.png', title: 'Small wins' },
  { image: '/assets/ka-kalakbay.png', title: 'New places' },
  { image: '/assets/taskalinga.png', title: 'Good people' },
  { image: '/assets/landr.png', title: 'Side quests' },
  { image: '/assets/transpogapo.png', title: 'In progress' },
];

export default function Life() {
  return <section id="life" className="life-section relative overflow-hidden bg-inverse-surface">
    <div className="life-wall-shell"><DriftWall items={moments} columns={5} tileWidth={190} tileHeight={128} gap={16} speed={30} tilt={13} turn={-10} /></div>
  </section>;
}
