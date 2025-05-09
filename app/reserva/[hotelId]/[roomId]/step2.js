import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter, useNavigation } from 'expo-router';
import { useState, useLayoutEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import BaseScreen from '../../../../components/BaseScreen';

export default function Step2Contacto() {
  const router = useRouter();
  const navigation = useNavigation();
  const {
    hotelId, roomId, startDate, endDate, guests, precio, nombre_habitacion
  } = useLocalSearchParams();

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [telefono, setTelefono] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Datos de contacto',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#fdfaf6' },
      headerTintColor: '#111',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const continuar = () => {
    if (!nombre || !email || !telefono) {
      alert('Por favor completa todos los campos');
      return;
    }

    router.push({
      pathname: `/reserva/${hotelId}/${roomId}/resumen`,
      params: {
        startDate,
        endDate,
        guests,
        precio,
        nombre_habitacion,
        nombre,
        email,
        telefono
      },
    });
  };

  return (
    <BaseScreen>
      <View className="flex-1">
        <ScrollView
          className="flex-1 px-4 pt-10"
          contentContainerStyle={{ paddingBottom: 120 }}
          keyboardShouldPersistTaps="handled"
        >
          <Text className="text-xl font-bold text-gray-800 mb-6">Tus datos de contacto</Text>

          <Text className="text-m font-semibold text-gray-600 mb-1">Nombre completo</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-4"
            placeholder="Juan Pérez"
            value={nombre}
            onChangeText={setNombre}
          />

          <Text className="text-m font-semibold text-gray-600 mb-1">Correo electrónico</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-4"
            keyboardType="email-address"
            placeholder="correo@ejemplo.com"
            value={email}
            onChangeText={setEmail}
          />

          <Text className="text-m font-semibold text-gray-600 mb-1">Teléfono</Text>
          <TextInput
            className="bg-white border border-gray-300 rounded-lg px-4 py-3 mb-6"
            keyboardType="phone-pad"
            placeholder="443 123 4567"
            value={telefono}
            onChangeText={setTelefono}
          />
        </ScrollView>

        <View className="absolute bottom-0 left-0 right-0  p-4 border-t border-gray-200">
          <TouchableOpacity
            onPress={continuar}
            className="bg-[#4a7054] py-4 rounded-full items-center shadow-md"
          >
            <Text className="text-white font-bold text-lg">Ir al resumen</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BaseScreen>
  );
}
