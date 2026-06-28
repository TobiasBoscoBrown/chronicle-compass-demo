import Link from 'next/link';
import Navigation from '@/components/Navigation';
import { getAllPosts } from '@/lib/posts';

export const metadata = {
  title: 'Journal | Chronicle & Compass',
  description: 'Field notes, local guides, and honest travel advice, written by hand by Kristy Contreras.',
};

export default function Blog() {
  const posts = getAllPosts();
  return (
    <main className="min-h-screen bg-transparent text-navy">
      <Navigation />
      <section className="relative px-6 pt-36 pb-14">
        <div className="max-w-3xl mx-auto text-center">
          <span className="text-[12px] tracking-widest2 uppercase text-brass">The Journal</span>
          <h1 className="mt-6 text-4xl md:text-6xl tracking-tight">Field notes, freshly written.</h1>
          <p className="mt-5 text-lg text-navy/60">Stories, local guides, and what I&rsquo;m learning on the road. Written by hand, no AI filler.</p>
        </div>
      </section>
      <section className="relative px-6 pb-28">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-7">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              className="group rounded-2xl border border-navy/10 bg-white/70 overflow-hidden hover:bg-white hover:shadow-[0_24px_60px_-40px_rgba(12,35,64,0.5)] transition-all duration-300">
              {post.heroImage && (
                <div className="aspect-[16/9] overflow-hidden">
                  <img src={post.heroImage} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]" />
                </div>
              )}
              <div className="p-7">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-widest text-brass">
                  <span>{post.category}</span>
                  <span className="text-navy/20">·</span>
                  <span className="text-navy/45">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <h2 className="mt-3 font-display text-2xl leading-snug">{post.title}</h2>
                <p className="mt-3 text-navy/60 leading-relaxed">{post.excerpt}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
