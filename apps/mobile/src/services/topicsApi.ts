export type ActiveTopic = {
  description: string | null;
  id: string;
  title: string;
};

export async function fetchActiveTopics(): Promise<ActiveTopic[]> {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing Supabase env vars.');
  }

  const response = await fetch(
    `${url}/rest/v1/topics?select=id,title,description&status=eq.active&order=created_at.desc`,
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

  return JSON.parse(body) as ActiveTopic[];
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
