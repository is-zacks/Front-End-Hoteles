import React, { useLayoutEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../../components/BaseScreen';

export default function VerReporte() {
  const { id } = useLocalSearchParams();
  const navigation = useNavigation();

  // Configuración del encabezado con el título del reporte
  useLayoutEffect(() => {
    navigation.setOptions({ 
        title: `Reporte #${id}`,
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: '#fdfaf6',
        },
        headerTintColor: '#111', });
  }, [navigation, id]);


  // Datos de ejemplo para el reporte
  const reporte = {
    titulo: 'Reporte de Ingresos Mensuales',
    fecha: '2025-05-15',
    ingresos: 25000,
    ocupacion: '85%',
    serviciosPopulares: ['Spa Premium', 'Desayuno Buffet', 'Tour Guiado'],
    conclusion: 'El hotel tuvo un excelente desempeño este mes, con una ocupación del 85% y un ingreso superior a los meses anteriores.',
  };

  return (
    <BaseScreen>
      <ScrollView className="flex-1 p-5 bg-[#fdfaf6]">
        <Text className="text-3xl font-bold text-[#2c2c66] mb-4">{reporte.titulo}</Text>
        <Text className="text-lg text-gray-600 mb-6">Fecha: {reporte.fecha}</Text>

        {/* Sección de Datos */}
        <View className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <Text className="text-xl font-semibold text-[#2c2c66] mb-2">Datos del Reporte</Text>
          <Text className="text-lg">Ingresos: ${reporte.ingresos.toLocaleString()}</Text>
          <Text className="text-lg">Ocupación: {reporte.ocupacion}</Text>
          <Text className="text-lg">Servicios Más Populares:</Text>
          {reporte.serviciosPopulares.map((servicio, index) => (
            <Text key={index} className="text-gray-700 ml-4">- {servicio}</Text>
          ))}
        </View>

        {/* Gráfica Simulada */}
        <View className="mb-6 p-4 bg-white rounded-lg shadow-sm">
          <Text className="text-xl font-semibold text-[#2c2c66] mb-2">Gráfica de Ingresos</Text>
          <View className="h-40 bg-[#e0f7fa] rounded-lg justify-center items-center">
            <Text className="text-xl font-bold text-gray-600">Gráfica No Disponible</Text>
          </View>
        </View>

        {/* Conclusión */}
        <View className="p-4 bg-white rounded-lg shadow-sm">
          <Text className="text-xl font-semibold text-[#2c2c66] mb-2">Conclusión</Text>
          <Text className="text-lg text-gray-700">{reporte.conclusion}</Text>
        </View>
      </ScrollView>
    </BaseScreen>
  );
}
