import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import BaseScreen from '../../../components/BaseScreen';

// Simulación de usuario (esto debe venir del contexto)
const user = {
  nombre: 'Juan Pérez',
  rol: 'recepcionista', // puede ser 'admin', 'recepcionista', 'gerente'
};

export default function DashboardAdmin() {
  const router = useRouter();
  const navigation = useNavigation();

  // Ajustar el título dinámico según el rol
  useLayoutEffect(() => {
    const tituloDashboard = {
      admin: 'Dashboard de Administración',
      recepcionista: 'Dashboard de Recepción',
      gerente: 'Dashboard de Gerencia',
    };
    navigation.setOptions({
      title: tituloDashboard[user.rol] || 'Dashboard',
      headerTitleAlign: 'center',
      headerStyle: {
        backgroundColor: '#fdfaf6',
      },
      headerTintColor: '#111',
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingLeft: 12 }}>
          <Ionicons name="arrow-back" size={24} color="#111" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, user.rol]);

  // Opciones del administrador
  const opcionesAdmin = [
    { icon: 'hotel', label: 'Gestionar Habitaciones', ruta: '/gestion/habitaciones' },
    { icon: 'concierge-bell', label: 'Gestionar Servicios', ruta: '/gestion/servicios' },
    { icon: 'users-cog', label: 'Gestionar Usuarios', ruta: '/gestion/usuarios' },
    { icon: 'chart-line', label: 'Reportes Generales', ruta: '/gestion/reportes' },
  ];

  // Opciones del recepcionista
  const opcionesRecepcion = [
    { icon: 'calendar-check', label: 'Ver Reservaciones', ruta: '/reservaciones' },
    { icon: 'edit', label: 'Solicitar Modificación', ruta: '/reservaciones/solicitud' },
  ];

  // Opciones del gerente
  const opcionesGerente = [
    { icon: 'file-alt', label: 'Reportes de Ocupación', ruta: '/reportes/ocupacion' },
    { icon: 'check-circle', label: 'Aprobar Solicitudes', ruta: '/aprobaciones' },
  ];

  // Renderizar opciones según el rol
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
    <BaseScreen>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Bienvenido, {user.nombre}</Text>
          <Text style={styles.subtitle}>Rol: {user.rol}</Text>
        </View>

        {user.rol === 'admin' && renderOpciones(opcionesAdmin)}
        {user.rol === 'recepcionista' && renderOpciones(opcionesRecepcion)}
        {user.rol === 'gerente' && renderOpciones(opcionesGerente)}
      </ScrollView>
    </BaseScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fdfaf6',
  },
  header: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c2c66',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    backgroundColor: '#e0f7fa',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  cardText: {
    marginTop: 8,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 15,
    color: '#333',
  },
});
