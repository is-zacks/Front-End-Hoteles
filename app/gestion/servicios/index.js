import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

export default function ServiciosDashboard() {
  const router = useRouter();

  const servicios = [
    { id: 1, nombre: 'Spa Premium' },
    { id: 2, nombre: 'Desayuno Buffet' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Servicios</Text>
      <Button title="Crear nuevo servicio" onPress={() => router.push('/gestion/servicios/nuevo')} />

      <FlatList
        data={servicios}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.nombre}</Text>
            <Button title="Editar" onPress={() => router.push(`/gestion/servicios/${item.id}`)} />
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
