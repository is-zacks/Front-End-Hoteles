// [id].js (Editar servicio)
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function EditarServicio() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [nombre, setNombre] = useState('');
  const [precio, setPrecio] = useState('');

  useEffect(() => {
    // Simulación de carga inicial
    setNombre('Spa Premium');
    setPrecio('300');
  }, [id]);

  const handleActualizar = () => {
    if (!nombre || !precio) return alert('Todos los campos son obligatorios');
    // Aquí va la lógica PUT al backend
    alert('Servicio actualizado');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Servicio</Text>
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
      <Button title="Actualizar" onPress={handleActualizar} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginBottom: 16 },
});