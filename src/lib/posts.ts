import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const dir = path.join(process.cwd(), 'src/content/blog');

export interface Post {
  slug: string; title: string; date: string; category: string;
  excerpt: string; heroImage?: string; author?: string; content?: string;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((f) => f.endsWith('.mdx')).map((f) => {
    const slug = f.replace(/\.mdx$/, '');
    const { data, content } = matter(fs.readFileSync(path.join(dir, f), 'utf8'));
    return { slug, title: data.title || '', date: data.date || '', category: data.category || '',
      excerpt: data.excerpt || '', heroImage: data.heroImage || '', author: data.author || '', content } as Post;
  }).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug: string): Post | null {
  try {
    const { data, content } = matter(fs.readFileSync(path.join(dir, `${slug}.mdx`), 'utf8'));
    return { slug, title: data.title || '', date: data.date || '', category: data.category || '',
      excerpt: data.excerpt || '', heroImage: data.heroImage || '', author: data.author || '', content } as Post;
  } catch { return null; }
}
