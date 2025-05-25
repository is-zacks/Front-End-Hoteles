import { View, Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

const opinionesFicticias = [
  {
    id: 1,
    name: 'Carlos Martínez',
    rating: 4.5,
    comment: 'Excelente servicio y habitaciones cómodas. Muy recomendado.',
    date: '01 de Mayo, 2025',
  },
  {
    id: 2,
    name: 'Ana López',
    rating: 5,
    comment: 'El personal es muy amable y las instalaciones están impecables.',
    date: '28 de Abril, 2025',
  },
  {
    id: 3,
    name: 'Luis Ramírez',
    rating: 4,
    comment: 'Buena ubicación y precio justo. Volvería sin dudarlo.',
    date: '20 de Abril, 2025',
  },
];

export default function OpinionesClientes() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View className="p-4">
      <Text className="text-2xl font-extrabold text-gray-800 mb-4">Opiniones de Huéspedes</Text>
      <FlatList
        horizontal
        data={opinionesFicticias}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Animated.View
              style={{ transform: [{ scale: scaleAnim }] }}
              className="relative mr-4 w-72 h-48 rounded-2xl overflow-hidden shadow-lg bg-white p-4"
            >
              {/* Encabezado de la opinión */}
              <View className="flex-row items-center mb-2">
                <Ionicons name="person-circle-outline" size={32} color="#4a7054" />
                <View className="ml-2">
                  <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                  <View className="flex-row items-center">
                    <Ionicons name="star" size={16} color="#FFD700" />
                    <Text className="text-gray-700 ml-1">{item.rating} ★</Text>
                  </View>
                </View>
              </View>

              {/* Comentario */}
              <Text className="text-gray-600 italic">{`"${item.comment}"`}</Text>

              {/* Fecha de la opinión */}
              <Text className="text-gray-500 text-xs mt-3">{item.date}</Text>
            </Animated.View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
