import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../../theme/colors';

type Variant = 'free' | 'premium' | 'locked' | 'hot' | 'new';
type Props = { label: string; variant?: Variant };
type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const map: Record<Variant, { bg: string; color: string; icon: IoniconName }> = {
  free:    { bg: '#E8F5E9', color: '#388E3C',          icon: 'sparkles' },
  premium: { bg: '#FFF3CD', color: '#9A6F00',          icon: 'diamond' },
  locked:  { bg: '#FFE8EE', color: colors.pinkDark,    icon: 'lock-closed' },
  hot:     { bg: '#FFE8D6', color: '#C84B11',          icon: 'flame' },
  new:     { bg: '#D6E8FF', color: colors.primaryDark, icon: 'star' },
};

export function Badge({ label, variant = 'free' }: Props) {
  const v = map[variant];
  return (
    <View style={[styles.pill, { backgroundColor: v.bg }]}>
      <Ionicons name={v.icon} size={11} color={v.color} />
      <Text style={[styles.label, { color: v.color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    gap: 4,
  },
  label: { fontSize: 12, fontWeight: '700' },
});
