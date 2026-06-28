'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const links = [
  ['Services', '#services'],
  ['Trips', '#trips'],
  ['About', '#about'],
  ['Journal', '#journal'],
  ['Why an advisor', '#why'],
  ['Contact', '#contact'],
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 40));

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 px-6 py-4 transition-all duration-500 ${
        scrolled ? 'bg-parchment/75 backdrop-blur-xl border-b border-navy/10' : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2.5 group">
          <span className="grid place-items-center w-8 h-8 rounded-full border border-brass text-brass">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="12" cy="12" r="9" />
              <polygon points="12,7 14,12 12,11 10,12" fill="currentColor" stroke="none" />
              <polygon points="12,17 14,12 12,13 10,12" fill="currentColor" stroke="none" opacity="0.5" />
            </svg>
          </span>
          <span className="font-display text-xl tracking-tight text-navy leading-none">Chronicle <span className="text-brass">&amp;</span> Compass</span>
        </a>

        <div className="hidden md:flex items-center gap-7">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-navy/70 hover:text-navy transition-colors text-sm font-medium">{label}</a>
          ))}
          <a href="#contact" className="px-5 py-2 rounded-full bg-navy text-parchment text-sm font-medium hover:bg-brass transition-colors">Plan your trip</a>
        </div>

        <button onClick={() => setOpen(!open)} className="md:hidden text-navy" aria-label="Menu">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open ? <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>

      {open && (
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-4 rounded-2xl bg-parchment/95 backdrop-blur-xl border border-navy/10 p-5 space-y-3">
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} className="block text-navy/75 hover:text-navy py-1">{label}</a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} className="block text-center px-5 py-2 rounded-full bg-navy text-parchment font-medium">Plan your trip</a>
        </motion.div>
      )}
    </motion.nav>
  );
}
