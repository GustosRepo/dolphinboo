type SmokeTestResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

export async function runSupabaseSmokeTest(): Promise<SmokeTestResult> {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return { ok: false, message: 'Missing Supabase env vars.' };
  }

  try {
    const response = await fetch(`${url}/rest/v1/posts?select=id&limit=1`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
    });

    const body = await response.text();

    if (!response.ok) {
      return {
        ok: false,
        message: `HTTP ${response.status}: ${formatResponseBody(body)}`,
      };
    }

    return { ok: true, message: `Supabase REST connection works. ${formatResponseBody(body)}` };
  } catch (error) {
    return {
      ok: false,
      message: error instanceof Error ? error.message : 'Supabase request failed.',
    };
  }
}

function formatResponseBody(body: string) {
  if (!body) {
    return 'No response body.';
  }

  try {
    const parsed = JSON.parse(body) as unknown;
    if (Array.isArray(parsed)) {
      return `${parsed.length} row(s) visible.`;
    }

    if (parsed && typeof parsed === 'object') {
      const record = parsed as Record<string, unknown>;
      return String(record['message'] ?? record['hint'] ?? JSON.stringify(record));
    }
  } catch {
    return body.slice(0, 160);
  }

  return body.slice(0, 160);
}
