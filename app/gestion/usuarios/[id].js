import React, { useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../../components/BaseScreen';

export default function EditarUsuario() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const navigation = useNavigation();
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');

  // Configuración del encabezado dinámico
  useLayoutEffect(() => {
    navigation.setOptions({
      title: nombre ? `Editar Usuario: ${nombre}` : 'Cargando...',
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
  }, [navigation, nombre]);

  // Simulación de carga de usuario (reemplazar con llamada al backend)
  useEffect(() => {
    // Simulación de una llamada a la API para obtener el usuario
    setTimeout(() => {
      setNombre('Carlos Ramírez');
      setRol('Recepcionista');
    }, 500);
  }, [id]);

  const handleActualizar = () => {
    if (!nombre || !rol) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    // Lógica para actualizar el usuario en el backend
    Alert.alert('Usuario actualizado', `Usuario: ${nombre} - Rol: ${rol}`);
    router.back();
  };

  return (
    <BaseScreen>
      <View className="flex-1 p-5 bg-[#fdfaf6]">
        <Text className="text-3xl font-bold text-[#2c2c66] mb-4">Editar Usuario</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded-lg mb-4 bg-white"
          placeholder="Nombre completo"
          value={nombre}
          onChangeText={setNombre}
        />
        <TextInput
          className="border border-gray-300 p-3 rounded-lg mb-4 bg-white"
          placeholder="Rol"
          value={rol}
          onChangeText={setRol}
        />
        <TouchableOpacity
          className="bg-[#4a7054] py-3 rounded-full items-center"
          onPress={handleActualizar}
        >
          <Text className="text-white font-semibold text-lg">Actualizar</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
}
