import React from 'react';
import "../global.css";
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/context/AuthContext';  // ✅ Usar el contexto de autenticación

export default function HeaderSuperior() {
  const router = useRouter();
  const { user } = useAuth();  // ✅ Obtener el usuario desde el contexto

  // Generar URL de avatar de usuario ficticio
  const generateAvatarUrl = () => {
    return `https://randomuser.me/api/portraits/men/34.jpg`;
  };

  return (
    <View className="relative flex-row items-center justify-between px-4 py-4 bg-[#fdfaf6] shadow-sm">
      {/* Botón de notificaciones */}
      <TouchableOpacity onPress={() => router.push('/notificaciones')}>
        <Ionicons name="notifications" size={24} color="#333" />
      </TouchableOpacity>

      {/* Título centrado */}
      <View className="absolute left-0 right-0 items-center">
        <Text className="text-xl font-bold text-[#2c2c66]">Hoteles de Morelia</Text>
      </View>

      {/* Avatar o icono de usuario */}
      <TouchableOpacity onPress={() => router.push(user ? '/account' : '/login')}>
        {user ? (
          <Image
            source={{ uri: user.photo || generateAvatarUrl() }}
            className="w-9 h-9 rounded-full"
          />
        ) : (
          <View className="w-9 h-9 bg-gray-300 rounded-full items-center justify-center">
            <Ionicons name="person-circle-outline" size={30} color="#4a7054" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
}
