import {
    View,
    Text,
    TextInput,
    StyleSheet,
    Alert,
    TouchableOpacity,
    Modal,
    ScrollView,
    Image,
    Dimensions,
  } from 'react-native';
  import DateTimePicker from '@react-native-community/datetimepicker';
  import { useState, useEffect } from 'react';
  import { FontAwesome5 } from '@expo/vector-icons';
  
  const { width } = Dimensions.get('window');
  
  export default function ReservaModal({ visible, onClose, habitacionId }) {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [fechaInicio, setFechaInicio] = useState(new Date());
    const [fechaFin, setFechaFin] = useState(new Date());
    const [mostrarPickerInicio, setMostrarPickerInicio] = useState(false);
    const [mostrarPickerFin, setMostrarPickerFin] = useState(false);
    const [habitacion, setHabitacion] = useState(null);
    const [servicios, setServicios] = useState([]);
    const [seleccionados, setSeleccionados] = useState([]);
  
    useEffect(() => {
      setHabitacion({
        hotel: 'Hotel Catedral',
        title: 'Habitación Doble Estándar',
        precio: 999,
        images: [
          require('../assets/catedral.jpeg'),
          require('../assets/catedral.jpeg'),
          require('../assets/catedral.jpeg'),
        ],
      });
  
      setServicios([
        { id: 1, nombre: 'Desayuno', icon: 'utensils', precio: 150 },
        { id: 2, nombre: 'Traslado aeropuerto', icon: 'shuttle-van', precio: 300 },
        { id: 3, nombre: 'Acceso spa', icon: 'spa', precio: 200 },
      ]);
    }, [habitacionId]);
  
    const toggleServicio = (id) => {
      if (seleccionados.includes(id)) {
        setSeleccionados(seleccionados.filter((s) => s !== id));
      } else {
        setSeleccionados([...seleccionados, id]);
      }
    };
  
    const calcularTotal = () => {
      const extras = servicios
        .filter((s) => seleccionados.includes(s.id))
        .reduce((sum, s) => sum + s.precio, 0);
      return habitacion ? habitacion.precio + extras : 0;
    };
  
    const handleReserva = async () => {
      if (!nombre || !email) {
        Alert.alert('Error', 'Todos los campos son obligatorios');
        return;
      }
  
      if (fechaFin <= fechaInicio) {
        Alert.alert('Error', 'La fecha de fin debe ser posterior a la de inicio');
        return;
      }
  
      const datos = {
        nombre_cliente: nombre,
        email_cliente: email,
        fecha_inicio: fechaInicio.toISOString().split('T')[0],
        fecha_fin: fechaFin.toISOString().split('T')[0],
        habitacion: parseInt(habitacionId),
        servicios_adicionales: seleccionados,
      };
  
      try {
        const res = await fetch('https://tu-api.com/api/reservas/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos),
        });
  
        if (res.ok) {
          const nuevaReserva = await res.json();
          Alert.alert('¡Reserva Exitosa!', `Tu folio es: ${nuevaReserva.folio}`);
          onClose();
        } else {
          Alert.alert('Error', 'No se pudo completar la reserva');
        }
      } catch (error) {
        Alert.alert('Error', 'Fallo la conexión con el servidor');
      }
    };
  
    return (
      <Modal
        visible={visible}
        animationType="slide"
        onRequestClose={onClose}
      >
        <ScrollView contentContainerStyle={styles.container}>
          {habitacion && (
            <>
              <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
                {habitacion.images.map((img, idx) => (
                  <Image key={idx} source={img} style={styles.image} />
                ))}
              </ScrollView>
              <Text style={styles.hotel}>{habitacion.hotel}</Text>
              <Text style={styles.room}>{habitacion.title}</Text>
            </>
          )}
  
          <TextInput
            style={styles.input}
            placeholder="Nombre completo"
            value={nombre}
            onChangeText={setNombre}
          />
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
  
          <TouchableOpacity onPress={() => setMostrarPickerInicio(true)} style={styles.dateButton}>
            <Text>Fecha de inicio: {fechaInicio.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {mostrarPickerInicio && (
            <DateTimePicker
              value={fechaInicio}
              mode="date"
              display="default"
              onChange={(e, date) => {
                setMostrarPickerInicio(false);
                if (date) setFechaInicio(date);
              }}
            />
          )}
  
          <TouchableOpacity onPress={() => setMostrarPickerFin(true)} style={styles.dateButton}>
            <Text>Fecha de fin: {fechaFin.toLocaleDateString()}</Text>
          </TouchableOpacity>
          {mostrarPickerFin && (
            <DateTimePicker
              value={fechaFin}
              mode="date"
              display="default"
              onChange={(e, date) => {
                setMostrarPickerFin(false);
                if (date) setFechaFin(date);
              }}
            />
          )}
  
          <Text style={styles.sectionTitle}>Servicios adicionales</Text>
          {servicios.map((s) => (
            <TouchableOpacity
              key={s.id}
              style={[styles.servicioItem, seleccionados.includes(s.id) && styles.servicioActivo]}
              onPress={() => toggleServicio(s.id)}
            >
              <FontAwesome5 name={s.icon} size={16} color="#555" style={{ marginRight: 8 }} />
              <Text style={{ flex: 1 }}>{s.nombre}</Text>
              <Text>${s.precio}</Text>
            </TouchableOpacity>
          ))}
  
          <Text style={styles.total}>Total: ${calcularTotal()}</Text>
  
          <TouchableOpacity style={styles.button} onPress={handleReserva}>
            <Text style={styles.buttonText}>Confirmar Reserva</Text>
          </TouchableOpacity>
  
          <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      padding: 20,
      paddingTop: 40,
      backgroundColor: '#fff',
      flexGrow: 1,
    },
    image: {
      width: width,
      height: 220,
      resizeMode: 'cover',
      marginBottom: 12,
    },
    hotel: {
      fontSize: 16,
      color: '#666',
      textAlign: 'center',
    },
    room: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      marginBottom: 16,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    },
    dateButton: {
      padding: 12,
      backgroundColor: '#eee',
      borderRadius: 8,
      marginBottom: 12,
    },
    sectionTitle: {
      fontWeight: 'bold',
      marginVertical: 8,
      fontSize: 16,
    },
    servicioItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 8,
      borderBottomWidth: 1,
      borderColor: '#eee',
    },
    servicioActivo: {
      backgroundColor: '#f0f8ff',
    },
    total: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'right',
      marginTop: 12,
    },
    button: {
      backgroundColor: '#409eff',
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    cancelButton: {
      padding: 12,
      marginTop: 10,
      alignItems: 'center',
    },
    cancelText: {
      color: '#888',
    },
  });