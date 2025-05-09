import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, ActivityIndicator } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import api from '../../src/api/client';

export default function BookingScreen() {
  const [folio, setFolio] = useState('');
  const [reserva, setReserva] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const consultarReserva = async () => {
    if (!folio) {
      setError('Por favor ingresa el folio de la reservación.');
      return;
    }

    setLoading(true);
    try {
      const response = await api.get(`/reservaciones/${folio}/`);
      setReserva(response.data);
      setError('');
    } catch (err) {
      console.error('Error al consultar reservación:', err);
      setError('No se encontró la reservación.');
      setReserva(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView className="flex-1 px-4 pt-6">
      <View className="mb-4">
        <Text className="text-xl font-bold text-gray-800">Consultar Reservación</Text>
        <TextInput
          className="bg-gray-100 p-3 rounded-lg mt-2"
          placeholder="Ingresa el folio"
          value={folio}
          onChangeText={setFolio}
        />
        {error ? <Text className="text-red-500 mt-1">{error}</Text> : null}
        <TouchableOpacity
          onPress={consultarReserva}
          className="bg-[#4a7054] py-3 rounded-full mt-3 items-center"
        >
          <Text className="text-white font-bold">Consultar</Text>
        </TouchableOpacity>
      </View>

      {loading && (
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator size="large" color="#4a7054" />
          <Text className="text-gray-500 mt-2">Consultando reservación...</Text>
        </View>
      )}

      {reserva && (
        <View className="bg-white rounded-2xl shadow-md p-4 mb-4">
          {/* Encabezado con el nombre del hotel */}
          <View className="flex-row items-center mb-4">
            <Image
              source={require('../../assets/catedral.jpeg')}
              className="w-20 h-20 rounded-lg mr-4"
              resizeMode="cover"
            />
            <View>
              <Text className="text-2xl font-bold text-gray-800">{reserva.nombre_hotel || 'Hotel Desconocido'}</Text>
              <Text className="text-gray-600">Folio: {reserva.folio}</Text>
            </View>
          </View>

          {/* Información del cliente */}
          <View className="mt-4 bg-gray-100 p-3 rounded-lg">
            <Text className="text-lg font-semibold text-gray-700">Datos del Cliente</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="person" size={16} color="#4a7054" />
              <Text className="ml-2">Nombre: {reserva.nombre_cliente}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="mail" size={16} color="#4a7054" />
              <Text className="ml-2">Correo: {reserva.email_cliente}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="call" size={16} color="#4a7054" />
              <Text className="ml-2">Telefono: {reserva.telefono_cliente || 'No registrado'}</Text>
            </View>
          </View>

          {/* Detalles de la reservación */}
          <View className="mt-4 bg-gray-100 p-3 rounded-lg">
            <Text className="text-lg font-semibold text-gray-700">Detalles de la Reservación</Text>
            <View className="flex-row items-center mt-1">
              <Ionicons name="calendar" size={16} color="#4a7054" />
              <Text className="ml-2">Fechas: {reserva.fecha_inicio} - {reserva.fecha_fin}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="people" size={16} color="#4a7054" />
              <Text className="ml-2">Huéspedes: {reserva.numero_huespedes}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="bed" size={16} color="#4a7054" />
              <Text className="ml-2">Habitación #{reserva.habitacion}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="cash" size={16} color="#4a7054" />
              <Text className="ml-2">Total: ${reserva.total}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="clipboard" size={16} color="#4a7054" />
              <Text className="ml-2">Estado: {reserva.estado}</Text>
            </View>
            <View className="flex-row items-center mt-1">
              <Ionicons name="time" size={16} color="#4a7054" />
              <Text className="ml-2">Creación: {new Date(reserva.fecha_creacion).toLocaleString()}</Text>
            </View>
          </View>
        </View>
      )}
    </ScrollView>
  );
}
