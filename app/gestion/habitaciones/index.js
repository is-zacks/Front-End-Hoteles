import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

export default function HabitacionesDashboard() {
  const router = useRouter();

  // Dummy data (reemplazar con fetch del backend)
  const habitaciones = [
    { id: 1, nombre: 'Habitación VIP' },
    { id: 2, nombre: 'Suite Doble' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Habitaciones</Text>
      <Button
        title="Crear nueva habitación"
        onPress={() => router.push('/gestion/habitaciones/nueva')}
      />

      <FlatList
        data={habitaciones}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text>{item.nombre}</Text>
            <Button
              title="Editar"
              onPress={() => router.push(`/gestion/habitaciones/${item.id}`)}
            />
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