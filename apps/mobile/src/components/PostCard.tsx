import { View, Text, Image } from 'react-native';
import type { Post } from '@dolphinboo/types';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <View className="mx-4 mb-4 border border-gray-200 rounded-xl overflow-hidden">
      {post.media_url ? (
        <Image
          source={{ uri: post.media_url }}
          className="w-full h-48"
          resizeMode="cover"
          accessibilityLabel={post.title}
        />
      ) : null}
      <View className="p-4">
        <Text className="text-base font-semibold text-gray-900">{post.title}</Text>
        <Text className="text-sm text-gray-600 mt-1 leading-5">{post.body}</Text>
        <Text className="text-xs text-gray-400 mt-2">
          {new Date(post.created_at).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );
}
