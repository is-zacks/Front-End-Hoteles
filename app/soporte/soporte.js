import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { Ionicons, Feather, FontAwesome } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../components/BaseScreen';

export default function SupportScreen() {
  const navigation = useNavigation();

  // Configuración del header
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Soporte',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#fdfaf6',
      },
      headerTintColor: '#111',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Funciones para abrir enlaces
  const handleEmail = () => {
    Linking.openURL('mailto:soporte@hotelesmorelia.com');
  };

  const handleCall = () => {
    Linking.openURL('tel:+524431234567');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/524431234567');
  };

  const handleFacebook = () => {
    Linking.openURL('https://www.facebook.com/HotelesMorelia');
  };

  const handleInstagram = () => {
    Linking.openURL('https://www.instagram.com/HotelesMorelia');
  };

  return (
    <BaseScreen>
      <View className="flex-1 pt-6">
        <View className="flex-row items-center mb-4">
          <Ionicons name="chatbubble-ellipses-outline" size={30} color="#4a7054" />
          <Text className="text-2xl font-bold text-gray-800 ml-2">Contáctanos</Text>
        </View>

        {/* Información de contacto */}
        <View className="mb-4 p-4 bg-white rounded-lg shadow-md">
          <Text className="text-lg font-bold text-gray-800 mb-2">¿Necesitas asistencia?</Text>
          <Text className="text-gray-600 mb-4">Puedes comunicarte con nosotros a través de los siguientes medios:</Text>

          {/* Correo Electrónico */}
          <TouchableOpacity onPress={handleEmail} className="flex-row items-center mb-2">
            <Ionicons name="mail-outline" size={24} color="#4a7054" />
            <Text className="ml-2 text-gray-800">soporte@hotelesmorelia.com</Text>
          </TouchableOpacity>

          {/* Teléfono */}
          <TouchableOpacity onPress={handleCall} className="flex-row items-center mb-2">
            <Feather name="phone" size={24} color="#4a7054" />
            <Text className="ml-2 text-gray-800">+52 443 123 4567</Text>
          </TouchableOpacity>

          {/* WhatsApp */}
          <TouchableOpacity onPress={handleWhatsApp} className="flex-row items-center mb-2">
            <FontAwesome name="whatsapp" size={24} color="#25D366" />
            <Text className="ml-2 text-gray-800">WhatsApp Chat</Text>
          </TouchableOpacity>
        </View>

        {/* Redes Sociales */}
        <View className="p-4 bg-gray-100 rounded-lg">
          <Text className="text-lg font-bold text-gray-800 mb-2">Síguenos en Redes Sociales</Text>
          <View className="flex-row space-x-4">
            <TouchableOpacity onPress={handleFacebook} className="flex-row items-center">
              <FontAwesome name="facebook-square" size={30} color="#4267B2" />
              <Text className="ml-2 text-gray-800">Facebook</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleInstagram} className="flex-row items-center">
              <FontAwesome name="instagram" size={30} color="#C13584" />
              <Text className="ml-2 text-gray-800">Instagram</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseScreen>
  );
}
