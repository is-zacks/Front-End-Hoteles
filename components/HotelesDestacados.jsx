import { View, Text, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
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
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onSelect(item.id)}
            className="mr-4 p-4 bg-white rounded-lg shadow-md"
          >
            <Text className="font-bold text-lg">{item.nombre}</Text>
            <Text className="text-sm text-gray-600">{item.ubicacion}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
