import { View, Text } from 'react-native';

/**
 * AdMob banner placeholder for free users.
 *
 * TODO: Replace with react-native-google-mobile-ads BannerAd component.
 *   1. Install: npx expo install react-native-google-mobile-ads
 *   2. Add ADMOB_APP_ID_IOS / ADMOB_APP_ID_ANDROID to app.json plugins
 *   3. Import BannerAd, BannerAdSize, TestIds from 'react-native-google-mobile-ads'
 *   4. Use your real ad unit IDs from AdMob dashboard
 */
export function AdBanner() {
  return (
    <View className="mx-4 my-2 h-16 bg-gray-100 rounded-lg items-center justify-center border border-dashed border-gray-300">
      <Text className="text-xs text-gray-400">Ad — AdMob integration pending</Text>
    </View>
  );
}
