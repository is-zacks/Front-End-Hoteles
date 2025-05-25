import React, { useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../../components/BaseScreen';

export default function HabitacionesDashboard() {
  const router = useRouter();
  const navigation = useNavigation();

  // Configuración del encabezado con título y botón de retroceso
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Gestión de Habitaciones',
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

  // Datos de ejemplo (reemplazar con datos del backend)
  const habitaciones = [
    { id: 1, nombre: 'Habitación VIP' },
    { id: 2, nombre: 'Suite Doble' },
  ];

  return (
    <BaseScreen>
      <View style={styles.container}>
        <Text style={styles.title}>Listado de Habitaciones</Text>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => router.push('/gestion/habitaciones/nueva')}
        >
          <Ionicons name="add-circle-outline" size={20} color="#fff" />
          <Text style={styles.newButtonText}>Crear nueva habitación</Text>
        </TouchableOpacity>

        <FlatList
          data={habitaciones}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <Text style={styles.itemText}>{item.nombre}</Text>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => router.push(`/gestion/habitaciones/${item.id}`)}
              >
                <Ionicons name="create-outline" size={20} color="#4a7054" />
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fdfaf6',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c2c66',
    marginBottom: 16,
  },
  newButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4a7054',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  newButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e0f7fa',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    backgroundColor: '#fff',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#4a7054',
  },
  editButtonText: {
    marginLeft: 4,
    color: '#4a7054',
    fontWeight: '600',
  },
});
