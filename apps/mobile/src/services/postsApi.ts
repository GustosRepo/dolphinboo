export type FeedPost = {
  body: string;
  id: string;
  title: string;
  visibility: 'free' | 'exclusive';
};

export async function fetchFreePosts(): Promise<FeedPost[]> {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing Supabase env vars.');
  }

  const response = await fetch(
    `${url}/rest/v1/posts?select=id,title,body,visibility&visibility=eq.free&published=eq.true&order=created_at.desc`,
    {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    },
  );

  const body = await response.text();

  if (!response.ok) {
    throw new Error(formatApiError(response.status, body));
  }

  return JSON.parse(body) as FeedPost[];
}

function formatApiError(status: number, body: string) {
  if (!body) {
    return `Supabase responded with HTTP ${status}.`;
  }

  try {
    const parsed = JSON.parse(body) as Record<string, unknown>;
    return `HTTP ${status}: ${String(parsed['message'] ?? parsed['hint'] ?? body)}`;
  } catch {
    return `HTTP ${status}: ${body.slice(0, 160)}`;
  }
}
