import React from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import OpcionUsuario from '../../components/auth/OpcionUsuario';
import BaseScreen from '../../components/BaseScreen';
import { useAuth } from '../../src/context/AuthContext';

export default function AccountScreen() {
  const router = useRouter();
  const { user, logoutUser } = useAuth();

  const generateAvatarUrl = (username) => {
    return `https://randomuser.me/api/portraits/men/34.jpg`;
  };

  return (
    <BaseScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {user ? (
          <>
            {/* Información de usuario */}
            <View className="items-center mt-12 mb-6">
              <Image
                source={{
                  uri: user.photo || generateAvatarUrl()
                }}
                className="w-32 h-32 rounded-full"
              />
              <Text className="text-xl font-bold mt-4">{user.username || 'Usuario'}</Text>
              <Text className="text-sm text-gray-500">{user.email || 'Sin correo'}</Text>
            </View>

            {/* Opciones generales */}
            <View className="space-y-3 mb-6">
              <OpcionUsuario
                icon="person-outline"
                title="Perfil"
                subtitle="Editar tu información"
                onPress={() => router.push('/perfil/perfil')}
              />
              <OpcionUsuario
                icon="shield-outline"
                title="Seguridad"
                subtitle="Autenticación de dos factores"
                onPress={() => router.push('/security')}
              />
              <OpcionUsuario
                icon="options-outline"
                title="Preferencias"
                subtitle="Modo oscuro y más"
                onPress={() => router.push('/preferences')}
              />
              <OpcionUsuario
                icon="help-circle-outline"
                title="Ayuda"
                subtitle="Preguntas frecuentes"
                onPress={() => router.push('/help')}
              />
              <OpcionUsuario
                icon="chatbubble-ellipses-outline"
                title="Soporte"
                subtitle="Contáctanos"
                onPress={() => router.push('/support')}
              />
              <OpcionUsuario
                icon="settings-outline"
                title="Configuración"
                subtitle="Notificaciones y reembolsos"
                onPress={() => router.push('/settings')}
              />
            </View>

            {/* Opciones exclusivas para admin */}
            {user.rol === 'administrador' && (
              <View className="space-y-3 mb-6">
                <Text className="text-sm text-gray-500">Opciones de Administración</Text>
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

            {/* Botón de Cerrar Sesión */}
            <View className="mt-4">
              <TouchableOpacity
                onPress={() => {
                  logoutUser();
                  router.push('/login');
                }}
                className="bg-red-500 px-6 py-3 rounded-full items-center"
              >
                <Text className="text-white font-semibold text-base">Cerrar sesión</Text>
              </TouchableOpacity>
            </View>
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
                className="bg-[#4a7054] px-6 py-4 rounded-full mb-4"
              >
                <Text className="text-white font-semibold text-base">Iniciar sesión</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => router.push('/registro')}
                className="border border-[#4a7054] px-6 py-4 rounded-full"
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
