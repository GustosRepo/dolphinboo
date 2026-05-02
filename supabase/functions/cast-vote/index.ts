import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const FREE_VOTE_WINDOW_MS        = 7 * 24 * 60 * 60 * 1000; // 7 days
const SUBSCRIBER_VOTE_WINDOW_MS  =     24 * 60 * 60 * 1000; // 24 hours

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // ── Auth ──────────────────────────────────────────────────────────────────
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return json({ success: false, error: 'UNAUTHORIZED' }, 401);
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } },
    );
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    );

    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return json({ success: false, error: 'UNAUTHORIZED' }, 401);
    }

    // ── Body ──────────────────────────────────────────────────────────────────
    const body = await req.json().catch(() => ({}));
    const topicId: string | undefined = body?.topic_id;
    if (!topicId) {
      return json({ success: false, error: 'MISSING_TOPIC_ID' }, 400);
    }

    // ── Topic check ───────────────────────────────────────────────────────────
    const { data: topic, error: topicError } = await supabase
      .from('topics')
      .select('status')
      .eq('id', topicId)
      .single();

    if (topicError || !topic) {
      return json({ success: false, error: 'TOPIC_NOT_FOUND' }, 404);
    }
    if (topic.status !== 'active') {
      return json({ success: false, error: 'TOPIC_CLOSED' }, 403);
    }

    // ── Subscription check ────────────────────────────────────────────────────
    const { data: profile } = await supabaseAdmin
      .from('profiles')
      .select('subscription_status')
      .eq('id', user.id)
      .single();

    const isSubscriber = profile?.subscription_status === 'active';
    const windowMs     = isSubscriber ? SUBSCRIBER_VOTE_WINDOW_MS : FREE_VOTE_WINDOW_MS;
    const windowStart  = new Date(Date.now() - windowMs).toISOString();

    // ── Rate-limit check ──────────────────────────────────────────────────────
    const { data: recentVote } = await supabaseAdmin
      .from('votes')
      .select('created_at')
      .eq('user_id', user.id)
      .gte('created_at', windowStart)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (recentVote) {
      const nextEligibleAt = new Date(
        new Date(recentVote.created_at).getTime() + windowMs,
      ).toISOString();
      return json({ success: false, error: 'VOTE_LIMIT_REACHED', next_eligible_at: nextEligibleAt }, 429);
    }

    // ── Cast vote ─────────────────────────────────────────────────────────────
    const { error: voteError } = await supabaseAdmin
      .from('votes')
      .insert({ user_id: user.id, topic_id: topicId });

    if (voteError) {
      console.error('[cast-vote] insert error:', voteError);
      return json({ success: false, error: 'VOTE_FAILED' }, 500);
    }

    return json({ success: true }, 200);
  } catch (err) {
    console.error('[cast-vote] unexpected error:', err);
    return json({ success: false, error: 'SERVER_ERROR' }, 500);
  }
});

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
