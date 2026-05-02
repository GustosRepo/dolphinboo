export type AnonymousSession = {
  accessToken: string;
  expiresAt: number | null;
  refreshToken: string;
  userId: string;
};

type SupabaseAnonymousResponse = {
  access_token?: string;
  expires_at?: number;
  refresh_token?: string;
  user?: {
    id?: string;
  };
};

export async function signInAnonymously(): Promise<AnonymousSession> {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing Supabase env vars.');
  }

  const response = await fetch(`${url}/auth/v1/signup`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data: { is_anonymous: true } }),
  });

  const body = await response.text();

  if (!response.ok) {
    throw new Error(formatApiError(response.status, body));
  }

  const parsed = JSON.parse(body) as SupabaseAnonymousResponse;

  if (!parsed.access_token || !parsed.refresh_token || !parsed.user?.id) {
    throw new Error('Anonymous auth response was missing session fields.');
  }

  return {
    accessToken: parsed.access_token,
    expiresAt: parsed.expires_at ?? null,
    refreshToken: parsed.refresh_token,
    userId: parsed.user.id,
  };
}

function formatApiError(status: number, body: string) {
  if (!body) {
    return `Auth responded with HTTP ${status}.`;
  }

  try {
    const parsed = JSON.parse(body) as Record<string, unknown>;
    return `HTTP ${status}: ${String(parsed['msg'] ?? parsed['message'] ?? parsed['error_description'] ?? body)}`;
  } catch {
    return `HTTP ${status}: ${body.slice(0, 160)}`;
  }
}
