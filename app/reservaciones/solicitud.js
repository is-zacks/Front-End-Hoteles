// /reservaciones/solicitud.js
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal, TouchableOpacity } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState, useEffect } from 'react';

export default function SolicitudModificacion() {
  const [folio, setFolio] = useState('');
  const [motivo, setMotivo] = useState('');
  const [mostrarEliminar, setMostrarEliminar] = useState(false);
  const [mostrarModificar, setMostrarModificar] = useState(false);
  const [nuevaFechaInicio, setNuevaFechaInicio] = useState(new Date());
  const [nuevaFechaFin, setNuevaFechaFin] = useState(new Date());
  const [showPickerInicio, setShowPickerInicio] = useState(false);
  const [showPickerFin, setShowPickerFin] = useState(false);
  const [serviciosSeleccionados, setServiciosSeleccionados] = useState([]);
  const [diasExtra, setDiasExtra] = useState(0);
  const [precioFinal, setPrecioFinal] = useState(0);

  const serviciosDisponibles = [
    { id: 1, nombre: 'Spa', precio: 200 },
    { id: 2, nombre: 'Desayuno Buffet', precio: 100 },
    { id: 3, nombre: 'Estacionamiento', precio: 50 },
  ];

  const PRECIO_BASE_POR_DIA = 500;

  const toggleServicio = (id) => {
    if (serviciosSeleccionados.includes(id)) {
      setServiciosSeleccionados(serviciosSeleccionados.filter((s) => s !== id));
    } else {
      setServiciosSeleccionados([...serviciosSeleccionados, id]);
    }
  };

  useEffect(() => {
    if (nuevaFechaInicio && nuevaFechaFin) {
      const inicio = new Date(nuevaFechaInicio);
      const fin = new Date(nuevaFechaFin);
      const diffTime = fin - inicio;
      const dias = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setDiasExtra(dias > 0 ? dias : 0);
    }
  }, [nuevaFechaInicio, nuevaFechaFin]);

  useEffect(() => {
    const costoServicios = serviciosSeleccionados.reduce((acc, id) => {
      const servicio = serviciosDisponibles.find((s) => s.id === id);
      return acc + (servicio ? servicio.precio : 0);
    }, 0);
    const total = diasExtra * PRECIO_BASE_POR_DIA + costoServicios;
    setPrecioFinal(total);
  }, [diasExtra, serviciosSeleccionados]);

  const enviarEliminacion = () => {
    if (!folio || !motivo) return Alert.alert('Todos los campos son obligatorios');
    Alert.alert('Solicitud de eliminación enviada', `Folio: ${folio}\nMotivo: ${motivo}`);
    setMostrarEliminar(false);
    setFolio('');
    setMotivo('');
  };

  const enviarModificacion = () => {
    if (!folio || !nuevaFechaInicio || !nuevaFechaFin) return Alert.alert('Campos incompletos');
    Alert.alert(
      'Modificación solicitada',
      `Folio: ${folio}\nNueva Fecha: ${nuevaFechaInicio.toDateString()} a ${nuevaFechaFin.toDateString()}\nDías: ${diasExtra}\nServicios: ${serviciosSeleccionados.join(', ')}\nPrecio estimado: $${precioFinal}`
    );
    setMostrarModificar(false);
    setFolio('');
    setNuevaFechaInicio(new Date());
    setNuevaFechaFin(new Date());
    setServiciosSeleccionados([]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Acciones sobre una Reservación</Text>

      <TextInput
        placeholder="Folio de la reservación"
        value={folio}
        onChangeText={setFolio}
        style={styles.input}
      />

      <Button title="Eliminar Reservación" color="red" onPress={() => setMostrarEliminar(true)} />
      <View style={{ marginTop: 10 }} />
      <Button title="Modificar Reservación" onPress={() => setMostrarModificar(true)} />

      {/* Modal para eliminar */}
      <Modal visible={mostrarEliminar} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Solicitar Eliminación</Text>
            <Text style={styles.label}>Folio: {folio}</Text>
            <TextInput
              style={styles.input}
              placeholder="Motivo de eliminación"
              multiline
              value={motivo}
              onChangeText={setMotivo}
            />
            <Button title="Enviar Solicitud" onPress={enviarEliminacion} />
            <Button title="Cancelar" onPress={() => setMostrarEliminar(false)} color="#888" />
          </View>
        </View>
      </Modal>

      {/* Modal para modificar */}
      <Modal visible={mostrarModificar} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modificar Reservación</Text>
            <Text style={styles.label}>Folio: {folio}</Text>

            <TouchableOpacity style={styles.input} onPress={() => setShowPickerInicio(true)}>
              <Text>Fecha de Inicio: {nuevaFechaInicio.toDateString()}</Text>
            </TouchableOpacity>
            {showPickerInicio && (
              <DateTimePicker
                value={nuevaFechaInicio}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowPickerInicio(false);
                  if (date) setNuevaFechaInicio(date);
                }}
              />
            )}

            <TouchableOpacity style={styles.input} onPress={() => setShowPickerFin(true)}>
              <Text>Fecha de Fin: {nuevaFechaFin.toDateString()}</Text>
            </TouchableOpacity>
            {showPickerFin && (
              <DateTimePicker
                value={nuevaFechaFin}
                mode="date"
                display="default"
                onChange={(event, date) => {
                  setShowPickerFin(false);
                  if (date) setNuevaFechaFin(date);
                }}
              />
            )}

            <Text style={styles.label}>Servicios adicionales</Text>
            {serviciosDisponibles.map((s) => (
              <TouchableOpacity
                key={s.id}
                style={[styles.servicioBtn, serviciosSeleccionados.includes(s.id) && styles.servicioActivo]}
                onPress={() => toggleServicio(s.id)}
              >
                <Text>{s.nombre} - ${s.precio}</Text>
              </TouchableOpacity>
            ))}

            <Text style={styles.label}>Total estimado: ${precioFinal}</Text>
            <Button title="Confirmar Cambios" onPress={enviarModificacion} />
            <Button title="Cancelar" onPress={() => setMostrarModificar(false)} color="#888" />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
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
  label: {
    fontWeight: '600',
    marginBottom: 6,
  },
  servicioBtn: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#aaa',
    borderRadius: 8,
    marginBottom: 8,
  },
  servicioActivo: {
    backgroundColor: '#cce5ff',
    borderColor: '#409eff',
  },
});