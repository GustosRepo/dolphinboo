import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Badge } from '../components/ui/Badge';
import { Card } from '../components/ui/Card';
import { IconBox } from '../components/ui/IconBox';
import { fetchFreePosts, type FeedPost } from '../services/postsApi';
import { colors } from '../theme/colors';

function PostItem({ post, index }: { post: FeedPost; index: number }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(20)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 400, delay: index * 80, useNativeDriver: true }),
      Animated.spring(translateY, { toValue: 0, delay: index * 80, useNativeDriver: true, speed: 12, bounciness: 5 }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }] }}>
      <Card style={styles.postCard}>
        <View style={styles.imagePlaceholder}>
          <Image source={require('../../assets/logo.png')} style={styles.placeholderImage} resizeMode="contain" />
        </View>
        <View style={styles.postBody}>
          <Badge
            label={post.visibility === 'free' ? 'Free' : 'DolphinBoo+'}
            variant={post.visibility === 'free' ? 'free' : 'premium'}
          />
          <Text style={styles.postTitle}>{post.title}</Text>
          <Text style={styles.postText} numberOfLines={2}>{post.body}</Text>
        </View>
      </Card>
    </Animated.View>
  );
}

export function HomeScreen() {
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setPosts(await fetchFreePosts());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load posts.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadPosts();
  }, [loadPosts]);

  return (
    <>
      <View style={styles.header}>
        <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        <Text style={styles.greeting}>Hey fan</Text>
        <Text style={styles.subtitle}>See what's new from the creator</Text>
      </View>

      <Pressable style={styles.promoBanner}>
        <View style={styles.promoBannerLeft}>
          <IconBox bg={colors.yellow + '44'} size={36}>
            <Ionicons name="sparkles" size={18} color={colors.yellowDark} />
          </IconBox>
          <View>
            <Text style={styles.promoTitle}>Unlock exclusive posts</Text>
            <Text style={styles.promoSub}>Upgrade to DolphinBoo+ today</Text>
          </View>
        </View>
        <Ionicons name="arrow-forward" size={18} color={colors.yellowDark} />
      </Pressable>

      {loading ? <ActivityIndicator color={colors.primary} style={{ marginVertical: 24 }} /> : null}
      {error ? (
        <Card style={styles.errorCard}>
          <Ionicons name="warning-outline" size={28} color={colors.error} />
          <Text style={styles.errorTitle}>Could not load posts</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={() => void loadPosts()} style={styles.retryBtn}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </Card>
      ) : null}
      {!loading && !error && posts.length === 0 ? (
        <View style={styles.emptyState}>
          <IconBox bg={colors.primaryLight + '33'} size={64}>
            <Ionicons name="fish-outline" size={32} color={colors.primary} />
          </IconBox>
          <Text style={styles.emptyText}>No posts yet — check back soon!</Text>
        </View>
      ) : null}
      {posts.map((post, i) => (
        <PostItem key={post.id} post={post} index={i} />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
    gap: 6,
    paddingBottom: 4,
  },
  logo: {
    width: 100,
    height: 100,
  },
  greeting: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
  promoBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.yellow,
    borderRadius: 16,
    padding: 14,
    shadowColor: colors.yellowDark,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  promoBannerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  promoTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: '#7A5700',
  },
  promoSub: {
    fontSize: 13,
    color: '#9A6F00',
    marginTop: 2,
  },
  postCard: {
    padding: 0,
    overflow: 'hidden',
  },
  imagePlaceholder: {
    height: 130,
    backgroundColor: colors.primaryLight + '55',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeholderImage: {
    width: 80,
    height: 80,
    opacity: 0.6,
  },
  postBody: {
    gap: 8,
    padding: 14,
  },
  postTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  postText: {
    fontSize: 14,
    color: colors.muted,
    lineHeight: 20,
  },
  errorCard: {
    gap: 10,
    borderWidth: 1,
    borderColor: '#FFCDD2',
    backgroundColor: '#FFF5F5',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  errorText: {
    fontSize: 14,
    color: colors.error,
  },
  retryBtn: {
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: colors.primary,
    paddingVertical: 10,
  },
  retryText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    gap: 16,
    paddingVertical: 32,
  },
  emptyText: {
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
  },
});
