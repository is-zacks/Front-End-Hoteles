import React from 'react';
import "../global.css";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function HeaderSuperior() {
  const router = useRouter();

  return (
    <View className="relative flex-row items-center justify-between px-4 py-4 bg-[#fdfaf6] shadow-sm">
      {/* Botón de menú (izquierda) */}
      <TouchableOpacity onPress={() => router.push('/notificaciones')}>
        <Ionicons name="notifications" size={24} color="#333" />
      </TouchableOpacity>

      {/* Título centrado con posición absoluta */}
      <View className="absolute left-0 right-0 items-center">
        <Text className="text-xl font-bold text-[#2c2c66]">Hoteles de Morelia</Text>
      </View>

      {/* Avatar usuario (derecha) */}
      <TouchableOpacity onPress={() => router.push('/account')}>
        <Image
          source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
          className="w-9 h-9 rounded-full"
        />
      </TouchableOpacity>
    </View>
  );
}
