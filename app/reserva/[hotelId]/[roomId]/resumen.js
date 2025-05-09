import {
  View, Text, TouchableOpacity, ScrollView, Image, Alert
} from 'react-native';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useLayoutEffect, useState } from 'react';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BaseScreen from '../../../../components/BaseScreen';
import api from '../../../../src/api/client';

export default function ResumenReserva() {
  const navigation = useNavigation();
  const router = useRouter();
  const {
    hotelId, roomId, startDate, endDate, guests,
    nombre, email, telefono, precio, nombre_habitacion,
  } = useLocalSearchParams();

  const [loading, setLoading] = useState(false);

  const dias = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
  const subtotal = dias * Number(precio || 0);
  const adminFee = 2.5;
  const total = subtotal + adminFee;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Resumen',
      headerTitleAlign: 'center',
      headerStyle: { backgroundColor: '#fdfaf6' },
      headerTintColor: '#4a7054',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#4a7054" />
        </TouchableOpacity>
      ),
    });
  }, []);

  const hacerReserva = async () => {
    const payload = {
      habitacion: roomId,
      fecha_inicio: startDate,
      fecha_fin: endDate,
      nombre_cliente: nombre,
      email_cliente: email,
    };
  
    try {
      setLoading(true);
      // Hacer la solicitud POST al backend
      const response = await api.post('/reservaciones/crear/', payload);
      setLoading(false);
      Alert.alert("Éxito", "Reservación creada correctamente 🎉");
      console.log("Respuesta del backend:", response.data);
      router.replace('/'); // Redirige al home o pantalla de éxito
    } catch (error) {
      setLoading(false);
      console.error("Error al crear reserva", error);
      Alert.alert("Error", error.response?.data?.detail || "No se pudo realizar la reservación.");
    }
  };
  
  

  return (
    <BaseScreen>
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6 pb-10 px-4">
        {/* Info cliente */}
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Text className="font-semibold text-gray-700 mb-2">Datos de contacto</Text>
          <Text>Nombre: {nombre}</Text>
          <Text>Correo: {email}</Text>
          <Text>Teléfono: {telefono}</Text>
        </View>

        {/* Info reserva */}
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Text className="font-semibold text-gray-700 mb-2">Tu reservación</Text>
          <Text>Fechas: {startDate} - {endDate}</Text>
          <Text>Huéspedes: {guests}</Text>
          <Text>Habitación: {nombre_habitacion}</Text>
          <Text>Precio por noche: ${precio}</Text>
        </View>

        {/* Precios */}
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Text className="text-blue-700 font-bold mb-2">Resumen de pago</Text>
          <View className="flex-row justify-between">
            <Text>Subtotal</Text>
            <Text>${subtotal.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Comisión</Text>
            <Text>${adminFee.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between mt-2 border-t pt-2 border-gray-200">
            <Text className="font-bold text-gray-800">Total</Text>
            <Text className="font-bold text-[#4a7054]">${total.toFixed(2)}</Text>
          </View>
        </View>

        {/* Botón */}
        <TouchableOpacity
          className="bg-[#4a7054] py-4 rounded-full items-center"
          onPress={hacerReserva}
          disabled={loading}
        >
          <Text className="text-white font-bold text-lg">
            {loading ? 'Procesando...' : 'Confirmar reservación'}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </BaseScreen>
  );
}
