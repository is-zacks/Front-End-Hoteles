import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const tipos = ['Hotel', 'Apartments', 'Condo', 'Mansion', 'Villa', 'Studio'];

export default function FiltroTipos() {
  const [activo, setActivo] = useState('Hotel');

  return (
    <View className=" px-4 mt-4 mb-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tipos.map((tipo) => (
          <TouchableOpacity
            key={tipo}
            onPress={() => setActivo(tipo)}
            className={`px-4 py-2 mr-3 rounded-full ${
              activo === tipo ? 'bg-[#4a7054]' : 'bg-gray-200'
            }`}
          >
            <Text
              className={`text-sm font-medium ${
                activo === tipo ? 'text-white' : 'text-gray-700'
              }`}
            >
              {tipo}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
