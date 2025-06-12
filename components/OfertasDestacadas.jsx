import { View, Text, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';

const ofertasFicticias = [
  {
    id: 1,
    title: 'Descuento del 20%',
    description: 'Hospédate en el Hotel Catedral y disfruta de un 20% de descuento.',
    image: require('../assets/catedral.jpeg'),
    discount: 20,
    price: 800,
    expiry_date: '31 de Mayo',
  },
  {
    id: 2,
    title: '2x1 en Desayuno',
    description: 'Disfruta de un desayuno para dos al precio de uno en Hotel Boutique La Casona.',
    image: require('../assets/catedral.jpeg'),
    discount: 50,
    price: 250,
    expiry_date: '15 de Junio',
  },
  {
    id: 3,
    title: '15% Off en Reservas',
    description: 'Reserva ahora y obtén un 15% de descuento en cualquier habitación.',
    image: require('../assets/catedral.jpeg'),
    discount: 15,
    price: 950,
    expiry_date: '10 de Junio',
  },
];

export default function OfertasDestacadas({ onSelect }) {
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
      <Text className="text-2xl font-extrabold text-gray-800 mb-4">Ofertas del Día</Text>
      <FlatList
        horizontal
        data={ofertasFicticias}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item.id)}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
          >
            <Animated.View
              style={{ transform: [{ scale: scaleAnim }] }}
              className="relative mr-4 w-64 h-80 rounded-2xl overflow-hidden shadow-lg bg-white"
            >
              {/* Imagen de la oferta */}
              <Image
                source={item.image}
                className="absolute w-full h-full"
                resizeMode="cover"
              />

              {/* Insignia de Oferta */}
              <View className="absolute top-2 left-2 bg-red-500 px-2 py-1 rounded-full z-10">
                <Text className="text-white text-xs font-bold">Oferta</Text>
              </View>

              {/* Descuento */}
              {item.discount && (
                <View className="absolute top-2 right-2 bg-yellow-500 px-2 py-1 rounded-full z-10">
                  <Text className="text-white text-xs font-bold">-{item.discount}%</Text>
                </View>
              )}

              {/* Información de la oferta */}
              <View className="absolute bottom-0 w-full bg-black/60 px-4 py-3">
                <Text className="text-white font-bold text-lg">{item.title}</Text>
                <Text className="text-white text-sm">{item.description}</Text>
                {item.price && (
                  <Text className="text-white text-base mt-1">
                    Desde: ${item.price} MXN
                  </Text>
                )}
                <View className="flex-row items-center mt-2">
                  <Ionicons name="calendar-outline" size={16} color="#d8a48f" />
                  <Text className="text-white text-xs ml-2">
                    Válido hasta: {item.expiry_date}
                  </Text>
                </View>
              </View>
            </Animated.View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
