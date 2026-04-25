import { supabase } from './supabase';
import type { Topic } from '@dolphinboo/types';

function mapVoteCount(row: Record<string, unknown>): Topic {
  const votes = row['votes'] as Array<{ count: number }> | undefined;
  return {
    ...(row as Topic),
    vote_count: votes?.[0]?.count ?? 0,
    votes: undefined,
  } as unknown as Topic;
}

export async function getActiveTopics(): Promise<Topic[]> {
  const { data, error } = await supabase
    .from('topics')
    .select('*, votes(count)')
    .eq('status', 'active')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapVoteCount);
}

export async function getAllTopics(): Promise<Topic[]> {
  const { data, error } = await supabase
    .from('topics')
    .select('*, votes(count)')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return (data ?? []).map(mapVoteCount);
}
