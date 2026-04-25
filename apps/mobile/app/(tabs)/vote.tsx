import { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { getActiveTopics, supabase } from '@dolphinboo/lib';
import type { Topic, VoteResponse } from '@dolphinboo/types';
import { useProfile } from '@/hooks/useProfile';

export default function VoteScreen() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [loading, setLoading] = useState(true);
  const [voting, setVoting] = useState<string | null>(null);
  const { profile } = useProfile();

  const isSubscriber = profile?.subscription_status === 'active';

  useEffect(() => {
    getActiveTopics()
      .then(setTopics)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  async function handleVote(topicId: string) {
    setVoting(topicId);
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const res = await fetch(
        `${process.env.EXPO_PUBLIC_SUPABASE_URL}/functions/v1/cast-vote`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ topic_id: topicId }),
        },
      );

      const result: VoteResponse = await res.json();

      if (result.success) {
        Alert.alert('Voted!', 'Your vote has been cast.');
        setTopics((prev) =>
          prev.map((t) =>
            t.id === topicId ? { ...t, vote_count: (t.vote_count ?? 0) + 1 } : t,
          ),
        );
      } else if (result.error === 'VOTE_LIMIT_REACHED') {
        const next = result.next_eligible_at
          ? new Date(result.next_eligible_at).toLocaleDateString()
          : 'later';
        Alert.alert(
          'Vote limit reached',
          `You can vote again on ${next}.\n\nUpgrade to DolphinBoo+ to vote daily.`,
        );
      } else if (result.error === 'TOPIC_CLOSED') {
        Alert.alert('Topic closed', 'This topic is no longer accepting votes.');
      } else {
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch {
      Alert.alert('Error', 'Could not connect. Check your connection and try again.');
    } finally {
      setVoting(null);
    }
  }

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <FlatList
        data={topics}
        keyExtractor={(t) => t.id}
        ListHeaderComponent={
          <View className="px-4 pt-12 pb-4">
            <Text className="text-2xl font-bold text-gray-900">Vote</Text>
            <Text className="text-sm text-gray-500 mt-1">
              {isSubscriber
                ? 'DolphinBoo+ — vote once per day'
                : 'Free plan — vote once per week · upgrade for daily votes'}
            </Text>
          </View>
        }
        renderItem={({ item }) => (
          <View className="mx-4 mb-3 p-4 border border-gray-200 rounded-xl">
            <Text className="text-base font-semibold text-gray-900">{item.title}</Text>
            {item.description ? (
              <Text className="text-sm text-gray-500 mt-1">{item.description}</Text>
            ) : null}
            <View className="flex-row items-center justify-between mt-3">
              <Text className="text-xs text-gray-400">{item.vote_count ?? 0} votes</Text>
              <TouchableOpacity
                onPress={() => handleVote(item.id)}
                disabled={voting === item.id}
                className="bg-blue-600 px-4 py-2 rounded-lg"
              >
                {voting === item.id ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white text-sm font-medium">Vote</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View className="px-4 py-8 items-center">
            <Text className="text-gray-400">No active topics right now.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}
