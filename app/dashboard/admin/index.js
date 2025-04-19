import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const user = {
  nombre: 'Juan Pérez',
  rol: 'recepcionista', // puede ser 'admin', 'recepcionista', 'gerente'
};

export default function DashboardAdmin() {
  const router = useRouter();

  const opcionesAdmin = [
    {
      icon: 'hotel',
      label: 'Gestionar Habitaciones',
      ruta: '/gestion/habitaciones',
    },
    {
      icon: 'concierge-bell',
      label: 'Gestionar Servicios',
      ruta: '/gestion/servicios',
    },
    {
      icon: 'users-cog',
      label: 'Gestionar Usuarios',
      ruta: '/gestion/usuarios',
    },
    {
      icon: 'chart-line',
      label: 'Reportes Generales',
      ruta: '/reportes/ingresos',
    },
  ];
  
  

  const opcionesRecepcion = [
    {
      icon: 'calendar-check',
      label: 'Ver Reservaciones',
      ruta: '/reservaciones',
    },
    {
      icon: 'edit',
      label: 'Solicitar Modificación',
      ruta: '/reservaciones/solicitud',
    },
  ];

  const opcionesGerente = [
    {
      icon: 'file-alt',
      label: 'Reportes de Ocupación',
      ruta: '/reportes/ocupacion',
    },
    {
      icon: 'check-circle',
      label: 'Aprobar Solicitudes',
      ruta: '/aprobaciones',
    },
  ];

  const renderOpciones = (opciones) => (
    <View style={styles.grid}>
      {opciones.map((item, i) => (
        <TouchableOpacity
          key={i}
          style={styles.card}
          onPress={() => router.push(item.ruta)}
        >
          <FontAwesome5 name={item.icon} size={24} color="#409eff" />
          <Text style={styles.cardText}>{item.label}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Bienvenido, {user.nombre}</Text>
      <Text style={styles.subtitle}>Rol: {user.rol}</Text>

      {user.rol === 'admin' && renderOpciones(opcionesAdmin)}
      {user.rol === 'recepcionista' && renderOpciones(opcionesRecepcion)}
      {user.rol === 'gerente' && renderOpciones(opcionesGerente)}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#f0f8ff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  cardText: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 13,
  },
});