import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SUBSCRIBE_HEADLINE, SUBSCRIBE_BODY, SUBSCRIBE_PRICE_LABEL } from '@dolphinboo/ui';

export function LockedContent() {
  function handleUpgrade() {
    // TODO: Present RevenueCat paywall
    // import { RevenueCatUI } from 'react-native-purchases-ui';
    // await RevenueCatUI.presentPaywall();
    Alert.alert('Coming soon', 'Subscription flow coming in Phase 5.');
  }

  return (
    <View className="flex-1 items-center justify-center px-8">
      <Ionicons name="lock-closed" size={48} color="#9ca3af" />
      <Text className="text-xl font-bold text-gray-900 mt-4 text-center">
        {SUBSCRIBE_HEADLINE}
      </Text>
      <Text className="text-sm text-gray-500 mt-2 text-center leading-5">{SUBSCRIBE_BODY}</Text>
      <TouchableOpacity
        onPress={handleUpgrade}
        className="mt-6 bg-blue-600 px-6 py-3 rounded-xl"
      >
        <Text className="text-white font-semibold">{SUBSCRIBE_PRICE_LABEL}</Text>
      </TouchableOpacity>
    </View>
  );
}
