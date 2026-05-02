import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { IconBox } from '../components/ui/IconBox';
import type { AnonymousSession } from '../services/authApi';
import { colors } from '../theme/colors';

type Props = {
  authSession: AnonymousSession | null;
  onAuthSessionChange: (session: AnonymousSession | null) => void;
};

function shortId(value: string) {
  return `${value.slice(0, 6)}\u2026${value.slice(-4)}`;
}

type SectionRowProps = {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  label: string;
  value: string;
};

function SectionRow({ icon, label, value }: SectionRowProps) {
  return (
    <View style={styles.row}>
      <View style={styles.rowIconWrap}>
        <Ionicons name={icon} size={18} color={colors.primary} />
      </View>
      <View style={styles.rowContent}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue}>{value}</Text>
      </View>
    </View>
  );
}

export function SettingsScreen({ authSession }: Props) {
  const userId = authSession?.userId;

  return (
    <>
      {/* Profile */}
      <View style={styles.profileHeader}>
        <IconBox bg={colors.primaryLight + '44'} size={80}>
          <Ionicons name="person-circle" size={48} color={colors.primary} />
        </IconBox>
        <Text style={styles.userName}>
          {userId ? `Fan ${shortId(userId)}` : 'Anonymous Fan'}
        </Text>
        <Text style={styles.userType}>Free member</Text>
      </View>

      {/* Account */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <SectionRow icon="person-outline" label="Account type" value="Anonymous" />
        <View style={styles.divider} />
        <SectionRow
          icon="card-outline"
          label="User ID"
          value={userId ? shortId(userId) : 'Not signed in'}
        />
      </Card>

      {/* Subscription */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Subscription</Text>
        <SectionRow icon="star-outline" label="Current plan" value="Free" />
        <View style={styles.divider} />
        <SectionRow icon="diamond-outline" label="DolphinBoo+" value="Not active" />
        <Button label="Upgrade to Plus" variant="primary" style={styles.upgradeBtn} />
      </Card>

      {/* Support */}
      <Card style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <Pressable style={styles.linkRow}>
          <View style={styles.rowIconWrap}>
            <Ionicons name="refresh-outline" size={18} color={colors.primary} />
          </View>
          <Text style={styles.linkText}>Restore Purchases</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.mutedLight} />
        </Pressable>
        <View style={styles.divider} />
        <Pressable style={styles.linkRow}>
          <View style={styles.rowIconWrap}>
            <Ionicons name="mail-outline" size={18} color={colors.primary} />
          </View>
          <Text style={styles.linkText}>Contact Support</Text>
          <Ionicons name="chevron-forward" size={16} color={colors.mutedLight} />
        </Pressable>
      </Card>

      <Text style={styles.version}>DolphinBoo v1.0.0</Text>
    </>
  );
}

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: 'center',
    gap: 8,
    paddingBottom: 8,
  },
  userName: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  userType: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: '600',
  },
  section: {
    gap: 12,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '800',
    color: colors.mutedLight,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowIconWrap: {
    width: 28,
    alignItems: 'center',
  },
  rowContent: {
    flex: 1,
  },
  rowLabel: {
    fontSize: 12,
    color: colors.muted,
    fontWeight: '600',
  },
  rowValue: {
    fontSize: 15,
    color: colors.text,
    fontWeight: '700',
    marginTop: 1,
  },
  divider: {
    height: 1,
    backgroundColor: colors.borderLight,
    marginLeft: 40,
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  linkText: {
    flex: 1,
    fontSize: 15,
    color: colors.text,
    fontWeight: '700',
  },
  upgradeBtn: {
    marginTop: 4,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 16,
  },
  version: {
    textAlign: 'center',
    fontSize: 13,
    color: colors.mutedLight,
    paddingVertical: 8,
  },
});
