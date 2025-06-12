import React, { useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../../components/BaseScreen';

export default function ReportesDashboard() {
  const router = useRouter();
  const navigation = useNavigation();

  // Configuración del encabezado dinámico
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Gestión de Reportes',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#fdfaf6',
      },
      headerTintColor: '#111',
    });
  }, [navigation]);

  const reportes = [
    { id: 1, titulo: 'Reporte de Ingresos', fecha: '2025-05-01' },
    { id: 2, titulo: 'Ocupación Mensual', fecha: '2025-05-10' },
  ];

  return (
    <BaseScreen>
      <View className="flex-1 p-5 bg-[#fdfaf6]">
        <Text className="text-3xl font-bold text-[#2c2c66] mb-4">Listado de Reportes</Text>
        <TouchableOpacity
          className="flex-row items-center bg-[#4a7054] p-3 rounded-lg mb-4"
          onPress={() => router.push('/gestion/reportes/nuevo')}
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text className="text-white font-semibold ml-2">Crear nuevo reporte</Text>
        </TouchableOpacity>

        <FlatList
          data={reportes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="flex-row justify-between items-center bg-[#e0f7fa] p-3 rounded-lg mb-2"
              onPress={() => router.push(`/gestion/reportes/${item.id}`)}
            >
              <Text className="text-lg text-[#333]">{item.titulo}</Text>
              <Text className="text-sm text-gray-500">{item.fecha}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </BaseScreen>
  );
}
