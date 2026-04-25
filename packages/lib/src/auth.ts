import { supabase } from './supabase';
import type { Profile } from '@dolphinboo/types';

/**
 * Signs in anonymously. The DB trigger `on_auth_user_created` will
 * automatically create a matching row in `public.profiles`.
 */
export async function signInAnonymously() {
  const { data, error } = await supabase.auth.signInAnonymously();
  if (error) throw error;
  return data.user;
}

export async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

export async function getProfile(userId: string): Promise<Profile | null> {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();
  if (error) return null;
  return data;
}
