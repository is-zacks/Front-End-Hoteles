// [id].js (Editar usuario)
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function EditarUsuario() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    // Simulación de carga de usuario
    setNombre('Usuario Ejemplo');
    setRol('recepcionista');
  }, [id]);

  const handleActualizar = () => {
    if (!nombre || !rol) return alert('Todos los campos son obligatorios');
    // Aquí va la lógica PUT al backend
    alert('Usuario actualizado');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />
      <TextInput
        style={styles.input}
        placeholder="Rol"
        value={rol}
        onChangeText={setRol}
      />
      <Button title="Actualizar" onPress={handleActualizar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
});
