import { createClient } from '@supabase/supabase-js';
import type { Database } from '@dolphinboo/types';

// Server component — reads from Supabase directly
async function getStats() {
  const supabase = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const [votesRes, topicsRes, profilesRes] = await Promise.all([
    supabase.from('votes').select('id', { count: 'exact', head: true }),
    supabase.from('topics').select('id', { count: 'exact', head: true }).eq('status', 'active'),
    supabase
      .from('profiles')
      .select('id', { count: 'exact', head: true })
      .eq('subscription_status', 'active'),
  ]);

  return {
    totalVotes: votesRes.count ?? 0,
    activeTopics: topicsRes.count ?? 0,
    // TODO: Cross-reference with RevenueCat webhook for accurate subscriber count
    subscribers: profilesRes.count ?? 0,
  };
}

function StatCard({
  label,
  value,
  note,
}: {
  label: string;
  value: number;
  note?: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-3xl font-bold text-gray-900 mt-1">{value.toLocaleString()}</p>
      {note && <p className="text-xs text-gray-400 mt-2">{note}</p>}
    </div>
  );
}

export default async function AnalyticsPage() {
  const stats = await getStats();

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Analytics</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Total Votes" value={stats.totalVotes} />
        <StatCard label="Active Topics" value={stats.activeTopics} />
        <StatCard
          label="Subscribers"
          value={stats.subscribers}
          note="Based on local profile table — verify via RevenueCat in Phase 5"
        />
      </div>
    </div>
  );
}
