import DriftWall from '../components/DriftWall';

const asset = (name) => `${import.meta.env.BASE_URL}assets/${name}`;

const moments = [
  { image: asset('xy.png'), title: 'A new chapter' },
  { image: asset('ka-kalakbay.png'), title: 'Out exploring' },
  { image: asset('taskalinga.png'), title: 'Building with purpose' },
  { image: asset('landr.png'), title: 'Late-night ideas' },
  { image: asset('transpogapo.png'), title: 'Making things move' },
  { image: asset('xy.png'), title: 'Small wins' },
  { image: asset('ka-kalakbay.png'), title: 'New places' },
  { image: asset('taskalinga.png'), title: 'Good people' },
  { image: asset('landr.png'), title: 'Side quests' },
  { image: asset('transpogapo.png'), title: 'In progress' },
];

export default function Life() {
  return <section id="life" className="life-section relative overflow-hidden bg-inverse-surface">
    <div className="life-wall-shell"><DriftWall items={moments} columns={5} tileWidth={190} tileHeight={128} gap={16} speed={30} tilt={13} turn={-10} /></div>
  </section>;
}
