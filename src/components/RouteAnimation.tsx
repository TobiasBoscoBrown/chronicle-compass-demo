'use client';

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * The signature moving element, the travel cousin of a flight path: a hand-drawn
 * route line that draws itself across the map as you scroll, with a small brass
 * compass marker at the leading edge. When the page is still, the route is still.
 * Everything else stays calm and cinematic.
 */

const VW = 1920;
const VH = 1080;

// A gentle journey that drifts up and across, like a route traced on a chart.
const ROUTE = 'M -140 820 C 360 720, 600 700, 980 560 S 1520 320, 2080 240';

export default function RouteAnimation() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 50, damping: 24, mass: 0.6 });

  const pathRef = useRef<SVGPathElement>(null);
  const [mark, setMark] = useState({ x: -140, y: 820, angle: -22 });

  const place = (p: number) => {
    const path = pathRef.current;
    if (!path) return;
    const len = path.getTotalLength();
    if (!len) return;
    const c = Math.min(Math.max(p, 0), 1);
    const a = path.getPointAtLength(len * c);
    const b = path.getPointAtLength(Math.min(len, len * c + 1.2));
    const angle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
    setMark({ x: a.x, y: a.y, angle });
  };

  useMotionValueEvent(progress, 'change', place);
  useEffect(() => { place(0.0001); /* eslint-disable-next-line */ }, []);

  return (
    <div className="fixed inset-0 -z-[1] pointer-events-none overflow-hidden">
      <svg className="w-full h-full" viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(176,136,79,0)" />
            <stop offset="25%" stopColor="rgba(176,136,79,0.25)" />
            <stop offset="100%" stopColor="rgba(176,136,79,0.55)" />
          </linearGradient>
          <filter id="markShadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0c2340" floodOpacity="0.2" />
          </filter>
        </defs>

        <path ref={pathRef} d={ROUTE} fill="none" stroke="none" />

        {/* drawn route, dashed like a chart line */}
        <motion.path
          d={ROUTE}
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="2 12"
          style={{ pathLength: progress }}
        />

        {/* brass compass marker at the leading edge */}
        <g transform={`translate(${mark.x} ${mark.y})`} filter="url(#markShadow)">
          <g transform={`rotate(${mark.angle})`}>
            <circle r="13" fill="#F5EEDF" stroke="#B0884F" strokeWidth="1.5" />
            <path d="M11 0 L-4 4 L-1 0 L-4 -4 Z" fill="#0C2340" />
            <path d="M-11 0 L4 4 L1 0 L4 -4 Z" fill="#B0884F" />
          </g>
        </g>
      </svg>
    </div>
  );
}
