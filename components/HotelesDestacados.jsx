import { View, Text, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import useHoteles from '../src/hooks/usehotel';

export default function HotelesDestacados({ onSelect }) {
  const { hoteles, loading, error } = useHoteles();

  if (loading) {
    return <ActivityIndicator size="large" color="#4a7054" className="my-10" />;
  }

  if (error) {
    return <Text className="text-red-500 p-4">Error al cargar hoteles: {error}</Text>;
  }

  return (
    <View className="p-4">
      <Text className="text-xl font-bold text-gray-800 mb-4">Hoteles destacados</Text>
      <FlatList
        horizontal
        data={hoteles}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item.id)}
            className="relative mr-4 w-72 h-80 rounded-2xl overflow-hidden shadow-md bg-white"
          >
            {/* Imagen */}
            <Image
              source={
                item.images?.length > 0
                  ? { uri: item.images[0].image_url }
                  : require('../assets/catedral.jpeg')}
              className="absolute w-full h-full"
              resizeMode="cover"
            />

            {/* Rating */}
            <View className="absolute top-2 right-2 bg-green-500 px-2 py-1 rounded-full z-10">
              <Text className="text-white text-xs font-bold">4.5 ★</Text>
            </View>

            {/* Información */}
            <View className="absolute bottom-0 w-full bg-black/50 px-4 py-3">
              <Text className="text-white font-bold text-lg">{item.name}</Text>
              <Text className="text-white text-xs">{item.location}</Text>
              <Text className="text-white text-sm mt-1">
                {/* Opcionalmente muestra un precio promedio si lo agregas */}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
