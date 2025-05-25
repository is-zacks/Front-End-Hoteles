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

  // Opciones comunes para todos los roles
  const opcionesComunes = [
    { icon: 'person-outline', title: 'Perfil', subtitle: 'Editar tu información', ruta: '/perfil/perfil' },
    // { icon: 'shield-outline', title: 'Seguridad', subtitle: 'Autenticación de dos factores', ruta: '/security' },
    { icon: 'options-outline', title: 'Preferencias', subtitle: 'Modo oscuro y más', ruta: '/preferences' },
    { icon: 'help-circle-outline', title: 'Ayuda', subtitle: 'Preguntas frecuentes', ruta: '/ayuda/dudas' },
    { icon: 'chatbubble-ellipses-outline', title: 'Soporte', subtitle: 'Contáctanos', ruta: '/soporte' },
    // { icon: 'settings-outline', title: 'Configuración', subtitle: 'Notificaciones y reembolsos', ruta: '/settings' },
  ];

  // Opciones exclusivas para el administrador
  const opcionesAdmin = [
    { icon: 'grid-outline', title: 'Dashboard', subtitle: 'Accede al panel de control', ruta: '/dashboard/admin' },
    { icon: 'bed-outline', title: 'Gestión de Habitaciones', subtitle: 'Edita o elimina habitaciones', ruta: '/gestion/habitaciones' },
    { icon: 'stats-chart-outline', title: 'Reportes', subtitle: 'Estadísticas y rendimiento', ruta: '/gestion/reportes' },
    { icon: 'people-outline', title: 'Gestión de Usuarios', subtitle: 'Administrar usuarios del sistema', ruta: '/gestion/usuarios' },
    { icon: 'clipboard-outline', title: 'Reservaciones', subtitle: 'Gestión de reservaciones', ruta: '/reservaciones' },
    { icon: 'bed-outline', title: 'Estado de Habitaciones', subtitle: 'Actualizar estado de limpieza', ruta: '/gestion/habitaciones/camaristas' },
    { icon: 'construct-outline', title: 'Reparacion de Habitaciones', subtitle: 'Actualizar estado de mantenimiento', ruta: '/gestion/habitaciones/mantenimiento' },
  ];

  // Opciones específicas para roles secundarios (camarista, recepcionista, mantenimiento)
  const opcionesRolesSecundarios = {
    camarista: [
      { icon: 'cleaning-services', title: 'Estado de Habitaciones', subtitle: 'Actualizar estado de limpieza', ruta: '/gestion/habitaciones' },
      { icon: 'checkmark-done-outline', title: 'Tareas Asignadas', subtitle: 'Listado de tareas de limpieza', ruta: '/gestion/tareas' },
    ],
    recepcionista: [
      { icon: 'calendar-check', title: 'Ver Reservaciones', subtitle: 'Listado de reservaciones', ruta: '/reservaciones' },
      { icon: 'edit', title: 'Modificar Reservación', subtitle: 'Cambiar fechas o estado', ruta: '/reservaciones/modificar' },
    ],
    mantenimiento: [
      { icon: 'hammer-outline', title: 'Reparaciones', subtitle: 'Actualizar estado de mantenimiento', ruta: '/gestion/reparaciones' },
      { icon: 'alert-circle-outline', title: 'Reportar Falla', subtitle: 'Registrar una falla en la habitación', ruta: '/gestion/fallas' },
    ],
  };

  const renderOpciones = (opciones) => (
    <View className="space-y-3 mb-6">
      {opciones.map((opcion, index) => (
        <OpcionUsuario
          key={index}
          icon={opcion.icon}
          title={opcion.title}
          subtitle={opcion.subtitle}
          onPress={() => router.push(opcion.ruta)}
        />
      ))}
    </View>
  );

  return (
    <BaseScreen>
      <ScrollView showsVerticalScrollIndicator={false}>
        {user ? (
          <>
            {/* Información de usuario */}
            <View className="items-center mt-12 mb-6">
              <Image
                source={{ uri: user.photo || generateAvatarUrl() }}
                className="w-32 h-32 rounded-full"
              />
              <Text className="text-xl font-bold mt-4">{user.username || 'Usuario'}</Text>
              <Text className="text-sm text-gray-500">{user.email || 'Sin correo'}</Text>
              <Text className="text-sm text-gray-400">{`Rol: ${user.rol}`}</Text>
            </View>

            {/* Opciones comunes */}
            {renderOpciones(opcionesComunes)}

            {/* Opciones según el rol */}
            {user.rol === 'administrador' && (
              <>
                <Text className="text-sm text-gray-500">Opciones Administrativas</Text>
                {renderOpciones(opcionesAdmin)}
              </>
            )}

            {user.rol in opcionesRolesSecundarios && (
              <>
                <Text className="text-sm text-gray-500">Opciones de {user.rol.charAt(0).toUpperCase() + user.rol.slice(1)}</Text>
                {renderOpciones(opcionesRolesSecundarios[user.rol])}
              </>
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
