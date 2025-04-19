// nuevo.js (Crear nuevo usuario)
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';

export default function CrearUsuario() {
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');

  const handleGuardar = () => {
    if (!nombre || !rol) return alert('Todos los campos son obligatorios');
    // Aquí irá tu lógica POST al backend
    alert('Usuario creado');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nuevo Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Rol (admin, recepcionista, camarista...)"
        value={rol}
        onChangeText={setRol}
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
