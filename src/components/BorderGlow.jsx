import { useCallback, useEffect, useRef } from 'react';
import './BorderGlow.css';

function parseHsl(value) {
  const match = value.match(/([\d.]+)\s+([\d.]+)%?\s+([\d.]+)%?/);
  if (!match) return { h: 40, s: 80, l: 80 };
  return { h: Number(match[1]), s: Number(match[2]), l: Number(match[3]) };
}

function glowVariables(glowColor, intensity) {
  const { h, s, l } = parseHsl(glowColor);
  const alphas = [100, 60, 50, 40, 30, 20, 10];
  const suffixes = ['', '-60', '-50', '-40', '-30', '-20', '-10'];
  return Object.fromEntries(alphas.map((alpha, index) => [
    `--glow-color${suffixes[index]}`,
    `hsl(${h}deg ${s}% ${l}% / ${Math.min(alpha * intensity, 100)}%)`,
  ]));
}

const gradientPositions = ['80% 55%', '69% 34%', '8% 6%', '41% 38%', '86% 85%', '82% 18%', '51% 4%'];
const gradientKeys = ['--gradient-one', '--gradient-two', '--gradient-three', '--gradient-four', '--gradient-five', '--gradient-six', '--gradient-seven'];
const colorMap = [0, 1, 2, 0, 1, 2, 1];

function gradientVariables(colors) {
  const vars = Object.fromEntries(gradientKeys.map((key, index) => {
    const color = colors[colorMap[index] % colors.length];
    return [key, `radial-gradient(at ${gradientPositions[index]}, ${color} 0, transparent 50%)`];
  }));
  vars['--gradient-base'] = `linear-gradient(${colors[0]} 0 100%)`;
  return vars;
}

function isLight(color) {
  const value = color.trim().replace('#', '');
  if (!/^[\da-f]{3}([\da-f]{3})?$/i.test(value)) return false;
  const hex = value.length === 3 ? [...value].map((char) => char + char).join('') : value;
  const [red, green, blue] = [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16));
  return red * 0.2126 + green * 0.7152 + blue * 0.0722 > 180;
}

export default function BorderGlow({
  children,
  className = '',
  edgeSensitivity = 30,
  glowColor = '46 100 50',
  backgroundColor = '#120F17',
  borderRadius = 28,
  glowRadius = 24,
  glowIntensity = 1,
  coneSpread = 25,
  colors = ['#ffc300'],
  fillOpacity = 0.5,
}) {
  const cardRef = useRef(null);
  const getCenter = useCallback((element) => {
    const { width, height } = element.getBoundingClientRect();
    return [width / 2, height / 2];
  }, []);

  const handlePointerMove = useCallback((event) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const [centerX, centerY] = getCenter(card);
    const dx = x - centerX;
    const dy = y - centerY;
    const edge = Math.min(Math.max(Math.max(Math.abs(dx) / centerX, Math.abs(dy) / centerY), 0), 1);
    let angle = dx === 0 && dy === 0 ? 0 : Math.atan2(dy, dx) * (180 / Math.PI) + 90;
    if (angle < 0) angle += 360;
    card.style.setProperty('--edge-proximity', edge * 100);
    card.style.setProperty('--cursor-angle', `${angle}deg`);
  }, [getCenter]);

  const lightSurface = isLight(backgroundColor);
  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`border-glow-card${lightSurface ? ' border-glow-card--light' : ''}${className ? ` ${className}` : ''}`}
      style={{
        '--card-bg': backgroundColor,
        '--edge-sensitivity': edgeSensitivity,
        '--border-radius': `${borderRadius}px`,
        '--glow-padding': `${glowRadius}px`,
        '--cone-spread': coneSpread,
        '--fill-opacity': fillOpacity,
        ...glowVariables(glowColor, glowIntensity),
        ...gradientVariables(colors),
      }}
    >
      <span className="edge-light" aria-hidden="true" />
      <div className="border-glow-inner">{children}</div>
    </div>
  );
}
