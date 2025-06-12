import { View, Text, Modal, TouchableOpacity, TextInput, Button, ScrollView } from 'react-native';
import { useState } from 'react';
import CalendarioDisponibilidad from './CalendarioDisponibilidad';

export default function ReservaModal({ visible, onClose, habitacionId, precioPorNoche = 999 }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [rango, setRango] = useState({
    startDate: '',
    endDate: '',
    markedDates: {},
  });

  const calcularTotal = () => {
    const { startDate, endDate } = rango;
    if (startDate && endDate) {
      const dias = Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24));
      return dias > 0 ? dias * precioPorNoche : 0;
    }
    return 0;
  };

  const enviarReservacion = async () => {
    if (!rango.startDate || !rango.endDate || !nombre || !correo) {
      alert('Completa todos los campos y selecciona fechas');
      return;
    }

    const payload = {
      habitacion: habitacionId,
      nombre,
      correo,
      fecha_inicio: rango.startDate,
      fecha_fin: rango.endDate,
      total: calcularTotal(),
    };

    try {
      const response = await fetch('https://TU_BACKEND/api/reservaciones/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert('¡Reservación enviada!');
        onClose();
      } else {
        alert('Error al reservar');
      }
    } catch (error) {
      console.error(error);
      alert('Error de red');
    }
  };

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <ScrollView className="flex-1 bg-black/30">
        <View className="bg-white m-4 p-6 rounded-xl">
          <Text className="text-lg font-bold mb-4">Reservar habitación</Text>

          <Text className="mb-1">Nombre completo</Text>
          <TextInput value={nombre} onChangeText={setNombre} className="border p-2 mb-2 rounded" />

          <Text className="mb-1">Correo electrónico</Text>
          <TextInput value={correo} onChangeText={setCorreo} className="border p-2 mb-4 rounded" keyboardType="email-address" />

          <CalendarioDisponibilidad rango={rango} setRango={setRango} />

          <Text className="mt-4 mb-4 font-bold text-lg">Total: ${calcularTotal()}</Text>

          <Button title="Confirmar Reservación" onPress={enviarReservacion} />

          <TouchableOpacity onPress={onClose} className="mt-4">
            <Text className="text-center text-red-600">Cancelar</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Modal>
  );
}
