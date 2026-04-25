import { useEffect, useState } from 'react';
import { getProfile } from '@dolphinboo/lib';
import type { Profile } from '@dolphinboo/types';
import { useAuth } from './useAuth';

export function useProfile() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }
    getProfile(user.id)
      .then(setProfile)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user?.id]);

  return { profile, loading };
}
