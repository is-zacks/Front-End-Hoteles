import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

const hoteles = [
  {
    id: 1,
    nombre: 'Hotel Casa Madero',
    ubicacion: 'Centro Histórico',
    precio: 699,
    rating: 4.6,
    imagen: require('../assets/catedral.jpeg'),
  },
  {
    id: 2,
    nombre: 'Hotel Catedral',
    ubicacion: 'Zona Catedral',
    precio: 849,
    rating: 4.8,
    imagen: require('../assets/catedral.jpeg'),
  },
  {
    id: 3,
    nombre: 'Hotel Boutique Altozano',
    ubicacion: 'Altozano',
    precio: 999,
    rating: 4.9,
    imagen: require('../assets/catedral.jpeg'),
  },
];

export default function HotelesDestacados({ onSelect}) {
  return (
    <View className="px-4 ">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hoteles.map((hotel) => (
          <TouchableOpacity
            key={hotel.id}
            onPress={() => onSelect && onSelect(hotel.id)}
            className="relative mr-4 w-72 h-80 rounded-2xl overflow-hidden shadow-md bg-white"
          >
            {/* Imagen de fondo */}
            <Image source={hotel.imagen} className="absolute w-full h-full" resizeMode="cover" />

            {/* Rating en esquina superior derecha */}
            <View className="absolute top-2 right-2 bg-green-500 px-2 py-1 rounded-full z-10">
              <Text className="text-white text-xs font-bold">{hotel.rating} ★</Text>
            </View>

            {/* Info sobre la imagen (parte inferior) */}
            <View className="absolute bottom-0 w-full bg-black/50 px-4 py-3">
              <Text className="text-white font-bold text-lg">{hotel.nombre}</Text>
              <Text className="text-white text-xs">{hotel.ubicacion}</Text>
              <Text className="text-white text-sm mt-1">
                <Text className="font-bold">${hotel.precio}</Text> / por noche
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
