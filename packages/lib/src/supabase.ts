import { createClient } from '@supabase/supabase-js';
import type { Database } from '@dolphinboo/types';

// Supports both Next.js (NEXT_PUBLIC_) and Expo (EXPO_PUBLIC_) environments
const supabaseUrl =
  (typeof process !== 'undefined' && process.env['NEXT_PUBLIC_SUPABASE_URL']) ||
  (typeof process !== 'undefined' && process.env['EXPO_PUBLIC_SUPABASE_URL']) ||
  '';

const supabaseAnonKey =
  (typeof process !== 'undefined' && process.env['NEXT_PUBLIC_SUPABASE_ANON_KEY']) ||
  (typeof process !== 'undefined' && process.env['EXPO_PUBLIC_SUPABASE_ANON_KEY']) ||
  '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    '[dolphinboo/lib] Missing Supabase env vars. ' +
      'Set NEXT_PUBLIC_SUPABASE_URL / EXPO_PUBLIC_SUPABASE_URL and the matching ANON_KEY.',
  );
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
