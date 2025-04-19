import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

export default function UsuariosDashboard() {
  const router = useRouter();

  const usuarios = [
    { id: 1, nombre: 'Carlos Ramírez', rol: 'Recepcionista' },
    { id: 2, nombre: 'Ana Torres', rol: 'Camarista' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Usuarios</Text>
      <Button title="Registrar nuevo usuario" onPress={() => router.push('/gestion/usuarios/nuevo')} />

      <FlatList
        data={usuarios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.nombre} - {item.rol}</Text>
            <Button title="Editar" onPress={() => router.push(`/gestion/usuarios/${item.id}`)} />
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  itemRow: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 8 },
});
