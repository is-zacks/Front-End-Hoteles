import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../../components/BaseScreen';

export default function UsuariosDashboard() {
  const router = useRouter();
  const navigation = useNavigation();

  // Configuración del encabezado dinámico
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Gestión de Usuarios',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#fdfaf6',
      },
      headerTintColor: '#111',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} className="pl-3">
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  // Datos de ejemplo (reemplazar con datos del backend)
  const usuarios = [
    { id: 1, nombre: 'Carlos Ramírez', rol: 'Recepcionista' },
    { id: 2, nombre: 'Ana Torres', rol: 'Camarista' },
  ];

  return (
    <BaseScreen>
      <View className="flex-1 p-5 bg-[#fdfaf6]">
        <Text className="text-3xl font-bold text-[#2c2c66] mb-4">Listado de Usuarios</Text>

        <TouchableOpacity
          className="flex-row items-center bg-[#4a7054] p-3 rounded-lg mb-4"
          onPress={() => router.push('/gestion/usuarios/nuevo')}
        >
          <Ionicons name="person-add-outline" size={20} color="#fff" />
          <Text className="text-white font-semibold ml-2">Registrar nuevo usuario</Text>
        </TouchableOpacity>

        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center bg-[#e0f7fa] p-3 rounded-lg mb-2">
              <Text className="text-lg text-[#333]">{item.nombre} - {item.rol}</Text>
              <TouchableOpacity
                className="flex-row items-center px-3 py-1 bg-white border border-[#4a7054] rounded-md"
                onPress={() => router.push(`/gestion/usuarios/${item.id}`)}
              >
                <Ionicons name="create-outline" size={20} color="#4a7054" />
                <Text className="text-[#4a7054] font-semibold ml-1">Editar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </BaseScreen>
  );
}
