import { View, Text, ScrollView, Animated } from 'react-native';
import { useState, useEffect } from 'react';
import { Ionicons } from '@expo/vector-icons';
import BaseScreen from '../components/BaseScreen';

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
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <BaseScreen>
      
        <ScrollView className="flex-1 px-4 pt-6">
          <Text className="text-2xl font-extrabold text-[#2c2c66] mb-4">Notificaciones</Text>

          {notificaciones.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-xl px-4 py-4 mb-4 shadow-md flex-row items-center space-x-4"
              style={{
                borderColor: item.color,
                borderWidth: 1,
                elevation: 3,
              }}
            >
              <View
                className="p-3 rounded-full"
                style={{ backgroundColor: item.color }}
              >
                <Ionicons name={item.icono} size={24} color="white" />
              </View>

              <View className="flex-1">
                <Text className="text-lg font-bold text-gray-800">{item.titulo}</Text>
                <Text className="text-base text-gray-600">{item.mensaje}</Text>
                <Text className="text-sm text-gray-500 mt-1">{item.fecha}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
    </BaseScreen>
  );
}
