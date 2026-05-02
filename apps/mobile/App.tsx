import { useState } from 'react';
import { Animated, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { HomeScreen } from './src/screens/HomeScreen';
import { PlusScreen } from './src/screens/PlusScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { VoteScreen } from './src/screens/VoteScreen';
import { AnonymousSession } from './src/services/authApi';
import { colors } from './src/theme/colors';

type TabKey = 'home' | 'plus' | 'vote' | 'settings';
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const tabs: Array<{ key: TabKey; label: string; icon: IoniconName; iconFill: IoniconName }> = [
  { key: 'home',     label: 'Home',     icon: 'home-outline',      iconFill: 'home' },
  { key: 'plus',     label: 'Plus',     icon: 'diamond-outline',   iconFill: 'diamond' },
  { key: 'vote',     label: 'Vote',     icon: 'thumbs-up-outline', iconFill: 'thumbs-up' },
  { key: 'settings', label: 'Settings', icon: 'settings-outline',  iconFill: 'settings' },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [authSession, setAuthSession] = useState<AnonymousSession | null>(null);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.app}>
        <ScrollView contentContainerStyle={styles.content}>
          {activeTab === 'home' ? <HomeScreen /> : null}
          {activeTab === 'plus' ? <PlusScreen /> : null}
          {activeTab === 'vote' ? <VoteScreen authSession={authSession} onAuthSessionChange={setAuthSession} /> : null}
          {activeTab === 'settings' ? (
            <SettingsScreen authSession={authSession} onAuthSessionChange={setAuthSession} />
          ) : null}
        </ScrollView>

        <View style={styles.tabBar}>
          {tabs.map((tab) => {
            const active = tab.key === activeTab;

            return (
              <TabButton
                key={tab.key}
                tab={tab}
                active={active}
                onPress={() => setActiveTab(tab.key)}
              />
            );
          })}
        </View>
      </View>
    </SafeAreaView>
  );
}

function TabButton({
  tab,
  active,
  onPress,
}: {
  tab: typeof tabs[number];
  active: boolean;
  onPress: () => void;
}) {
  const scale = useState(() => new Animated.Value(1))[0];

  function handlePressIn() {
    Animated.spring(scale, { toValue: 0.92, useNativeDriver: true, speed: 80 }).start();
  }
  function handlePressOut() {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 60 }).start();
  }

  return (
    <Pressable
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      style={styles.tabButton}
    >
      <Animated.View style={[styles.tabIconWrap, active && styles.tabIconWrapActive, { transform: [{ scale }] }]}>
        <Ionicons
          name={active ? tab.iconFill : tab.icon}
          size={22}
          color={active ? colors.primary : colors.mutedLight}
        />
      </Animated.View>
      <Text style={[styles.tabLabel, active && styles.tabLabelActive]}>{tab.label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  app: {
    flex: 1,
  },
  content: {
    gap: 16,
    padding: 20,
    paddingBottom: 104,
    paddingTop: 56,
  },
  tabBar: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    left: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.surface,
    paddingBottom: 24,
    paddingTop: 10,
    shadowColor: '#2D1E0F',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 8,
  },
  tabButton: {
    alignItems: 'center',
    gap: 3,
    minWidth: 72,
  },
  tabIconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 32,
    borderRadius: 16,
  },
  tabIconWrapActive: {
    backgroundColor: colors.primaryLight + '40',
  },
  tabLabel: {
    color: colors.mutedLight,
    fontSize: 11,
    fontWeight: '600',
  },
  tabLabelActive: {
    color: colors.primary,
    fontWeight: '700',
  },
});
