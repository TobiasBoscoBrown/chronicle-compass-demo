'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Quick phone-capture. Two fields, one button: leave a name and number and Kristy
 * calls you back. Submits to /api/lead, which emails the lead.
 */
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
      ? 'rounded-2xl border border-navy/10 bg-white/70 backdrop-blur-sm p-7 md:p-8 shadow-[0_24px_60px_-40px_rgba(12,35,64,0.45)]'
      : '';

  if (state === 'done') {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={wrap}>
        <p className="font-display text-2xl text-navy">Thank you, talk soon.</p>
        <p className="mt-2 text-navy/65">Kristy will call you within one business day. For anything urgent, call <a className="text-brass underline" href="tel:+16303102861">1-630-310-2861</a>.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={submit} className={wrap}>
      <div className="flex flex-col gap-3">
        <div className="grid sm:grid-cols-2 gap-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-white/80 text-navy placeholder:text-navy/40 focus:outline-none focus:border-brass transition-colors"
          />
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            required
            placeholder="Phone"
            className="w-full px-4 py-3 rounded-xl border border-navy/15 bg-white/80 text-navy placeholder:text-navy/40 focus:outline-none focus:border-brass transition-colors"
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          disabled={state === 'sending'}
          className="w-full px-6 py-3.5 rounded-full bg-navy text-parchment font-medium hover:bg-brass transition-colors disabled:opacity-60"
        >
          {state === 'sending' ? 'Sending…' : 'Request a callback'}
        </motion.button>
        {state === 'error' && (
          <p className="text-sea text-sm">Something went wrong. Please call <a className="underline" href="tel:+16303102861">1-630-310-2861</a>.</p>
        )}
        <p className="text-navy/45 text-xs text-center">No spam. Just a real person, calling you back.</p>
      </div>
    </form>
  );
}
