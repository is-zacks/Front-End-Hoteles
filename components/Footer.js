import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';

export default function Footer() {
  return (
    <View className="bg-gray-900 py-6 px-4">
      <Text className="text-white text-lg font-bold mb-2">Hoteles de Morelia</Text>
      <Text className="text-gray-400 text-sm mb-4">
        Facilitando la reservación y visualización de hoteles boutique en Morelia.
      </Text>

      {/* Enlaces de interés */}
      <View className="flex-row justify-around mb-4">
        <TouchableOpacity onPress={() => Linking.openURL('https://www.ejemplo.com/privacidad')}>
          <Text className="text-gray-400">Política de Privacidad</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('https://www.ejemplo.com/terminos')}>
          <Text className="text-gray-400">Términos y Condiciones</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:soporte@hotelesmorelia.com')}>
          <Text className="text-gray-400">Soporte</Text>
        </TouchableOpacity>
      </View>

      {/* Información de contacto */}
      <View className="flex-row items-center justify-center space-x-4">
        <Feather name="phone" size={20} color="#4a7054" />
        <Text className="text-gray-400">+52 443 123 4567</Text>
      </View>
      <View className="flex-row items-center justify-center space-x-4 mt-2">
        <Ionicons name="mail-outline" size={20} color="#4a7054" />
        <Text
          className="text-gray-400"
          onPress={() => Linking.openURL('mailto:soporte@hotelesmorelia.com')}
        >
          soporte@hotelesmorelia.com
        </Text>
      </View>

      {/* Créditos */}
      <View className="mt-4">
        <Text className="text-gray-500 text-xs text-center">
          Desarrollado por TarimbaCode para la Asociación de Hoteles de Morelia.
        </Text>
        <Text className="text-gray-500 text-xs text-center">© 2025 Hoteles de Morelia. Todos los derechos reservados.</Text>
      </View>
    </View>
  );
}
