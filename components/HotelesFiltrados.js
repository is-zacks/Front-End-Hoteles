import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

const hotelesFicticios = [
  { id: 1, name: 'Hotel Catedral', tipo: 'Hotel', location: 'Centro Histórico', image: require('../assets/catedral.jpeg') },
  { id: 2, name: 'Villa Colonial', tipo: 'Villa', location: 'Zona Norte', image: require('../assets/catedral.jpeg') },
  { id: 3, name: 'Condo Real', tipo: 'Condo', location: 'Zona Centro', image: require('../assets/catedral.jpeg') },
  { id: 4, name: 'Apartments Vista', tipo: 'Apartments', location: 'Zona Sur', image: require('../assets/catedral.jpeg') },
];

export default function HotelesFiltrados({ tipoSeleccionado }) {
  const [hotelesFiltrados, setHotelesFiltrados] = useState(hotelesFicticios);

  useEffect(() => {
    if (tipoSeleccionado === 'Todos') {
      setHotelesFiltrados(hotelesFicticios);
    } else {
      const filtrados = hotelesFicticios.filter((hotel) => hotel.tipo === tipoSeleccionado);
      setHotelesFiltrados(filtrados);
    }
  }, [tipoSeleccionado]);

  return (
    <View className="p-4">
      <Text className="text-xl font-bold text-gray-800 mb-4">Hoteles Disponibles</Text>
      {hotelesFiltrados.length === 0 ? (
        <Text className="text-gray-600">No hay hoteles disponibles de este tipo.</Text>
      ) : (
        <FlatList
          data={hotelesFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity className="mb-4 bg-white rounded-xl overflow-hidden shadow-md">
              <Image source={item.image} className="w-full h-40" resizeMode="cover" />
              <View className="p-4">
                <Text className="text-lg font-bold">{item.name}</Text>
                <Text className="text-gray-600">{item.location}</Text>
                <Text className="text-gray-500">{item.tipo}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}
