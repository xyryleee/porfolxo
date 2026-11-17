import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './StrokeText.css';

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger);

const getWipeFrames = (box, direction) => {
  const end = { x: box.x, y: box.y, width: box.width, height: box.height };
  if (direction === 'right') return { start: { ...end, x: box.x + box.width, width: 0 }, end };
  if (direction === 'top') return { start: { ...end, height: 0 }, end };
  if (direction === 'bottom') return { start: { ...end, y: box.y + box.height, height: 0 }, end };
  return { start: { ...end, width: 0 }, end };
};

export default function StrokeText({
  text = 'Draw Attention', strokeColor = '#A78BFA', fillColor = 'currentColor', strokeWidth = 1.4,
  drawDuration = 1.6, fillDelay = 0.2, stagger = 0.05, ease = 'power2.out', trigger = 'mount',
  fillMode = 'wipe', wipeFrom = 'left', fontSize = 128, fontWeight = 800, fontFamily = 'inherit',
  letterSpacing = -4, reverse = false, strokeStyle = 'solid', dashLength = 10, marching = false,
  hoverRedraw = false, shadow = false, shadowColor, className = '', style = {}, as: Tag = 'span', id,
}) {
  const rootRef = useRef(null);
  const textRef = useRef(null);
  const wipeRef = useRef(null);
  const [box, setBox] = useState(null);
  const baseId = useId().replace(/[^a-zA-Z0-9_-]/g, '');
  const wipeId = `stroke-wipe-${baseId}`;
  const revealId = `stroke-reveal-${baseId}`;
  const shadowId = `stroke-shadow-${baseId}`;
  const chars = useMemo(() => Array.from(String(text ?? '')), [text]);
  const dash = Math.max(fontSize * 7, 200);
  const fontStyle = useMemo(() => ({ fontFamily, fontSize: `${fontSize}px`, fontWeight, letterSpacing: `${letterSpacing}px` }), [fontFamily, fontSize, fontWeight, letterSpacing]);
  const pattern = strokeStyle === 'solid' ? null : strokeStyle === 'dotted'
    ? `0 ${Math.max(dashLength, strokeWidth * 1.8)}`
    : `${Math.max(dashLength - strokeWidth, 0.5)} ${dashLength * 0.6 + strokeWidth}`;
  const dashPeriod = pattern ? pattern.split(' ').map(Number).reduce((a, b) => a + b, 0) : 0;
  const castShadow = shadow && fillMode !== 'none';
  const lift = fontSize * 0.06;
  const softness = fontSize * 0.016;

  useLayoutEffect(() => {
    const root = rootRef.current;
    const measure = () => {
      if (!textRef.current) return;
      let bounds;
      try { bounds = textRef.current.getBBox(); } catch { return; }
      if (!bounds.width) return;
      const pad = Math.max(Number(strokeWidth) || 1, fontSize * 0.1);
      setBox({ x: bounds.x - pad, y: bounds.y - pad, width: bounds.width + pad * 2, height: bounds.height + pad * 2 });
    };
    measure();
    document.fonts?.ready?.then(measure).catch(() => {});
    const observer = typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(measure);
    if (root) observer?.observe(root);
    return () => observer?.disconnect();
  }, [chars, fontFamily, fontSize, fontWeight, letterSpacing, strokeWidth]);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root || !box) return undefined;
    const strokes = gsap.utils.toArray(root.querySelectorAll('[data-stroke-char]'));
    const fills = gsap.utils.toArray(root.querySelectorAll('[data-fill-char]'));
    const wipe = wipeRef.current;
    const outline = textRef.current;
    const drop = root.querySelector('[data-shadow]');
    if (!strokes.length) return undefined;
    const fillEnabled = fillMode !== 'none';
    const useWipe = fillMode === 'wipe';
    const frames = getWipeFrames(box, wipeFrom);
    const fillDuration = Math.max(0.4, drawDuration * 0.5);
    const order = reverse ? { each: stagger, from: 'end' } : stagger;
    const targets = [...strokes, ...fills, wipe, drop].filter(Boolean);
    const setStart = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: dash, strokeOpacity: 1 });
      gsap.set(fills, { opacity: useWipe ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: frames.start });
      if (drop) gsap.set(drop, { attr: { dx: 0, dy: 0, 'flood-opacity': 0 } });
    };
    const setEnd = () => {
      gsap.killTweensOf(targets);
      gsap.set(strokes, { strokeDasharray: dash, strokeDashoffset: 0, strokeOpacity: 1 });
      gsap.set(fills, { opacity: fillEnabled ? 1 : 0 });
      if (wipe) gsap.set(wipe, { attr: fillEnabled ? frames.end : frames.start });
    };
    if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
      setEnd();
      return () => gsap.killTweensOf(targets);
    }
    const build = () => {
      setStart();
      const loop = trigger === 'loop';
      const timeline = gsap.timeline({ paused: true, repeat: loop ? -1 : 0, repeatDelay: loop ? 0.9 : 0, yoyo: loop, defaults: { overwrite: 'auto' } });
      timeline.to(strokes, { strokeDashoffset: 0, duration: drawDuration, ease, stagger: order }, 0);
      if (useWipe && wipe) timeline.to(wipe, { attr: frames.end, duration: fillDuration, ease: 'power2.inOut' }, drawDuration + fillDelay);
      else if (fillEnabled) timeline.to(fills, { opacity: 1, duration: fillDuration, ease: 'power2.out', stagger: order }, drawDuration + fillDelay);
      if (drop && castShadow) timeline.to(drop, { attr: { dx: lift, dy: lift, 'flood-opacity': 0.5 }, duration: fillDuration * 1.4, ease: 'power3.out' }, drawDuration + fillDelay + fillDuration * 0.3);
      return timeline;
    };
    let timeline;
    let scrollTrigger;
    let redraw;
    const onEnter = () => {
      timeline?.kill();
      timeline = build();
      timeline.play(0);
    };
    if (trigger === 'hover') {
      setEnd();
      root.addEventListener('pointerenter', onEnter);
    } else {
      timeline = build();
      if (trigger === 'scroll') scrollTrigger = ScrollTrigger.create({ trigger: root, start: 'top 82%', once: true, onEnter: () => timeline?.play(0) });
      else timeline.play(0);
      if (hoverRedraw && trigger !== 'loop') {
        redraw = () => {
          if (!timeline || timeline.progress() < 1) return;
          gsap.timeline().to(strokes, { strokeOpacity: 0, duration: 0.2, ease: 'power1.out' }).set(strokes, { strokeDashoffset: dash, strokeOpacity: 1 }).to(strokes, { strokeDashoffset: 0, duration: drawDuration * 0.8, ease, stagger: order });
        };
        root.addEventListener('pointerenter', redraw);
      }
    }
    const march = pattern && marching ? gsap.fromTo(outline, { strokeDashoffset: 0 }, { strokeDashoffset: -dashPeriod, duration: dashPeriod / (fontSize * 0.22), ease: 'none', repeat: -1 }) : null;
    return () => {
      root.removeEventListener('pointerenter', onEnter);
      if (redraw) root.removeEventListener('pointerenter', redraw);
      scrollTrigger?.kill(); timeline?.kill(); march?.kill();
      gsap.killTweensOf(targets);
    };
  }, [box, dash, drawDuration, fillDelay, stagger, ease, trigger, fillMode, wipeFrom, reverse, pattern, dashPeriod, marching, hoverRedraw, castShadow, lift, fontSize]);

  const viewBox = box ? `${box.x} ${box.y} ${box.width} ${box.height}` : `0 ${-fontSize} 600 ${fontSize * 1.3}`;
  const wipeStart = box ? getWipeFrames(box, wipeFrom).start : null;
  const region = box ? { x: box.x - fontSize, y: box.y - fontSize, width: box.width + fontSize * 2, height: box.height + fontSize * 2 } : {};
  const outline = <text ref={textRef} className="stroke-text__stroke" x="0" y="0" fill="none" stroke={strokeColor} strokeWidth={strokeWidth} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={pattern || undefined} mask={pattern ? `url(#${revealId})` : undefined} style={fontStyle}>
    {chars.map((char, index) => <tspan data-stroke-char key={`s-${index}`}>{char}</tspan>)}
  </text>;
  return <Tag id={id} ref={rootRef} className={`stroke-text ${trigger === 'hover' ? 'stroke-text--hover' : ''} ${className}`.trim()} style={{ ...style, '--stroke-text-width': `${box?.width || 600}px` }}>
    <span className="stroke-text__accessible">{text}</span>
    <svg className="stroke-text__svg" viewBox={viewBox} preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={box ? undefined : { visibility: 'hidden' }}>
      <defs>
        {fillMode === 'wipe' && wipeStart && <clipPath id={wipeId} clipPathUnits="userSpaceOnUse"><rect ref={wipeRef} x={wipeStart.x} y={wipeStart.y} width={wipeStart.width} height={wipeStart.height} /></clipPath>}
        {pattern && <><filter id={`stroke-erode-${baseId}`} filterUnits="userSpaceOnUse" {...region}><feMorphology operator="erode" radius={(Number(strokeWidth) || 1) / 2 + 0.75} /></filter><mask id={revealId} maskUnits="userSpaceOnUse" {...region}>
          <text x="0" y="0" fill="none" stroke="#fff" strokeWidth={(Number(strokeWidth) || 1) + 2} strokeLinejoin="round" strokeLinecap="round" style={fontStyle}>{chars.map((char, index) => <tspan data-stroke-char key={`m-${index}`}>{char}</tspan>)}</text>
          <text x="0" y="0" fill="#000" stroke="none" filter={`url(#stroke-erode-${baseId})`} style={fontStyle}>{chars.map((char, index) => <tspan key={`e-${index}`}>{char}</tspan>)}</text>
        </mask></>}
        {castShadow && <filter id={shadowId} filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB" {...region}><feDropShadow data-shadow dx={lift} dy={lift} stdDeviation={softness} floodColor={shadowColor || strokeColor} floodOpacity="0.5" /></filter>}
      </defs>
      {!pattern && outline}
      <g filter={castShadow ? `url(#${shadowId})` : undefined}><text className="stroke-text__fill" x="0" y="0" fill={fillColor} stroke="none" style={fontStyle} clipPath={fillMode === 'wipe' && wipeStart ? `url(#${wipeId})` : undefined}>{chars.map((char, index) => <tspan data-fill-char key={`f-${index}`}>{char}</tspan>)}</text></g>
      {pattern && outline}
    </svg>
  </Tag>;
}
