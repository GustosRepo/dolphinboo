'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase';
import type { Topic, TopicStatus } from '@dolphinboo/types';

export default function TopicsPage() {
  const supabase = createClient();
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ title: '', description: '' });
  const [saving, setSaving] = useState(false);

  async function loadTopics() {
    const { data } = await supabase
      .from('topics')
      .select('*, votes(count)')
      .order('created_at', { ascending: false });
    setTopics(
      (data ?? []).map((t: Record<string, unknown>) => ({
        ...(t as Topic),
        vote_count: (t['votes'] as Array<{ count: number }>)?.[0]?.count ?? 0,
        votes: undefined,
      })),
    );
    setLoading(false);
  }

  useEffect(() => {
    loadTopics();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    await supabase.from('topics').insert({ ...form, status: 'active' });
    setForm({ title: '', description: '' });
    await loadTopics();
    setSaving(false);
  }

  async function toggleStatus(topic: Topic) {
    const next: TopicStatus = topic.status === 'active' ? 'closed' : 'active';
    await supabase.from('topics').update({ status: next }).eq('id', topic.id);
    await loadTopics();
  }

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Topics</h1>

      {/* Create form */}
      <form
        onSubmit={handleCreate}
        className="bg-white border border-gray-200 rounded-xl p-6 mb-8"
      >
        <h2 className="text-lg font-semibold text-gray-800 mb-4">New Topic</h2>
        <div className="space-y-3">
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Topic title"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <textarea
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm h-20 resize-none outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Description (optional)"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </div>
        <button
          type="submit"
          disabled={saving}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {saving ? 'Saving…' : 'Create Topic'}
        </button>
      </form>

      {/* Topics list */}
      {loading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : (
        <div className="space-y-3">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between gap-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      topic.status === 'active'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-gray-100 text-gray-500'
                    }`}
                  >
                    {topic.status}
                  </span>
                  <span className="text-xs text-gray-400">{topic.vote_count ?? 0} votes</span>
                </div>
                <p className="font-medium text-gray-900">{topic.title}</p>
                {topic.description && (
                  <p className="text-sm text-gray-500 mt-0.5">{topic.description}</p>
                )}
              </div>
              <button
                onClick={() => toggleStatus(topic)}
                className={`text-sm border px-3 py-1.5 rounded-lg shrink-0 transition ${
                  topic.status === 'active'
                    ? 'text-orange-500 border-orange-100 hover:text-orange-700'
                    : 'text-green-600 border-green-100 hover:text-green-800'
                }`}
              >
                {topic.status === 'active' ? 'Close' : 'Reopen'}
              </button>
            </div>
          ))}
          {topics.length === 0 && (
            <p className="text-sm text-gray-400 text-center py-8">No topics yet.</p>
          )}
        </div>
      )}
    </div>
  );
}
