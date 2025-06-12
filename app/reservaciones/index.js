import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, Alert, Modal, TextInput, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../components/BaseScreen';

export default function ReservacionesScreen() {
  const [showModal, setShowModal] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [folioActual, setFolioActual] = useState(null);
  const router = useRouter();
  const navigation = useNavigation();

  // Configuración del encabezado dinámico
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Reservaciones Actuales',
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

  const reservas = [
    {
      id: 1,
      cliente: 'Juan Pérez',
      habitacion: 'Suite 202',
      estado: 'pendiente',
      fecha_inicio: '2025-04-01',
      fecha_fin: '2025-04-05',
      folio: '878fdb07-90e6-4e4a-92c6-a9651fc5545c',
    },
    {
      id: 2,
      cliente: 'Laura Romero',
      habitacion: 'VIP 301',
      estado: 'confirmada',
      fecha_inicio: '2025-04-10',
      fecha_fin: '2025-04-15',
      folio: 'f2e7be34-5c10-4dd2-845f-3b18a5fbc210',
    },
  ];

  const handleDenegar = (folio) => {
    setFolioActual(folio);
    setMotivo('');
    setShowModal(true);
  };

  const enviarSolicitudDenegacion = () => {
    if (!motivo) return Alert.alert('Error', 'Motivo obligatorio');
    Alert.alert('Solicitud enviada', `Folio: ${folioActual}\nMotivo: ${motivo}`);
    setShowModal(false);
  };

  return (
    <BaseScreen>
      <View className="flex-1 p-5">
        <Text className="text-3xl font-bold text-[#2c2c66] mb-4">Reservaciones Actuales</Text>
        <FlatList
          data={reservas}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View className="bg-[#e6f2ff] p-4 rounded-lg mb-3">
              <Text className="font-bold text-lg mb-1">{item.cliente} - {item.habitacion}</Text>
              <Text className="text-gray-600">Del {item.fecha_inicio} al {item.fecha_fin}</Text>
              <Text className="text-gray-600">Estado: {item.estado}</Text>
              <View className="flex-row justify-between mt-3">
                <TouchableOpacity
                  className="bg-green-600 px-4 py-2 rounded-md"
                  onPress={() => Alert.alert('Reservación aceptada')}
                >
                  <Text className="text-white">Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="bg-red-600 px-4 py-2 rounded-md"
                  onPress={() => handleDenegar(item.folio)}
                >
                  <Text className="text-white">Denegar</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />

        <Modal visible={showModal} transparent animationType="slide">
          <View className="flex-1 justify-center items-center bg-black bg-opacity-50">
            <View className="w-80 bg-white rounded-lg p-5">
              <Text className="text-xl font-bold mb-2">Solicitar Permiso para Denegar</Text>
              <Text className="text-gray-600">Folio: {folioActual}</Text>
              <TextInput
                className="border border-gray-300 rounded-lg p-3 mt-2 mb-4 bg-white"
                placeholder="Explica el motivo de la denegación"
                multiline
                value={motivo}
                onChangeText={setMotivo}
              />
              <TouchableOpacity
                className="bg-[#4a7054] py-3 rounded-full items-center mb-2"
                onPress={enviarSolicitudDenegacion}
              >
                <Text className="text-white">Enviar Solicitud</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="bg-gray-400 py-3 rounded-full items-center"
                onPress={() => setShowModal(false)}
              >
                <Text className="text-white">Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </BaseScreen>
  );
}
