import { SafeAreaView } from 'react-native-safe-area-context';
import { ScrollView, View } from 'react-native';
import React from 'react';

export default function BaseScreen({ children }) {
  return (
    <SafeAreaView className="flex-1 bg-[#fdfaf6]" edges={[ 'bottom']}>
      <View className="flex-1 px-4">
        {children}
      </View>
    </SafeAreaView>
  );
}
