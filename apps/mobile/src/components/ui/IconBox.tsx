import { StyleSheet, View, type ViewStyle } from 'react-native';
import { colors } from '../../theme/colors';

type Props = {
  children: React.ReactNode;
  /** Background tint. Defaults to a warm neutral. */
  bg?: string;
  size?: number;
  style?: ViewStyle;
};

/**
 * Rounded container for icons — gives every icon a soft, airy backdrop.
 * Keeps stroke weight consistent by just composing the Phosphor icon inside.
 *
 * Usage:
 *   <IconBox bg={colors.primaryLight + '33'}>
 *     <Lightning size={20} color={colors.primary} weight="fill" />
 *   </IconBox>
 */
export function IconBox({ children, bg = colors.border, size = 40, style }: Props) {
  const radius = Math.round(size * 0.32);
  return (
    <View
      style={[
        styles.box,
        { width: size, height: size, borderRadius: radius, backgroundColor: bg },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
