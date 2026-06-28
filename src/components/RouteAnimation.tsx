'use client';

import { motion, useScroll, useSpring, useMotionValueEvent } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

/**
 * The signature moving element: a paper plane that draws a hand-traced route line
 * across the map as you scroll. When the page is still, the plane is still.
 * Everything else stays calm and cinematic.
 */

const VW = 1920;
const VH = 1080;
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
            <stop offset="25%" stopColor="rgba(176,136,79,0.22)" />
            <stop offset="100%" stopColor="rgba(176,136,79,0.5)" />
          </linearGradient>
          <filter id="markShadow" x="-60%" y="-60%" width="220%" height="220%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#0c2340" floodOpacity="0.2" />
          </filter>
        </defs>

        <path ref={pathRef} d={ROUTE} fill="none" stroke="none" />

        <motion.path
          d={ROUTE}
          fill="none"
          stroke="url(#routeGrad)"
          strokeWidth={3}
          strokeLinecap="round"
          strokeDasharray="2 12"
          style={{ pathLength: progress }}
        />

        {/* paper plane at the leading edge */}
        <g transform={`translate(${mark.x} ${mark.y}) rotate(${mark.angle})`} filter="url(#markShadow)">
          <path d="M32 0 L-20 -15 L-4 0 Z" fill="#0C2340" />
          <path d="M32 0 L-20 15 L-4 0 Z" fill="#B0884F" />
          <path d="M-4 0 L-20 15 L-12 0 Z" fill="#091a2f" />
        </g>
      </svg>
    </div>
  );
}
