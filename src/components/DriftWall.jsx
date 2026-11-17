import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import './DriftWall.css';

const columnFactor = (index, variance) => 1 + variance * ((((index * 0.6180339887 + 0.35) % 1) * 2) - 1);

export default function DriftWall({
  items = [], columns = 5, tileWidth = 190, tileHeight = 128, gap = 18, radius = 14,
  tilt = 14, turn = -12, perspective = 1200, depth = 110, speed = 34, direction = 'up',
  variance = 0.45, parallax = 0.55, pauseOnHover = false, lift = 48, fade = 0.58,
  dim = 0.62, grayscale = false, overlayColor = '#16002d', className = '', style
}) {
  const containerRef = useRef(null), planeRef = useRef(null), tracksRef = useRef([]);
  const rafRef = useRef(null), offsetsRef = useRef([]), velocitiesRef = useRef([]);
  const pointerRef = useRef({ x: 0, y: 0 }), dampedRef = useRef({ x: 0, y: 0 });
  const hoveredColumnRef = useRef(-1), wallHoveredRef = useRef(false), lastTsRef = useRef(null);
  const [height, setHeight] = useState(600), [activeId, setActiveId] = useState(null), [reduced, setReduced] = useState(false);

  const columnItems = useMemo(() => {
    const cols = Array.from({ length: columns }, () => []);
    items.forEach((item, index) => cols[index % columns].push(item));
    return cols.map(col => col.length ? col : items.slice(0, 1));
  }, [items, columns]);
  const columnMeta = useMemo(() => columnItems.map(col => {
    const copyHeight = Math.max(tileHeight + gap, col.length * (tileHeight + gap));
    return { copyHeight, copies: Math.max(2, Math.ceil((height * 1.6) / copyHeight) + 1) };
  }), [columnItems, tileHeight, gap, height]);
  const baseVelocities = useMemo(() => columnItems.map((_, c) => speed * columnFactor(c, variance) * (direction === 'up' ? 1 : -1) * (c % 2 ? -1 : 1)), [columnItems, speed, variance, direction]);

  useEffect(() => setReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches), []);
  useLayoutEffect(() => {
    if (!containerRef.current) return undefined;
    const observer = new ResizeObserver(([entry]) => setHeight(entry.contentRect.height || 600));
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    offsetsRef.current = columnMeta.map((meta, c) => meta.copyHeight * ((c * 0.37) % 1));
    velocitiesRef.current = columnItems.map(() => 0);
  }, [columnMeta, columnItems]);
  const applyTransform = useCallback((px, py) => {
    if (planeRef.current) planeRef.current.style.transform = `translate(-50%, -50%) scale(1.16) rotateX(${tilt + py}deg) rotateY(${turn + px}deg) translateZ(${-depth}px)`;
  }, [tilt, turn, depth]);
  useEffect(() => {
    const animate = timestamp => {
      if (lastTsRef.current === null) lastTsRef.current = timestamp;
      const dt = Math.min(0.05, Math.max(0, timestamp - lastTsRef.current) / 1000); lastTsRef.current = timestamp;
      const maxTilt = parallax * 8, damp = 1 - Math.exp(-dt / 0.12);
      dampedRef.current.x += (pointerRef.current.x * maxTilt - dampedRef.current.x) * damp;
      dampedRef.current.y += (-pointerRef.current.y * maxTilt - dampedRef.current.y) * damp;
      applyTransform(dampedRef.current.x, dampedRef.current.y);
      tracksRef.current.forEach((track, c) => {
        const meta = columnMeta[c]; if (!track || !meta) return;
        if (!reduced) {
          const paused = (wallHoveredRef.current && pauseOnHover) || hoveredColumnRef.current === c;
          const target = paused ? 0 : baseVelocities[c], ease = 1 - Math.exp(-dt / (target ? 0.28 : 0.16));
          velocitiesRef.current[c] += (target - velocitiesRef.current[c]) * ease;
          offsetsRef.current[c] = ((offsetsRef.current[c] + velocitiesRef.current[c] * dt) % meta.copyHeight + meta.copyHeight) % meta.copyHeight;
        }
        track.style.transform = `translate3d(0, ${-offsetsRef.current[c]}px, 0)`;
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { cancelAnimationFrame(rafRef.current); lastTsRef.current = null; };
  }, [applyTransform, baseVelocities, columnMeta, parallax, pauseOnHover, reduced]);

  const onMove = useCallback(event => {
    const rect = containerRef.current?.getBoundingClientRect(); if (!rect) return;
    pointerRef.current = { x: (event.clientX - rect.left) / rect.width - 0.5, y: (event.clientY - rect.top) / rect.height - 0.5 };
    const tile = event.target.closest?.('[data-tile-id]');
    if (tile) { hoveredColumnRef.current = Number(tile.dataset.col); setActiveId(tile.dataset.tileId); }
  }, []);
  const release = () => { hoveredColumnRef.current = -1; pointerRef.current = { x: 0, y: 0 }; setActiveId(null); };
  const vars = { '--dw-tile-w': `${tileWidth}px`, '--dw-tile-h': `${tileHeight}px`, '--dw-gap': `${gap}px`, '--dw-radius': `${radius}px`, '--dw-perspective': `${perspective}px`, '--dw-lift': `${lift}px`, '--dw-dim': dim, '--dw-gray': grayscale ? 1 : 0, '--dw-overlay': overlayColor, '--dw-edge': `${Math.max(0, (1 - fade) * 100)}%`, ...style };

  return <div ref={containerRef} className={`drift-wall ${reduced ? 'drift-wall--reduced' : ''} ${className}`} style={vars} onPointerMove={onMove} onPointerEnter={() => { wallHoveredRef.current = true; }} onPointerLeave={() => { wallHoveredRef.current = false; release(); }} role="group" aria-label="Drifting wall of life moments">
    <div ref={planeRef} className="drift-wall__plane">{columnItems.map((col, c) => <div className="drift-wall__col" key={c}><div className="drift-wall__track" ref={el => { tracksRef.current[c] = el; }}>{Array.from({ length: columnMeta[c].copies }).flatMap((_, copy) => col.map((item, index) => { const id = `${c}-${copy}-${index}`; return <div key={id} className={`drift-wall__tile${activeId === id ? ' is-active' : ''}`} data-tile-id={id} data-col={c} tabIndex={0} role="img" aria-label={item.title || 'Life moment'} onFocus={() => { hoveredColumnRef.current = c; setActiveId(id); }} onBlur={release}><span className="drift-wall__inner"><img src={item.image} alt="" loading="lazy" draggable="false" /><span className="drift-wall__overlay" /></span></div>; }))}</div></div>)}</div>
  </div>;
}
