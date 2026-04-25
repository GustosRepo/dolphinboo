import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getFreePosts } from '@dolphinboo/lib';
import type { Post } from '@dolphinboo/types';
import { PostCard } from '@/components/PostCard';
import { AdBanner } from '@/components/AdBanner';
import { useProfile } from '@/hooks/useProfile';

export default function HomeScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();

  const isSubscriber = profile?.subscription_status === 'active';

  useEffect(() => {
    getFreePosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

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
        data={posts}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View className="px-4 pt-12 pb-4">
            <Text className="text-2xl font-bold text-gray-900">DolphinBoo</Text>
            <Text className="text-sm text-gray-500 mt-1">Latest posts</Text>
          </View>
        }
        renderItem={({ item }) => <PostCard post={item} />}
        ListEmptyComponent={
          <View className="px-4 py-8 items-center">
            <Text className="text-gray-400">No posts yet.</Text>
          </View>
        }
        ListFooterComponent={!isSubscriber ? <AdBanner /> : null}
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}
