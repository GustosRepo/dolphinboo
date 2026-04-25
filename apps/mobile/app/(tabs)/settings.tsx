import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { useProfile } from '@/hooks/useProfile';
import Constants from 'expo-constants';

export default function SettingsScreen() {
  const { profile } = useProfile();
  const isSubscriber = profile?.subscription_status === 'active';

  function handleRestorePurchases() {
    // TODO: Integrate RevenueCat restore purchases
    // import Purchases from 'react-native-purchases';
    // const restore = await Purchases.restorePurchases();
    Alert.alert('Restore Purchases', 'RevenueCat integration pending.');
  }

  function handleSubscribe() {
    // TODO: Present RevenueCat paywall
    // import { RevenueCatUI } from 'react-native-purchases-ui';
    // await RevenueCatUI.presentPaywall();
    Alert.alert('Subscribe', 'RevenueCat paywall integration pending.');
  }

  const appVersion = Constants.expoConfig?.version ?? '1.0.0';

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      <Text className="text-2xl font-bold text-gray-900 mb-6">Settings</Text>

      {/* Subscription status */}
      <View className="mb-6 p-4 border border-gray-200 rounded-xl">
        <Text className="text-sm text-gray-500 mb-1">Subscription</Text>
        <Text className="text-base font-semibold text-gray-900">
          {isSubscriber ? '✦ DolphinBoo+ Active' : 'Free Plan'}
        </Text>
        {!isSubscriber && (
          <TouchableOpacity
            onPress={handleSubscribe}
            className="mt-3 bg-blue-600 py-2.5 rounded-lg items-center"
          >
            <Text className="text-white font-semibold text-sm">
              Upgrade to DolphinBoo+ · $1.99/mo
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Restore purchases */}
      <TouchableOpacity
        onPress={handleRestorePurchases}
        className="py-4 border-b border-gray-100"
      >
        <Text className="text-base text-blue-600">Restore Purchases</Text>
      </TouchableOpacity>

      {/* App info */}
      <View className="mt-8">
        <Text className="text-xs text-gray-400 text-center">DolphinBoo v{appVersion}</Text>
        {profile?.id && (
          <Text className="text-xs text-gray-400 text-center mt-1">
            ID: {profile.id.slice(0, 8)}…
          </Text>
        )}
      </View>
    </View>
  );
}
