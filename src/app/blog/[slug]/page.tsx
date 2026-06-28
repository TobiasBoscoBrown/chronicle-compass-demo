import { getPostBySlug, getAllPosts } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) return {};
  return { title: `${post.title} | Chronicle & Compass`, description: post.excerpt };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  return (
    <main className="min-h-screen bg-transparent text-navy">
      <Navigation />
      <article className="relative px-6 pt-32 pb-24">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="text-sm text-brass hover:text-navy transition-colors">&larr; All posts</Link>
          <div className="mt-6 mb-8">
            <div className="text-[12px] uppercase tracking-widest text-brass mb-4">{post!.category}</div>
            <h1 className="text-4xl md:text-5xl tracking-tight leading-[1.1]">{post!.title}</h1>
            <div className="mt-5 text-navy/50 text-sm">
              {post!.author ? `${post!.author} · ` : ''}
              {new Date(post!.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
          </div>
          {post!.heroImage && (
            <div className="mb-12 rounded-2xl overflow-hidden border border-navy/10">
              <img src={post!.heroImage} alt={post!.title} className="w-full" />
            </div>
          )}
          <div className="article-body">
            <MDXRemote source={post!.content || ''} />
          </div>

          <div className="mt-16 pt-10 border-t border-navy/10 text-center">
            <h3 className="font-display text-2xl">Want help planning the trip behind this story?</h3>
            <p className="mt-2 text-navy/60">Tell me roughly where and when. I&rsquo;ll come back with two or three honest options.</p>
            <Link href="/#contact" className="mt-6 inline-block px-7 py-3.5 rounded-full bg-navy text-parchment font-medium hover:bg-brass transition-colors">Start the conversation</Link>
          </div>
        </div>
      </article>
    </main>
  );
}
