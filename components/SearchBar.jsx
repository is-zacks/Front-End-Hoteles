import { View, TextInput, TouchableOpacity } from 'react-native';
import { Feather, Ionicons } from '@expo/vector-icons';

export default function SearchBar() {
  return (
    <View className="px-4 mt-4">
      <View className="flex-row items-center bg-gray-100 rounded-full px-4 py-3">
        {/* Ícono de lupa */}
        <Feather name="search" size={20} color="#000" />

        {/* Campo de texto */}
        <TextInput
          placeholder="Search hotel"
          placeholderTextColor="#999"
          className="flex-1 ml-3 text-gray-800"
        />

        {/* Botón de filtros */}
        <TouchableOpacity className="ml-2 bg-white rounded-full p-2 shadow-sm">
          <Ionicons name="options-outline" size={18} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
