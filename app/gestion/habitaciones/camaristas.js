// app/gestion/habitaciones/DashboardCamarista.js
import React, { useState, useLayoutEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import BaseScreen from '../../../components/BaseScreen';
import CambioEstadoModal from '../../../components/CambioEstadoModal';

const mockHabitaciones = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  nombre: `HAB-${(i + 1).toString().padStart(3, '0')}`,
  estado_limpieza: 'sucio',
  estado_mantenimiento: 'operativo',
}));

const opcionesLimpieza = [
  { estado: 'sucio', label: 'Sucio', icon: 'close-circle-outline' },
  { estado: 'en limpieza', label: 'En Limpieza', icon: 'hand-left-outline' },
  { estado: 'limpio', label: 'Limpio', icon: 'checkmark-circle-outline' },
];

const opcionesMantenimiento = [
  { estado: 'en mantenimiento', label: 'En Mantenimiento', icon: 'construct-outline' },
  { estado: 'listo', label: 'Listo', icon: 'checkmark-circle' },
];

export default function DashboardCamarista() {
  const [habitaciones, setHabitaciones] = useState(mockHabitaciones);
  const [habitacionActiva, setHabitacionActiva] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTipo, setModalTipo] = useState(''); // limpieza o mantenimiento
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Dashboard de Camaristas',
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

  const handleEstado = (id, nuevoEstado, tipo) => {
    setHabitaciones((prev) =>
      prev.map((hab) =>
        hab.id === id
          ? {
              ...hab,
              [tipo === 'limpieza' ? 'estado_limpieza' : 'estado_mantenimiento']: nuevoEstado,
            }
          : hab
      )
    );
    setModalVisible(false);
  };

  const getColor = (estado) => {
    switch (estado) {
      case 'limpio':
      case 'listo':
        return 'bg-green-500';
      case 'en limpieza':
      case 'en mantenimiento':
        return 'bg-yellow-400';
      case 'sucio':
        return 'bg-red-500';
      default:
        return 'bg-gray-300';
    }
  };

  const renderItem = ({ item }) => {
    const fondoLimpieza = getColor(item.estado_limpieza);
    const fondoMantenimiento = getColor(item.estado_mantenimiento);

    return (
      <TouchableOpacity
        className={`flex-1 min-h-[140px] rounded-2xl justify-center items-center m-2 p-4 ${fondoLimpieza} shadow-md`}
        onPress={() => {
          setHabitacionActiva(item);
          setModalVisible(true);
          setModalTipo('limpieza'); // Inicialmente abrir el modal de limpieza
        }}
      >
        <Text className="text-2xl font-bold text-white">{item.nombre}</Text>

        {/* Estado de Limpieza */}
        <View className="flex-row items-center gap-2 mt-2">
          <MaterialIcons name="cleaning-services" size={24} color="#fff" />
          <Text className="text-lg text-white"> {item.estado_limpieza}</Text>
          <TouchableOpacity
            className="ml-2"
            onPress={() => {
              setHabitacionActiva(item);
              setModalVisible(true);
              setModalTipo('limpieza');
            }}
          >
            <MaterialIcons name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Estado de Mantenimiento */}
        <View className="flex-row items-center gap-2 mt-2">
          <FontAwesome5 name="tools" size={24} color="#fff" />
          <Text className="text-lg text-white"> {item.estado_mantenimiento}</Text>
          <TouchableOpacity
            className="ml-2"
            onPress={() => {
              setHabitacionActiva(item);
              setModalVisible(true);
              setModalTipo('mantenimiento');
            }}
          >
            <MaterialIcons name="edit" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <BaseScreen>
      <View className="p-4">
        <Text className="text-3xl font-bold text-[#2c2c66] mb-4">Dashboard de Camaristas</Text>
        <FlatList
          data={habitaciones}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          renderItem={renderItem}
        />
        <CambioEstadoModal
          visible={modalVisible}
          opciones={modalTipo === 'limpieza' ? opcionesLimpieza : opcionesMantenimiento}
          onClose={() => setModalVisible(false)}
          onSelect={(estado) => handleEstado(habitacionActiva.id, estado, modalTipo)}
        />
      </View>
    </BaseScreen>
  );
}
