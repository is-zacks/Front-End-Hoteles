import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Modal, Text } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function SearchBar({ onSearch, onFilter }) {
  const [query, setQuery] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const handleSearch = (text) => {
    setQuery(text);
    onSearch(text);
  };

  return (
    <View className="px-4 mt-4">
      <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
        {/* Ícono de lupa */}
        <Feather name="search" size={20} color="#000" />

        {/* Campo de texto */}
        <TextInput
          placeholder="Buscar hotel"
          placeholderTextColor="#999"
          value={query}
          onChangeText={handleSearch}
          className="flex-1 ml-3 text-gray-800"
        />

        {/* Botón de filtros */}
        <TouchableOpacity 
          onPress={() => setModalVisible(true)}
          className="ml-2 bg-white rounded-full p-2 shadow-sm"
        >
          <Ionicons name="options-outline" size={18} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Modal de filtros */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View className="flex-1 justify-center items-center bg-black/50">
          <View className="bg-white p-6 rounded-lg w-4/5">
            <Text className="text-lg font-bold mb-2">Opciones de Filtro</Text>
            <TouchableOpacity onPress={() => { onFilter('Precio'); setModalVisible(false); }}>
              <Text className="text-gray-800 mb-2">Ordenar por Precio</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { onFilter('Calificación'); setModalVisible(false); }}>
              <Text className="text-gray-800 mb-2">Ordenar por Calificación</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text className="text-red-500">Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}
