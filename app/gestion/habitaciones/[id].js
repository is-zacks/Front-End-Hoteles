// [id].js (Editar habitación existente)
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';

export default function EditarHabitacion() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    // Simulación de carga de datos por ID
    setNombre('Habitación de ejemplo');
    // Reemplazar por fetch real al backend usando el ID
  }, [id]);

  const handleActualizar = () => {
    if (!nombre) return alert('Nombre obligatorio');
    // Aquí va la lógica PUT al backend
    alert('Habitación actualizada');
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Habitación</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre de habitación"
        value={nombre}
        onChangeText={setNombre}
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
