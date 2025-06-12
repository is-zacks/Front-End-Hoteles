import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const tipos = ['Hotel', 'Condo', 'Mansion', 'Villa', 'Studio', 'Todos'];

export default function FiltroTipos({ onSelectTipo }) {
  const [activo, setActivo] = useState('Hotel');

  const handlePress = (tipo) => {
    setActivo(tipo);
    onSelectTipo(tipo);
  };

  return (
    <View className="px-4 mt-4 mb-4">
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {tipos.map((tipo) => (
          <TouchableOpacity
            key={tipo}
            onPress={() => handlePress(tipo)}
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
