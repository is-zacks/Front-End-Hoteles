import React from 'react';
import { ScrollView, View, Text, Image } from 'react-native';
import { useRouter } from 'expo-router';
import OpcionUsuario from '../../components/auth/OpcionUsuario';

export default function AccountScreen() {
  const router = useRouter();

  // Usuario simulado
  const usuario = {
    nombre: 'Amir Jamal',
    rol: 'cliente', // Cambia a 'cliente' para probar
    email: 'amirjamal@example.com',
    foto: 'https://randomuser.me/api/portraits/men/32.jpg',
  };

  return (
    <ScrollView className="bg-[#fdfaf6] flex-1">
      {/* Información de usuario */}
      <View className="items-center mt-12 mb-6">
        <Image
          source={{ uri: usuario.foto }}
          className="w-32 h-32 rounded-full"
        />
        <Text className="text-xl font-bold mt-4">{usuario.nombre}</Text>
        <Text className="text-sm text-gray-500">{usuario.email}</Text>
      </View>

      {/* Opciones generales */}
      <View className="px-6 space-y-3">
        <OpcionUsuario
          icon="person-outline"
          title="Perfil"
          subtitle="Editar tu información"
          onPress={() => {}}
        />
        <OpcionUsuario
          icon="shield-outline"
          title="Seguridad"
          subtitle="Autenticación de dos factores"
          onPress={() => {}}
        />
        <OpcionUsuario
          icon="options-outline"
          title="Preferencias"
          subtitle="Modo oscuro y más"
          onPress={() => {}}
        />
        <OpcionUsuario
          icon="book-outline"
          title="Mis Reservas"
          subtitle="Historial y próximas estancias"
          onPress={() => {}}
        />
        <OpcionUsuario
          icon="settings-outline"
          title="Configuración"
          subtitle="Notificaciones y reembolsos"
          onPress={() => {}}
        />
      </View>

      {/* Opciones exclusivas para admin */}
      {usuario.rol === 'admin' && (
        <View className="px-6 mt-8 space-y-3">
          <Text className="text-sm text-gray-500">Administración</Text>
          <OpcionUsuario
            icon="grid-outline"
            title="Dashboard"
            subtitle="Accede al panel de control"
            onPress={() => router.push('/dashboard/admin')}
          />
          <OpcionUsuario
            icon="bed-outline"
            title="Gestión de habitaciones"
            subtitle="Edita o elimina habitaciones"
            onPress={() => router.push('/admin/rooms')}
          />
          <OpcionUsuario
            icon="stats-chart-outline"
            title="Reportes"
            subtitle="Estadísticas y rendimiento"
            onPress={() => router.push('/admin/reportes')}
          />
        </View>
      )}
    </ScrollView>
  );
}
