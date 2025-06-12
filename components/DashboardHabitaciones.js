import React, { useState, useEffect, useLayoutEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from './BaseScreen';

const mockHabitaciones = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  nombre: `HAB-${(i + 1).toString().padStart(3, '0')}`,
  estado_limpieza: 'limpio',
  estado_mantenimiento: 'listo',
}));

export default function DashboardHabitaciones({ rol = 'camarista' }) {
  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacionActiva, setHabitacionActiva] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  // Configuración del encabezado dinámico
  useLayoutEffect(() => {
    const titulo = rol === 'camarista' ? 'Dashboard de Camaristas' : 'Dashboard de Mantenimiento';
    navigation.setOptions({
      title: titulo,
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#fdfaf6',
      },
      headerTintColor: '#111',
    });
  }, [navigation, rol]);

  useEffect(() => {
    setHabitaciones(mockHabitaciones);
  }, []);

  const esEditable = (hab) => {
    return rol === 'camarista'
      ? hab.estado_mantenimiento === 'listo'
      : hab.estado_limpieza === 'limpio';
  };

  const handleEstado = (id, nuevoEstado) => {
    setHabitaciones((prev) =>
      prev.map((hab) => {
        if (hab.id === id) {
          return rol === 'camarista'
            ? { ...hab, estado_limpieza: nuevoEstado }
            : { ...hab, estado_mantenimiento: nuevoEstado };
        }
        return hab;
      })
    );
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    const enUso =
      item.estado_limpieza === 'en limpieza' ||
      item.estado_mantenimiento === 'en mantenimiento';
    const fondo = enUso ? 'bg-gray-300' : 'bg-white';

    return (
      <TouchableOpacity
        className={`flex-1 min-h-[100px] border border-gray-300 rounded-lg justify-center items-center m-1 p-2 ${fondo}`}
        disabled={!esEditable(item)}
        onPress={() => {
          setHabitacionActiva(item);
          setModalVisible(true);
        }}
      >
        <Text className="text-lg font-bold">{item.nombre}</Text>
        <View className="flex-row items-center gap-1 mt-2">
          <MaterialIcons name="cleaning-services" size={18} color="#555" />
          <Text className="text-sm text-gray-600"> {item.estado_limpieza}</Text>
        </View>
        <View className="flex-row items-center gap-1">
          <FontAwesome5 name="tools" size={18} color="#555" />
          <Text className="text-sm text-gray-600"> {item.estado_mantenimiento}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const opciones =
    rol === 'camarista'
      ? [
          { estado: 'en limpieza', label: 'En limpieza', icon: 'cleaning-services' },
          { estado: 'limpio', label: 'Limpio', icon: 'done' },
        ]
      : [
          { estado: 'en mantenimiento', label: 'En mantenimiento', icon: 'tools' },
          { estado: 'listo', label: 'Listo', icon: 'check-circle' },
        ];

  return (
    <BaseScreen>
      <View className="flex-1 p-4">
        <Text className="text-3xl font-bold text-[#2c2c66] mb-4">
          Dashboard de {rol === 'camarista' ? 'Camaristas' : 'Mantenimiento'}
        </Text>
        <FlatList
          data={habitaciones}
          keyExtractor={(item) => item.id.toString()}
          numColumns={3}
          renderItem={renderItem}
        />

        <Modal
          visible={modalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View className="flex-1 justify-center items-center bg-black bg-opacity-40">
            <View className="bg-white p-5 rounded-lg w-64">
              <Text className="text-xl font-bold mb-4">Cambiar Estado</Text>
              {opciones.map((op) => (
                <Pressable
                  key={op.estado}
                  className="py-3 px-4 bg-gray-100 rounded-md my-1 flex-row items-center"
                  onPress={() => handleEstado(habitacionActiva.id, op.estado)}
                >
                  <Ionicons name={op.icon} size={20} color="#555" />
                  <Text className="ml-2 text-lg">{op.label}</Text>
                </Pressable>
              ))}
              <Pressable
                className="mt-4 py-2 bg-red-600 rounded-full items-center"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">Cancelar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    </BaseScreen>
  );
}
