import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../../components/BaseScreen';

export default function CrearReporte() {
  const router = useRouter();
  const navigation = useNavigation();
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');

  // Configuración del encabezado
  useLayoutEffect(() => {
    navigation.setOptions({ title: 'Nuevo Reporte' });
  }, [navigation]);

  const handleGuardar = () => {
    if (!titulo || !contenido) {
      Alert.alert('Error', 'Todos los campos son obligatorios');
      return;
    }
    Alert.alert('Reporte creado', `Título: ${titulo}`);
    router.back();
  };

  return (
    <BaseScreen>
      <View className="flex-1 p-5">
        <Text className="text-3xl font-bold text-[#2c2c66] mb-4">Nuevo Reporte</Text>
        <TextInput
          className="border border-gray-300 p-3 rounded-lg mb-4 bg-white"
          placeholder="Título del reporte"
          value={titulo}
          onChangeText={setTitulo}
        />
        <TextInput
          className="border border-gray-300 p-3 rounded-lg mb-4 bg-white"
          placeholder="Contenido"
          value={contenido}
          onChangeText={setContenido}
          multiline
          numberOfLines={4}
        />
        <TouchableOpacity
          className="bg-[#4a7054] py-3 rounded-full items-center"
          onPress={handleGuardar}
        >
          <Text className="text-white font-semibold text-lg">Guardar</Text>
        </TouchableOpacity>
      </View>
    </BaseScreen>
  );
}
