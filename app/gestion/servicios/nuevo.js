// nuevo.js (Crear nuevo servicio adicional)
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function CrearServicio() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  const handleGuardar = () => {
    if (!nombre || !precio) return alert('Todos los campos son obligatorios');
    // Aquí irá tu lógica POST al backend
    alert('Servicio creado');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Servicio</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre del servicio"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        keyboardType="numeric"
        value={precio}
        onChangeText={setPrecio}
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