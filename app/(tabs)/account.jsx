import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import OpcionUsuario from '../../components/auth/OpcionUsuario';
import BaseScreen from '../../components/BaseScreen'; // 👈 Importar el BaseScreen

export default function AccountScreen() {
  const router = useRouter();

  // Usuario simulado (cambia a null para probar)
  const usuario = null; // null = no logueado

  return (
    <BaseScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {usuario ? (
          <>
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
            <View className="space-y-3">
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
              <View className="mt-8 space-y-3">
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
          </>
        ) : (
          <>
            {/* SI NO ESTÁ LOGUEADO */}
            <View className="items-center mt-32 space-y-6">
              <Text className="text-2xl font-bold text-[#2c2c66]">Bienvenido</Text>
              <Text className="text-gray-600 text-center py-6">
                Inicia sesión o crea una cuenta para gestionar tus reservas y más.
              </Text>

              <TouchableOpacity
                onPress={() => router.push('/login')}
                className="bg-[#4a7054] px-6 py-6 rounded-full mb-4"
              >
                <Text className="text-white font-semibold text-base">Iniciar sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/registro')}
                className="border border-[#4a7054] px-6 py-6 rounded-full"
              >
                <Text className="text-[#4a7054] font-semibold text-base">Crear cuenta</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </BaseScreen>
  );
}
