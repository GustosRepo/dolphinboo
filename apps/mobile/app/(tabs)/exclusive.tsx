import { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import { getExclusivePosts } from '@dolphinboo/lib';
import type { Post } from '@dolphinboo/types';
import { useProfile } from '@/hooks/useProfile';
import { PostCard } from '@/components/PostCard';
import { LockedContent } from '@/components/LockedContent';

export default function ExclusiveScreen() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const { profile } = useProfile();

  const isSubscriber = profile?.subscription_status === 'active';

  useEffect(() => {
    if (!isSubscriber) {
      setLoading(false);
      return;
    }
    getExclusivePosts()
      .then(setPosts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [isSubscriber]);

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#2563eb" />
      </View>
    );
  }

  if (!isSubscriber) {
    return (
      <View className="flex-1 bg-white">
        <View className="px-4 pt-12 pb-2">
          <Text className="text-2xl font-bold text-gray-900">Exclusive</Text>
        </View>
        <LockedContent />
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
            <Text className="text-2xl font-bold text-gray-900">Exclusive</Text>
            <Text className="text-sm text-gray-500 mt-1">Members-only content</Text>
          </View>
        }
        renderItem={({ item }) => <PostCard post={item} />}
        ListEmptyComponent={
          <View className="px-4 py-8 items-center">
            <Text className="text-gray-400">No exclusive posts yet.</Text>
          </View>
        }
        contentContainerStyle={{ paddingBottom: 32 }}
      />
    </View>
  );
}
