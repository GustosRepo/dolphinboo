'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import type { Post, PostVisibility } from '@dolphinboo/types';

type FormState = {
  title: string;
  body: string;
  visibility: PostVisibility;
  published: boolean;
};

const defaultForm: FormState = { title: '', body: '', visibility: 'free', published: false };

export default function PostsPage() {
  const supabase = createClient();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [saving, setSaving] = useState(false);

  async function loadPosts() {
    const { data } = await supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false });
    setPosts(data ?? []);
    setLoading(false);
  }

  useEffect(() => {
    loadPosts();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from('posts').insert(form);
    setForm(defaultForm);
    await loadPosts();
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this post? This cannot be undone.')) return;
    await supabase.from('posts').delete().eq('id', id);
    await loadPosts();
  }

  async function togglePublished(post: Post) {
    await supabase.from('posts').update({ published: !post.published }).eq('id', post.id);
    await loadPosts();
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Posts</h1>

      {/* Create form */}
      <form
        onSubmit={handleCreate}
        className="bg-white border border-gray-200 rounded-xl p-6 mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">New Post</h2>
        <div className="space-y-3">
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-28 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Body"
            value={form.body}
            onChange={(e) => setForm({ ...form, body: e.target.value })}
            required
          />
          <div className="flex items-center gap-4">
            <select
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm"
              value={form.visibility}
              onChange={(e) =>
                setForm({ ...form, visibility: e.target.value as PostVisibility })
              }
            >
              <option value="free">Free</option>
              <option value="exclusive">Exclusive</option>
            </select>
            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Published
            </label>
          </div>
        </div>
        <button
          type="submit"
          disabled={saving}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {saving ? 'Saving…' : 'Create Post'}
        </button>
      </form>

      {/* Posts list */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <div className="space-y-3">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-start justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      post.visibility === 'exclusive'
                        ? 'bg-purple-100 text-purple-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {post.visibility}
                  </span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      post.published
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="font-medium text-gray-900 truncate">{post.title}</p>
                <p className="text-sm text-gray-500 line-clamp-2 mt-0.5">{post.body}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => togglePublished(post)}
                  className="text-sm text-gray-600 hover:text-gray-900 border border-gray-200 px-3 py-1.5 rounded-lg transition"
                >
                  {post.published ? 'Unpublish' : 'Publish'}
                </button>
                <button
                  onClick={() => handleDelete(post.id)}
                  className="text-sm text-red-500 hover:text-red-700 border border-red-100 px-3 py-1.5 rounded-lg transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
          {posts.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No posts yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
