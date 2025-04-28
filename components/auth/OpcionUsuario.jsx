import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OpcionUsuario({ icon, title, subtitle, onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white px-4 py-5 mb-3 rounded-xl flex-row items-center justify-between shadow-sm border border-gray-300"
    >
      <View className="flex-row items-center space-x-4">
        <View className="bg-gray-100 p-3 rounded-lg">
          <Ionicons name={icon} size={20} color="#866444" />
        </View>
        <View>
          <Text className="text-base font-semibold text-gray-800">{title}</Text>
          <Text className="text-sm text-gray-500">{subtitle}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );
}
