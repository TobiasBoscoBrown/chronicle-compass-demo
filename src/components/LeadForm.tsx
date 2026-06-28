'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Quick phone-capture. Leave a name and number and Kristy calls back within the
 * day. On success it expands a prompt to her full "Trip Clarity" intake form.
 */

const FORM_URL = 'https://secure.foratravel.com/intake/chroniclecompasstravel/O2MUM81PRU';

export default function LeadForm({ variant = 'panel' }: { variant?: 'panel' | 'bare' }) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [state, setState] = useState<'idle' | 'sending' | 'done' | 'error'>('idle');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    setState('sending');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, source: 'callback' }),
      });
      setState(res.ok ? 'done' : 'error');
    } catch {
      setState('error');
    }
  };

  const wrap =
    variant === 'panel'
      ? 'rounded-2xl border border-navy/10 bg-white/80 backdrop-blur-sm p-6 sm:p-7 shadow-[0_24px_60px_-40px_rgba(12,35,64,0.45)]'
      : '';

  if (state === 'done') {
    return (
      <div className={wrap}>
        <p className="font-display text-2xl text-navy leading-snug">Kristy will give you a callback within the day.</p>
        <p className="mt-2 text-sm text-navy/65">
          Talk soon. For anything urgent, call{' '}
          <a className="text-brass underline" href="tel:+16303102861">1-630-310-2861</a>.
        </p>

        {/* Trip Clarity prompt expands in */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="overflow-hidden"
        >
          <div className="mt-5 rounded-xl border border-brass/40 bg-brass/[0.08] p-5">
            <p className="font-display text-lg text-navy">Want to fast-track it?</p>
            <p className="mt-1.5 text-sm text-navy/70">
              Fill out my free &ldquo;Trip Clarity&rdquo; form so I can start researching how to make your dream trip a reality.
            </p>
            <a
              href={FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-navy text-parchment text-sm font-medium hover:bg-brass transition-colors"
            >
              Open the Trip Clarity form
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className={wrap}>
      <div className="flex flex-col gap-3">
        <input
          name="name"
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-white/90 text-navy placeholder:text-navy/40 focus:outline-none focus:border-brass transition-colors"
        />
        <input
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          placeholder="Phone number"
          className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-white/90 text-navy placeholder:text-navy/40 focus:outline-none focus:border-brass transition-colors"
        />
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          disabled={state === 'sending'}
          className="w-full px-6 py-3.5 rounded-full bg-navy text-parchment font-medium hover:bg-brass transition-colors disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending…' : 'Request a callback'}
        </motion.button>
        {state === 'error' && (
          <p className="text-sea text-sm text-center">Something went wrong. Please call <a className="underline" href="tel:+16303102861">1-630-310-2861</a>.</p>
        )}
        <p className="text-center text-xs text-navy/50">
          Prefer to write it out? <a href={FORM_URL} target="_blank" rel="noopener noreferrer" className="text-brass underline">Fill out the free Trip Clarity form.</a>
        </p>
      </div>
    </form>
  );
}
