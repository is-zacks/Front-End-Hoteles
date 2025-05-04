import {
  View, Text, TouchableOpacity, ScrollView, Image
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import BaseScreen from '../../../../components/BaseScreen';
import { hoteles } from '../../../../data/hoteles';

export default function ResumenReserva() {
  const navigation = useNavigation();
  const {
    hotelId, roomId, startDate, endDate, guests, nombre, email, telefono
  } = useLocalSearchParams();

  const hotel = hoteles.find(h => h.id === Number(hotelId));
  const room = hotel?.rooms.find(r => r.id === Number(roomId));

  // Cálculo de días y precio
  const dias = (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
  const precioNoche = Number(room?.price || 0);
  const subtotal = dias * precioNoche;
  const adminFee = 2.5;
  const total = subtotal + adminFee;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Checkout',
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

  return (
    <BaseScreen>
      <ScrollView showsVerticalScrollIndicator={false} className="space-y-6 pb-10">
        {/* Hotel resumen */}
        <View className="flex-row space-x-4 items-center">
          <Image source={room?.imagenes?.[0] || require('../../../../assets/catedral.jpeg')} resizeMode="cover"
            className="w-20 h-20 rounded-xl" />
          <View className="flex-1">
            <Text className="text-lg font-bold text-gray-800">{hotel?.name}</Text>
            <Text className="text-sm text-gray-500">{hotel?.location}</Text>
            <Text className="text-[#4a7054] font-semibold mt-1">${precioNoche}/noche</Text>
          </View>
          <View className="flex-row items-center">
            <FontAwesome name="star" size={14} color="#FFD700" />
            <Text className="ml-1 font-semibold text-sm">4.7</Text>
          </View>
        </View>

        {/* Información de reserva */}
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Text className="font-semibold text-gray-700 mb-2">Tu reservación</Text>
          <View className="flex-row justify-between items-center mb-1">
            <MaterialIcons name="calendar-today" size={16} color="#4a7054" />
            <Text className="ml-2 flex-1">Fechas</Text>
            <Text>{startDate} --- {endDate}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-1">
            <Ionicons name="person" size={16} color="#4a7054" />
            <Text className="ml-2 flex-1">Huéspedes</Text>
            <Text>{guests} persona(s)</Text>
          </View>
          <View className="flex-row justify-between items-center mb-1">
            <Ionicons name="bed" size={16} color="#4a7054" />
            <Text className="ml-2 flex-1">Habitación</Text>
            <Text>{room?.title}</Text>
          </View>
          <View className="flex-row justify-between items-center mb-1">
            <Ionicons name="call" size={16} color="#4a7054" />
            <Text className="ml-2 flex-1">Teléfono</Text>
            <Text>{hotel?.phone}</Text>
          </View>
        </View>

        {/* Precios */}
        <View className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <Text className="text-blue-700 font-bold mb-2">Resumen de pago</Text>
          <View className="flex-row justify-between">
            <Text>Precio</Text>
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

        {/* Botón de acción */}
        <TouchableOpacity
          className="bg-[#4a7054] py-4 rounded-full items-center"
          onPress={() => alert('Reserva confirmada 🎉')}
        >
          <Text className="text-white font-bold text-lg">Seleccionar método de pago</Text>
        </TouchableOpacity>
      </ScrollView>
    </BaseScreen>
  );
}
