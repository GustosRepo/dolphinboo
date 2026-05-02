import { useCallback, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/ui/Card';
import { IconBox } from '../components/ui/IconBox';
import { AnonymousSession, signInAnonymously } from '../services/authApi';
import { fetchActiveTopics, type ActiveTopic } from '../services/topicsApi';
import { castVote } from '../services/votesApi';
import { colors } from '../theme/colors';

type VoteCardProps = {
  topic: ActiveTopic;
  onVote: (id: string) => void;
  isVoting: boolean;
  hasVoted: boolean;
};

function VoteCard({ topic, onVote, isVoting, hasVoted }: VoteCardProps) {
  const scale = useRef(new Animated.Value(1)).current;
  const barAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (hasVoted) {
      Animated.timing(barAnim, {
        toValue: Math.random() * 0.45 + 0.25,
        duration: 700,
        useNativeDriver: false,
      }).start();
    }
  }, [hasVoted]);

  function handlePressIn() {
    Animated.spring(scale, { toValue: 0.96, useNativeDriver: true, speed: 60 }).start();
  }
  function handlePressOut() {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 60 }).start();
  }

  return (
    <Card>
      <View style={styles.topicHeader}>
        <View style={styles.topicInfo}>
          <Text style={styles.topicTitle}>{topic.title}</Text>
          {topic.description ? (
            <Text style={styles.topicDesc}>{topic.description}</Text>
          ) : null}
        </View>
        <Animated.View style={{ transform: [{ scale }] }}>
          <Pressable
            onPress={() => onVote(topic.id)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
            disabled={isVoting || hasVoted}
            style={[styles.voteBtn, hasVoted && styles.voteBtnVoted, isVoting && styles.voteBtnLoading]}
          >
            {hasVoted ? (
              <Ionicons name="checkmark-circle" size={16} color={colors.white} />
            ) : isVoting ? (
              <ActivityIndicator size="small" color={colors.white} />
            ) : (
              <Ionicons name="thumbs-up" size={16} color={colors.white} />
            )}
            <Text style={styles.voteBtnText}>
              {hasVoted ? 'Voted' : isVoting ? '' : 'Vote'}
            </Text>
          </Pressable>
        </Animated.View>
      </View>
      <View style={styles.progressTrack}>
        <Animated.View
          style={[
            styles.progressFill,
            hasVoted && { backgroundColor: colors.primary },
            {
              width: barAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '100%'],
              }),
            },
          ]}
        />
      </View>
      {hasVoted ? (
        <View style={styles.votedLabelRow}>
          <Ionicons name="happy-outline" size={14} color={colors.primary} />
          <Text style={styles.votedLabel}>Vote counted!</Text>
        </View>
      ) : null}
    </Card>
  );
}

type Props = {
  authSession: AnonymousSession | null;
  onAuthSessionChange: (session: AnonymousSession | null) => void;
};

export function VoteScreen({ authSession, onAuthSessionChange }: Props) {
  const [topics, setTopics] = useState<ActiveTopic[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [votingTopicId, setVotingTopicId] = useState<string | null>(null);
  const [votedIds, setVotedIds] = useState<Set<string>>(new Set());
  const [voteResult, setVoteResult] = useState<string | null>(null);

  const loadTopics = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      setTopics(await fetchActiveTopics());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load topics.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadTopics();
  }, [loadTopics]);

  async function vote(topicId: string) {
    setVotingTopicId(topicId);
    setVoteResult(null);

    try {
      const session = authSession ?? (await signInAnonymously());
      onAuthSessionChange(session);

      const result = await castVote(topicId, session.accessToken);
      if (result.success) {
        setVotedIds(prev => new Set([...prev, topicId]));
      }
      setVoteResult(result.message);
    } catch (err) {
      setVoteResult(err instanceof Error ? err.message : 'Unable to cast vote.');
    } finally {
      setVotingTopicId(null);
    }
  }

  return (
    <>
      <View style={styles.header}>
        <Text style={styles.title}>Vote</Text>
        <Text style={styles.subtitle}>Choose what the creator makes next</Text>
      </View>
      {voteResult ? (
        <View style={styles.resultBanner}>
          <Text style={styles.resultText}>{voteResult}</Text>
        </View>
      ) : null}
      {loading ? <ActivityIndicator color={colors.primary} style={{ marginVertical: 24 }} /> : null}
      {error ? (
        <Card style={styles.errorCard}>
          <Ionicons name="warning-outline" size={28} color={colors.error} />
          <Text style={styles.errorTitle}>Couldn't load topics</Text>
          <Text style={styles.errorText}>{error}</Text>
          <Pressable onPress={() => void loadTopics()} style={styles.retryBtn}>
            <Text style={styles.retryText}>Try again</Text>
          </Pressable>
        </Card>
      ) : null}
      {!loading && !error && topics.length === 0 ? (
        <View style={styles.emptyState}>
          <IconBox bg={colors.primaryLight + '33'} size={64}>
            <Ionicons name="search-outline" size={32} color={colors.primary} />
          </IconBox>
          <Text style={styles.emptyText}>No active topics right now</Text>
        </View>
      ) : null}
      {topics.map(topic => (
        <VoteCard
          key={topic.id}
          topic={topic}
          onVote={id => void vote(id)}
          isVoting={votingTopicId === topic.id}
          hasVoted={votedIds.has(topic.id)}
        />
      ))}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: 4,
    marginBottom: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: '900',
    color: colors.text,
  },
  subtitle: {
    fontSize: 15,
    color: colors.muted,
  },
  topicHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 12,
  },
  topicInfo: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: colors.text,
  },
  topicDesc: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 4,
    lineHeight: 18,
  },
  voteBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.pink,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  voteBtnVoted: {
    backgroundColor: colors.mint,
  },
  voteBtnLoading: {
    opacity: 0.6,
  },
  voteBtnText: {
    fontSize: 13,
    fontWeight: '800',
    color: colors.white,
  },
  progressTrack: {
    height: 6,
    backgroundColor: colors.borderLight,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primaryLight,
    borderRadius: 3,
  },
  votedLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  votedLabel: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '700',
  },
  resultBanner: {
    backgroundColor: colors.primaryLight + '44',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: colors.primaryLight,
  },
  resultText: {
    color: colors.primaryDark,
    fontWeight: '700',
    fontSize: 14,
    textAlign: 'center',
  },
  errorCard: {
    gap: 10,
    backgroundColor: '#FFF5F5',
    borderWidth: 1,
    borderColor: '#FFCDD2',
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
  },
});
