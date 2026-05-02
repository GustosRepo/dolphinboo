export type EnvStatus = 'ready' | 'missing';

export function getSupabaseEnvStatus(): { anonKey: string; status: EnvStatus; url: string } {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  return {
    anonKey: anonKey ? `Present (${anonKey.length} chars)` : 'Missing',
    status: url && anonKey ? 'ready' : 'missing',
    url: url ? url.replace(/^https?:\/\//, '') : 'Missing',
  };
}
