// nueva.js (Crear nueva habitación)
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function CrearHabitacion() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');

  const handleGuardar = () => {
    if (!nombre) return alert('Nombre obligatorio');
    // Aquí irá tu lógica POST al backend
    alert('Habitación creada');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Habitación</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de habitación"
        value={nombre}
        onChangeText={setNombre}
      />
      <Button title="Guardar" onPress={handleGuardar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
});
