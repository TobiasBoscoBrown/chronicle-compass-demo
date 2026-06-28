'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

/**
 * Atmospheric layer built from chart-room documents, drawn as crisp inline SVG:
 * a compass rose, a latitude / longitude grid, meridian arcs, and a few passport
 * stamps. Everything sits at low opacity in navy and brass so it reads as the
 * texture of an old map under the content, never as decoration.
 */

function CompassRose() {
  return (
    <svg width="320" height="320" viewBox="0 0 320 320" fill="none" stroke="#0C2340">
      <circle cx="160" cy="160" r="150" strokeWidth="1" />
      <circle cx="160" cy="160" r="120" strokeWidth="0.75" />
      <circle cx="160" cy="160" r="40" strokeWidth="0.75" />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i * Math.PI) / 8;
        const r1 = i % 4 === 0 ? 40 : 100;
        return (
          <line key={i} x1={160 + Math.cos(a) * r1} y1={160 + Math.sin(a) * r1}
            x2={160 + Math.cos(a) * 150} y2={160 + Math.sin(a) * 150} strokeWidth="0.6" />
        );
      })}
      <polygon points="160,30 175,160 160,150 145,160" fill="#B0884F" stroke="none" opacity="0.5" />
      <polygon points="160,290 175,160 160,170 145,160" fill="#0C2340" stroke="none" opacity="0.5" />
      <text x="160" y="22" textAnchor="middle" fontFamily="Georgia, serif" fontSize="16" fill="#0C2340" stroke="none">N</text>
    </svg>
  );
}

function LatLongGrid() {
  return (
    <svg width="360" height="300" viewBox="0 0 360 300" fill="none" stroke="#0C2340">
      {Array.from({ length: 7 }).map((_, i) => (
        <line key={'h' + i} x1="0" y1={i * 50} x2="360" y2={i * 50} strokeWidth="0.5" />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={'v' + i} d={`M ${i * 52} 0 Q ${i * 52 + (i - 3.5) * 8} 150 ${i * 52} 300`} strokeWidth="0.5" />
      ))}
      <text x="6" y="14" fontFamily="monospace" fontSize="10" fill="#0C2340" stroke="none">40°N</text>
      <text x="6" y="264" fontFamily="monospace" fontSize="10" fill="#0C2340" stroke="none">10°N</text>
    </svg>
  );
}

function Stamp({ label, place }: { label: string; place: string }) {
  return (
    <svg width="170" height="170" viewBox="0 0 170 170" fill="none">
      <g stroke="#1C4E6B" transform="rotate(-8 85 85)">
        <circle cx="85" cy="85" r="70" strokeWidth="2" />
        <circle cx="85" cy="85" r="58" strokeWidth="1" strokeDasharray="3 4" />
        <text x="85" y="62" textAnchor="middle" fontFamily="Georgia, serif" fontSize="13" fill="#1C4E6B" stroke="none" letterSpacing="2">{place}</text>
        <text x="85" y="96" textAnchor="middle" fontFamily="monospace" fontSize="22" fill="#1C4E6B" stroke="none" letterSpacing="3">{label}</text>
        <line x1="42" y1="108" x2="128" y2="108" strokeWidth="1" />
        <text x="85" y="126" textAnchor="middle" fontFamily="monospace" fontSize="11" fill="#1C4E6B" stroke="none" letterSpacing="2">VISITED</text>
      </g>
    </svg>
  );
}

type Layer = { el: React.ReactNode; className: string; depth: number; rotate: number; opacity: number };

const layers: Layer[] = [
  { el: <CompassRose />, className: 'top-[8%] -right-16', depth: 50, rotate: 0, opacity: 0.06 },
  { el: <LatLongGrid />, className: 'top-[16%] -left-10', depth: 40, rotate: 0, opacity: 0.05 },
  { el: <Stamp label="ROMA" place="ITALIA" />, className: 'top-[46%] left-[6%]', depth: 70, rotate: 0, opacity: 0.10 },
  { el: <Stamp label="ATH" place="HELLAS" />, className: 'bottom-[18%] right-[9%]', depth: 90, rotate: 7, opacity: 0.09 },
  { el: <CompassRose />, className: 'bottom-[-8%] left-[12%]', depth: 30, rotate: 12, opacity: 0.045 },
  { el: <Stamp label="LAS" place="NEVADA" />, className: 'top-[64%] right-[34%]', depth: 60, rotate: -10, opacity: 0.07 },
];

function TextureLayer({ layer, scrollYProgress }: { layer: Layer; scrollYProgress: MotionValue<number> }) {
  const y = useTransform(scrollYProgress, [0, 1], [0, -layer.depth]);
  return (
    <motion.div className={`absolute ${layer.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: layer.opacity }}
      transition={{ duration: 2.2, ease: 'easeOut' }} style={{ y, rotate: layer.rotate }}>
      {layer.el}
    </motion.div>
  );
}

export default function MapTextures() {
  const { scrollYProgress } = useScroll();
  return (
    <div className="map-overlay">
      {layers.map((layer, i) => <TextureLayer key={i} layer={layer} scrollYProgress={scrollYProgress} />)}
      <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse at 50% 38%, transparent 55%, rgba(12,35,64,0.05) 100%)' }} />
    </div>
  );
}
