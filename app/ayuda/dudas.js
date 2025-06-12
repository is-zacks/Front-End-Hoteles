import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../components/BaseScreen';

const preguntasFrecuentes = [
  {
    id: 1,
    pregunta: '¿Cómo puedo reservar una habitación?',
    respuesta: 'Puedes reservar una habitación directamente desde la aplicación seleccionando el hotel y las fechas deseadas.',
  },
  {
    id: 2,
    pregunta: '¿Qué métodos de pago se aceptan?',
    respuesta: 'Aceptamos tarjetas de crédito, débito y pagos en efectivo al llegar al hotel.',
  },
  {
    id: 3,
    pregunta: '¿Puedo cancelar una reserva?',
    respuesta: 'Sí, puedes cancelar tu reserva desde la sección de reservaciones activas. Aplica la política de cancelación del hotel.',
  },
  {
    id: 4,
    pregunta: '¿Cómo puedo contactar al servicio de soporte?',
    respuesta: 'Puedes enviarnos un correo a soporte@hotelesmorelia.com o llamarnos al +52 443 123 4567.',
  },
  {
    id: 5,
    pregunta: '¿Las habitaciones incluyen desayuno?',
    respuesta: 'Depende del hotel seleccionado. Algunos hoteles ofrecen desayuno incluido, otros tienen tarifas adicionales.',
  },
];

export default function FaqScreen() {
  const navigation = useNavigation();
  const [activeId, setActiveId] = useState(null);

  // Configuración del header dentro del componente
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Preguntas Frecuentes',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#fdfaf6',
      },
      headerTintColor: '#111',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const toggleAnswer = (id) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

  return (
    <BaseScreen>
      <View className="flex-1 pt-6">
        <View className="flex-row items-center mb-4">
          <Ionicons name="help-circle-outline" size={30} color="#4a7054" />
          <Text className="text-2xl font-bold text-gray-800 ml-2">Preguntas Frecuentes</Text>
        </View>

        {/* Lista de preguntas frecuentes */}
        <FlatList
          data={preguntasFrecuentes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="mb-2 bg-white rounded-lg shadow-md p-4">
              <TouchableOpacity 
                onPress={() => toggleAnswer(item.id)} 
                className="flex-row justify-between items-center"
              >
                <Text className="text-lg font-medium text-gray-800">{item.pregunta}</Text>
                <Ionicons
                  name={activeId === item.id ? 'chevron-up-outline' : 'chevron-down-outline'}
                  size={20}
                  color="#4a7054"
                />
              </TouchableOpacity>
              {activeId === item.id && (
                <View className="mt-2">
                  <Text className="text-gray-600">{item.respuesta}</Text>
                </View>
              )}
            </View>
          )}
        />

        {/* Sección de contacto */}
        <View className="mt-6 p-4 bg-gray-100 rounded-lg">
          <Text className="text-lg font-bold text-gray-800 mb-2">¿Necesitas más ayuda?</Text>
          <Text className="text-gray-600 mb-1">Contáctanos a través de:</Text>
          <View className="flex-row items-center">
            <Ionicons name="mail-outline" size={20} color="#4a7054" />
            <Text className="ml-2 text-gray-600">soporte@hotelesmorelia.com</Text>
          </View>
          <View className="flex-row items-center mt-2">
            <Ionicons name="call-outline" size={20} color="#4a7054" />
            <Text className="ml-2 text-gray-600">+52 443 123 4567</Text>
          </View>
        </View>
      </View>
    </BaseScreen>
  );
}
