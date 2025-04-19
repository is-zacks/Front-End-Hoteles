import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const mockHabitaciones = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  nombre: `HAB-${(i + 1).toString().padStart(3, '0')}`,
  estado_limpieza: 'limpio',
  estado_mantenimiento: 'listo',
}));

const DashboardHabitaciones = ({ rol = 'camarista' }) => {
  const [habitaciones, setHabitaciones] = useState([]);
  const [habitacionActiva, setHabitacionActiva] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

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
    const disabled = !esEditable(item);
    const enUso =
      item.estado_limpieza === 'en limpieza' ||
      item.estado_mantenimiento === 'en mantenimiento';
    const fondo = enUso ? '#ccc' : '#fff';

    return (
      <TouchableOpacity
        style={[styles.card, { backgroundColor: fondo }]}
        disabled={disabled}
        onPress={() => {
          setHabitacionActiva(item);
          setModalVisible(true);
        }}
      >
        <Text style={styles.cardText}>{item.nombre}</Text>
        <View style={styles.estadoRow}>
          <MaterialIcons name="cleaning-services" size={14} color="#555" />
          <Text style={styles.estadoLabel}> {item.estado_limpieza}</Text>
        </View>
        <View style={styles.estadoRow}>
          <FontAwesome5 name="tools" size={14} color="#555" />
          <Text style={styles.estadoLabel}> {item.estado_mantenimiento}</Text>
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
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard de {rol === 'camarista' ? 'Camaristas' : 'Mantenimiento'}</Text>
      <FlatList
        data={habitaciones}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        renderItem={renderItem}
        columnWrapperStyle={styles.row}
      />

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Cambiar estado</Text>
            {opciones.map((op) => (
              <Pressable
                key={op.estado}
                style={styles.modalBtn}
                onPress={() => handleEstado(habitacionActiva.id, op.estado)}
              >
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
                  {rol === 'camarista' ? (
                    <MaterialIcons name={op.icon} size={16} color="#333" />
                  ) : (
                    <FontAwesome5 name={op.icon} size={16} color="#333" />
                  )}
                  <Text>{op.label}</Text>
                </View>
              </Pressable>
            ))}
            <Pressable onPress={() => setModalVisible(false)}>
              <Text style={{ marginTop: 10, color: 'red' }}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DashboardHabitaciones;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  card: {
    flex: 1,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    padding: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  estadoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 4,
  },
  estadoLabel: {
    fontSize: 12,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    width: 220,
    alignItems: 'center',
  },
  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalBtn: {
    paddingVertical: 8,
    width: '100%',
    alignItems: 'center',
  },
});
