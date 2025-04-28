import { View, Text, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const notificaciones = [
  {
    id: 1,
    titulo: 'Reservación confirmada',
    mensaje: 'Tienes una reservación mañana a las 14:00 en Hotel Catedral.',
    fecha: 'Hoy • 10:35 AM',
    icono: 'calendar-outline',
    color: '#4a7054',
  },
  {
    id: 2,
    titulo: 'Nuevo mensaje del hotel',
    mensaje: 'Tu habitación estará lista antes de lo previsto.',
    fecha: 'Ayer • 3:45 PM',
    icono: 'chatbox-ellipses-outline',
    color: '#4a7054',
  },
  {
    id: 3,
    titulo: 'Oferta especial',
    mensaje: '¡15% de descuento en tu próxima reservación!',
    fecha: 'Hace 2 días',
    icono: 'pricetag-outline',
    color: '#d8a48f',
  },
];

export default function NotificacionesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="px-4 pt-6">
        <Text className="text-xl font-bold text-[#2c2c66] mb-4">Notificaciones</Text>

        {notificaciones.map((item) => (
          <View
            key={item.id}
            className="bg-[#f9f9f9] rounded-xl px-4 py-4 mb-4 border border-gray-200 flex-row space-x-4"
          >
            <View className="bg-white p-3 rounded-full shadow" style={{ backgroundColor: item.color }}>
              <Ionicons name={item.icono} size={20} color="white" />
            </View>

            <View className="flex-1">
              <Text className="font-semibold text-gray-800 mb-1">{item.titulo}</Text>
              <Text className="text-sm text-gray-600">{item.mensaje}</Text>
              <Text className="text-xs text-gray-400 mt-2">{item.fecha}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}
