import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image, Animated } from 'react-native';
import { useRef } from 'react';
import useHoteles from '../src/hooks/usehotel';

export default function HotelesDestacados({ onSelect }) {
  const { hoteles, loading, error } = useHoteles();
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

  if (loading) {
    return <ActivityIndicator size="large" color="#4a7054" className="my-10" />;
  }

  if (error) {
    return <Text className="text-red-500 p-4">Error al cargar hoteles: {error}</Text>;
  }

  if (!hoteles || hoteles.length === 0) {
    return <Text className="text-gray-600 p-4">No hay hoteles destacados disponibles en este momento.</Text>;
  }

  return (
    <View className="p-4">
      <Text className="text-2xl font-extrabold text-gray-800 mb-4">Hoteles Destacados</Text>
      <FlatList
        horizontal
        data={hoteles}
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
              className="relative mr-4 w-72 h-80 rounded-2xl overflow-hidden shadow-lg bg-white"
            >
              {/* Imagen del hotel */}
              <Image
                source={
                  item.images?.length > 0
                    ? { uri: item.images[0].image_url }
                    : require('../assets/catedral.jpeg')
                }
                className="absolute w-full h-full"
                resizeMode="cover"
              />

              {/* Insignia de Destacado */}
              <View className="absolute top-2 left-2 bg-yellow-500 px-3 py-1 rounded-full z-10">
                <Text className="text-white text-xs font-bold">Destacado</Text>
              </View>

              {/* Rating */}
              <View className="absolute top-2 right-2 bg-green-600 px-2 py-1 rounded-full z-10">
                <Text className="text-white text-xs font-extrabold">{item.rating || '4.5'} ★</Text>
              </View>

              {/* Información del hotel */}
              <View className="absolute bottom-0 w-full bg-black/60 px-4 py-3">
                <Text className="text-white font-bold text-xl">{item.name}</Text>
                <Text className="text-white text-sm">{item.location}</Text>
                {item.average_price && (
                  <Text className="text-white text-sm mt-1">Desde: ${item.average_price} MXN / noche</Text>
                )}
              </View>
            </Animated.View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
