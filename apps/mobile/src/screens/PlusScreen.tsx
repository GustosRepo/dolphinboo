import { useRef } from 'react';
import { Animated, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '../components/ui/Card';
import { IconBox } from '../components/ui/IconBox';
import { colors } from '../theme/colors';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const features: Array<{ icon: IoniconName; iconBg: string; iconColor: string; label: string; desc: string }> = [
  { icon: 'ban-outline',          iconBg: colors.error + '18',    iconColor: colors.error,    label: 'No ads',            desc: 'Enjoy the feed without interruptions' },
  { icon: 'flash',                iconBg: colors.yellow + '44',   iconColor: colors.yellowDark, label: 'Faster voting',    desc: 'Vote every 24 hours instead of weekly' },
  { icon: 'lock-closed',          iconBg: colors.pink + '44',     iconColor: colors.pinkDark, label: 'Exclusive content', desc: 'Unlock posts only subscribers see' },
  { icon: 'heart',                iconBg: '#FFE4EC',               iconColor: colors.pinkDark, label: 'Support the creator', desc: 'Directly fund what you love' },
];

function UpgradeButton() {
  const scale = useRef(new Animated.Value(1)).current;
  function onPressIn() {
    Animated.spring(scale, { toValue: 0.97, useNativeDriver: true, speed: 60 }).start();
  }
  function onPressOut() {
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, speed: 60 }).start();
  }
  return (
      <Animated.View style={[styles.upgradeBtnWrapper, { transform: [{ scale }] }]}>
      <Pressable style={styles.upgradeBtn} onPressIn={onPressIn} onPressOut={onPressOut}>
        <Ionicons name="sparkles" size={18} color={colors.white} />
        <Text style={styles.upgradeBtnText}>Upgrade to DolphinBoo+</Text>
      </Pressable>
    </Animated.View>
  );
}

export function PlusScreen() {
  return (
    <>
      {/* Hero */}
      <View style={styles.hero}>
        <IconBox bg={colors.primaryLight + '33'} size={80}>
          <Image source={require('../../assets/logo.png')} style={styles.heroLogo} resizeMode="contain" />
        </IconBox>
        <Text style={styles.heroTitle}>DolphinBoo+</Text>
        <Text style={styles.heroSub}>Get closer to the creator you love</Text>
        <View style={styles.pricePill}>
          <Ionicons name="diamond" size={14} color="#7A5700" />
          <Text style={styles.priceText}>From $4.99 / month</Text>
        </View>
      </View>

      {/* Features */}
      <Card style={styles.featureCard}>
        <Text style={styles.featureHeader}>What you get</Text>
        {features.map(f => (
          <View key={f.label} style={styles.featureRow}>
            <IconBox bg={f.iconBg} size={44}>
              <Ionicons name={f.icon} size={22} color={f.iconColor} />
            </IconBox>
            <View style={styles.featureText}>
              <Text style={styles.featureLabel}>{f.label}</Text>
              <Text style={styles.featureDesc}>{f.desc}</Text>
            </View>
          </View>
        ))}
      </Card>

      {/* CTA */}
      <View style={styles.ctaBlock}>
        <UpgradeButton />
        <Text style={styles.ctaNote}>Cancel anytime. No hidden fees.</Text>
      </View>

      {/* Testimonial */}
      <Card style={styles.testimonialCard}>
        <IconBox bg={colors.primaryLight + '33'} size={44}>
          <Ionicons name="chatbubble" size={22} color={colors.primary} />
        </IconBox>
        <Text style={styles.testimonialText}>&ldquo;DolphinBoo+ changed how I connect with my favorite creator!&rdquo;</Text>
        <Text style={styles.testimonialAuthor}>&mdash; a happy fan</Text>
      </Card>
    </>
  );
}

const styles = StyleSheet.create({
  hero: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
  },
  heroLogo: {
    width: 56,
    height: 56,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: colors.text,
    letterSpacing: -0.5,
  },
  heroSub: {
    fontSize: 16,
    color: colors.muted,
    textAlign: 'center',
  },
  pricePill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.yellow,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  priceText: {
    fontSize: 14,
    fontWeight: '800',
    color: '#7A5700',
  },
  featureCard: {
    gap: 16,
  },
  featureHeader: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  featureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  featureText: {
    flex: 1,
  },
  featureLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  featureDesc: {
    fontSize: 13,
    color: colors.muted,
    marginTop: 2,
  },
  ctaBlock: {
    alignItems: 'center',
    gap: 10,
  },
  upgradeBtnWrapper: {
    width: '100%',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
    borderRadius: 16,
  },
  upgradeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
  },
  upgradeBtnText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  ctaNote: {
    fontSize: 13,
    color: colors.muted,
    textAlign: 'center',
  },
  testimonialCard: {
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surfaceWarm,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  testimonialEmoji: {
    fontSize: 28,
  },
  testimonialText: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
    lineHeight: 22,
  },
  testimonialAuthor: {
    fontSize: 13,
    color: colors.muted,
    fontWeight: '700',
  },
});
