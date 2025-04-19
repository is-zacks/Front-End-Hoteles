import { View, Text, FlatList, StyleSheet, Button, Alert, Modal, TextInput } from 'react-native';
import { useState } from 'react';

export default function ReservacionesScreen() {
  const [showModal, setShowModal] = useState(false);
  const [motivo, setMotivo] = useState('');
  const [folioActual, setFolioActual] = useState(null);

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
    if (!motivo) return Alert.alert('Motivo obligatorio');
    Alert.alert('Solicitud enviada', `Folio: ${folioActual}\nMotivo: ${motivo}`);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Reservaciones Actuales</Text>
      <FlatList
        data={reservas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>{item.cliente} - {item.habitacion}</Text>
            <Text>Del {item.fecha_inicio} al {item.fecha_fin}</Text>
            <Text>Estado: {item.estado}</Text>
            <View style={styles.buttonRow}>
              <Button title="Aceptar" onPress={() => Alert.alert('Reservación aceptada')} />
              <Button title="Denegar" color="red" onPress={() => handleDenegar(item.folio)} />
            </View>
          </View>
        )}
      />

      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Solicitar Permiso para Denegar</Text>
            <Text style={{ fontSize: 12 }}>Folio: {folioActual}</Text>
            <TextInput
              style={styles.input}
              placeholder="Explica el motivo de la denegación"
              multiline
              value={motivo}
              onChangeText={setMotivo}
            />
            <Button title="Enviar Solicitud" onPress={enviarSolicitudDenegacion} />
            <Button title="Cancelar" onPress={() => setShowModal(false)} color="#888" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 12 },
  card: {
    backgroundColor: '#e6f2ff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginVertical: 10,
    minHeight: 80,
    textAlignVertical: 'top',
  },
});
