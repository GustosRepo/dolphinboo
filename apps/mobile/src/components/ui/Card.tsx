import { StyleSheet, View } from 'react-native';
import type { ViewProps } from 'react-native';
import { colors } from '../../theme/colors';

type Props = ViewProps & { children: React.ReactNode };

export function Card({ children, style, ...rest }: Props) {
  return (
    <View style={[styles.card, style]} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 16,
    shadowColor: '#2D1E0F',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.09,
    shadowRadius: 12,
    elevation: 3,
  },
});
