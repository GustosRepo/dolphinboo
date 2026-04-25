import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { signInAnonymously } from '@dolphinboo/lib';
import '../global.css';

export default function RootLayout() {
  useEffect(() => {
    // Silently sign in anonymously on first launch.
    // The DB trigger creates a matching profile row automatically.
    signInAnonymously().catch(console.error);
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
