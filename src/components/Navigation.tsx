'use client';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const LOGO = 'https://chronicle-compass.com/assets/logo-CPpUDTdf.png';
const PHONE = '1-630-310-2861';

const links = [
  ['Services', '/#services'],
  ['Trips', '/#trips'],
  ['Journal', '/blog'],
  ['Why an advisor', '/#why'],
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 36));

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 px-5 sm:px-6 py-3 backdrop-blur-xl border-b transition-[background-color,border-color] duration-500 ease-out ${
        scrolled ? 'bg-parchment/85 border-navy/10' : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        <a href="/" className="flex items-center shrink-0">
          <img
            src={LOGO}
            alt="Chronicle & Compass Travel"
            className="h-12 sm:h-14 md:h-16 w-auto"
            style={{ mixBlendMode: 'multiply' }}
          />
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-7">
          {links.map(([label, href]) => (
            <a key={label} href={href} className="text-navy/70 hover:text-navy transition-colors text-sm font-medium">{label}</a>
          ))}
          <a href="/#start" className="px-5 py-2 rounded-full bg-navy text-parchment text-sm font-medium hover:bg-brass transition-colors">Plan your trip</a>
        </div>

        {/* Mobile: phone number always visible + menu */}
        <div className="flex md:hidden items-center gap-3">
          <a href="tel:+16303102861" className="inline-flex items-center gap-1.5 text-navy text-sm font-semibold">
            <svg className="w-4 h-4 text-brass" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.3 1l-2.2 2.2z" />
            </svg>
            {PHONE}
          </a>
          <button onClick={() => setOpen(!open)} className="text-navy" aria-label="Menu">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {open ? <path strokeLinecap="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /> : <path strokeLinecap="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden mt-3 rounded-2xl bg-parchment/95 backdrop-blur-xl border border-navy/10 p-5 space-y-3"
        >
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} className="block text-navy/75 hover:text-navy py-1">{label}</a>
          ))}
          <a href="tel:+16303102861" onClick={() => setOpen(false)} className="block text-navy font-semibold py-1">Call {PHONE}</a>
          <a href="/#start" onClick={() => setOpen(false)} className="block text-center px-5 py-2 rounded-full bg-navy text-parchment font-medium">Plan your trip</a>
        </motion.div>
      )}
    </motion.nav>
  );
}
