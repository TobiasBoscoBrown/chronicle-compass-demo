'use client';

import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';
import LeadForm from '@/components/LeadForm';

const reveal = {
  initial: { opacity: 0, y: 26 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-90px' },
  transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] as const },
};

const WA = 'https://wa.me/16303102861?text=Hi%20Chronicle%20%26%20Compass!%20I%27d%20love%20to%20start%20planning%20a%20trip.';
const HEADSHOT = 'https://chronicle-compass.com/assets/advisor-headshot-NMM2Pxy1.jpg';
const DESK = 'https://chronicle-compass.com/assets/advisor-desk-Ds3SbPrx.jpg';

const trust = [
  ['12+', 'years advising'],
  ['16+', 'countries, first-hand'],
  ['IATA', 'accredited'],
  ['CLIA', 'member'],
  ['Fora', 'certified advisor'],
  ['24/7', 'on-trip support'],
];

const services = [
  ['Luxury Escapes', 'Private villas, first-class flights, concierge throughout.'],
  ['Honeymoons', 'Quiet beaches, candlelit dinners, once-in-a-lifetime rooms.'],
  ['Cruises', 'Ocean, river, and expedition voyages on the lines we trust.'],
  ['Group & Family', 'Friends, family, milestone trips, every logistic handled.'],
  ['Custom Itineraries', 'Day-by-day journeys built around how you like to travel.'],
  ['Safaris', 'Tented camps, private guides, and the great migrations.'],
  ['Destination Weddings', 'From welcome dinners to room blocks for every guest.'],
  ['Historical Travel', 'After-hours access, private historians, battlefield guides.'],
  ['Las Vegas & Europe', 'A local Vegas expert; slow, layered European packages.'],
];

const trips = [
  ['A Weekend in Las Vegas', '3 days · 2 nights', 'Quick reset, dialed-in luxury, the rooms and tables locals actually go to.'],
  ['European Rail Journey', '10 days · 4 cities', 'Paris to Rome by first-class rail, no airports between stops.'],
  ['Alaska Cruisetour', '8 days · land + sea', 'Glaciers, bears, and Denali, one foot on land and one at sea.'],
];

const why = [
  ['Perks you cannot request yourself', 'Upgrades, breakfast, and resort credits through preferred-partner relationships.'],
  ['Insider access', 'Properties and experiences that book out months ahead, opened up for you.'],
  ['A real human when plans change', 'A flight cancels or a connection misses, and someone who knows you picks up.'],
  ['Honest opinions', 'Including the trip I would quietly steer you away from.'],
];

const partners = ['Virtuoso', 'Four Seasons Preferred', 'Rosewood Elite', 'Belmond Bellini Club', 'Rocco Forte Knights', 'Mandarin Oriental Fan Club', 'Hyatt Privé', 'Hilton for Luxury', 'Relais & Châteaux'];

const journal = [
  { title: 'Historical Sites in Italy: After-Hours Access and Private Tours', cat: 'Europe', read: '8 min read',
    excerpt: 'The best way to see Italy’s landmarks is not in the midday crowds. How after-hours entry and private guides change everything.',
    href: '/blog/historical-sites-italy' },
  { title: 'The best time to visit Europe (from someone who plans it for a living)', cat: 'Europe', read: '6 min read',
    excerpt: 'Summer in Europe is overrated and overpriced. The month-by-month breakdown I give every client, and the two windows I book for myself.',
    href: '/blog/best-time-to-visit-europe' },
  { title: '5 mistakes first-time cruisers make (and how to avoid them)', cat: 'Cruises', read: '5 min read',
    excerpt: 'Cruising is one of the best values in travel, if you book it right. The five mistakes I see most often, and what to do instead.',
    href: '/blog/first-time-cruiser-mistakes' },
];

export default function Home() {
  return (
    <main id="top" className="min-h-screen text-navy overflow-hidden">
      <Navigation />

      {/* Header: lead with Kristy */}
      <header className="relative px-6 pt-32 pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1, ease: [0.25, 0.1, 0.25, 1] }}
            className="order-1 md:order-2"
          >
            <div className="relative mx-auto w-56 sm:w-72 md:w-full max-w-md rounded-[2rem] overflow-hidden border border-navy/10 shadow-[0_30px_70px_-40px_rgba(12,35,64,0.55)]">
              <img src={HEADSHOT} alt="Kristy Contreras, your travel advisor at Chronicle & Compass" className="w-full object-cover" />
            </div>
            <p className="mt-4 text-center md:text-left text-sm text-navy/55">Kristy Contreras · your personal advisor</p>
          </motion.div>

          <div className="order-2 md:order-1 text-center md:text-left">
            <motion.span initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.1 }}
              className="text-[12px] tracking-widest2 uppercase text-brass">Personal Travel Advisor · Travel, written by hand</motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1.1, delay: 0.2 }}
              className="mt-5 text-4xl sm:text-5xl md:text-6xl tracking-tight leading-[1.06]">Hi, I&rsquo;m Kristy.</motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.35 }}
              className="mt-6 text-lg text-navy/70 leading-relaxed">
              I&rsquo;m a history buff and a card-carrying perfectionist, the kind who reconfirms the reconfirmation and reads the resort&rsquo;s renovation schedule before booking the room. I&rsquo;m the researcher, going deep on every destination until I find the side chapel most tourists walk past and the table that stopped taking reservations a year ago.
            </motion.p>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.45 }}
              className="mt-4 text-lg text-navy/70 leading-relaxed">
              Chronicle &amp; Compass is a boutique practice on purpose. I cap how many clients I take at once so every trip gets the care it deserves. Work with me and you&rsquo;re not getting a portal and a quote. You&rsquo;re getting me.
            </motion.p>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
              className="mt-8 text-xs uppercase tracking-widest text-navy/45">IATA Accredited · CLIA Member · Fora Certified Advisor</motion.p>
          </div>
        </div>
      </header>

      {/* Primary CTA, right after the header */}
      <section id="start" className="relative px-6 pb-20">
        <motion.div {...reveal} className="max-w-3xl mx-auto">
          <div className="grid md:grid-cols-[1.1fr_1fr] gap-7 md:gap-8 items-center rounded-3xl border border-navy/10 bg-white/60 backdrop-blur-sm p-6 sm:p-8 md:p-9">
            <div>
              <h2 className="font-display text-2xl md:text-3xl leading-snug">Prefer a call? Leave your number.</h2>
              <p className="mt-3 text-navy/65">Drop your name and number and Kristy gives you a callback within the day. No portal, no pressure.</p>
              <blockquote className="mt-5 border-l-2 border-brass/50 pl-4 text-navy/75 italic leading-relaxed">&ldquo;I love doing phone calls because we both gain so much more trust when we&rsquo;re having a real conversation.&rdquo;<cite className="mt-1.5 block not-italic text-sm text-navy/55">- Kristy Inzinga Contreras</cite></blockquote>
              <div className="mt-5 flex flex-wrap gap-4 text-sm">
                <a href="tel:+16303102861" className="inline-flex items-center gap-2 text-navy hover:text-brass transition-colors"><Dot /> 1-630-310-2861</a>
                <a href={WA} className="inline-flex items-center gap-2 text-navy hover:text-brass transition-colors"><Dot /> WhatsApp</a>
              </div>
            </div>
            <LeadForm variant="panel" />
          </div>
        </motion.div>
      </section>

      {/* Trust bar */}
      <section className="relative px-6 py-12 border-y border-navy/10 bg-white/35 backdrop-blur-sm">
        <motion.div {...reveal} className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-x-6 gap-y-8 text-center">
          {trust.map(([big, small]) => (
            <div key={small}>
              <div className="font-display text-2xl md:text-3xl text-navy">{big}</div>
              <div className="mt-1 text-[11px] uppercase tracking-widest text-navy/50">{small}</div>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Services */}
      <section id="services" className="relative px-6 py-24 md:py-32">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl tracking-tight">Whatever the trip, begin here.</h2>
            <p className="mt-5 text-lg text-navy/60 max-w-2xl mx-auto">Chosen carefully, planned completely, from the first all-inclusive with the kids to the milestone safari.</p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map(([title, desc], i) => (
              <motion.div key={title} {...reveal} transition={{ ...reveal.transition, delay: (i % 3) * 0.1 }}
                className="rounded-2xl border border-navy/10 bg-white/70 p-7 hover:bg-white hover:shadow-[0_24px_60px_-40px_rgba(12,35,64,0.5)] transition-[background-color,box-shadow,border-color] duration-300">
                <h3 className="font-display text-2xl">{title}</h3>
                <p className="mt-3 text-navy/60 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Signature trips */}
      <section id="trips" className="relative px-6 py-24 md:py-32 border-y border-navy/10 bg-white/35 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal} className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl tracking-tight">Three trips I&rsquo;d plan tomorrow</h2>
            <p className="mt-5 text-lg text-navy/60 max-w-2xl mx-auto">Starting points, not packages. Every detail bends to you.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {trips.map(([title, meta, desc], i) => (
              <motion.div key={title} {...reveal} transition={{ ...reveal.transition, delay: i * 0.12 }}
                className="rounded-2xl border border-navy/10 bg-white/70 p-8">
                <div className="text-[11px] uppercase tracking-widest text-brass">{meta}</div>
                <h3 className="mt-3 font-display text-2xl">{title}</h3>
                <p className="mt-3 text-navy/60 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why an advisor */}
      <section id="why" className="relative px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div {...reveal}>
            <span className="text-[12px] tracking-widest2 uppercase text-brass">Why a travel advisor</span>
            <h2 className="mt-4 text-3xl md:text-5xl tracking-tight text-balance">The internet can book a trip. It can&rsquo;t worry on your behalf.</h2>
            <div className="mt-10 space-y-7">
              {why.map(([t, d]) => (
                <div key={t} className="border-t border-navy/10 pt-5">
                  <h3 className="font-display text-xl">{t}</h3>
                  <p className="mt-2 text-navy/60 leading-relaxed">{d}</p>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div {...reveal}>
            <div className="rounded-3xl overflow-hidden border border-navy/10 shadow-[0_30px_70px_-40px_rgba(12,35,64,0.5)]">
              <img src={DESK} alt="Travel journal, brass compass and folded map on a desk" className="w-full object-cover" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journal */}
      <section id="journal" className="relative px-6 py-24 md:py-32 border-y border-navy/10 bg-white/35 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.div {...reveal} className="text-center mb-14">
            <span className="text-[12px] tracking-widest2 uppercase text-brass">From the journal</span>
            <h2 className="mt-4 text-4xl md:text-5xl tracking-tight">Field notes, freshly written.</h2>
            <p className="mt-5 text-lg text-navy/60 max-w-2xl mx-auto">Stories, local guides, and what I&rsquo;m learning on the road. Written by hand, no AI filler.</p>
          </motion.div>
          <div className="grid md:grid-cols-3 gap-6">
            {journal.map((post, i) => (
              <motion.a key={post.title} href={post.href} {...reveal} transition={{ ...reveal.transition, delay: i * 0.1 }}
                className="group flex flex-col rounded-2xl border border-navy/10 bg-white/70 p-7 hover:bg-white hover:shadow-[0_24px_60px_-40px_rgba(12,35,64,0.5)] transition-[background-color,box-shadow,border-color] duration-300">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-brass">
                  <span>{post.cat}</span><span className="text-navy/20">·</span><span className="text-navy/45">{post.read}</span>
                </div>
                <h3 className="mt-4 font-display text-xl leading-snug">{post.title}</h3>
                <p className="mt-3 text-navy/60 leading-relaxed flex-1">{post.excerpt}</p>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-navy group-hover:text-brass transition-colors">
                  Read post
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
                </span>
              </motion.a>
            ))}
          </div>
          <motion.div {...reveal} className="mt-12 text-center">
            <a href="/blog" className="inline-flex items-center gap-1.5 text-sm font-medium text-brass">See all posts
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Partners + testimonial */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="max-w-6xl mx-auto">
          <motion.div {...reveal} className="text-center">
            <span className="text-[12px] tracking-widest2 uppercase text-brass">The perks of a global network</span>
            <h2 className="mt-4 text-3xl md:text-4xl tracking-tight max-w-3xl mx-auto text-balance">A proud affiliate of Fora, named one of the TIME100 Most Influential Companies of 2026.</h2>
            <p className="mt-5 text-navy/60 max-w-2xl mx-auto">VIP perks across 5,000+ hotel, cruise, and experience partners. The same price as booking direct, with upgrades, breakfast, resort credits, and white-glove service.</p>
          </motion.div>
          <motion.div {...reveal} className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-navy/55">
            {partners.map((p) => (<span key={p} className="whitespace-nowrap">{p}</span>))}
          </motion.div>
          <motion.blockquote {...reveal} className="mt-20 max-w-3xl mx-auto text-center border-t border-navy/10 pt-16">
            <p className="font-display text-2xl md:text-3xl leading-snug text-navy/90 text-balance">&ldquo;I gave some simple requests and a general location. Each time she chose a unique place to stay that made our trip even more special and meaningful.&rdquo;</p>
            <footer className="mt-6 text-sm uppercase tracking-widest text-navy/45">Charity G. · California road trip</footer>
          </motion.blockquote>
        </div>
      </section>

      {/* Footer CTA: quick and easy, always at the bottom */}
      <section id="contact" className="relative px-6 py-20 md:py-24 border-t border-navy/10 bg-white/45 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 md:gap-12 items-center">
          <motion.div {...reveal}>
            <span className="text-[12px] tracking-widest2 uppercase text-brass">Ready when you are</span>
            <h2 className="mt-4 text-3xl md:text-5xl tracking-tight text-balance">Let&rsquo;s chronicle your next chapter.</h2>
            <p className="mt-5 text-navy/65 leading-relaxed">Leave your number for a callback within the day, or reach me directly.</p>
            <div className="mt-7 space-y-3 text-navy/75">
              <a href="tel:+16303102861" className="flex items-center gap-3 hover:text-brass transition-colors"><Dot /> 1-630-310-2861</a>
              <a href={WA} className="flex items-center gap-3 hover:text-brass transition-colors"><Dot /> WhatsApp</a>
              <a href="mailto:kristycontreras@chronicle-compass.com" className="flex items-center gap-3 hover:text-brass transition-colors break-all"><Dot /> kristycontreras@chronicle-compass.com</a>
            </div>
          </motion.div>
          <motion.div {...reveal}><LeadForm variant="panel" /></motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative px-6 py-12 bg-navy text-parchment">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="flex items-center gap-2.5">
            <span className="grid place-items-center w-8 h-8 rounded-full border border-brass text-brass">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="9" /><polygon points="12,7 14,12 12,11 10,12" fill="currentColor" stroke="none" /></svg>
            </span>
            <span className="font-display text-lg">Chronicle &amp; Compass</span>
          </div>
          <div className="text-parchment/70 text-sm">History comes alive in every journey. Curated trips, written by hand.</div>
          <div className="text-parchment/50 text-xs">IATA · CLIA · Fora · © 2026</div>
        </div>
      </footer>

      <a href="#start" className="fixed bottom-5 right-5 z-40 md:hidden px-5 py-3 rounded-full bg-brass text-navy font-medium shadow-lg">Plan your trip</a>
    </main>
  );
}

function Dot() { return <span className="inline-block w-1.5 h-1.5 rounded-full bg-brass shrink-0" />; }
