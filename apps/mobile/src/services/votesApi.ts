export type CastVoteResult = {
  message: string;
  success: boolean;
};

type CastVoteResponse = {
  error?: string;
  next_eligible_at?: string;
  success?: boolean;
};

export async function castVote(topicId: string, accessToken: string): Promise<CastVoteResult> {
  const url = process.env.EXPO_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error('Missing Supabase env vars.');
  }

  const response = await fetch(`${url}/functions/v1/cast-vote`, {
    method: 'POST',
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ topic_id: topicId }),
  });

  const body = await response.text();
  const parsed = parseBody(body);

  if (!response.ok || !parsed.success) {
    return {
      success: false,
      message: formatVoteError(response.status, parsed, body),
    };
  }

  return { success: true, message: 'Vote counted.' };
}

function parseBody(body: string): CastVoteResponse {
  if (!body) {
    return {};
  }

  try {
    return JSON.parse(body) as CastVoteResponse;
  } catch {
    return {};
  }
}

function formatVoteError(status: number, parsed: CastVoteResponse, body: string) {
  if (parsed.error === 'VOTE_LIMIT_REACHED' && parsed.next_eligible_at) {
    return `Vote limit reached. Next vote: ${new Date(parsed.next_eligible_at).toLocaleDateString()}.`;
  }

  if (parsed.error === 'TOPIC_CLOSED') {
    return 'This topic is closed.';
  }

  if (parsed.error === 'UNAUTHORIZED') {
    return 'Sign-in expired. Try again.';
  }

  if (parsed.error === 'TOPIC_NOT_FOUND') {
    return 'Topic not found.';
  }

  if (parsed.error) {
    return `${parsed.error} (HTTP ${status})`;
  }

  return body ? `HTTP ${status}: ${body.slice(0, 160)}` : `Vote failed with HTTP ${status}.`;
}
