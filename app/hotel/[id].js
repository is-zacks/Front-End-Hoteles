import {
  View,
  Text,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import RoomCard from '../../components/RoomCard';
import BaseScreen from '../../components/BaseScreen';
import useHotelById from '../../src/hooks/useHotelById';

const { width } = Dimensions.get('window');

export default function HotelScreen() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  const { hotel, loading, error } = useHotelById(id);

  useLayoutEffect(() => {
    if (hotel) {
      navigation.setOptions({
        title: hotel.name,
        headerLeft: () => (
          <TouchableOpacity onPress={() => navigation.goBack()} className="pl-1">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
        ),
      });
    }
  }, [hotel]);

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#4a7054" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-red-500 text-base">Error: {error}</Text>
      </View>
    );
  }

  if (!hotel) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <Text className="text-base text-gray-600">Hotel no encontrado</Text>
      </View>
    );
  }

  return (
    <BaseScreen>
      <ScrollView>
        {/* Carrusel de imágenes */}
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          className="w-full h-56"
        >
          {hotel.images && hotel.images.length > 0 ? (
            hotel.images.map((img, idx) => (
              <Image
                key={idx}
                source={{ uri: img.image_url }}
                style={{ width: width, height: 220 }}
                resizeMode="cover"
              />
            ))
          ) : (
            <Image
              source={require('../../assets/catedral.jpeg')}
              className="w-full h-56"
              style={{ width: width, height: 220 }}
              resizeMode="cover"
            />
          )}
        </ScrollView>

        {/* Información del hotel */}
        <View className="px-4 mt-4">
          <Text className="text-2xl font-bold text-gray-800">{hotel.name}</Text>

          <View className="flex-row items-center mt-2">
            <FontAwesome name="map-marker" size={16} color="#666" />
            <Text className="ml-2 text-sm text-gray-500">{hotel.location}</Text>
          </View>

          <View className="flex-row items-center mt-1">
            <FontAwesome name="phone" size={16} color="#666" />
            <Text className="ml-2 text-sm text-gray-500">{hotel.phone}</Text>
          </View>

          <Text className="text-base text-gray-700 mt-4 leading-relaxed">
            {hotel.description}
          </Text>
        </View>

        {/* Habitaciones */}
        <View className="px-4 mt-6 mb-12">
          <Text className="text-lg font-semibold text-gray-800 mb-3">Habitaciones</Text>
          {hotel.rooms && hotel.rooms.length > 0 ? (
            hotel.rooms.map((room) => (
              <RoomCard key={room.id} room={room} hotelId={hotel.id} />
            ))
          ) : (
            <Text className="text-gray-500">Este hotel aún no tiene habitaciones registradas.</Text>
          )}
        </View>
      </ScrollView>
    </BaseScreen>
  );
}
