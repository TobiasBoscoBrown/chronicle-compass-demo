'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '@/components/Navigation';

interface Post { slug: string; title: string; date: string; category: string; excerpt: string; heroImage?: string; author?: string; content?: string; }

export default function BlogCMS() {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState(false);
  const [post, setPost] = useState<Partial<Post>>({});
  const [uploading, setUploading] = useState(false);
  const [uploadErr, setUploadErr] = useState('');
  const [dragging, setDragging] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');

  const login = async () => {
    setError('');
    try {
      const res = await fetch('/api/blog/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password }) });
      if (res.ok) { setAuth(true); fetchPosts(); } else setError('Incorrect password');
    } catch { setError('Could not reach the server'); }
  };
  const fetchPosts = async () => {
    try { const r = await fetch('/api/blog', { cache: 'no-store' }); const d = await r.json(); if (Array.isArray(d.posts)) setPosts(d.posts); } catch {}
  };
  const save = async () => {
    if (!post.title) { setNotice('Add a title first.'); return; }
    setSaving(true); setNotice('');
    try {
      const res = await fetch('/api/blog', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...post, password }) });
      const d = await res.json();
      if (res.ok) { setEditing(false); setPost({}); setNotice('Saved. Publishing now, live in about a minute.'); setTimeout(fetchPosts, 1500); }
      else setNotice(d.error || 'Failed to save.');
    } catch { setNotice('Failed to save.'); } finally { setSaving(false); }
  };
  const del = async (slug: string) => {
    if (!confirm('Delete this post?')) return;
    const res = await fetch(`/api/blog?slug=${encodeURIComponent(slug)}&password=${encodeURIComponent(password)}`, { method: 'DELETE' });
    if (res.ok) { setNotice('Deleted. Updating.'); setTimeout(fetchPosts, 1500); } else setNotice('Failed to delete.');
  };
  const onFile = (file?: File | null) => {
    if (!file || !file.type.startsWith('image/')) { setUploadErr('Choose an image file'); return; }
    setUploading(true); setUploadErr('');
    const reader = new FileReader(); reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const dataBase64 = (reader.result as string).split(',')[1];
      try {
        const res = await fetch('/api/blog/upload', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ password, filename: file.name, dataBase64 }) });
        const d = await res.json();
        if (res.ok) setPost((p) => ({ ...p, heroImage: d.path })); else setUploadErr(d.error || 'Upload failed');
      } catch { setUploadErr('Upload failed'); } finally { setUploading(false); }
    };
  };

  if (!auth) return (
    <main className="min-h-screen bg-transparent text-navy">
      <Navigation />
      <section className="relative min-h-screen flex items-center justify-center px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full p-8 border border-navy/10 rounded-2xl bg-white/70 backdrop-blur-sm">
          <h1 className="text-3xl mb-3 text-center">Journal CMS</h1>
          <p className="text-navy/60 mb-6 text-center text-sm">Enter your password to manage posts</p>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && login()} placeholder="Password" className="cms-input mb-4" />
          {error && <p className="text-sea mb-4 text-center text-sm">{error}</p>}
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={login} className="w-full px-6 py-3 bg-navy text-parchment rounded-full font-medium hover:bg-brass transition-colors">Access CMS</motion.button>
        </motion.div>
      </section>
    </main>
  );

  return (
    <main className="min-h-screen bg-transparent text-navy">
      <Navigation />
      <section className="relative min-h-screen px-6 pt-28 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="mb-10"><h1 className="text-4xl md:text-5xl mb-2">Journal CMS</h1><p className="text-lg text-navy/60">Write, edit, and publish, all from here.</p></div>
          {notice && <div className="mb-8 px-5 py-3 rounded-xl border border-brass/40 bg-brass/[0.08] text-sm text-navy/80">{notice}</div>}
          {!editing ? (
            <>
              <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => { setPost({}); setEditing(true); setNotice(''); }} className="mb-8 px-6 py-3 bg-navy text-parchment rounded-full font-medium hover:bg-brass transition-colors">+ New Post</motion.button>
              <div className="space-y-4">
                {posts.length === 0 && <p className="text-navy/50">No posts yet, or set GITHUB_TOKEN to load them.</p>}
                {posts.map((p) => (
                  <div key={p.slug} className="p-6 border border-navy/10 rounded-2xl bg-white/70 flex justify-between items-center gap-4">
                    <div><h3 className="text-xl mb-1">{p.title}</h3><p className="text-navy/55 text-sm">{p.date} · {p.category}</p></div>
                    <div className="flex gap-3 shrink-0">
                      <button onClick={() => { setPost(p); setEditing(true); setNotice(''); }} className="px-4 py-2 border border-navy/20 rounded-lg hover:bg-navy/[0.04] transition-colors text-sm">Edit</button>
                      <button onClick={() => del(p.slug)} className="px-4 py-2 border border-sea/30 text-sea rounded-lg hover:bg-sea/[0.08] transition-colors text-sm">Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="p-8 border border-navy/10 rounded-2xl bg-white/70">
              <h2 className="text-2xl md:text-3xl mb-8">{post.slug ? 'Edit Post' : 'New Post'}</h2>
              <div className="space-y-6">
                <Field label="Title"><input type="text" value={post.title || ''} onChange={(e) => setPost({ ...post, title: e.target.value })} className="cms-input" /></Field>
                <Field label="Category"><input type="text" value={post.category || ''} onChange={(e) => setPost({ ...post, category: e.target.value })} className="cms-input" /></Field>
                <Field label="Excerpt"><textarea value={post.excerpt || ''} onChange={(e) => setPost({ ...post, excerpt: e.target.value })} rows={3} className="cms-input resize-none" /></Field>
                <Field label="Hero Image">
                  <div onDragOver={(e) => { e.preventDefault(); setDragging(true); }} onDragLeave={(e) => { e.preventDefault(); setDragging(false); }}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); onFile(e.dataTransfer.files?.[0]); }}
                    onClick={() => document.getElementById('hero-input')?.click()}
                    className={`w-full p-8 border-2 border-dashed rounded-lg cursor-pointer transition-colors text-center ${dragging ? 'border-brass bg-brass/[0.06]' : 'border-navy/15 bg-white/60 hover:bg-navy/[0.03]'}`}>
                    <input id="hero-input" type="file" accept="image/*" onChange={(e) => onFile(e.target.files?.[0])} className="hidden" />
                    {post.heroImage ? (<div className="space-y-3"><img src={post.heroImage} alt="" className="max-h-40 mx-auto rounded-lg object-contain" /><p className="text-navy/55 text-sm">{post.heroImage}</p></div>)
                      : (<p className="text-navy/60">Drop an image here, or click to upload</p>)}
                    {uploading && <p className="text-brass text-sm mt-2">Uploading…</p>}
                    {uploadErr && <p className="text-sea text-sm mt-2">{uploadErr}</p>}
                  </div>
                </Field>
                <Field label="Content (Markdown)"><textarea value={post.content || ''} onChange={(e) => setPost({ ...post, content: e.target.value })} rows={15} className="cms-input resize-none font-mono text-sm" /></Field>
                <div className="flex gap-4">
                  <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={save} disabled={saving} className="px-8 py-3 bg-navy text-parchment rounded-full font-medium hover:bg-brass transition-colors disabled:opacity-60">{saving ? 'Saving…' : 'Save Post'}</motion.button>
                  <button onClick={() => { setEditing(false); setPost({}); }} className="px-8 py-3 border border-navy/20 rounded-full font-medium hover:bg-navy/[0.04] transition-colors">Cancel</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (<div><label className="block text-sm font-medium mb-2 text-navy/70">{label}</label>{children}</div>);
}
